import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import { Thread } from 'react-threads';
import { Thread as ThreadType, ThreadsUser, ThreadsAPI } from 'threads-api';

const threadsAPI = new ThreadsAPI();

type Params = {
  username: string;
};

type Props = {
  userProfile: ThreadsUser;
  userThreads: ThreadType[];
};
export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
  const username = context.params?.username;
  try {
    if (!username) {
      return { notFound: true };
    }
    const userID = await threadsAPI.getUserIDfromUsername(username);
    if (!userID) {
      return { notFound: true };
    }

    const params: [string, string] = [username, userID];
    const [userProfile, userThreads] = await Promise.all([
      threadsAPI.getUserProfile(...params),
      threadsAPI.getUserProfileThreads(...params),
    ]);

    return {
      props: {
        userProfile,
        userThreads,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};

const UserProfilePage: NextPage<Props> = (props) => {
  return (
    <div className="flex flex-col max-w-xl mx-auto my-12 text-[rgb(243,245,247)]">
      <header className="flex flex-col py-4">
        <div className="flex items-center">
          <div className="flex flex-col flex-1">
            <span className="text-[24px] leading-[30px] font-bold">{props.userProfile.full_name}</span>
            <div className="flex items-center gap-1 mt-[2px]">
              <span className="text-[15px]">{props.userProfile.username}</span>
              <span className="px-[8px] py-[6px] rounded-[30px] bg-[rgb(30,30,30)] text-[rgb(97,97,97)] text-[11px] leading-[13px]">
                threads.net
              </span>
            </div>
          </div>

          <Image
            width={512}
            height={512}
            className="w-[84px] h-[84px] rounded-full"
            alt=""
            src={props.userProfile.profile_pic_url}
          />
        </div>

        <p className="mt-4 whitespace-break-spaces text-[15px] leading-[21px]">
          {props.userProfile.biography}
        </p>

        <div className="mt-[18px] text-[15px] leading-[21px] text-[rgb(97,97,97)]">
          <span>{props.userProfile.follower_count} followers</span>
        </div>
      </header>

      <div>
        {props.userThreads.map((thread, index) => {
          return (
            <>
              <div className="-mb-4">
                <Thread thread={thread} key={thread.id} />
              </div>
              {index !== props.userThreads.length - 1 && (
                <div className="w-full h-[0.5px] bg-[rgba(243,245,247,0.15)]" />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfilePage;

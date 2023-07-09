import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { Thread } from 'react-threads';
import {
  Thread as ThreadType,
  ThreadsUser,
  ThreadsAPI,
  ThreadsUserSummary,
  Candidate,
  ThreadsHdProfilePicVersion,
} from 'threads-api';

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
    <div className="flex flex-col max-w-4xl mx-auto">
      <div>
        <Image
          width={512}
          height={512}
          className="w-[128px] h-[128px]"
          alt=""
          src={props.userProfile.profile_pic_url}
        />

        <div>
          {props.userProfile.username}
          {props.userProfile.full_name}
        </div>
      </div>

      <div>
        {props.userThreads.map((thread) => {
          return <Thread thread={thread} key={thread.id} />;
        })}
      </div>
    </div>
  );
};

export default UserProfilePage;

import Image from 'next/image';
import React from 'react';
import { Thread, ThreadsIcons } from 'react-threads';
import { ThreadsAPI } from 'threads-api';

const threadsAPI = new ThreadsAPI({ verbose: true });

const UserProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = params.username;

  if (!username) {
    return;
  }

  const userID = await threadsAPI.getUserIDfromUsername(username);
  if (!userID) {
    return <div>No user with the given username</div>;
  }

  const [userProfile, userThreads] = await Promise.all([
    threadsAPI.getUserProfile(userID),
    threadsAPI.getUserProfileThreads(userID),
  ]);

  return (
    <div className="flex flex-col max-w-xl mx-auto my-12 text-[rgb(243,245,247)]">
      <header className="flex flex-col propspy-4">
        <div className="flex items-center">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[24px] leading-[30px] font-bold">{userProfile.full_name}</span>
              {userProfile.is_verified && <ThreadsIcons.Verified width={20} height={20} />}
            </div>
            <div className="flex items-center gap-1 mt-[2px]">
              <span className="text-[15px]">{userProfile.username}</span>
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
            src={userProfile.profile_pic_url}
          />
        </div>

        <p className="mt-4 whitespace-break-spaces text-[15px] leading-[21px]">{userProfile.biography}</p>

        <div className="mt-[18px] text-[15px] leading-[21px] text-[rgb(97,97,97)]">
          <span>{userProfile.follower_count.toLocaleString()} followers</span>
        </div>
      </header>

      <div>
        {userThreads.map((thread, index) => {
          return (
            <React.Fragment key={thread.id}>
              <div className="-mb-4">
                <Thread thread={thread} key={thread.id} />
              </div>
              {index !== userThreads.length - 1 && (
                <div className="w-full h-[0.5px] bg-[rgba(243,245,247,0.15)]" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfilePage;

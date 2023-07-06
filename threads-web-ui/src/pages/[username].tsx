import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { Thread, ThreadsUser, ThreadsAPI } from 'threads-api';

const threadsAPI = new ThreadsAPI();

type Params = {
  username: string;
};

type Props = {
  userProfile: ThreadsUser;
  userThreads: Thread[];
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
  } catch {
    return {
      notFound: true,
    };
  }
};

const UserProfilePage: NextPage<Props> = (props) => {
  return (
    <div>
      {props.userProfile.username}
      {props.userProfile.full_name}

      <Image width={128} height={128} alt="" src={props.userProfile.profile_pic_url} />

      <div>
        {props.userThreads.map((thread) => {
          return (
            <div key={thread.id}>
              {thread.thread_items.map((item) => {
                const reposted_post = item.post.text_post_app_info.share_info.reposted_post;
                const quoted_post = item.post.text_post_app_info.share_info.quoted_post;
                const post = reposted_post ? reposted_post : quoted_post ? quoted_post : item.post;
                const user = post.user;
                return (
                  <div key={item.post.id} className="p-4 text-slate-50 bg-slate-800 border border-slate-600">
                    <div className="flex">
                      <Image width={64} height={64} alt="" src={user.profile_pic_url} />
                      <div className="flex flex-col">
                        <span>
                          {user.username}
                          {user.is_verified && '✅'}
                        </span>
                        {post.taken_at}
                      </div>
                    </div>
                    {post.caption?.text}

                    {(() => {
                      const nestedRepostedPost = reposted_post?.text_post_app_info.share_info.reposted_post;
                      const nestedQuotedPost = reposted_post?.text_post_app_info.share_info.quoted_post;
                      const nestedPost = nestedRepostedPost
                        ? nestedRepostedPost
                        : nestedQuotedPost
                        ? nestedQuotedPost
                        : null;
                      if (!nestedPost) {
                        return null;
                      }

                      return (
                        <div className="border border-slate-400 p-4">
                          <div className="flex">
                            <Image width={64} height={64} alt="" src={nestedPost.user.profile_pic_url} />
                            <div className="flex flex-col">
                              <span>
                                {nestedPost.user.username}
                                {nestedPost.user.is_verified && '✅'}
                              </span>
                              {nestedPost.taken_at}
                            </div>
                          </div>

                          {nestedPost.caption?.text}
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfilePage;

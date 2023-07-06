import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { Thread, ThreadsUser, ThreadsAPI, ThreadsUserSummary } from 'threads-api';

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

type UserProfileProps = {
  user: ThreadsUserSummary;
  taken_at?: number;
};
const UserProfile: React.FC<UserProfileProps> = ({ user, taken_at }) => {
  return (
    <div className="flex">
      <Image
        width={512}
        height={512}
        className="w-[64px] h-[64px] rounded-full"
        alt=""
        src={user.profile_pic_url}
      />
      <div className="flex flex-col">
        <span>
          {user.username}
          {user.is_verified && '✅'}
        </span>
        {taken_at && <span>{taken_at}</span>}
      </div>
    </div>
  );
};

type LinkPreviewAttachmentProps = {
  link_preview_attachment: {
    image_url: string;
    title: string;
    url: string;
  };
};
const LinkPreviewAttachment: React.FC<LinkPreviewAttachmentProps> = ({ link_preview_attachment }) => {
  return (
    <div className="border border-slate-400 p-4">
      <div className="flex flex-col">
        <Image width={1200} height={1200} className="w-full" alt="" src={link_preview_attachment.image_url} />
        <div className="flex flex-col">
          <span>{link_preview_attachment.title}</span>
          <span>{link_preview_attachment.url}</span>
        </div>
      </div>
    </div>
  );
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
          return (
            <div key={thread.id}>
              {thread.thread_items.map((item) => {
                const reposted_post = item.post.text_post_app_info.share_info.reposted_post;
                const quoted_post = item.post.text_post_app_info.share_info.quoted_post;
                const post = reposted_post ? reposted_post : quoted_post ? quoted_post : item.post;
                const user = post.user;
                return (
                  <div key={item.post.id} className="p-4 bg-slate-800 border border-slate-600">
                    <UserProfile user={user} taken_at={post.taken_at} />
                    <p>{post.caption?.text}</p>

                    {post.text_post_app_info.link_preview_attachment && (
                      <LinkPreviewAttachment
                        link_preview_attachment={post.text_post_app_info.link_preview_attachment}
                      />
                    )}

                    {/* {JSON.stringify(post)} */}

                    {/* {post.carousel_media?.map((media) => {
                      return (
                        <div key={media.id} className="border border-slate-400 p-4">
                          <Image
                            width={media.image_versions2.candidates[0].width}
                            height={media.image_versions2.candidates[0].height}
                            className="w-full"
                            alt=""
                            src={media.image_versions2.candidates[0].url}
                          />
                        </div>
                      );
                    })} */}

                    {/* FIXME: IM SO IN A HURRY */}
                    {(() => {
                      const candidates = post.image_versions2?.candidates;

                      if (!candidates.length) {
                        return null;
                      }

                      // largest candidate
                      const bestCandidate = candidates.reduce((prev, current) => {
                        if (prev?.width > current?.width) {
                          return prev;
                        } else {
                          return current;
                        }
                      }, undefined)

                      return (
                        <div className="border border-slate-400 p-4">
                          <Image
                            width={bestCandidate.width}
                            height={bestCandidate.height}
                            className="w-full"
                            alt=""
                            src={bestCandidate.url}
                          />
                        </div>
                      );
                    })()}

                    {/* TODO: Video Support */}
                    {/* {JSON.stringify(post.video_versions)} */}

                    {/* FIXME: IM SO IN A HURRY */}
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
                          <UserProfile user={nestedPost.user} taken_at={nestedPost.taken_at} />
                          <p>{nestedPost.caption?.text}</p>

                          {nestedPost.text_post_app_info.link_preview_attachment && (
                            <LinkPreviewAttachment
                              link_preview_attachment={nestedPost.text_post_app_info.link_preview_attachment}
                            />
                          )}
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

import React from 'react';
import { Thread } from 'react-threads';
import { ThreadsAPI } from 'threads-api';

const threadsAPI = new ThreadsAPI({ verbose: true });

const ThreadDetailPage = async ({ params }: { params: { threadOrPostID: string } }) => {
  const threadID = params?.threadOrPostID;
  let postID: string = '';
  if (!isNaN(parseInt(threadID, 10))) {
    postID = threadID;
  } else {
    postID = threadsAPI.getPostIDfromThreadID(threadID);
  }
  if (!postID) {
    return <div>Post ID not found with provided Thread ID</div>;
  }
  const thread = await threadsAPI.getThreads(postID);

  return (
    <div className="w-full flex items-center justify-center py-[36px] min-h-screen">
      <main className="flex flex-col w-full max-w-xl mx-auto">
        {!!thread.containing_thread ? (
          <Thread thread={thread.containing_thread} />
        ) : (
          <div className="w-full h-[120px] rounded-[8px] animate-pulse bg-[rgba(243,245,247,0.05)]" />
        )}

        {thread.reply_threads?.map((thread) => (
          <Thread key={thread.id} thread={thread} />
        ))}
      </main>
    </div>
  );
};

export default ThreadDetailPage;

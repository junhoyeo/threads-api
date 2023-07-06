import { GetServerSideProps, NextPage } from 'next';
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

      <div>{JSON.stringify(props.userThreads)}</div>
    </div>
  );
};

export default UserProfilePage;

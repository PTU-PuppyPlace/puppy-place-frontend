export const getVersion = () => {
  return {
    version: '1.0.0',
    latestVersion: '1.0.1',
  };
};

export const getAccountInfo = () => {
  return {
    nickname: '몽글어멈',
    email: 'asdf***as@puppyplace.com',
  };
};

export const changeNickname = async (nickname: string) => {
  console.log(nickname);
  return {
    isSuccess: true,
    message: '닉네임이 변경되었습니다.',
  };
};

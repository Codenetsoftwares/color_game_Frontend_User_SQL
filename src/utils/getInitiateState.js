export function getUserInitialState(body = {}) {
  return {
    accessToken: body.accessToken ?? '',
    isLogin: body.isLogin ?? false,
    userName: body.userName ?? '',
    email: body.email ?? '',
  };
}

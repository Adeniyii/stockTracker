import axios from 'axios';
import store from 'store';

export const setTokenAndUser = async () => {
  const refreshToken = store.get('refresh_token');

  if (!refreshToken) return false;

  // Get new refresh and access tokens
  const {
    data: { data },
  } = await axios.post('/auth/refresh-token', { refresh_token: refreshToken });

  console.log('data tokens:', data);

  // Get user details using new access token
  const {
    data: {
      data: { user },
    },
  } = await axios.post(
    '/auth/info',
    { refreshToken },
    { headers: { Authorization: data.tokens.access_token } },
  );

  // store new refresh-token in local storage
  store.set('refresh_token', data.tokens.refresh_token);

  return user;
};

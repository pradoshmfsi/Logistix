import userAxios from '../../api/userAxios';

export const login = async (data) => {
  const url = `user/login`;
  const response = await userAxios.post(url, data);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
};

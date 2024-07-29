import userAxios from '../../api/userAxios';

/**
Registers the user based on the data provided
*/
export const addUser = async (data) => {
  const url = `user/register`;
  const response = await userAxios.post(url, data);
  return response.data.message;
};

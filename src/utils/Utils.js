import dayjs from 'dayjs';

// Date.prototype.toCustomString = () => dayjs(this).format('DD-MM-YYYY hh:mm a');

/**
Gives the date in string format 'DD-MM-YYYY hh:mm a'
*/
export const GetCustomDateString = (date) =>
  dayjs(date).format('DD-MM-YYYY hh:mm a');

/**
Gives the logged in User Id
*/
export const getLoggedUserId = () =>
  JSON.parse(localStorage.getItem('user')).userId;

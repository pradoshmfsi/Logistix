import { useState } from 'react';

// const useLocalStorage = (key, defaultValue) => {
//   const [localStorageValue, setLocalStorageValue] = useState(() => {
//     try {
//       const value = localStorage.getItem(key);
//       if (value) {
//         return JSON.parse(value);
//       } else {
//         localStorage.setItem(key, JSON.stringify(defaultValue));
//         return defaultValue;
//       }
//     } catch (error) {
//       localStorage.setItem(key, JSON.stringify(defaultValue));
//       return defaultValue;
//     }
//   });
  
//   return [localStorageValue, setLocalStorageStateValue];
// };

// export default useLocalStorage;

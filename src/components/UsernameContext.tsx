import { Context, createContext, useContext, useState } from 'react';

// const UsernameContext: Context<{username: string, setUsername: Function}> = createContext({
//   username: 'default',
//   setUsername: function() {}
// });

// export function useUsernameContext() {
//   return useContext(UsernameContext);
// }

// export const UsernameWrapper = ({ children }) => {
//   const { username: contextUsername, setUsername: contextSetUsername } = useUsernameContext();

//   const [ username, setUsername ] = useState(contextUsername || '');

//   return (
//     <UsernameContext.Provider value={{ username, setUsername }}>
//       {children}
//     </UsernameContext.Provider>
//   );
// }
// // src/context/AuthContext.js
// import React, { createContext } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     // const registerUser = async (payload) => {
//     //     const response = await axios.post(
//     //         'http://localhost:8081/api/auth/register',
//     //         payload,
//     //         { headers: { 'Content-Type': 'application/json' } }
//     //     );
//     //     return response.data;
//     // };

//     // Updated loginUser: detect email vs mobile
//     const loginUser = async (identifier, password) => {
//         let payload;
//         if (identifier.includes('@')) {
//             // If identifier looks like an email, use the email field
//             payload = { email: identifier, password };
//         } else {
//             // Otherwise, treat it as a mobile number
//             payload = { mobile: identifier, password };
//         }
//         const response = await axios.post(
//             'http://localhost:8081/api/auth/login',
//             payload,
//             { headers: { 'Content-Type': 'application/json' } }
//         );
//         return response.data;
//     };


//     // New resetPassword method
//     const resetPassword = async (payload) => {
//         const response = await axios.post(
//             'http://localhost:8081/api/auth/reset-password',
//             payload,
//             { headers: { 'Content-Type': 'application/json' } }
//         );
//         return response.data;
//     };

//     return (
//         <AuthContext.Provider value={{  loginUser, resetPassword }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;
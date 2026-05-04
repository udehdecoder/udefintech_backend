const axios = require("axios");
const baseURL = process.env.BANK_BASE_URL
const token = process.env.TOKEN
const axiosRetry = require("axios-retry")


const getApiToken = require("./apiAuth");

// const createApiClient = async () => {
//     console.log(getApiToken)
//     const token = await getApiToken();

//     const apiClient = axios.create({
//         baseURL: process.env.BASE_URL,
//         headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//         }
//     });
//     console.log("Token", token)
//     return apiClient;
// };

// const createApiClient = async () => {
//     const token = await getApiToken();

//     if (!token) {
//         throw new Error("Failed to get API token");
//     }

//     if (!process.env.BASE_URL) {
//         throw new Error("BASE_URL missing in environment variables");
//     }

//     const apiClient = axios.create({
//         baseURL: process.env.BASE_URL,
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//         }
//     });

//     console.log("Token acquired successfully");

//     return apiClient;
// };



const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 120000,
    headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        // "x-api-secret": process.env.API_SECRET
    }
})

// apiClient.interceptors.request.use(
//     async (config) => {
//         console.log("INTERCEPTOR RUNNING...");

//         const token = await getApiToken();

//         console.log("TOKEN FROM INTERCEPTOR:", token);

//         config.headers.Authorization = `Bearer ${token}`;

//         return config;
//     },
//     (error) => Promise.reject(error)
// );



module.exports = {apiClient};








// attach retry to THIS instance (not global axios)
// axiosRetry(apiClient, {
//   retries: 3, // number of retries
//   retryDelay: (retryCount) => {
//     console.log(`Retrying request... attempt ${retryCount}`);
//     return retryCount * 2000; // 2s, 4s, 6s
//   },
//   retryCondition: (error) => {
//     return (
//       error.code === "ECONNABORTED" ||
//       error.code === "ETIMEDOUT" ||
//       !error.response // no response from server
//     );
//   }
// });

// module.exports = apiClient;



// apiClient.interceptors.request.use(async (config) => {
//   const token = process.env.TOKEN; // or fetch dynamically
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// console.log(process.env.APIKEY, baseURL)
module.exports = apiClient;
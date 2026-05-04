// const axios = require("axios");

// let cachedToken = null;
// let expiry = null;

// const getApiToken = async () => {
//     console.log("geting api token")
//     // if (cachedToken && Date.now() < expiry) {
//     //     return cachedToken;
//     // }

//     const response = await axios.post(
//         `${process.env.BANK_BASE_URL}api/auth/token`,
//         {
//             apiKey: process.env.APIKEY,
//             secret: process.env.API_SECRET
//         }
//     );

//     cachedToken = response.data.token;

//     // adjust if API gives expiry
//     expiry = Date.now() + (60 * 60 * 1000);
//     console.log("api auth token", cachedToken)
//     return cachedToken;
    
// };

// module.exports = getApiToken;


// utils/getApiToken.js
const axios = require("axios");

let cachedToken = null;
let expiry = null;

const getApiToken = async () => {
    if (cachedToken && Date.now() < expiry) {
        return cachedToken;
    }

    const response = await axios.post(
        "https://nibssbyphoenix.onrender.com/api/auth",
        {
            apiKey: process.env.APIKEY,
            secret: process.env.API_SECRET
        }
    );

    // ✅ IMPORTANT
    cachedToken = response.data.token;

    // Optional: extract expiry from JWT (better later)
    expiry = Date.now() + (60 * 60 * 1000); // 1 hour

    console.log("NEW TOKEN GENERATED:", cachedToken);

    return cachedToken;
};

module.exports = getApiToken;
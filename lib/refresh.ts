// import { cookies } from 'next/headers'
import Cookies from "js-cookie";
export const refresh = async () => {
    try {
        // const cookieStore = cookies()
        const refreshToken = Cookies.get("directus_refresh_token")
        console.log("refreshToken: ", refreshToken);
        
      await fetch("https://api.mysurviour.agpro.co.in/auth/refresh", {
        method: "POST",
        credentials: "include", // this is required in order to send the refresh/session token cookie
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode: "json", refresh_token: refreshToken }), // using 'session' mode, but can also be 'cookie' or 'json'
        // body: JSON.stringify({ mode: "session" }), // using 'session' mode, but can also be 'cookie' or 'json'
      });
    } catch (error) {
      console.log(error);
    }
};
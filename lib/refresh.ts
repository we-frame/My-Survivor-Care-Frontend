export const refresh = async () => {
    try {
      await fetch("https://api.mysurviour.agpro.co.in/auth/refresh", {
        method: "POST",
        credentials: "include", // this is required in order to send the refresh/session token cookie
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode: "json" }), // using 'session' mode, but can also be 'cookie' or 'json'
      });
    } catch (error) {
      console.log(error);
    }
};
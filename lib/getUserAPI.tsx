import { makeRequest } from "./api";

export const getUserDetails = async (setUser: any) => {
  try {
    const getUserData = await makeRequest(
      "GET",
      "/users/me?fields=*,latest_menopause_history.*,menopause_history.*",
    );
    setUser(getUserData?.data);
  } catch (error) {
    console.log(error);
  }
};

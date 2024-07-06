import Cookie from "js-cookie";

export const checkLogin = () => !!Cookie.get("access-token");
export const accessToken = Cookie.get("access-token") || null;
export const refreshToken = Cookie.get("refresh-token") || null;

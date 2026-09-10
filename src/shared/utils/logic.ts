import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
export function setToken(token: string) {
  const { exp } = jwtDecode<{ exp: number }>(token);
  const expDate = new Date(exp * 1000);

  Cookies.set("auth_token", token, {
    path: "/",
    expires: expDate,
    secure: true,
    sameSite: "strict",
  });
}

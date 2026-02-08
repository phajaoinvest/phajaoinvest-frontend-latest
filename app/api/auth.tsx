import { ILogins, IRegisterCredentials } from "../../interfaces/auth";
import { useToast } from "../utils/toast";
const header = new Headers();
header.append("Content-Type", "application/json");

export const ActionLogin = async (data: ILogins) => {
  const options: RequestInit = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data),
    credentials: "include",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/customer/login",
      options
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    return error;
  }
};

export const ActionSignUp = async (data: IRegisterCredentials) => {
  const { isErrorMessage } = useToast();
  const options: RequestInit = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data),
    credentials: "include",
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/customer/register",
      options
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    isErrorMessage("Something wrong!", 2000);
  }
};

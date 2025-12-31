import { authapi } from "./api";
import api from "./axios";

/**
 * Login API for the user.
 * @param mobileno mobileno from user
 * @param password password from user
 * @returns api response
 */
export const loginApi = (mobileno: string, password: string) => {
  return api.post(authapi.login, { mobileno, password });
};

/**
 * 
 * @param mobileno mobile no from user
 * @returns api response
 */
export const otpRequestApi = (mobileno: string) => {
  return api.post(authapi.requestOtp, { mobileno });
};

/**
 * 
 * @param data data from registration form
 * @returns api response
 */
export const registerApi = (data: {
  username: string;
  email: string;
  mobileno: string;
  password: string;
  otp: string;
}) => {
  return api.post(authapi.register, data);
};
import { AxiosResponse } from "axios";
import httpClient from "@/axios";

function getCsrf(): Promise<AxiosResponse> {
  return httpClient.get('/sanctum/csrf-cookie');
}

// function register(
//   payload: 

//   {
//     email: string;
//     name: string;
//     password: string;
//     password_confirmation: string;
//   }
// ): Promise<AxiosResponse> {
//   return httpClient.post('/api/register', payload);
// }

// function login(payload: LoginUserPayload): Promise<ApiResponse<UserResource>> {
//   return httpClient.post('/api/login', payload);
// }

// function logout(): Promise<ApiResponse> {
//   return httpClient.post('/api/logout');
// }

// function getAuthenticatedUser(): Promise<ApiResponse<UserResource>> {
//   return httpClient.get('/api/user');
// }

export { getCsrf, //register,
  //  login, logout, getAuthenticatedUser
   };

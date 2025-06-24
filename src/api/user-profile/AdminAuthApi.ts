import { http } from 'boot/axios';
import type { ILoginRequest } from 'src/types/user-profile/ILoginRequest';
import type { ILoginResponse } from 'src/types/user-profile/ILoginResponse';
import type { IRefreshTokenRequest } from 'src/types/user-profile/IRefreshTokenRequest';
import axios from 'axios';

export const logIn = async (payload: ILoginRequest): Promise<ILoginResponse> =>
  (await http.post('/user-profile/admin/auth/login', payload)).data;

export const refreshToken = async (payload: IRefreshTokenRequest): Promise<ILoginResponse> =>
  (await axios.post(`${process.env.API_URL}/user-profile/auth/login/refresh_token`, payload)).data;

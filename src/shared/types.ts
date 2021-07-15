import { Dispatch, PropsWithChildren } from 'react';

export type TProps<P> = P & PropsWithChildren<any>;

export type TRole = 'ADMIN' | 'DRIVER' | 'HOSPITAL' | 'USER';

export type TUser = {
  user_id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  token: string | undefined;
  role?: TRole;
};

export type TUsers = {
  name: string | undefined;
  email: string | undefined;
};

export type TDriverDetails = TUsers & {
  user_id?: string | undefined;
  phone?: string | undefined;
  licence?: string | undefined;
  vehicle_number?: string | undefined;
  aadhaar_id?: number | undefined;
  locality?: string | undefined;
  location?: string | undefined;
  profile_picture?: string | ArrayBuffer | undefined;
};
export type THospitalDetails = TUsers & {
  user_id?: string | undefined;
  phone?: string | undefined;
  website?: string | undefined;
  locality?: string | undefined;
  location?: string | undefined;
  availability?: boolean | undefined;
  profile_picture?: string | ArrayBuffer | undefined;
};
export type TClientDetails = TUsers & {
  user_id?: string | undefined;
  phone?: string | undefined;
  aadhaar_id?: number | undefined;
  location?: string | undefined;
  profile_picture?: string | ArrayBuffer | undefined;
};

export type TAuthActions = {
  type: 'SET_USER';
  payload?: any;
};

export type TAuthInitialValues = TUser & {
  isAuthenticated?: boolean;
  loading?: boolean;
  current_driver_id?: string;
  current_hospital_id?: string;
  current_client_id?: string;
};

export type TAuthContext = {
  user: TAuthInitialValues;
  dispatch: Dispatch<TAuthActions>;
};

export type TDriver = TDriverDetails & {
  id?: string | undefined;
  role: 'DRIVER';
};

export type THospital = THospitalDetails & {
  id?: string | undefined;
  role: 'HOSPITAL';
};

export type TClient = TClientDetails & {
  id?: string | undefined;
  role: 'CLIENT';
};

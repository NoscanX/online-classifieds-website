export enum USER_ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

export interface RegistrationTypes {
  email: string;
  password: string;
  name: string;
  // cityRegistration: string,
  // addressRegistration: string,
  // roleRegistration: USER_ROLE
}

export interface LoginTypes {
  email: string;
  password: string;
}

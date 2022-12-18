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

export interface RegistrationValidationTypes {
  email: boolean;
  password: boolean;
  name: boolean;
  // cityRegistrationValidation: boolean,
  // addressRegistrationValidation: boolean
}

export interface LoginTypes {
  emailLogin: string;
  passwordLogin: string;
}

export interface LoginValidationTypes {
  emailLoginValidation: boolean;
  passwordLoginValidation: boolean;
}

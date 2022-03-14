export interface AccountInfoResponse {
  isSuccess: boolean;
  message: string;
  exception: null;
  data: AccountInfo[];
}

export interface AccountInfo {
  name: string;
  lastName: string;
  registrationDate: Date;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

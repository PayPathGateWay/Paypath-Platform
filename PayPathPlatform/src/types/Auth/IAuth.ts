export type Merchant = {
  refreshToken?(arg0: string, refreshToken: any, arg2: { secure: true; sameSite: "Lax"; }): unknown;
  merchantId: string | null;
  merchantName: string | null;
  emailAddress: string | null;
  accessToken: string | null;
};

export type RegisterType = {
  merchantName: string,
  phoneNumber: string,
  platformName: string,
  platformLogoFile: File,
  email: string,
  password: string
}

export type AuthState = {
  user: Merchant | null;
  loading: boolean;
  error: string | null;
};

export interface AuthContextType {
  user: Merchant | null;
  loading?: boolean;
  error?: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (values: {
    merchantName: string;
    phoneNumber: string;
    platformName: string;
    email: string;
    password: string;
  },
    platformLogoFile: File) => void;

  isAuthenticated?: boolean | null;
}


export interface DecodedToken {
  exp: number;
}

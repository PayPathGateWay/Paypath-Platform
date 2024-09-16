export type Merchant = {
  refreshToken?(arg0: string, refreshToken: any, arg2: { secure: true; sameSite: "Lax"; }): unknown;
  merchantId: string | null;
  merchantName: string | null;
  emailAddress: string | null;
  accessToken: string | null;
};

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
  isAuthenticated?: boolean | null;
}


export interface DecodedToken {
  exp: number;
}

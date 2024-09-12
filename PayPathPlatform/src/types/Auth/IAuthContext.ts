export interface AuthContextType {
    merchantName: string | null;
    emailAddress: string | null;
    phoneNumber: string | null;
    isVerified: boolean;
    merchantId: string | null;
    token: string | null;
    roles: string[];
    loading: boolean;
    error: string | null;
  }
import { AuthContextType } from '@/types/Auth/IAuthContext';
import { createContext } from 'react';

const AuthContext = createContext<AuthContextType>({
  merchantName: null,
  emailAddress: null,
  phoneNumber: null,
  merchantId: null,
  token: null,
  error: null,
  isVerified: false,
  loading: true,
  roles: [],
});

export default AuthContext;

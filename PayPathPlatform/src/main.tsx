import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './Context/AuthContext.tsx';
import { Provider as ReduxProvider } from 'react-redux'; // Correct import for Redux Provider
import { store } from './Store/MerchantStore.tsx';

createRoot(document.getElementById('root')!).render(
    <ReduxProvider store={store}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ReduxProvider>
);

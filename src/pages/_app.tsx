import "../styles/main.css";
import type { AppProps } from "next/app";

import fullTheme from '@/config/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store, persistor } from '@/config/store';
import { PersistGate } from 'redux-persist/integration/react';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={fullTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="calm-pattern">
            <Component {...pageProps} />
          </div>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

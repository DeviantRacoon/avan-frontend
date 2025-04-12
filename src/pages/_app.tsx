import type { AppProps } from "next/app";
import "../styles/main.css";

import { ThemeProvider } from '@mui/material/styles';
import fullTheme from '@/theme/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={fullTheme}>
      <div className="calm-pattern">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}


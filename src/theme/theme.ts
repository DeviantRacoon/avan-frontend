// File: /theme/fullTheme.ts
import { createTheme } from '@mui/material/styles';

const fullTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0d47a1',
      light: '#5472d3',
      dark: '#002171',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d81b60',
      light: '#ff5c8d',
      dark: '#a00037',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f57c00',
      contrastText: '#000000',
    },
    info: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    success: {
      main: '#388e3c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#bdbdbd',
    },
    divider: '#e0e0e0',
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  shadows: [
    'none',
    '0px 1px 3px rgba(0,0,0,0.12)',
    '0px 1px 5px rgba(0,0,0,0.2)',
    '0px 1px 8px rgba(0,0,0,0.24)',
    '0px 2px 4px rgba(0,0,0,0.18)',
    '0px 3px 5px rgba(0,0,0,0.2)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
    '0px 4px 10px rgba(0,0,0,0.1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#212121',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
});

export default fullTheme;
// Providers.tsx

'use client';

import { AuthProvider } from "./AuthProvider";
import { NotificationProvider } from "./NotificationProvider";
import { ThemeProvider } from "./ThemeProvider";

// Interface for the ThemeProvider props
interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

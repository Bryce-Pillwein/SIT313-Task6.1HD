// Providers.tsx

'use client';

import { NotificationProvider } from "./NotificationProvider";
import { ThemeProvider } from "./ThemeProvider";

// Interface for the ThemeProvider props
interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <NotificationProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </NotificationProvider>
  );
}

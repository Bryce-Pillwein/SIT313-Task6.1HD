// Layout Header Only tsx

import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutHeaderOnly({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <div className="app-container">
        {children}
      </div>
    </div>
  );
}
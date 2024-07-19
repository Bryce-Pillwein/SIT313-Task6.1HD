// Layout Default tsx

import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutDefault({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <div className="app-container">
        {children}
      </div>
      <Footer />
    </div>
  );
}
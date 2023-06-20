import React from "react";
import Navbar from "../Navbar/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* navbar */}
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;

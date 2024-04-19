import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";


function Layout({
  title,
  description,
  keywords,
  children,
  noheader,
  nofooter,
}) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      <>
        {noheader ? null : <Header />}
        <main
          style={{
            minHeight: "80vh",
          }}
        >
          {children}
        </main>
        {nofooter ? null : <Footer />}
        {/* <Footer /> */}
      </>
    </HelmetProvider>
  );
}

export default Layout;

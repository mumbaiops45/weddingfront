import "./globals.css";
import Navbar from "./components/Navbar";
import Createlead from "./components/Createlead";
import Toast from "./components/common/Toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Navbar />
        <div className="pl-64">
          {/* <Createlead/> */}
          {children}
          <Toast />
        </div>

      </body>
    </html>
  );
}
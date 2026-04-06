import "./globals.css";
import Navbar from "./components/Navbar";
import Createlead from "./components/Createlead";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Navbar />
        <div className="pl-64">
          <Createlead/>
          {children}
        </div>

      </body>
    </html>
  );
}
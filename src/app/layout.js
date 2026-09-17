import "./globals.css";

export const metadata = {
  title: "Vault Code",
  description: "Coding Problems and Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
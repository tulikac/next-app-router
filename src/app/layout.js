import "./globals.css";

export const metadata = {
  title: {
    default: "Next.js App Router shape test",
    template: "%s | Next.js App Router shape test",
  },
  description: "Builder Apps Next.js App Router qualification fixture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

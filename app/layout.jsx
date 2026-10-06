import "./globals.css";

export const metadata = {
  title: "ITZFIZZ — Motion Landing Page",
  description: "A GSAP powered motion landing page built with Next.js, React and Tailwind."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
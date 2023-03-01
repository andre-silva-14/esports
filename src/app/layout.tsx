import { Providers } from "../store/provider";
import "../styles/main.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#121214] bg-galaxy bg-cover bg-no-repeat">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

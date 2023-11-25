import Providers from "@/components/Providers";
import ToasterContext from "@/context/ToasterContext";
import "./globals.css";
import AuthContext from "@/context/AuthContext";
import { EdgeStoreProvider } from "@/lib/edgestore";
import ActiveStatus from "@/components/ActiveStatus";

export const metadata = {
  title: "Messanger",
  description: "Messanger",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthContext>
          <Providers>
            <ToasterContext />
            <ActiveStatus />
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </Providers>
        </AuthContext>
      </body>
    </html>
  );
}

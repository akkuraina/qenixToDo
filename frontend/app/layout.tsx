import "../styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { TaskProvider } from "@/context/TaskContext";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TaskProvider>
            <Navbar />
            {children}
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
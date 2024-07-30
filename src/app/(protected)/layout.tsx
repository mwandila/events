import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "../../components/ui/dashboardui/navbar";
import { Toaster } from "sonner";
import { Sidebar } from "../../components/ui/dashboardui/sidebar";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="h-screen from-white to-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] overflow-hidden pt-0">
        <div className="flex w-full h-full">
          <div className="w-1/6 h-full">
            <Sidebar />
          </div>
          <div className="w-5/6 h-full flex flex-col">
            
            <div className="flex-1 overflow-y-auto p-10">
              {children}
            </div>
          </div>
        </div>
        <Toaster richColors closeButton />
      </div>
    </SessionProvider>
  );
}

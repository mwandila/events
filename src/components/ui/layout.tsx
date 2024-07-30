
"use client"
import { cn } from '@/lib/utils';
import Header from '@/components/ui/Header/Header';
import Footer from '@/components/ui/Footer/Footer';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased overflow-hidden overflow-auto h-screen relative',
         
        )}
      >
        <div className="bg-white fixed top-0 left-0 w-full text-white p-1 z-50">
          <Header />
        </div>
        <div className="h-3"></div>
        <main className="mt-20 t-20 mb-20">{children}</main> {/* Adjusted margin-top and margin-bottom */}
        <footer className="mt-20">
          <Footer />
        </footer>
      </body>
    </html>
  );
}

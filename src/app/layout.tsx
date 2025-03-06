export default function EnterLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="bg-black flex items-center justify-center min-h-screen text-white">
          {children}
        </body>
      </html>
    );
  }
  
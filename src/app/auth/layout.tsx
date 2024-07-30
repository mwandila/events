export default function AuthLayout({ 
  children 
}: {
  children: React.ReactNode 
}) {
  return (
    <div className="h-full flex items-center justify-center bg-white-500 from-white-400 to-white-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]">
      {children}
    </div>
  )
}
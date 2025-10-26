export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_65%)] opacity-10" />
      {children}
    </div>
  );
}
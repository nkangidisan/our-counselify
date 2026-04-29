export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-base px-4 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-text-muted">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-text-primary">Page not found</h1>
        <p className="mt-3 text-text-secondary">The page you requested does not exist or has moved.</p>
      </div>
    </main>
  );
}

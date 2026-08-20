// Basic application layout
// Phase 0: minimal shell (header, main, footer). Routing outlet added in Phase 2.

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <span className="text-lg font-semibold text-primary">ShopSphere</span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8" />
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          ShopSphere — Demo e-commerce frontend
        </div>
      </footer>
    </div>
  );
}

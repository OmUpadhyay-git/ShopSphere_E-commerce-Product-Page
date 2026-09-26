import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-4xl font-bold text-slate-900">404</h1>
      <p className="mt-2 text-lg text-slate-600">Page not found</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-white hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}

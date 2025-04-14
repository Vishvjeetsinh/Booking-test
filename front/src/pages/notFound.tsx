import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-6">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-700">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-600 hover:underline font-medium text-lg">
        Go back home
      </Link>
    </div>
  );
}

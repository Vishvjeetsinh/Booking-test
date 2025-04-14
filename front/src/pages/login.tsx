import { LoginForm } from "@/components/Auth/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-4">
      <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
      <LoginForm />
      <p className="text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}

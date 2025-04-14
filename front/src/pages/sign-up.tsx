import { SignUpForm } from "@/components/Auth/SignupForm";
import { Toaster } from "../components/ui/sonner";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-4">
      <h1 className="text-3xl font-bold text-center">Create an Account</h1>
      <SignUpForm />
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Log in
        </Link>
      </p>
      <Toaster richColors />
    </div>
  );
}

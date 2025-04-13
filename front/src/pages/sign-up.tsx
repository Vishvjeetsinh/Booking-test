import { SignUpForm } from "@/components/Auth/SignupForm";
import { Toaster } from "../components/ui/sonner"


export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUpForm />
    <Toaster richColors />

    </div>
  );
}
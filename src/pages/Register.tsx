
import MainLayout from "@/components/layout/MainLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const Register = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <MainLayout>
      <div className="container mx-auto my-12 max-w-md px-4 sm:px-6">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="mt-2 text-muted-foreground">
              Sign up to start shopping for furniture
            </p>
          </div>
          <div className="mt-6">
            <RegisterForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;

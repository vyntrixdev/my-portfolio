import { Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { LoadingOverlay } from "../common/LoadingOverlay"; 

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingOverlay
            visible={loading}
            message={"Initializing..."}
          />
      </div>
    );
  }

  // ❌ If user not logged in → redirect to login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ If logged in → show the protected content
  return <>{children}</>;
}

import { Navigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  // Wait until Clerk loads
  if (!isLoaded) {
    return null; // or loader
  }

  // Not logged in
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  // Role check (if roles are specified)
  if (allowedRoles.length > 0) {
    const role = user?.publicMetadata?.role as string | undefined;

    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;

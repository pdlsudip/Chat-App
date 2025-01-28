import { Navigate } from "react-router-dom";

interface PublicRoutesProps {
    isAuthenticated: boolean;
    children: JSX.Element;
}
const PublicRoutes = ({isAuthenticated, children}: PublicRoutesProps) => {
  return (
    isAuthenticated? <Navigate to={"/"} /> : children
  )
}

export default PublicRoutes
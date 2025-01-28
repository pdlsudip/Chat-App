import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import { SignIn } from "./pages/auth/SignIn";
import useAuth from "./customHooks/useAuth";
import HomePage from "./pages/basic/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import PublicRoutes from "./components/PublicRoutes";
import { ToastContainer } from "react-toastify";

const App = () => {
 const {data:user, isLoading} = useAuth();
  if(isLoading){
    return <div>...Loading...</div>
  }
  return (
    <>
      <ToastContainer/>
    <Routes>
         
          <Route path="/signup" element={<PublicRoutes isAuthenticated={!!user} >
            <SignUp/>
          </PublicRoutes>} />
          <Route path="/login" element={<PublicRoutes isAuthenticated={!!user} >
            <SignIn/>
          </PublicRoutes>} />
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={!!user}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<NotFound />} />        
    </Routes>
    </>
  );
};

export default App;

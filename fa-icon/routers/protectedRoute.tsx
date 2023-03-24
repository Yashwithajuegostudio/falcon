import Loading from "@/components/Loading";
import { AuthContext } from "@/context/AuthProvider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { localStorageMethods } from "@/lib/constant";
import Login from "pages/Login";
import { useContext } from "react";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useContext(AuthContext);

  const isValidUser = () => {
    if (token) {
      return true;
    } else {
      return false;
    }
  };
  //Redirecting to login page when current router is auth route
  return isValidUser() ? children : <Login />;
};
export default ProtectedRoute;

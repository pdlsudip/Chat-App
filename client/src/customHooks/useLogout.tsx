import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/logout", 
        {},
        { withCredentials: true } // Include cookies in request
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["auth"]); // Invalidate auth query
      toast.success("Successfully logged out!");
      navigate("/login"); // Redirect to login
    },
    onError: (error: any) => {
      console.error("Logout failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || error.message || "Failed to log out. Try again.");
    },
  });

  return { logout, isLoading };
};

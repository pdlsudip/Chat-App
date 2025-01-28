import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons

interface FormTypes {
  username: string;
  password: string;
}

export const SignIn = () => {
  const queryClient = useQueryClient(); // Access the global QueryClient
  const [formData, setFormData] = useState<FormTypes>({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: singin } = useMutation({
    mutationFn: async (formData: FormTypes) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/signin",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success(response.data.msg);
      } catch (err: any) {
        console.error("Error:", err.response?.data || err.message);
        toast.error(err.response?.data.msg);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["auth"]);
    },
  });

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    singin(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h1>
        <form onSubmit={handleForm} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />} {/* Toggle between eye and eye-off */}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <Link className="underline text-blue-900" to={"/signup"}>
              SignUp
            </Link>{" "}
            instead
          </p>
        </form>
      </div>
    </div>
  );
};

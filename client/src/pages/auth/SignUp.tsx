import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import GenderBox from "../../components/GenderBox";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons

export interface FormTypes {
  username: string;
  name: string;
  email: string;
  password: string;
  gender: string;
}

const SignUp = () => {
  const queryClient = useQueryClient(); // Access the global QueryClient
  const [formData, setFormData] = useState<FormTypes>({
    username: "",
    name: "",
    email: "",
    gender: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const setGender = (gender: string) => {
    setFormData((prevData) => ({
      ...prevData,
      gender,
    }));
  };

  // Refactor the submission logic using mutation
  const { mutate: signup } = useMutation({
    mutationFn: async (formData: FormTypes) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/signup",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Ensure the backend allows credentials (cookies, etc.)
          }
        );
        console.log("User Created Successfully:", response.data);
        toast.success(response.data.msg);
      } catch (err: any) {
        console.error("Error:", err.response?.data || err.message);
        toast.error(err.response?.data.msg);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["auth"])
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formData); // Call mutate function here to trigger the mutation
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
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
          <GenderBox setGender={setGender} formData={formData} />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
          <p>
            Already have an account? <Link className="text-blue-900 underline" to={"/login"} >Signin</Link> instead  
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
interface FormTypes {
  username: string;
  name: string;
  email: string;
  password: string;
}
axios.create({
    baseURL: "http://localhost:3000"
})
const SignUp = () => {
  const [formData, setFormData] = useState<FormTypes>({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
    .post("http://localhost:3000/api/v1/users/signup", formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log("User Created Successfully:", res.data);
    })
    .catch((err) => {
      console.error("Error:", err.response?.data || err.message);
    });
  
  };    
  return (
    <div className="flex flex-col justify-center h-screen bg-red-100 items-center w-full">
      <div className="flex flex-col h-full justify-center w-full items-center">
        <div className="flex w-[600px] items-center border-red-300 border-2 p-10 flex-col">
          <h1 className="font-semibold mb-4 text-2xl">Signup</h1>
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
            <input
              className="p-2 border-black border-2 rounded-full"
              placeholder="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              className="p-2 border-black border-2 rounded-full"
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="p-2 border-black border-2 rounded-full"
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="p-2 border-black border-2 rounded-full"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-full mt-4"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;

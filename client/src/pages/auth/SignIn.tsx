import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
interface FormTypes{
    username:string;
    password:string
}
export const SignIn = () => {
  const [formData, setFormData] = useState<FormTypes>({
    username: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/users/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      }).catch((err) =>{
        console.error("Error:", err.response?.data || err.message);

      })
  };
  return (
    <div>
      <form onSubmit={handleForm}>
        <input type="text" name="username" onChange={handleChange} />
        <input type="password" name="password" onChange={handleChange} />
        <button>Login</button>
      </form>
    </div>
  );
};

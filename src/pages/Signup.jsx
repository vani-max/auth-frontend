import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const url = "https://auth-backend-yybv.onrender.com/signup"
      const response = await fetch(url,
         {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const {success,error} = result;
      if(success){
        toast.success("Signup successful!");
        setTimeout(()=>{
          navigate('/login')
        },1000)
      }else if(error){
        const details = error?.details[0].message;
        toast.error(details);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md">
      <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
        Create Account
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={signupInfo.name}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={signupInfo.email}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={signupInfo.password}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

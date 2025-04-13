import { useState } from "react";
import { loginUser, registerUser } from "../utils/api";
import toast from "react-hot-toast";

interface Props {
  setToken: (token: string) => void;
}

const AuthForms: React.FC<Props> = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = isLogin
      ? await loginUser(email, password)
      : await registerUser(email, password);

    if (response.token) {
      localStorage.setItem("token", response.token);
      setToken(response.token);
      toast.success(isLogin ? "Logged in successfully!" : "Registered successfully!");
    } else {
      const errorMsg = response.error || response.errors?.[0]?.msg || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="card p-4 bg-base-200 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="btn btn-ghost w-full"
        >
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthForms;


import { useState } from "react";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
} from "lucide-react";
import "./LoginPage.css";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    // Temporary frontend demo login only.
    if (
      email.trim().toLowerCase() === "admin@forensicfed.com" &&
      password === "Admin@123"
    ) {
      onLogin();
    } else {
      setError("Invalid admin email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-background-glow" />

      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">
            <ShieldCheck size={30} />
          </div>

          <h1>ForensicFed</h1>
          <p>Federated Cyber Threat Intelligence</p>
        </div>

        <div className="login-heading">
          <span className="login-admin-label">
            <LockKeyhole size={14} />
            ADMINISTRATOR ACCESS
          </span>

          <h2>Welcome back</h2>
          <p>Sign in to access your security dashboard.</p>
        </div>

        <form onSubmit={handleLogin}>
          <label htmlFor="admin-email">Email Address</label>

          <div className="login-input-wrapper">
            <Mail size={18} />
            <input
              id="admin-email"
              type="email"
              placeholder="admin@forensicfed.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label htmlFor="admin-password">Password</label>

          <div className="login-input-wrapper">
            <LockKeyhole size={18} />
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="login-eye-button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-submit">
            Sign In
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="login-security-note">
          <LockKeyhole size={14} />
          Administrator portal
        </div>

        <div className="login-footer">
          © 2026 ForensicFed. All rights reserved.
        </div>
      </div>
    </div>
  );
}

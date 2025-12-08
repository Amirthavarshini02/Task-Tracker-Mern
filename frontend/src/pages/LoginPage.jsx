import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import API from "../api/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>
            <CheckCircle size={40} color="white" />
          </div>
        </div>

        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Login to your account</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.loginButton} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div style={styles.divider}>
            <span style={styles.dividerText}>or</span>
          </div>

          <button type="button" style={styles.googleButton}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            <span>Login with Google</span>
          </button>

          <p style={styles.footer}>
            Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    padding: "48px",
    width: "100%",
    maxWidth: "480px",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "24px",
  },
  logo: {
    width: "70px",
    height: "70px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    textAlign: "center",
    color: "#1f2937",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    padding: "12px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.2s",
  },
  error: {
    padding: "12px",
    background: "#fee2e2",
    color: "#dc2626",
    borderRadius: "8px",
    fontSize: "14px",
  },
  loginButton: {
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  divider: {
    position: "relative",
    textAlign: "center",
    margin: "8px 0",
  },
  dividerText: {
    background: "white",
    padding: "0 16px",
    color: "#9ca3af",
    fontSize: "14px",
    position: "relative",
    zIndex: 1,
  },
  googleButton: {
    padding: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    fontSize: "15px",
    color: "#374151",
    fontWeight: "500",
  },
  footer: {
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "8px",
  },
  link: {
    color: "#667eea",
    fontWeight: "600",
  },
};
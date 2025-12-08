import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import API from "../api/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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

        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Sign up to get started</p>

        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.registerButton} disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>

          <p style={styles.footer}>
            Already have an account? <Link to="/login" style={styles.link}>Login</Link>
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
  registerButton: {
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
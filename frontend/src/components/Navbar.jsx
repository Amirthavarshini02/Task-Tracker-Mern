import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, LayoutDashboard, PlusCircle, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUserName(res.data.name);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navLeft}>
        <div style={styles.logo} onClick={() => navigate("/dashboard")}>
          <div style={styles.logoIcon}>
            <CheckCircle size={24} color="white" />
          </div>
          <span style={styles.logoText}>Task Tracker</span>
        </div>
        
        <div style={styles.navLinks}>
          <button 
            style={{...styles.navButton, ...(location.pathname === "/dashboard" && styles.navButtonActive)}}
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            style={{...styles.navButton, ...(location.pathname === "/add-task" && styles.navButtonActive)}}
            onClick={() => navigate("/add-task")}
          >
            <PlusCircle size={20} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      <div style={styles.navRight}>
        <button style={styles.profileButton} onClick={() => navigate("/profile")}>
          <User size={18} />
          <span>{userName}</span>
        </button>
        <button style={styles.logoutButton} onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    background: "white",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  },
  logoIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1f2937",
  },
  navLinks: {
    display: "flex",
    gap: "8px",
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "none",
    background: "transparent",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#6b7280",
    transition: "all 0.2s",
  },
  navButtonActive: {
    background: "#f3f4f6",
    color: "#667eea",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  profileButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "none",
    background: "#f3f4f6",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#374151",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "none",
    background: "#fee2e2",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#dc2626",
  },
};
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Lock } from "lucide-react";
import Navbar from "../components/Navbar";
import API from "../api/api";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.put("/auth/profile", { name, email });
      setSuccess("Profile updated successfully");
      setShowEditModal(false);
      fetchProfile();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await API.put("/auth/change-password", { currentPassword, newPassword });
      setSuccess("Password changed successfully");
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.content}>
        <button style={styles.backButton} onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <h1 style={styles.pageTitle}>Profile Settings</h1>

        {/* Profile Information Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Profile Information</h2>
            <button style={styles.editButton} onClick={() => setShowEditModal(true)}>
              Edit Profile
            </button>
          </div>

          <div style={styles.profileInfo}>
            <div style={styles.infoItem}>
              <div style={{...styles.infoIcon, background: "#dbeafe"}}>
                <User size={20} color="#3b82f6" />
              </div>
              <div>
                <div style={styles.infoLabel}>Full Name</div>
                <div style={styles.infoValue}>{name}</div>
              </div>
            </div>

            <div style={styles.infoItem}>
              <div style={{...styles.infoIcon, background: "#e9d5ff"}}>
                <Mail size={20} color="#a855f7" />
              </div>
              <div>
                <div style={styles.infoLabel}>Email Address</div>
                <div style={styles.infoValue}>{email}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Change Password</h2>
              <p style={styles.cardSubtitle}>Keep your account secure by using a strong password</p>
            </div>
            <button style={styles.changePasswordButton} onClick={() => setShowPasswordModal(true)}>
              <Lock size={18} />
              Change Password
            </button>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div style={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Edit Profile</h3>
              <form onSubmit={handleUpdateProfile} style={styles.form}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                {error && <div style={styles.error}>{error}</div>}
                {success && <div style={styles.success}>{success}</div>}
                <div style={styles.modalButtons}>
                  <button type="submit" style={styles.submitButton}>Save Changes</button>
                  <button type="button" style={styles.cancelButton} onClick={() => setShowEditModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div style={styles.modalOverlay} onClick={() => setShowPasswordModal(false)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Change Password</h3>
              <form onSubmit={handleChangePassword} style={styles.form}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                {error && <div style={styles.error}>{error}</div>}
                {success && <div style={styles.success}>{success}</div>}
                <div style={styles.modalButtons}>
                  <button type="submit" style={styles.submitButton}>Update Password</button>
                  <button type="button" style={styles.cancelButton} onClick={() => setShowPasswordModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f7fa 0%, #e8f5e9 100%)",
  },
  content: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "32px",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    background: "transparent",
    border: "none",
    color: "#374151",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    marginBottom: "24px",
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "32px",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    marginBottom: "24px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1f2937",
  },
  cardSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "4px",
  },
  editButton: {
    padding: "10px 20px",
    background: "transparent",
    color: "#667eea",
    border: "1px solid #667eea",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  changePasswordButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    background: "transparent",
    color: "#a855f7",
    border: "1px solid #a855f7",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  infoItem: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  infoIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: "13px",
    color: "#9ca3af",
    marginBottom: "4px",
  },
  infoValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1f2937",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    borderRadius: "16px",
    padding: "32px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 20px 25px rgba(0,0,0,0.15)",
  },
  modalTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "24px",
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
  },
  error: {
    padding: "12px",
    background: "#fee2e2",
    color: "#dc2626",
    borderRadius: "8px",
    fontSize: "14px",
  },
  success: {
    padding: "12px",
    background: "#d1fae5",
    color: "#059669",
    borderRadius: "8px",
    fontSize: "14px",
  },
  modalButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  submitButton: {
    flex: 1,
    padding: "14px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  cancelButton: {
    flex: 1,
    padding: "14px",
    background: "white",
    color: "#6b7280",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
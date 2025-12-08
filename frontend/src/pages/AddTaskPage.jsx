import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import API from "../api/api";

export default function AddTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/tasks", {
        title,
        description,
        priority,
        dueDate,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
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

        <div style={styles.formCard}>
          <h2 style={styles.title}>Add New Task</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Task Title</label>
              <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Task Description</label>
              <textarea
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
                rows={5}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={styles.select}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.submitButton} disabled={loading}>
                {loading ? "Adding Task..." : "Add Task"}
              </button>
              <button 
                type="button" 
                style={styles.cancelButton}
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
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
    maxWidth: "800px",
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
  formCard: {
    background: "white",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "15px",
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
  textarea: {
    padding: "12px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
  },
  select: {
    padding: "12px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    cursor: "pointer",
    background: "white",
  },
  error: {
    padding: "12px",
    background: "#fee2e2",
    color: "#dc2626",
    borderRadius: "8px",
    fontSize: "14px",
  },
  buttonGroup: {
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
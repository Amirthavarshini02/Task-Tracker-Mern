import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListTodo, Clock, CheckCircle2, AlertCircle, Edit, Trash2, PlusCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import API from "../api/api";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, overdue: 0 });
  const [userName, setUserName] = useState("Admin");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    fetchStats();
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

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/tasks/stats/overview");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleComplete = async (taskId, currentStatus) => {
    try {
      await API.put(`/tasks/${taskId}`, { status: currentStatus === "Completed" ? "Pending" : "Completed" });
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/tasks/${taskId}`);
        fetchTasks();
        fetchStats();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.content}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Welcome back, {userName}!</h1>
            <p style={styles.subtitle}>Here's an overview of your tasks</p>
          </div>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: "#dbeafe"}}>
              <ListTodo size={24} color="#3b82f6" />
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statNumber}>{stats.total}</div>
              <div style={styles.statLabel}>Total Tasks</div>
              <div style={styles.statSubtext}>All your tasks</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: "#fef3c7"}}>
              <Clock size={24} color="#f59e0b" />
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statNumber}>{stats.pending}</div>
              <div style={styles.statLabel}>Pending Tasks</div>
              <div style={styles.statSubtext}>In progress</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: "#d1fae5"}}>
              <CheckCircle2 size={24} color="#10b981" />
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statNumber}>{stats.completed}</div>
              <div style={styles.statLabel}>Completed</div>
              <div style={styles.statSubtext}>Finished tasks</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: "#fecaca"}}>
              <AlertCircle size={24} color="#ef4444" />
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statNumber}>{stats.overdue}</div>
              <div style={styles.statLabel}>Overdue</div>
              <div style={styles.statSubtext}>Past deadline</div>
            </div>
          </div>
        </div>

        <div style={styles.tasksSection}>
          <div style={styles.tasksHeader}>
            <h2 style={styles.tasksTitle}>Your Tasks</h2>
            <button style={styles.addButton} onClick={() => navigate("/add-task")}>
              <PlusCircle size={20} />
              Add Task
            </button>
          </div>

          <div style={styles.tasksList}>
            {tasks.length === 0 ? (
              <div style={styles.emptyState}>
                <p>No tasks yet. Create your first task!</p>
              </div>
            ) : (
              tasks.map(task => (
                <div key={task._id} style={styles.taskCard}>
                  <div style={styles.taskLeft}>
                    <input
                      type="checkbox"
                      checked={task.status === "Completed"}
                      onChange={() => handleComplete(task._id, task.status)}
                      style={styles.checkbox}
                    />
                    <div style={styles.taskContent}>
                      <h3 style={{
                        ...styles.taskTitle,
                        textDecoration: task.status === "Completed" ? "line-through" : "none",
                        color: task.status === "Completed" ? "#9ca3af" : "#1f2937"
                      }}>
                        {task.title}
                      </h3>
                      <p style={styles.taskDescription}>{task.description}</p>
                      <div style={styles.taskMeta}>
                        <span style={{
                          ...styles.statusBadge,
                          background: task.status === "Completed" ? "#d1fae5" : "#dbeafe",
                          color: task.status === "Completed" ? "#059669" : "#2563eb"
                        }}>
                          {task.status}
                        </span>
                        <span style={{
                          ...styles.priorityBadge,
                          background: task.priority === "High" ? "#fee2e2" : task.priority === "Medium" ? "#fef3c7" : "#e0e7ff",
                          color: task.priority === "High" ? "#dc2626" : task.priority === "Medium" ? "#d97706" : "#4f46e5"
                        }}>
                          {task.priority} Priority
                        </span>
                        <span style={styles.dateBadge}>
                          <Clock size={14} />
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={styles.taskActions}>
                    <button
                      style={{...styles.actionButton, color: "#667eea"}}
                      onClick={() => navigate(`/edit-task/${task._id}`)}
                    >
                      <Edit size={18} />
                      Edit
                    </button>
                    <button
                      style={{...styles.actionButton, color: "#ef4444"}}
                      onClick={() => handleDelete(task._id)}
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #a8d0e6 0%, #fbcce7 100%)",
  },
  content: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "32px",
  },
  header: {
    marginBottom: "32px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "4px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "32px",
  },
  statCard: {
    background: "white",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    gap: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  statIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statNumber: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1f2937",
  },
  statLabel: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#374151",
  },
  statSubtext: {
    fontSize: "14px",
    color: "#9ca3af",
  },
  tasksSection: {
    background: "white",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  tasksHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  tasksTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1f2937",
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  tasksList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  emptyState: {
    textAlign: "center",
    padding: "48px",
    color: "#9ca3af",
    fontSize: "16px",
  },
  taskCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    transition: "all 0.2s",
  },
  taskLeft: {
    display: "flex",
    gap: "16px",
    flex: 1,
  },
  checkbox: {
    width: "20px",
    height: "20px",
    marginTop: "4px",
    cursor: "pointer",
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  taskDescription: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "12px",
  },
  taskMeta: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
  },
  priorityBadge: {
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
  },
  dateBadge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 12px",
    background: "#f3f4f6",
    borderRadius: "6px",
    fontSize: "13px",
    color: "#6b7280",
  },
  taskActions: {
    display: "flex",
    gap: "8px",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    border: "1px solid currentColor",
    background: "transparent",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
};
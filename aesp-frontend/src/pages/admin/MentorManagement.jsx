import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../pages/common/auth.css";

const API_BASE_URL = "http://localhost:5050";

const MentorManagement = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [skillInput, setSkillInput] = useState("");

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
  });

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/admin/mentors");
      setMentors(res.data || []);
    } catch (err) {
      console.error("Lỗi lấy mentor:", err);
      alert("Không tải được danh sách mentor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const openSkillEditor = (mentor) => {
    setSelected(mentor);
    setSkillInput((mentor.skills || []).join(", "));
  };

  const saveSkills = async () => {
    if (!selected) return;

    const skills = (skillInput || "")
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    try {
      const res = await axiosInstance.put(
        `/api/admin/mentors/${selected._id}/skills`,
        { skills }
      );

      setMentors((prev) =>
        prev.map((m) =>
          m._id === selected._id ? { ...m, skills: res.data.skills } : m
        )
      );
      alert("Đã cập nhật kỹ năng");
    } catch (err) {
      console.error("Lỗi cập nhật kỹ năng:", err);
      alert("Cập nhật kỹ năng thất bại");
    }
  };

  return (
    <div className="admin-page-container">
      <h1 className="admin-page-title">
        Quản lý cố vấn
      </h1>

      <p className="admin-card-subtitle">
        Quản trị viên có thể xem danh sách mentor và cập nhật kỹ năng để học viên lựa chọn.
      </p>

      {loading && <p style={{ color: "#cbd5e1" }}>Đang tải danh sách mentor...</p>}

      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <div className="admin-table-wrapper" style={{ flex: 1, minWidth: "320px" }}>
          <table className="course-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Kỹ năng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((m) => (
                <tr key={m._id}>
                  <td>{m.username}</td>
                  <td>
                    {(m.skills || []).length > 0
                      ? m.skills.join(", ")
                      : "Chưa thiết lập"}
                  </td>
                  <td>
                    <button
                      onClick={() => openSkillEditor(m)}
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "6px",
                        border: "none",
                        background: "#6366f1",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      Sửa kỹ năng
                    </button>
                  </td>
                </tr>
              ))}
              {mentors.length === 0 && !loading && (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center", padding: "1rem" }}>
                    Chưa có mentor nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selected && (
          <div
            className="admin-card"
            style={{
              flex: 1,
              minWidth: "260px",
              alignSelf: "flex-start",
              border: "1px solid rgba(148,163,184,0.2)",
            }}
          >
            <h3 className="admin-card-title" style={{ fontSize: "1.1rem" }}>
              Kỹ năng của: {selected.username}
            </h3>
            <p className="admin-card-subtitle" style={{ marginBottom: "0.75rem" }}>
              Nhập danh sách kỹ năng, cách nhau bởi dấu phẩy. Ví dụ:{" "}
              <em>IELTS, Speaking, Business English</em>
            </p>
            <textarea
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              rows={4}
              className="auth-input"
              style={{
                width: "100%",
                resize: "vertical",
                marginBottom: "0.75rem",
              }}
            />
            <button
              onClick={saveSkills}
              className="auth-submit"
              style={{ width: "100%" }}
            >
              Lưu kỹ năng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorManagement;

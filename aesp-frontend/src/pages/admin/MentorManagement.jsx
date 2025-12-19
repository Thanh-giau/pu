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
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "white" }}>
        Quản lý cố vấn
      </h1>

      <p style={{ color: "#cbd5f5", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
        Quản trị viên có thể xem danh sách mentor và cập nhật kỹ năng để học viên lựa chọn.
      </p>

      {loading && <p style={{ color: "#cbd5e1" }}>Đang tải danh sách mentor...</p>}

      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "320px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "rgba(15,23,42,0.7)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{ background: "rgba(15,23,42,0.9)", color: "#e5e7eb" }}
              >
                <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>
                  Tên
                </th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>
                  Kỹ năng
                </th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((m) => (
                <tr
                  key={m._id}
                  style={{
                    borderTop: "1px solid rgba(148,163,184,0.25)",
                    color: "#e5e7eb",
                  }}
                >
                  <td style={{ padding: "0.6rem 1rem" }}>{m.username}</td>
                  <td style={{ padding: "0.6rem 1rem" }}>
                    {(m.skills || []).length > 0
                      ? m.skills.join(", ")
                      : "Chưa thiết lập"}
                  </td>
                  <td style={{ padding: "0.6rem 1rem" }}>
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
                  <td
                    colSpan={3}
                    style={{
                      padding: "1rem",
                      textAlign: "center",
                      color: "#cbd5e1",
                    }}
                  >
                    Chưa có mentor nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selected && (
          <div
            style={{
              flex: 1,
              minWidth: "260px",
              background: "rgba(15,23,42,0.75)",
              borderRadius: "12px",
              padding: "1.5rem",
              border: "1px solid rgba(148,163,184,0.2)",
              alignSelf: "flex-start",
            }}
          >
            <h3
              style={{
                color: "white",
                fontSize: "1.1rem",
                fontWeight: "700",
                marginBottom: "0.75rem",
              }}
            >
              Kỹ năng của: {selected.username}
            </h3>
            <p
              style={{
                color: "#cbd5f5",
                fontSize: "0.9rem",
                marginBottom: "0.75rem",
              }}
            >
              Nhập danh sách kỹ năng, cách nhau bởi dấu phẩy. Ví dụ:{" "}
              <em>IELTS, Speaking, Business English</em>
            </p>
            <textarea
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                background: "rgba(15,23,42,0.9)",
                borderRadius: "8px",
                border: "1px solid rgba(148,163,184,0.6)",
                color: "white",
                padding: "0.75rem 1rem",
                fontSize: "0.95rem",
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

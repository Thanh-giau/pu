// src/pages/learner/CourseList.jsx
import React, { useEffect, useState } from "react";
import { BookOpen, GraduationCap, CheckCircle, Loader2, Search } from "lucide-react";
import { getCourses, enrollCourse } from "../../services/learningApi";
import { getCurrentUser } from "../../services/userApi";
import "./styles/learner-courses.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const rawUser = getCurrentUser();
  const user = rawUser?.user || rawUser || null;
  const userId = user?._id || user?.id || null;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses();
        setCourses(data || []);
      } catch (err) {
        console.error("Lỗi tải khóa học:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    if (!userId) { alert("Vui lòng đăng nhập lại."); return; }
    try {
      setEnrollingId(courseId);
      await enrollCourse({ userId, courseId });
      setEnrolled((prev) => [...prev, courseId]);
      alert("Đăng ký thành công!");
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      alert("Đăng ký thất bại.");
    } finally {
      setEnrollingId(null);
    }
  };

  const filtered = courses.filter(
    (c) =>
      c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.mentor_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cl-page">
      {/* Header */}
      <div className="cl-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <GraduationCap size={28} style={{ color: "#818cf8" }} />
          <div>
            <h2 className="cl-title">Khóa học</h2>
            <p className="cl-subtitle">Khám phá và đăng ký các khóa học phù hợp với bạn.</p>
          </div>
        </div>
        <div className="cl-search-wrap">
          <Search size={16} className="cl-search-icon" />
          <input
            type="text"
            placeholder="Tìm khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="cl-search"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="cl-stats">
        <div className="cl-stat">
          <BookOpen size={18} style={{ color: "#818cf8" }} />
          <span className="cl-stat-num">{courses.length}</span>
          <span className="cl-stat-lbl">Khóa học</span>
        </div>
        <div className="cl-stat">
          <CheckCircle size={18} style={{ color: "#34d399" }} />
          <span className="cl-stat-num">{enrolled.length}</span>
          <span className="cl-stat-lbl">Đã đăng ký</span>
        </div>
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="cl-empty"><Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> Đang tải...</div>
      ) : filtered.length === 0 ? (
        <div className="cl-empty">Không tìm thấy khóa học nào.</div>
      ) : (
        <div className="cl-grid">
          {filtered.map((c) => {
            const isEnrolled = enrolled.includes(c.id);
            const isEnrolling = enrollingId === c.id;
            return (
              <div key={c.id} className="cl-card">
                <div className="cl-card-top">
                  <div className="cl-card-icon">
                    <BookOpen size={20} color="#fff" />
                  </div>
                  <span className="cl-card-id">#{c.id}</span>
                </div>
                <h3 className="cl-card-name">{c.title}</h3>
                <p className="cl-card-desc">{c.description || "Không có mô tả"}</p>
                <div className="cl-card-mentor">
                  <GraduationCap size={14} /> {c.mentor_name || "—"}
                </div>
                <button
                  onClick={() => handleEnroll(c.id)}
                  disabled={isEnrolled || isEnrolling}
                  className={`cl-enroll-btn ${isEnrolled ? "enrolled" : ""}`}
                >
                  {isEnrolling ? (
                    <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> Đang xử lý...</>
                  ) : isEnrolled ? (
                    <><CheckCircle size={14} /> Đã đăng ký</>
                  ) : (
                    "Đăng ký"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}


    </div>
  );
};

export default CourseList;

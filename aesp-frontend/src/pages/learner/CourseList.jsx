// src/pages/learner/CourseList.jsx
import React, { useEffect, useState } from "react";
import {
  getCourses,
  enrollCourse,
  getMyEnrollments,
} from "../../services/learningApi";
import { getCurrentUser } from "../../services/userApi";
import "../admin/CourseList.css";
import "./styles/learner-courses.css";


const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const user = getCurrentUser();
        if (!user) {
          setError("Vui lòng đăng nhập lại.");
          setLoading(false);
          return;
        }

        const userId = user.id || user._id || user.userId;

        const [courseData, myEnrollments] = await Promise.all([
          getCourses(),
          getMyEnrollments(userId),
        ]);

        setCourses(courseData || []);
        setEnrolledIds((myEnrollments || []).map((e) => e.course_id));
      } catch (err) {
        console.error("Lỗi tải danh sách khóa học:", err);
        setError("Không tải được khóa học. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const user = getCurrentUser();
      if (!user) {
        alert("Vui lòng đăng nhập.");
        return;
      }

      const userId = user.id || user._id || user.userId;

      setEnrollingId(courseId);

      // Gọi đúng format như trong learningApi
      const result = await enrollCourse({
        userId,
        courseId,
        withMentor: false,
      });

      if (result.alreadyEnrolled) {
        alert("Bạn đã đăng ký khóa học này rồi.");
      } else {
        alert("Đăng ký khóa học thành công!");
        setEnrolledIds((prev) => [...prev, courseId]);
      }
    } catch (err) {
      console.error("Lỗi đăng ký khóa học:", err);
      alert("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div className="course-list-container learner-courses">
      <h2 className="course-list-title">Gói học dành cho bạn</h2>

      {loading && (
        <div style={{ marginTop: 16 }}>Đang tải danh sách khóa học...</div>
      )}

      {error && !loading && (
        <div style={{ marginTop: 12, color: "#fca5a5" }}>{error}</div>
      )}

      {!loading && !error && (
        <table className="course-list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên khóa học</th>
              <th>Mô tả</th>
              <th>Giảng viên</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 16, textAlign: "center" }}>
                  Chưa có khóa học nào.
                </td>
              </tr>
            )}

            {courses.map((course) => {
              const isEnrolled = enrolledIds.includes(course.id);

              return (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.mentor_name}</td>
                  <td style={{ fontWeight: 500 }}>
                    {isEnrolled ? "Đã đăng ký" : "Chưa đăng ký"}
                  </td>
                  <td>
                    <button
                      disabled={isEnrolled || enrollingId === course.id}
                      onClick={() => handleEnroll(course.id)}
                      className="course-list-button"
                    >
                      {isEnrolled
                        ? "Đã đăng ký"
                        : enrollingId === course.id
                        ? "Đang xử lý..."
                        : "Đăng ký"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseList;

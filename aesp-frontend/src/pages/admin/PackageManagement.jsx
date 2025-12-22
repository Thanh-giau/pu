import React, { useEffect, useState } from "react";
import {
  getCourses,
  addCourse,
  deleteCourse,
} from "../../services/learningApi";
import './AdminPremium.css';

const PackageManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    mentor_name: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    if (!newCourse.title || !newCourse.mentor_name) {
      alert("Vui lòng nhập tên khóa học và giảng viên");
      return;
    }

    const payload = {
      ...newCourse,
      price: newCourse.price === "" ? 0 : Number(newCourse.price),
    };

    try {
      await addCourse(payload);
      setNewCourse({
        title: "",
        description: "",
        mentor_name: "",
        price: "",
      });
      await fetchCourses();
    } catch (err) {
      console.error("Lỗi thêm khóa học:", err);
      alert("Thêm khóa học thất bại, vui lòng xem log backend");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa khóa học này không")) return;
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Lỗi xóa khóa học:", err);
      alert("Xóa khóa học thất bại");
    }
  };

  const formatPrice = (price) => {
    const value = Number(price || 0);
    return value.toLocaleString("vi-VN") + " VND";
  };

  return (
    <div className="course-list-container">
      <h2 className="course-list-title">Gói học</h2>

      <div className="course-form">
        <input
          type="text"
          name="title"
          placeholder="Tên khóa học"
          value={newCourse.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Mô tả"
          value={newCourse.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mentor_name"
          placeholder="Giảng viên"
          value={newCourse.mentor_name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Giá (VND)"
          value={newCourse.price}
          onChange={handleChange}
          min="0"
        />
        <button onClick={handleAdd}>Thêm</button>
      </div>

      <table className="course-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên khóa học</th>
            <th>Mô tả</th>
            <th>Giảng viên</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: 12 }}>
                Đang tải dữ liệu...
              </td>
            </tr>
          )}
          {!loading &&
            courses.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.title}</td>
                <td>{c.description}</td>
                <td>{c.mentor_name}</td>
                <td>{formatPrice(c.price)}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(c.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          {!loading && courses.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: 12 }}>
                Chưa có khóa học nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PackageManagement;

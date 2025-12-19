// src/pages/admin/UserManagement.jsx
import React, { useEffect, useState } from "react";
import {
  getAdminUsers,
  createUserByAdmin,
  toggleUserActive,
} from "../../services/userApi";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "learner", // default
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getAdminUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("Lỗi tải danh sách user:", err);
      setErrorMsg("Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangeNew = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!newUser.username || !newUser.password) {
      setErrorMsg("Vui lòng nhập tên đăng nhập và mật khẩu.");
      return;
    }

    try {
      await createUserByAdmin(newUser);
      setSuccessMsg("Tạo tài khoản thành công.");
      setNewUser({ username: "", password: "", role: newUser.role });
      await loadUsers();
    } catch (err) {
      console.error("Lỗi tạo user:", err);
      setErrorMsg("Không tạo được tài khoản mới.");
    }
  };

  const handleToggleActive = async (user) => {
    setErrorMsg("");
    setSuccessMsg("");

    const id = user._id || user.id;
    if (!id) {
      console.error("User không có id hợp lệ:", user);
      setErrorMsg("Không xác định được ID người dùng.");
      return;
    }

    try {
      await toggleUserActive(id);
      await loadUsers();
    } catch (err) {
      console.error("Lỗi toggle active:", err);
      setErrorMsg("Không đổi trạng thái tài khoản được.");
    }
  };

  return (
    <div className="admin-page-container">
      <h1 className="admin-page-title">Người dùng</h1>

      {/* Khung tạo tài khoản */}
      <div className="admin-card">
        <h2 className="admin-card-title">Tạo tài khoản mới</h2>
        <p className="admin-card-subtitle">
          Có thể tạo tài khoản mentor hoặc học viên. Tài khoản admin duy nhất
          được tạo sẵn trong hệ thống.
        </p>

        {errorMsg && <div className="auth-error">{errorMsg}</div>}
        {successMsg && (
          <div className="auth-error" style={{ background: "rgba(34,197,94,0.15)", borderColor: "rgba(34,197,94,0.4)", color: "#bbf7d0" }}>
            {successMsg}
          </div>
        )}

        <form className="admin-user-form" onSubmit={handleCreateUser}>
          <div className="admin-form-row">
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              value={newUser.username}
              onChange={handleChangeNew}
              className="auth-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={newUser.password}
              onChange={handleChangeNew}
              className="auth-input"
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleChangeNew}
              className="auth-select"
            >
              <option value="mentor">Mentor</option>
              <option value="learner">Học viên</option>
            </select>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Tạo tài khoản"}
          </button>
        </form>
      </div>

      {/* Bảng danh sách người dùng */}
      <div className="admin-table-card">
        <h2 className="admin-card-title">Quản lý người dùng</h2>

        <div className="admin-table-wrapper">
          <table className="course-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên đăng nhập</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: 12 }}>
                    Đang tải dữ liệu...
                  </td>
                </tr>
              )}

              {!loading &&
                users &&
                users.map((user, index) => {
                  const isActive =
                    user.isActive === undefined ? true : user.isActive;
                  const id = user._id || user.id || index + 1;

                  return (
                    <tr key={user._id || user.id || index}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td>{isActive ? "Hoạt động" : "Bị khóa"}</td>
                      <td>
                        {user.role === "admin" ? (
                          <button className="delete-btn" disabled>
                            Không xóa được
                          </button>
                        ) : (
                          <button
                            className="delete-btn"
                            style={{
                              backgroundColor: isActive ? "#f97316" : "#22c55e",
                              borderColor: "transparent",
                            }}
                            onClick={() => handleToggleActive(user)}
                          >
                            {isActive ? "Khóa" : "Mở khóa"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}

              {!loading && users && users.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: 12 }}>
                    Không có người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

// src/pages/admin/SettingsAdmin.jsx
import React from "react";
import "./AdminPremium.css";

const SettingsAdmin = () => {
  return (
    <div className="admin-page-container">
      <h1 className="admin-page-title">Cài đặt hệ thống</h1>

      <div className="admin-card">
        <h2 className="admin-card-title">Cấu hình chung</h2>
        <p className="admin-card-subtitle">
          Quản lý cấu hình chung của hệ thống AESP. Các tính năng sẽ được mở
          rộng trong tương lai.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{
            padding: "1.25rem",
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "16px",
            color: "rgba(255,255,255,.8)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
          }}>
            <strong style={{ color: "#93c5fd" }}>ℹ️ Thông tin</strong>
            <br />
            Hiện tại cài đặt hệ thống đang trong giai đoạn phát triển.
            Bạn có thể quản lý người dùng, gói học và xem báo cáo từ
            các mục tương ứng trên thanh bên.
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}>
            {[
              { label: "Phiên bản", value: "1.0.0" },
              { label: "Môi trường", value: "Development" },
              { label: "Gateway", value: "localhost:5050" },
            ].map((item) => (
              <div key={item.label} style={{
                padding: "1rem 1.25rem",
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: "14px",
              }}>
                <div style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "4px",
                }}>
                  {item.label}
                </div>
                <div style={{ fontWeight: 700, color: "#fff" }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdmin;
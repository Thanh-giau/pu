// src/pages/learner/ProgressPage.jsx
import React, { useEffect, useState } from "react";
import {
  getProgressSummary,
  getLeaderboard,
} from "../../services/learningApi";
import { getCurrentUser } from "../../services/userApi";

const buildHeatmapCells = (summaryByDay = []) => {
  const map = {};
  summaryByDay.forEach((row) => {
    const key = new Date(row.day).toISOString().slice(0, 10);
    map[key] = row;
  });

  const cells = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const data = map[key];
    cells.push({
      date: key,
      value: data?.minutes || 0,
    });
  }
  return cells;
};

const ProgressPage = () => {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [leaderboard, setLeaderboardState] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const u = getCurrentUser?.();
    if (u) {
      setUser(u);
      loadAll(u.id || u._id || u.userId);
    }
  }, []);

  const loadAll = async (userId) => {
    try {
      setLoading(true);
      const [s, lb] = await Promise.all([
        getProgressSummary(userId),
        getLeaderboard(),
      ]);
      setSummary(s);
      setLeaderboardState(lb || []);
    } catch (err) {
      console.error("Lỗi load progress:", err);
    } finally {
      setLoading(false);
    }
  };

  const cells = buildHeatmapCells(summary?.summaryByDay || []);

  return (
    <div className="admin-page-container">
      <h1 className="admin-page-title">Tiến độ học tập</h1>

      {loading && (
        <p style={{ color: "#cbd5e1" }}>Đang tải thông tin tiến độ...</p>
      )}

      {summary && (
        <div className="admin-card">
          <h2 className="admin-card-title">
            Chuỗi luyện tập & heatmap 30 ngày
          </h2>
          <p style={{ color: "#cbd5e1", marginBottom: "1rem" }}>
            Chuỗi hiện tại:{" "}
            <strong>{summary.streak.currentStreak} ngày</strong> – Chuỗi dài
            nhất: <strong>{summary.streak.longestStreak} ngày</strong>
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(30, 1fr)",
              gap: 4,
              padding: 8,
              background: "rgba(15,23,42,0.8)",
              borderRadius: 8,
            }}
          >
            {cells.map((cell) => {
              const v = cell.value;
              let bg = "rgba(30,64,175,0.4)";
              if (v === 0) bg = "rgba(15,23,42,0.8)";
              else if (v < 10) bg = "#4ade80";
              else if (v < 20) bg = "#22c55e";
              else bg = "#16a34a";

              return (
                <div
                  key={cell.date}
                  title={`${cell.date} - ${v} phút`}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    background: bg,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      <div className="admin-card">
        <h2 className="admin-card-title">Bảng xếp hạng luyện nói (7 ngày)</h2>
        <div className="admin-table-wrapper">
          <table className="course-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Số buổi</th>
                <th>Tổng phút</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((item, idx) => (
                <tr key={item.user_id || idx}>
                  <td>{idx + 1}</td>
                  <td>{item.user_id}</td>
                  <td>{item.sessions}</td>
                  <td>{item.total_minutes}</td>
                </tr>
              ))}
              {leaderboard.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: 12 }}>
                    Chưa có dữ liệu leaderboard.
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

export default ProgressPage;

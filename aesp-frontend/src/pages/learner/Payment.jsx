// src/pages/learner/Payment.jsx
import React, { useEffect, useState } from "react";
import {
  CreditCard, CheckCircle, AlertCircle, Clock,
  Wallet, Receipt, TrendingUp, Sparkles,
} from "lucide-react";
import { getPaymentsByUser, createPayment } from "../../services/paymentApi";
import { getCurrentUser } from "../../services/userApi";
import "./styles/learner-payment.css";

const recommendedPackages = [
  { id: "P1", name: "Gói 1 tháng", price: 299000, desc: "Làm quen với nền tảng, luyện tập nhẹ nhàng mỗi ngày.", color: "#818cf8" },
  { id: "P3", name: "Gói 3 tháng", price: 799000, desc: "Tiết kiệm hơn, đủ thời gian để thấy tiến bộ.", color: "#34d399", popular: true },
  { id: "P6", name: "Gói 6 tháng", price: 1499000, desc: "Lộ trình dài hơn cho mục tiêu giao tiếp.", color: "#f472b6" },
];

const fmt = (n) => (typeof n === "number" ? n.toLocaleString("vi-VN") + "đ" : n);
const statusMap = {
  success: { text: "Thành công", color: "#34d399", bg: "rgba(16,185,129,.12)" },
  pending: { text: "Đang xử lý", color: "#fbbf24", bg: "rgba(245,158,11,.12)" },
  failed: { text: "Thất bại", color: "#f87171", bg: "rgba(239,68,68,.12)" },
};

const Payment = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingId, setCreatingId] = useState(null);
  const [error, setError] = useState("");

  const rawUser = getCurrentUser();
  const user = rawUser?.user || rawUser || null;
  const userId = user?._id || user?.id || user?.userId || null;

  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    (async () => {
      try {
        setLoading(true); setError("");
        const data = await getPaymentsByUser(userId);
        setTransactions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi tải lịch sử thanh toán:", err);
        setError("Không tải được lịch sử thanh toán.");
      } finally { setLoading(false); }
    })();
  }, [userId]);

  const handlePay = async (pkg, method = "bank_transfer") => {
    if (!userId) { alert("Vui lòng đăng nhập lại."); return; }
    try {
      setCreatingId(pkg.id); setError("");
      const result = await createPayment({ userId, packageName: pkg.name, amount: pkg.price, currency: "VND", method });
      if (result?.payment) {
        setTransactions((prev) => [result.payment, ...prev]);
        alert("Tạo giao dịch thanh toán giả lập thành công!");
      }
    } catch (err) {
      console.error(err);
      alert("Thanh toán thất bại.");
    } finally { setCreatingId(null); }
  };

  if (!userId) {
    return <div style={{ padding: 24, color: "rgba(255,255,255,.7)" }}>Vui lòng đăng nhập để xem thanh toán.</div>;
  }

  const totalPaid = transactions.filter((t) => t.status === "success").reduce((s, t) => s + (t.amount || 0), 0);

  return (
    <div className="pay-page">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <CreditCard size={28} style={{ color: "#818cf8" }} />
        <div>
          <h2 className="pay-title">Thanh toán</h2>
          <p className="pay-subtitle">Quản lý gói học và lịch sử giao dịch giả lập.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="pay-stats">
        <div className="pay-stat-card">
          <Wallet size={20} style={{ color: "#818cf8" }} />
          <div>
            <div className="pay-stat-label">Tổng đã thanh toán</div>
            <div className="pay-stat-value">{fmt(totalPaid)}</div>
          </div>
        </div>
        <div className="pay-stat-card">
          <Receipt size={20} style={{ color: "#34d399" }} />
          <div>
            <div className="pay-stat-label">Số giao dịch</div>
            <div className="pay-stat-value">{transactions.length}</div>
          </div>
        </div>
        <div className="pay-stat-card">
          <TrendingUp size={20} style={{ color: "#fbbf24" }} />
          <div>
            <div className="pay-stat-label">Giao dịch gần nhất</div>
            <div className="pay-stat-value" style={{ fontSize: "1.1rem" }}>
              {transactions[0] ? (statusMap[transactions[0].status]?.text || "—") : "Chưa có"}
            </div>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="pay-glass-card">
        <h3 className="pay-card-title"><Sparkles size={18} /> Gói học gợi ý</h3>
        <p className="pay-card-desc">Thanh toán giả lập — chỉ lưu lại trong lịch sử để test.</p>
        <div className="pay-pkg-grid">
          {recommendedPackages.map((pkg) => (
            <div key={pkg.id} className={`pay-pkg ${pkg.popular ? "popular" : ""}`}>
              {pkg.popular && <div className="pay-pkg-badge">Phổ biến</div>}
              <h4 className="pay-pkg-name">{pkg.name}</h4>
              <div className="pay-pkg-price" style={{ color: pkg.color }}>{fmt(pkg.price)}</div>
              <p className="pay-pkg-desc">{pkg.desc}</p>
              <button
                onClick={() => handlePay(pkg)}
                disabled={creatingId === pkg.id}
                className="pay-pkg-btn"
                style={{ "--accent": pkg.color }}
              >
                {creatingId === pkg.id ? "Đang xử lý..." : "Thanh toán"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="pay-glass-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.5rem" }}>
          <h3 className="pay-card-title"><Receipt size={18} /> Lịch sử thanh toán</h3>
        </div>

        {error && <div className="pay-error">{error}</div>}
        {loading && <p style={{ padding: "0 1.5rem 1.5rem", color: "rgba(255,255,255,.5)" }}>Đang tải...</p>}

        {!loading && transactions.length === 0 && !error && (
          <p style={{ padding: "0 1.5rem 1.5rem", color: "rgba(255,255,255,.45)" }}>
            Chưa có giao dịch nào. Hãy thử tạo 1 thanh toán ở trên.
          </p>
        )}

        {!loading && transactions.length > 0 && (
          <table className="pay-table">
            <thead>
              <tr>
                <th>Mã giao dịch</th>
                <th>Gói học</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => {
                const st = statusMap[t.status] || statusMap.failed;
                return (
                  <tr key={t._id}>
                    <td style={{ fontWeight: 600 }}>{t.transactionId}</td>
                    <td>{t.packageName}</td>
                    <td>{fmt(t.amount)}</td>
                    <td>
                      <span className="pay-status" style={{ color: st.color, background: st.bg }}>
                        {st.text}
                      </span>
                    </td>
                    <td style={{ color: "rgba(255,255,255,.5)" }}>
                      {t.createdAt ? new Date(t.createdAt).toLocaleString("vi-VN") : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default Payment;

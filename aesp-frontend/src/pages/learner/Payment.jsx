// src/pages/learner/Payment.jsx
import React, { useEffect, useState } from "react";
import { CreditCard, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { getPaymentsByUser, createPayment } from "../../services/paymentApi";
import { getCurrentUser } from "../../services/userApi";

const recommendedPackages = [
  {
    id: "P1",
    name: "Gói 1 tháng",
    price: 299000,
    description: "Làm quen với nền tảng, luyện tập nhẹ nhàng mỗi ngày.",
  },
  {
    id: "P3",
    name: "Gói 3 tháng",
    price: 799000,
    description: "Tiết kiệm hơn, đủ thời gian để thấy tiến bộ.",
  },
  {
    id: "P6",
    name: "Gói 6 tháng",
    price: 1499000,
    description: "Lộ trình dài hơn cho mục tiêu giao tiếp.",
  },
];

const formatMoney = (n) => {
  if (typeof n !== "number") return n;
  return n.toLocaleString("vi-VN") + "d";
};

const getStatusIcon = (status) => {
  switch (status) {
    case "success":
      return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    case "pending":
      return <Clock className="w-5 h-5 text-amber-400" />;
    default:
      return <AlertCircle className="w-5 h-5 text-red-400" />;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "success":
      return "Thành công";
    case "pending":
      return "Đang xử lý";
    default:
      return "Thất bại";
  }
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
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError("");
        const data = await getPaymentsByUser(userId);
        setTransactions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi tải lịch sử thanh toán:", err);
        setError("Không tải được lịch sử thanh toán.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handlePay = async (pkg, method = "bank_transfer") => {
    try {
      if (!userId) {
        alert("Vui lòng đăng nhập lại.");
        return;
      }

      setCreatingId(pkg.id);
      setError("");

      const result = await createPayment({
        userId,
        packageName: pkg.name,
        amount: pkg.price,
        currency: "VND",
        method,
      });

      if (result?.payment) {
        setTransactions((prev) => [result.payment, ...prev]);
        alert("Tạo giao dịch thanh toán giả lập thành công.");
      } else {
        alert("Không nhận được dữ liệu thanh toán từ server.");
      }
    } catch (err) {
      console.error("Lỗi tạo thanh toán:", err);
      alert("Thanh toán thất bại.");
    } finally {
      setCreatingId(null);
    }
  };

  if (!userId) {
    return (
      <div className="p-6 text-white">
        <h2 className="text-2xl font-semibold mb-2">Thanh toán</h2>
        <p>Vui lòng đăng nhập để xem và tạo thanh toán.</p>
      </div>
    );
  }

  const totalPaid = transactions
    .filter((t) => t.status === "success")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <div className="p-6 space-y-8 text-white">
      <div className="flex items-center gap-3 mb-2">
        <CreditCard className="w-7 h-7 text-indigo-300" />
        <div>
          <h2 className="text-2xl font-bold">Thanh toán</h2>
          <p className="text-sm text-gray-300">
            Quản lý gói học và lịch sử thanh toán giả lập.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-sm text-gray-300">Tổng đã thanh toán</p>
          <p className="text-2xl font-semibold mt-1">{formatMoney(totalPaid)}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-sm text-gray-300">Số giao dịch</p>
          <p className="text-2xl font-semibold mt-1">{transactions.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-sm text-gray-300">Giao dịch gần nhất</p>
          <p className="text-lg font-semibold mt-1">
            {transactions[0]
              ? getStatusText(transactions[0].status)
              : "Chưa có giao dịch"}
          </p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-lg font-semibold mb-3">Gói học gợi ý</h3>
        <p className="text-sm text-gray-300 mb-4">
          Đây là thanh toán giả lập, chỉ lưu lại trong lịch sử để test giao diện.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {recommendedPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-semibold mb-1">{pkg.name}</h4>
                <p className="text-xl font-bold text-emerald-300 mb-1">
                  {formatMoney(pkg.price)}
                </p>
                <p className="text-sm text-gray-300">{pkg.description}</p>
              </div>
              <button
                onClick={() => handlePay(pkg)}
                disabled={creatingId === pkg.id}
                className="mt-4 w-full inline-flex items-center justify-center px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {creatingId === pkg.id
                  ? "Đang tạo giao dịch..."
                  : "Thanh toán"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-lg font-semibold mb-3">Lịch sử thanh toán</h3>

        {loading && <p>Đang tải lịch sử...</p>}

        {error && !loading && (
          <p className="text-sm text-red-300 mb-2">{error}</p>
        )}

        {!loading && transactions.length === 0 && !error && (
          <p className="text-sm text-gray-300">
            Chưa có giao dịch nào. Hãy thử tạo 1 thanh toán ở trên.
          </p>
        )}

        {!loading && transactions.length > 0 && (
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-300 border-b border-white/10">
                  <th className="py-2 pr-3">Mã giao dịch</th>
                  <th className="py-2 pr-3">Gói học</th>
                  <th className="py-2 pr-3">Số tiền</th>
                  <th className="py-2 pr-3">Trạng thái</th>
                  <th className="py-2 pr-3">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t._id} className="border-b border-white/5">
                    <td className="py-2 pr-3 text-gray-100">
                      {t.transactionId}
                    </td>
                    <td className="py-2 pr-3 text-gray-100">
                      {t.packageName}
                    </td>
                    <td className="py-2 pr-3 text-gray-100">
                      {formatMoney(t.amount)}
                    </td>
                    <td className="py-2 pr-3 flex items-center gap-2">
                      {getStatusIcon(t.status)}
                      <span className="text-gray-100">
                        {getStatusText(t.status)}
                      </span>
                    </td>
                    <td className="py-2 pr-3 text-gray-300">
                      {t.createdAt
                        ? new Date(t.createdAt).toLocaleString("vi-VN")
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;

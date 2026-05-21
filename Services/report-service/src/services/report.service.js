import axios from "axios";

const TRANSACTION_SERVICE = process.env.TRANSACTION_SERVICE_URL || "http://localhost:5004";

export const generateReport = async (userId, authHeader, format, dateFrom, dateTo) => {
  const fileFormat = format || "json";

  const historyRes = await axios.get(`${TRANSACTION_SERVICE}/api/transactions/history`, {
    headers: { Authorization: authHeader },
    params: { page: 1, limit: 500, dateFrom, dateTo },
  });

  const transactions = historyRes.data?.data || [];
  const meta = historyRes.data?.meta || {};

  const report = {
    driverId: userId,
    company: "XYZ.ltd",
    generatedAt: new Date().toISOString(),
    summary: {
      totalSpent: meta.totalSpent || 0,
      totalLiters: meta.totalLiters || 0,
      transactionCount: transactions.length,
    },
    transactions,
  };

  if (fileFormat === "json") {
    return { content: JSON.stringify(report, null, 2), mimeType: "application/json", extension: "json" };
  }

  const lines = [
    "XYZ.ltd — Fuel Purchase History",
    `Generated: ${report.generatedAt}`,
    `Total Spent: ${report.summary.totalSpent} RWF`,
    `Total Liters: ${report.summary.totalLiters} L`,
    "",
    ...transactions.map(
      (t, i) =>
        `${i + 1}. ${new Date(t.createdAt).toLocaleString()} | ${t.liters}L | ${t.totalAmount} RWF | #${String(t.transactionId).slice(-8)}`
    ),
  ];

  return { content: lines.join("\n"), mimeType: "text/plain", extension: "txt" };
};

export const generateAdminReport = async (authHeader, period = "daily") => {
  const statsRes = await axios.get(`${TRANSACTION_SERVICE}/api/transactions/admin/stats`, {
    headers: { Authorization: authHeader },
    params: { period },
  });
  const txRes = await axios.get(`${TRANSACTION_SERVICE}/api/transactions/admin/all`, {
    headers: { Authorization: authHeader },
    params: { limit: 200 },
  });
  const stats = statsRes.data?.data || {};
  const transactions = txRes.data?.data || [];
  const report = {
    company: "XYZ.ltd",
    period,
    generatedAt: new Date().toISOString(),
    summary: stats,
    transactions,
  };
  return {
    content: JSON.stringify(report, null, 2),
    mimeType: "application/json",
    extension: "json",
  };
};

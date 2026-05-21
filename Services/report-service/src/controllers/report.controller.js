import * as ReportService from "../services/report.service.js";
import { response } from "@smart-fuel/shared";

export const downloadAdminReport = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const reportData = await ReportService.generateAdminReport(authHeader, req.query.period || "daily");
    res.setHeader("Content-Type", reportData.mimeType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="admin-report-${req.query.period || "daily"}-${Date.now()}.${reportData.extension}"`
    );
    return res.status(200).send(reportData.content);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const downloadDriverReport = async (req, res) => {
  try {
    const { format, dateFrom, dateTo } = req.query;
    const authHeader = req.headers.authorization;
    const reportData = await ReportService.generateReport(
      req.user.id,
      authHeader,
      format,
      dateFrom,
      dateTo
    );
    res.setHeader("Content-Type", reportData.mimeType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="fuel-history-${Date.now()}.${reportData.extension}"`
    );
    return res.status(200).send(reportData.content);
  } catch (err) {
    response(res, 500, err.message);
  }
};

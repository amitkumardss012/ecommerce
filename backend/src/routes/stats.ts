import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middlewares/admin.auth";
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from "../controllers/stats";

const statsRouter = Router();

statsRouter.use(isAuthenticated, isAdmin);

statsRouter.get("/stats", getDashboardStats)
statsRouter.get("/piechart", getPieCharts)
statsRouter.get("/barChart", getBarCharts)
statsRouter.get("/lineChart", getLineCharts)

export default statsRouter;


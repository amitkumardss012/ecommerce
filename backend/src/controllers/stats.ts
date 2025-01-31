import { Order } from "../models/order";
import Product from "../models/product";
import User from "../models/user";
import {
  calculatePercentage,
  getChartData,
  getInventories,
} from "../utils/stats";
import { asyncHandler } from "../middlewares/error";

export const getDashboardStats = asyncHandler(async (req, res, next) => {
  let stats;

  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const thisMonth = {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: today,
  };

  const lastMonth = {
    start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
    end: new Date(today.getFullYear(), today.getMonth(), 0),
  };

  const thisMonthProductsPromise = Product.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthProductsPromise = Product.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const thisMonthUsersPromise = User.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthUsersPromise = User.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const thisMonthOrdersPromise = Order.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthOrdersPromise = Order.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const lastSixMonthOrdersPromise = Order.find({
    createdAt: {
      $gte: sixMonthsAgo,
      $lte: today,
    },
  });

  const latestTransactionsPromise = Order.find({})
    .select(["orderItems", "discount", "total", "status"])
    .limit(4);

  const [
    thisMonthProducts,
    thisMonthUsers,
    thisMonthOrders,
    lastMonthProducts,
    lastMonthUsers,
    lastMonthOrders,
    productsCount,
    usersCount,
    allOrders,
    lastSixMonthOrders,
    categories,
    femaleUsersCount,
    latestTransaction,
  ] = await Promise.all([
    thisMonthProductsPromise,
    thisMonthUsersPromise,
    thisMonthOrdersPromise,
    lastMonthProductsPromise,
    lastMonthUsersPromise,
    lastMonthOrdersPromise,
    Product.countDocuments(),
    User.countDocuments(),
    Order.find({}).select("total"),
    lastSixMonthOrdersPromise,
    Product.distinct("category"),
    User.countDocuments({ gender: "female" }),
    latestTransactionsPromise,
  ]);

  const thisMonthRevenue = thisMonthOrders.reduce(
    (total, order) => total + (order.totalAmount || 0),
    0
  );

  const lastMonthRevenue = lastMonthOrders.reduce(
    (total, order) => total + (order.totalAmount || 0),
    0
  );

  const changePercent = {
    revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
    product: calculatePercentage(
      thisMonthProducts.length,
      lastMonthProducts.length
    ),
    user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
    order: calculatePercentage(thisMonthOrders.length, lastMonthOrders.length),
  };

  const revenue = allOrders.reduce(
    (total, order) => total + (order.totalAmount || 0),
    0
  );

  const count = {
    revenue,
    product: productsCount,
    user: usersCount,
    order: allOrders.length,
  };

  const orderMonthCounts = new Array(6).fill(0);
  const orderMonthyRevenue = new Array(6).fill(0);

  lastSixMonthOrders.forEach((order) => {
    const creationDate = order.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

    if (monthDiff < 6) {
      orderMonthCounts[6 - monthDiff - 1] += 1;
      orderMonthyRevenue[6 - monthDiff - 1] += order.totalAmount;
    }
  });

  const categoryCount = await getInventories({
    categories,
    productsCount,
  });

  const userRatio = {
    male: usersCount - femaleUsersCount,
    female: femaleUsersCount,
  };

  const modifiedLatestTransaction = latestTransaction.map((i) => ({
    _id: i._id,
    discount: i.discount,
    amount: i.totalAmount,
    quantity: i.orderItems.length,
    status: i.paymentStatus,
  }));

  stats = {
    categoryCount,
    changePercent,
    count,
    chart: {
      order: orderMonthCounts,
      revenue: orderMonthyRevenue,
    },
    userRatio,
    latestTransaction: modifiedLatestTransaction,
  };

  return res.status(200).json({
    success: true,
    stats,
  });
});

export const getPieCharts = asyncHandler(async (req, res, next) => {
  let charts;

  const allOrderPromise = Order.find({}).select([
    "total",
    "discount",
    "subtotal",
    "tax",
    "shippingCharges",
  ]);

  const [
    processingOrder,
    shippedOrder,
    deliveredOrder,
    categories,
    productsCount,
    outOfStock,
    allOrders,
    allUsers,
    adminUsers,
    customerUsers,
  ] = await Promise.all([
    Order.countDocuments({ status: "Processing" }),
    Order.countDocuments({ status: "Shipped" }),
    Order.countDocuments({ status: "Delivered" }),
    Product.distinct("category"),
    Product.countDocuments(),
    Product.countDocuments({ stock: 0 }),
    allOrderPromise,
    User.find({}).select(["dob"]),
    User.countDocuments({ role: "admin" }),
    User.countDocuments({ role: "user" }),
  ]);

  const orderFullfillment = {
    processing: processingOrder,
    shipped: shippedOrder,
    delivered: deliveredOrder,
  };

  const productCategories = await getInventories({
    categories,
    productsCount,
  });

  const stockAvailablity = {
    inStock: productsCount - outOfStock,
    outOfStock,
  };

  const grossIncome = allOrders.reduce(
    (prev, order) => prev + (order.totalAmount || 0),
    0
  );

  const discount = allOrders.reduce(
    (prev, order) => prev + (order.discount || 0),
    0
  );

  const productionCost = allOrders.reduce(
    (prev, order) => prev + (order.shippingFee || 0),
    0
  );

  const burnt = allOrders.reduce((prev, order) => prev + (order.tax || 0), 0);

  const marketingCost = Math.round(grossIncome * (30 / 100));

  const netMargin =
    grossIncome - discount - productionCost - burnt - marketingCost;

  const revenueDistribution = {
    netMargin,
    discount,
    productionCost,
    burnt,
    marketingCost,
  };

  const usersAgeGroup = {
    teen: allUsers.filter((i) => i.age < 20).length,
    adult: allUsers.filter((i) => i.age >= 20 && i.age < 40).length,
    old: allUsers.filter((i) => i.age >= 40).length,
  };

  const adminCustomer = {
    admin: adminUsers,
    customer: customerUsers,
  };

  charts = {
    orderFullfillment,
    productCategories,
    stockAvailablity,
    revenueDistribution,
    usersAgeGroup,
    adminCustomer,
  };

  return res.status(200).json({
    success: true,
    charts,
  });
});

export const getBarCharts = asyncHandler(async (req, res, next) => {
  let charts;

  const today = new Date();

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const sixMonthProductPromise = Product.find({
    createdAt: {
      $gte: sixMonthsAgo,
      $lte: today,
    },
  }).select("createdAt");

  const sixMonthUsersPromise = User.find({
    createdAt: {
      $gte: sixMonthsAgo,
      $lte: today,
    },
  }).select("createdAt");

  const twelveMonthOrdersPromise = Order.find({
    createdAt: {
      $gte: twelveMonthsAgo,
      $lte: today,
    },
  }).select("createdAt");

  const [products, users, orders] = await Promise.all([
    sixMonthProductPromise,
    sixMonthUsersPromise,
    twelveMonthOrdersPromise,
  ]);

  // ... existing code ...

  const productCounts = getChartData({
    length: 6,
    today,
    docArr: products.map((p) => p.toObject()),
  });
  const usersCounts = getChartData({
    length: 6,
    today,
    docArr: users.map((u) => u.toObject()),
  });
  const ordersCounts = getChartData({
    length: 12,
    today,
    docArr: orders.map((o) => o.toObject()),
  });

  // ... existing code ...

  charts = {
    users: usersCounts,
    products: productCounts,
    orders: ordersCounts,
  };

  return res.status(200).json({
    success: true,
    charts,
  });
});

export const getLineCharts = asyncHandler(async (req, res, next) => {
  let charts;

  const today = new Date();

  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const baseQuery = {
    createdAt: {
      $gte: twelveMonthsAgo,
      $lte: today,
    },
  };

  const [products, users, orders] = await Promise.all([
    Product.find(baseQuery).select("createdAt"),
    User.find(baseQuery).select("createdAt"),
    Order.find(baseQuery).select(["createdAt", "discount", "total"]),
  ]);

  // ... existing code ...

  const productCounts = getChartData({
    length: 12,
    today,
    docArr: products.map((p) => p.toObject()),
  });
  const usersCounts = getChartData({
    length: 12,
    today,
    docArr: users.map((u) => u.toObject()),
  });
  const discount = getChartData({
    length: 12,
    today,
    docArr: orders.map((o) => o.toObject()),
    property: "discount",
  });
  const revenue = getChartData({
    length: 12,
    today,
    docArr: orders.map((o) => o.toObject()),
    property: "total",
  });

  // ... existing code ...

  charts = {
    users: usersCounts,
    products: productCounts,
    discount,
    revenue,
  };

  return res.status(200).json({
    success: true,
    charts,
  });
});

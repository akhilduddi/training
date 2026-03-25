const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const {
  getDashboardStats,
  getLogs,
  getAdminCompanies,
  verifyCompany,
  changeCompanyStatus,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  changeUserRole,
  getPendingReviews,
  getPlatformGrowth,
  approveReview,
  addCompany,
  bulkImportCompanies,
  getEmployees,
  addEmployee,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

// Dashboards can be seen by both (stats might be limited, but let's allow it as it's the home root)
router.get('/dashboard', authorize('admin', 'employee'), getDashboardStats);
router.get('/logs', authorize('admin'), getLogs);

// Shared Admin/Employee operations (Manage Companies)
router.post('/companies', authorize('admin', 'employee'), addCompany);
router.post('/companies/bulk-import', authorize('admin', 'employee'), upload.single('file'), bulkImportCompanies);
router.get('/companies', authorize('admin', 'employee'), getAdminCompanies);
router.put('/companies/:id/verify', authorize('admin', 'employee'), verifyCompany);
router.put('/companies/:id/status', authorize('admin', 'employee'), changeCompanyStatus);

// Admin-Exclusive routes
router.get('/users', authorize('admin'), getUsers);
router.post('/users', authorize('admin'), addUser);
router.put('/users/:id', authorize('admin'), updateUser);
router.delete('/users/:id', authorize('admin'), deleteUser);
router.put('/users/:id/role', authorize('admin'), changeUserRole);

router.get('/employees', authorize('admin'), getEmployees);
router.post('/employees', authorize('admin'), addEmployee);

router.get('/reviews', authorize('admin'), getPendingReviews);
router.put('/reviews/:id/approve', authorize('admin'), approveReview);

router.get('/analytics/growth', authorize('admin'), getPlatformGrowth);

module.exports = router;

const express = require("express");
const router = express.Router();
const adminController = require("./controller");
const { protect } = require("../middleware/auth");

// For now, I'll allow access if a token is present. 
// In a real app, I'd add a secondary check: if (req.user.userType !== 'admin') ...
const adminProtect = (req, res, next) => {
    // If it's the mock-admin-token-123456, we allow it
    if (req.headers.authorization === 'Bearer mock-admin-token-123456') {
        req.user = { userType: 'admin', id: 'mock-admin-id' };
        return next();
    }
    
    // Otherwise use standard protect and check userType
    protect(req, res, () => {
        if (req.user && req.user.userType === 'admin') {
            next();
        } else {
            res.status(403).json({ success: false, message: "Forbidden: Admin access only" });
        }
    });
};

// Student Management
router.get("/students", adminProtect, adminController.getStudents);
router.put("/students/:id", adminProtect, adminController.updateStudent);
router.delete("/students/:id", adminProtect, adminController.deleteStudent);
router.patch("/students/:id/status", adminProtect, adminController.toggleStudentStatus);

// Leave Management
router.get("/leaves", adminProtect, adminController.getLeaves);
router.put("/leaves/:id/status", adminProtect, adminController.updateLeaveStatus);
router.delete("/leaves/:id", adminProtect, adminController.deleteLeave);

module.exports = router;

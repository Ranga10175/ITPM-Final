const express = require("express");
const router = express.Router();
const LeaveRequest = require("../models/LeaveRequest");
const User = require("../../LoginSignup/model");
const { protect } = require("../../middleware/auth");


// Helper function to generate Leave Request ID
function generateLeaveRequestId() {
    const prefix = 'LV';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}-${timestamp}-${random}`;
}

// =============
// CREATE - Apply for Leave
// =============
router.post("/apply", protect, async (req, res) => {
    try {
        const { 
            leaveType, fromDate, toDate, reason, 
            contactDuringLeave, parentName, parentPhone 
        } = req.body;

        // Fetch user data for extra info
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const newRequest = new LeaveRequest({
            studentName: user.fullName,
            studentItNumber: user.itNumber,
            roomNumber: user.roomNumber || "N/A",
            block: (user.roomNumber ? user.roomNumber.charAt(0).toUpperCase() : "A"), // Simple logic or from user
            department: user.department || "N/A",
            contactNumber: contactDuringLeave || user.phone,
            email: user.email,
            startDate: new Date(fromDate),
            endDate: new Date(toDate),
            leaveType: leaveType,
            reason: reason,
            leaveRequestId: generateLeaveRequestId()
        });

        await newRequest.save();

        res.status(201).json({
            success: true,
            message: "Leave request submitted successfully",
            leaveRequestId: newRequest.leaveRequestId,
            leave: newRequest
        });

    } catch (err) {
        console.error("Leave application error:", err);
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});

// =============================
// READ - Get My Leave History
// =============================
router.get("/my-leaves", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const requests = await LeaveRequest.find({ studentItNumber: user.itNumber })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            leaves: requests
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


// =============================
// READ ALL - Get All Leave Requests
// =============================
router.get("/display", async (req, res) => {
    try {
        const requests = await LeaveRequest.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// =============================
// READ ONE - Get Single Request
// =============================
router.get("/view/:id", async (req, res) => {
    try {
        const request = await LeaveRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                error: "Leave request not found"
            });
        }

        res.status(200).json({
            success: true,
            data: request
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// =============================
// UPDATE - Approve Leave Request
// =============================
router.put("/approve/:id", async (req, res) => {
    const { approvedBy } = req.body;

    try {
        const request = await LeaveRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                error: "Leave request not found"
            });
        }

        request.status = "Approved";
        request.reviewedAt = new Date();
        request.approvedBy = approvedBy || "Admin";

        await request.save();

        res.status(200).json({
            success: true,
            message: "Leave request approved successfully",
            data: request
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// =============================
// UPDATE - Reject Leave Request
// =============================
router.put("/reject/:id", async (req, res) => {
    const { rejectionReason, rejectedBy } = req.body;

    if (!rejectionReason) {
        return res.status(400).json({
            success: false,
            error: "Rejection reason is required"
        });
    }

    try {
        const request = await LeaveRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                error: "Leave request not found"
            });
        }

        request.status = "Rejected";
        request.reviewedAt = new Date();
        request.rejectionReason = rejectionReason;
        request.approvedBy = rejectedBy || "Admin";

        await request.save();

        res.status(200).json({
            success: true,
            message: "Leave request rejected successfully",
            data: request
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// =============================
// DELETE - Delete Leave Request
// =============================
router.delete("/delete/:id", async (req, res) => {
    try {
        const deleted = await LeaveRequest.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: "Leave request not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Leave request deleted successfully",
            data: deleted
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// =============================
// STATS - Get Statistics
// =============================
router.get("/stats", async (req, res) => {
    try {
        const total = await LeaveRequest.countDocuments();
        const pending = await LeaveRequest.countDocuments({ status: "Pending" });
        const approved = await LeaveRequest.countDocuments({ status: "Approved" });
        const rejected = await LeaveRequest.countDocuments({ status: "Rejected" });
        const completed = await LeaveRequest.countDocuments({ status: "Completed" });

        res.status(200).json({
            success: true,
            data: { total, pending, approved, rejected, completed }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;
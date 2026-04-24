const User = require("../LoginSignup/model");
const LeaveRequest = require("../LeaveRequest/models/LeaveRequest");

// @desc    Get all students
// @route   GET /api/admin/students
const getStudents = async (req, res) => {
    try {
        const { search } = req.query;
        let query = { userType: 'student' };

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { itNumber: { $regex: search, $options: 'i' } }
            ];
        }

        const students = await User.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update student details
// @route   PUT /api/admin/students/:id
const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete student
// @route   DELETE /api/admin/students/:id
const deleteStudent = async (req, res) => {
    try {
        const student = await User.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Toggle student active status
// @route   PATCH /api/admin/students/:id/status
const toggleStudentStatus = async (req, res) => {
    try {
        const { isActive } = req.body;
        const student = await User.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, message: `Student ${isActive ? 'activated' : 'deactivated'} successfully`, student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all leave requests
// @route   GET /api/admin/leaves
const getLeaves = async (req, res) => {
    try {
        const { status, search } = req.query;
        let query = {};

        if (status && status !== 'all') {
            query.status = status;
        }

        // Search logic for leaves (search by student name, email, or IT number)
        if (search) {
            const studentIds = await User.find({
                $or: [
                    { fullName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { itNumber: { $regex: search, $options: 'i' } }
                ]
            }).distinct('itNumber');

            query.studentItNumber = { $in: studentIds };
        }

        const leaves = await LeaveRequest.find(query).sort({ createdAt: -1 });
        
        // We need to attach student details to each leave request if the model doesn't have it
        // Our model has studentName and studentItNumber, which is usually enough.
        // But for the frontend's Avatar and Email, we might need to fetch user data.
        const populatedLeaves = await Promise.all(leaves.map(async (leave) => {
            const student = await User.findOne({ itNumber: leave.studentItNumber });
            return {
                ...leave.toObject(),
                student: student ? {
                    fullName: student.fullName,
                    email: student.email,
                    phone: student.phone,
                    profilePhoto: student.profilePhoto
                } : null,
                // Map fields to what frontend expects if different
                fromDate: leave.startDate,
                toDate: leave.endDate
            };
        }));

        res.status(200).json({ success: true, leaves: populatedLeaves });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update leave status
// @route   PUT /api/admin/leaves/:id/status
const updateLeaveStatus = async (req, res) => {
    try {
        const { status, adminComment } = req.body;
        const leave = await LeaveRequest.findByIdAndUpdate(
            req.params.id, 
            { status, adminComment, approvedBy: "Admin" }, 
            { new: true }
        );
        if (!leave) return res.status(404).json({ success: false, message: "Leave request not found" });
        res.status(200).json({ success: true, message: `Leave request ${status} successfully`, leave });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete leave request
// @route   DELETE /api/admin/leaves/:id
const deleteLeave = async (req, res) => {
    try {
        const leave = await LeaveRequest.findByIdAndDelete(req.params.id);
        if (!leave) return res.status(404).json({ success: false, message: "Leave request not found" });
        res.status(200).json({ success: true, message: "Leave request deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getStudents,
    updateStudent,
    deleteStudent,
    toggleStudentStatus,
    getLeaves,
    updateLeaveStatus,
    deleteLeave
};

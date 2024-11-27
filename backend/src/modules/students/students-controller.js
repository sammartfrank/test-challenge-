const asyncHandler = require('express-async-handler');
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require('./students-service');

const handleGetAllStudents = asyncHandler(async (req, res) => {
  try {
    const result = await getAllStudents();
    res.json(result);
    return result;
  } catch (error) {
    console.error({ error: error });
  }
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const studentData = req.body;
  try {
    const result = await addNewStudent(studentData);
    res.json(result);
    return result;
  } catch (error) {
    console.error({ error: error });
  }
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const studentData = req.body;
  const studentDataId = req.params.id;
  try {
    const result = await updateStudent({ ...studentData, id: studentDataId });
    res.json(result);
    return result;
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: 'Failed to update student' });
  }
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentDetail = await getStudentDetail(studentId);
    res.json(studentDetail);
    return studentDetail;
  } catch {
    console.error({ error: error });
  }
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  //write your code
  try {
    const { userId, reviewerId, status } = req.body;
    try {
      const result = await setStudentStatus({ userId, reviewerId, status });
      res.json(result);
      return result
    } catch (error) {
      console.error({ error: error });
      res.status(500).json({ message: 'Failed to update student status' });
    }
  } catch {
    console.error({ error: error });
  }
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};

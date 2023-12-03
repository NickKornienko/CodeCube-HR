const { Timesheet, Timeoff, Employee, User } = require("./db");
const { Op } = require("sequelize");

const getEmpNoFromUserId = async (userId) => {
  const user = await User.findByPk(userId);
  return user ? user.employee_id : null;
};

const getTimesheetsForUser = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const empNo = await getEmpNoFromUserId(req.user.userId);
    if (!empNo) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const timesheets = await Timesheet.findAll({
      where: {
        emp_no: empNo,
        date: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
    });

    res.json(timesheets);
  } catch (error) {
    console.error("Error fetching timesheets:", error);
    res.status(500).send(error.message);
  }
};

const getTimeoffForUser = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const empNo = await getEmpNoFromUserId(req.user.userId);
    if (!empNo) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const timeoff = await Timeoff.findAll({
      where: {
        emp_no: empNo,
        startDate: {
          [Op.lte]: new Date(endDate),
        },
        endDate: {
          [Op.gte]: new Date(startDate),
        },
      },
    });

    res.json(timeoff);
  } catch (error) {
    console.error("Error fetching timeoff:", error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTimesheetsForUser,
  getTimeoffForUser,
};

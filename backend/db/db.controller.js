const {
  Timesheet,
  Timeoff,
  Employee,
  User,
  Dept_emp,
  Dept_manager,
} = require("./db");

const Sequelize = require("sequelize");
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
        [Op.or]: [
          {
            start_date: {
              [Op.lte]: new Date(endDate),
            },
            end_date: {
              [Op.gte]: new Date(startDate),
            },
          },
          {
            start_date: {
              [Op.between]: [new Date(startDate), new Date(endDate)],
            },
          },
          {
            end_date: {
              [Op.between]: [new Date(startDate), new Date(endDate)],
            },
          },
        ],
      },
    });

    res.json(timeoff);
  } catch (error) {
    console.error("Error fetching timeoff:", error);
    res.status(500).send(error.message);
  }
};

const getTimeoffForManagedEmployees = async (req, res) => {
  try {
    const mgrEmpNo = await getEmpNoFromUserId(req.user.userId);
    if (!mgrEmpNo) {
      return res.status(404).json({ message: "Manager not found" });
    }

    const timeoffRecords = await Timeoff.findAll({
      where: {
        manager_emp_no: mgrEmpNo,
      },
      include: [
        {
          model: Employee,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(
              'CONCAT(`Employee`.`first_name`, " ", `Employee`.`last_name`)'
            ),
            "name",
          ],
        ],
      },
      raw: true,
    });

    res.json(
      timeoffRecords.map((record) => {
        return {
          ...record,
          name: record.name,
        };
      })
    );
  } catch (error) {
    console.error("Error fetching time off for managed employees:", error);
    res.status(500).send(error.message);
  }
};

const approveTimeoff = async (req, res) => {
  try {
    const { timeoffId, status } = req.body;

    if (![1, 2].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Timeoff.update(
      { approval_status: status },
      { where: { id: timeoffId } }
    );

    if (updated[0] > 0) {
      res.json({ message: "Timeoff status updated successfully" });
    } else {
      res.status(404).json({ message: "Timeoff not found" });
    }
  } catch (error) {
    console.error("Error updating timeoff status:", error);
    res.status(500).send(error.message);
  }
};

const createTimeoffRequest = async (req, res) => {
  try {
    const userId = req.user.userId;
    const empNo = await getEmpNoFromUserId(userId);

    if (!empNo) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const { startDate, endDate, user_comments } = req.body;

    const deptEmp = await Dept_emp.findOne({
      where: { emp_no: empNo },
      order: [["from_date", "DESC"]],
    });

    if (!deptEmp) {
      return res
        .status(404)
        .json({ message: "Department for employee not found" });
    }

    const deptManager = await Dept_manager.findOne({
      where: {
        dept_no: deptEmp.dept_no,
        from_date: {
          [Op.lte]: new Date(),
        },
        to_date: {
          [Op.gte]: new Date(),
        },
      },
    });

    if (!deptManager) {
      return res
        .status(404)
        .json({ message: "Manager for department not found" });
    }

    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

    const conflictingRequests = await Timeoff.findAll({
      where: {
        emp_no: empNo,
        [Op.or]: [
          {
            start_date: {
              [Op.between]: [formattedStartDate, formattedEndDate],
            },
          },
          {
            end_date: {
              [Op.between]: [formattedStartDate, formattedEndDate],
            },
          },
          {
            [Op.and]: [
              { start_date: { [Op.lte]: formattedStartDate } },
              { end_date: { [Op.gte]: formattedEndDate } },
            ],
          },
        ],
      },
    });

    if (conflictingRequests.length > 0) {
      return res
        .status(400)
        .json({ message: "Conflicting PTO request exists." });
    }

    const newRequest = await Timeoff.create({
      emp_no: empNo,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      user_comments,
      approval: 0,
      dept_no: deptEmp.dept_no,
      manager_emp_no: deptManager.emp_no,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error creating timeoff request:", error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTimesheetsForUser,
  getTimeoffForUser,
  createTimeoffRequest,
  getTimeoffForManagedEmployees,
  approveTimeoff,
};

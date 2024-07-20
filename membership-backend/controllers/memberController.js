const memberModel = require("../models/memberModel");
// Get all members
const getAllMembers = (req, res) => {
  memberModel.getAllMembers((err, members) => {
    if (err)
      return res.status(500).json({ errorMessage: "Error fetching members" });
    res.status(200).json(members);
  });
};
//  Add member
const createMember = (req, res) => {
  const { firstName, middleName, lastName, idNumber, dateOfBirth, photo } =
    req.body;

  memberModel.createMember(
    firstName,
    middleName,
    lastName,
    idNumber,
    dateOfBirth,
    photo,
    (err, member) => {
      if (err)
        return res.status(500).json({ errorMessage: "Error creating member" });
      res
        .status(201)
        .json({ message: `${member.memberName} was added successfully` });
    }
  );
};

module.exports = {
  getAllMembers,
  createMember,
};

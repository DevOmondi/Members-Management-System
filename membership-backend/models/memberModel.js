const db = require("../database");

// TODO: Func to add member
const createMember = (firstName, middleName, lastName, idNumber, dateOfBirth, photo, callback) => {
  const query =
    "INSERT INTO members (firstName, middleName, lastName, idNumber, dateOfBirth, photo) VALUES (?, ?, ?, ?, ?, ?)";
  db.run(
    query,
    [firstName, middleName, lastName, idNumber, dateOfBirth, photo],
    function (err) {
      if (err) return callback(err);
      callback(null, { memberName: firstName + " " + middleName });
    }
  );
};

// TODO: Func to get all members
const getAllMembers = (callback) => {
  const query = "SELECT * FROM members";
  db.all(query, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

module.exports = {
  createMember,
  getAllMembers,
};

class NurseModel {
  id = null;
  userId = null;
  name = null;
  facility = null;
  EmployeeId = null;
  fill(id, userId, name, facility, EmployeeId) {
    (this.id = id),
      (this.userId = userId),
      (this.name = name),
      (this.facility = facility),
      (this.EmployeeId = EmployeeId);
  }
}
module.exports = NurseModel;

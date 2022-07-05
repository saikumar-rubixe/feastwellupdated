class UserActivityLogModel {
  activityId = null;
  activityDescription = null;
  activityLoggedDate = null;
  userId = null;

  fill(activityId, activityDescription, activityLoggedDate, userId) {
    this.activityId = activityId;
    this.activityDescription = activityDescription;
    this.activityLoggedDate = activityLoggedDate;
    this.userId = userId;
  }
}

module.exports = { UserActivityLogModel };

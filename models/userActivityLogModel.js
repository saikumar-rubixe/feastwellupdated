class UserActivityLogModel {
  activity_id = null;
  activity_description = null;
  activity_logged_date = null;
  userid = null;

  fill(activity_id, activity_description, activity_logged_date, userid) {
    this.activity_id = activity_id;
    this.activity_description = activity_description;
    this.activity_logged_date = activity_logged_date;
    this.userid = userid;
  }
}

module.exports = { UserActivityLogModel };

class NutritionRiskFactorModel {
  riskFactorId = null;
  riskFactorName = null;
  activestatus = null;
  comments = null;
  createdDate = null;
  udatedDate = null;
  createdBy = null;
  fill(
    riskFactorId,
    riskFactorName,
    activestatus,
    comments,
    createdDate,
    udatedDate,
    createdBy
  ) {
    this.riskFactorId = riskFactorId;
    this.riskFactorName = riskFactorName;
    this.activestatus = activestatus;
    this.comments = comments;
    this.createdDate = createdDate;
    this.udatedDate = udatedDate;
    this.createdBy = createdBy;
  }
}
module.exports = {
  NutritionRiskFactorModel,
};

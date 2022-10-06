class ResidentsDetailsWithFoodPrediction {
  userId = null;
  enrolmentId = null;
  fullName = null;
  gender = null;
  age = null;
  currentWeight = null;
  currentHeight = null;
  facilityId = null;
  facilityName = null;
  mealType = null;
  mealCreatedAt = null;
  nutritionValues = null;
  fill(
    userId,
    enrolmentId,
    fullName,
    gender,
    age,
    currentWeight,
    currentHeight,
    facilityId,
    facilityName,
    mealType,
    mealCreatedAt,
    nutritionValues
  ) {
    this.userId = userId;
    this.enrolmentId = enrolmentId;
    this.fullName = fullName;
    this.gender = gender;
    this.age = age;

    this.currentWeight = currentWeight;
    this.currentHeight = currentHeight;
    this.facilityId = facilityId;
    this.facilityName = facilityName;
    this.mealType = mealType;
    this.mealCreatedAt = mealCreatedAt;
    this.nutritionValues = nutritionValues;
  }
}

module.exports = {
  ResidentsDetailsWithFoodPrediction,
};

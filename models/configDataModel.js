class configDataModel {
  configDataId = null;
  type = null;
  itemName = null;
  itemValue = null;
  itemValue2 = null;
  itemValue3 = null;

  fill(configDataId, type, itemName, itemValue, itemValue2, itemValue3) {
    this.configDataId = configDataId;
    this.type = type;
    this.itemName = itemName;
    this.itemValue = itemValue;
    this.itemValue2 = itemValue2;
    this.itemValue3 = itemValue3;
  }
}

module.exports = {
  configDataModel,
};

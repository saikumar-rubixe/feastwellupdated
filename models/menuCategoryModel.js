class menuCategoryModel {
  categoryId = null;
  categoryName = null;
  menuStatus = null;
  createdDate = null;
  updatedDate = null;
  fill(categoryId, categoryName, menuStatus, createdDate, updatedDate) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.menuStatus = menuStatus;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}
module.exports = {
  menuCategoryModel,
};

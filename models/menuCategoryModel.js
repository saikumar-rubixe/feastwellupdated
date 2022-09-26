class menuCategoryModel {
  menuCategoryId = null;
  menuCategoryName = null;
  menuCategoryStatus = null;
  createdDate = null;
  updatedDate = null;
  parentFlag = null;
  parentId = null;
  menuRoutes = null;
  desktopSortOrder = null;
  mobileSortOrder = null;
  desktopIcons = null;
  mobileIcons = null;
  fill(
    menuCategoryId,
    menuCategoryName,
    menuCategoryStatus,
    createdDate,
    updatedDate,
    parentFlag,
    parentId,
    menuRoutes,
    desktopSortOrder,
    mobileSortOrder,
    desktopIcons,
    mobileIcons
  ) {
    this.menuCategoryId = menuCategoryId;
    this.menuCategoryName = menuCategoryName;
    this.menuCategoryStatus = menuCategoryStatus;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.parentFlag = parentFlag;
    this.parentId = parentId;
    this.menuRoutes = menuRoutes;
    this.desktopSortOrder = desktopSortOrder;
    this.mobileSortOrder = mobileSortOrder;
    this.desktopIcons = desktopIcons;
    this.mobileIcons = mobileIcons;
  }
}
module.exports = {
  menuCategoryModel,
};

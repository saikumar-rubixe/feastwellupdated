class menuCategoryModel {
  menuId = null;
  menuName = null;
  menuStatus = null;
  createdDate = null;
  updatedDate = null;
  parentFlag = null;
  parentId = null;
  menuRoutes = null;
  desktopSortOrder = null;
  mobileSortOrder = null;
  desktopIcons = null;
  fill(
    menuId,
    menuName,
    menuStatus,
    createdDate,
    updatedDate,
    parentFlag,
    parentId,
    menuRoutes,
    desktopSortOrder,
    mobileSortOrder,
    desktopIcons
  ) {
    this.menuId = menuId;
    this.menuName = menuName;
    this.menuStatus = menuStatus;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.parentFlag = parentFlag;
    this.parentId = parentId;
    this.menuRoutes = menuRoutes;
    this.desktopSortOrder = desktopSortOrder;
    this.mobileSortOrder = mobileSortOrder;
    this.desktopIcons = desktopIcons;
  }
}
module.exports = {
  menuCategoryModel,
};

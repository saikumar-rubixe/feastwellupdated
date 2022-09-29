class AccessKeyModel {
  accessKey = null;
  secretKey = null;
  bucketName = null;
  fill(accessKey, secretKey, bucketName) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.bucketName = bucketName;
  }
}

module.exports = {
  AccessKeyModel,
};

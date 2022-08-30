function reverseDate(str) {
  return str.split("/").reverse().join("/");
}

const getPstDate = () => {
  const pstDate = new Date().toLocaleDateString("en-GB", {
    timeZone: "America/Los_Angeles",
  });

  const pstTime = new Date().toLocaleTimeString("en-GB", {
    timeZone: "America/Los_Angeles",
  });
  reverseDate(pstDate);
  let pst = reverseDate(pstDate) + " " + pstTime;
  return pst;
};

module.exports = {
  getPstDate,
};

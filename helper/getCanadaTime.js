//* to get the canada time (timeZone PST)

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

const getFileName = (residentId, uploaderId) => {
  const date = new Date().toLocaleDateString("en-GB", {
    timeZone: "America/Los_Angeles",
  });
  const x = date.split("/").reverse().join("");

  let filename = residentId + "-" + x + "-" + Date.now() + "-" + uploaderId;

  return filename;
};
module.exports = {
  getPstDate,
  getFileName,
};

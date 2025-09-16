const { Parser } = require("json2csv");

const exportToCSV = (data) => {
  try {
    const json2csvParser = new Parser();
    return json2csvParser.parse(data);
  } catch (error) {
    throw new Error("Error exporting CSV");
  }
};

module.exports = exportToCSV;

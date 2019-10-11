const axios = require("axios");
const xml2js = require("xml2js");

exports.startSession = (req, res) => {
  email = "pdroalbqrq@gmail.com";
  token = "72543F4EAB734B59B09E5862573B755A";

  axios
    .post(
      `https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email=${email}&token=${token}`
    )
    .then(data => {
      let parser = new xml2js.Parser();
      response = data.data;

      parser.parseString(response, (err, result) =>
        res.status(200).send(result)
      );
    })
    .catch(error => res.status(400).send(error));
};

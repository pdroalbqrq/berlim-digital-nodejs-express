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

exports.paymentMethods = (req, res) => {
  let { amount, sessionId } = req.params;
  amount = parseFloat(Math.round(amount * 100) / 100).toFixed(2);

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1"
  };

  axios
    .get(
      `https://ws.sandbox.pagseguro.uol.com.br/payment-methods?amount=${amount}&sessionId=${sessionId}`,
      {
        headers
      }
    )
    .then(data => {
      res.status(200).send(data.data);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

exports.getCardFlag = (req, res) => {
  const { bin, sessionId } = req.params;
  console.log(req.params);

  axios
    .get(
      `https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin?tk=${sessionId}&creditCard=${bin}`
    )
    .then(data => {
      console.log(data.data);
      res.status(200).send(data.data);
    })
    .catch(error => res.status(400).send(error));
};

exports.getCardToken = (req, res) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };

  const card = ({
    sessionId,
    amount,
    cardBrand,
    cardNumber,
    cardCvv,
    cardExpirationMonth,
    cardExpirationYear
  } = req.body);

  console.log(card);

  axios
    .post(
      `https://df.uol.com.br/v2/cards?sessionId=${sessionId}&amount=0.00&cardNumber=${cardNumber}&cardBrand=${cardBrand}&cardCvv=${cardCvv}&cardExpirationMonth=${cardExpirationMonth}&cardExpirationYear=${cardExpirationYear}`,
      {
        headers
      }
    )
    .then(data => {
      console.log(data.data);
      res.status(200).send(data.data);
    })
    .catch(error => res.status(400).send(error));
};

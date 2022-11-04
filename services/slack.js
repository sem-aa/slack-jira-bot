const axios = require("axios");
require("dotenv").config();
const { SLACK_TOKEN } = process.env;
const URL_SLACK = "https://slack.com/api";

const config = {
  headers: {
    Authorization: `Bearer ${SLACK_TOKEN}`,
    "Content-type": "application/json",
  },
};

const sendMessageToChanel = async (chanelId, message) => {
  axios
    .post(
      `${URL_SLACK}/chat.postMessage`,
      {
        channel: chanelId,
        text: message,
      },
      config
    )
    .then(console.log)
    .catch(console.log);
    return "success"
};

module.exports = {sendMessageToChanel}

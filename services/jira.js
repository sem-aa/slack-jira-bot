const fetch = require("node-fetch");
require("dotenv").config();
const { JIRA_EMAIL, JIRA_TOKEN, JIRA_HOST } = process.env;

const headers = {
  Authorization: `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString(
    "base64"
  )}`,
  Accept: "application/json",
  "Content-Type": "application/json",
};

const addCommentToJira = async (issue, message) => {
  const bodyData = {
    visibility: {
      value: "Administrators",
    },
    body: {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              text: message,
              type: "text",
            },
          ],
        },
      ],
    },
  };
  try {
    const response = await fetch(
      `${JIRA_HOST}/rest/api/3/issue/${issue}/comment`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(bodyData),
      }
    )

    if (response.status === 404) {
      return 'Not Found'
    }
    await response.text();
    return "success"
  } catch (error) {
    console.log(error);
  }
};

const getNameProjects = async () => {
  try {
    const response = await fetch(`${JIRA_HOST}/rest/api/3/project`, {
      method: "GET",
      headers,
    });
    const jsonProjects = await response.text();
    const objProjects = JSON.parse(jsonProjects);
    const arrKeysProjects = objProjects.reduce((allName, project) => {
      allName.push(project.key);
      return allName;
    }, []);
    return arrKeysProjects;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addCommentToJira,
  getNameProjects,
};

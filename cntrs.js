const { addCommentToJira, getNameProjects } = require("./services/jira");
const { sendMessageToChanel } = require("./services/slack");

const checkTaskAndAddComment = async (req, res, next) => {
  try {
    const data = req.body;
    const allKeys = await getNameProjects();
    const message = data.event.text;
    const arrWords = message.replace(/[\.,%]/g, '').trim().split(" ");
    console.log(arrWords);

    for (key of allKeys) {
      const tasks = arrWords.filter((word) => word.includes(key));
      if (tasks.length) {
        tasks.map(async (task) => {
          console.log("task", task);
          const response = await addCommentToJira(task, message);
          if (response === "Not Found") {
            const chanelId = data.event.channel;
            const messageNoTask = `task with key ${task.toLowerCase()} does not exist `;
            await sendMessageToChanel(chanelId, messageNoTask);
          }
        });
      }
    }
    return res.status(200).json({ message: "add comment" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = { checkTaskAndAddComment };

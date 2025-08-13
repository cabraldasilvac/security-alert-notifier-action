// Importa as bibliotecas necessárias
const core = require("@actions/core");
const github = require("@actions/github");
const { WebClient } = require("@slack/web-api");

async function run() {
  try {
    // 1. Obter as entradas (inputs) definidas no action.yml
    const channelId = core.getInput("slack-channel-id", { required: true });
    const message = core.getInput("slack-message", { required: true });
    const slackToken = process.env.SLACK_BOT_TOKEN; // Obtém o token do ambiente

    if (!slackToken) {
      throw new Error(
        "SLACK_BOT_TOKEN is not set. Please add it to your secrets.",
      );
    }

    // 2. Inicializar o cliente do Slack
    const slack = new WebClient(slackToken);

    // 3. Obter o contexto do repositório para uma mensagem mais rica (opcional)
    const repoName = github.context.repo.repo;
    const richMessage = `🚨 *Security Alert in ${repoName}*\n\n${message}`;

    // 4. Enviar a mensagem para o Slack
    const result = await slack.chat.postMessage({
      channel: channelId,
      text: richMessage,
    });

    core.setOutput("message-id", result.ts);
    console.log(
      `Successfully sent message ${result.ts} to channel ${channelId}`,
    );
  } catch (error) {
    // Se algo der errado, falha o workflow
    core.setFailed(error.message);
  }
}

run();

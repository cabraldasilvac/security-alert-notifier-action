# Security Alert Notifier Action

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Esta GitHub Action monitora eventos de segurança (ou qualquer outro evento de workflow) e envia uma notificação customizável para um canal do Slack.

## Por que usar?

Automatize suas notificações de segurança para que sua equipe possa agir rapidamente sobre alertas do Dependabot, varreduras do CodeQL ou qualquer outra pendência de segurança.

## Entradas (Inputs)

| Nome               | Descrição                                                                        | Requerido | Padrão |
| ------------------ | -------------------------------------------------------------------------------- | --------- | ------ |
| `slack-channel-id` | O ID do canal do Slack (ex: `C1234567890`) para onde a notificação será enviada. | `true`    | `N/A`  |
| `slack-message`    | A mensagem a ser enviada. Você pode usar variáveis de contexto do GitHub.        | `true`    | `N/A`  |

## Segredos (Secrets)

| Nome              | Descrição                                                                                              | Requerido |
| ----------------- | ------------------------------------------------------------------------------------------------------ | --------- |
| `SLACK_BOT_TOKEN` | Seu token de bot do Slack (começa com `xoxb-`). Guarde isso nos Segredos (Secrets) do seu repositório. | `true`    |

## Exemplo de Uso

Para usar esta action, adicione o seguinte passo ao seu arquivo de workflow (ex: `.github/workflows/security.yml`).

O workflow abaixo será acionado sempre que um alerta do Dependabot for criado e enviará uma notificação para o Slack.

```yaml
name: Security Alert Workflow

on:
  dependabot_alert:
    types: [created, reopened]

jobs:
  notify-team:
    runs-on: ubuntu-latest
    steps:
      - name: Send Slack Notification on Security Alert
        uses: seu-usuario/security-alert-notifier-action@v1 # <-- Use sua Action aqui!
        with:
          slack-channel-id: "C1234567890" # Substitua pelo ID do seu canal
          slack-message: "Novo alerta do Dependabot para a dependência `${{ github.event.alert.dependency.package.name }}`. Severidade: `${{ github.event.alert.severity }}`."
        env:
          SLACK_BOT_TOKEN: ${{ secrets.YOUR_SLACK_BOT_TOKEN }}
```

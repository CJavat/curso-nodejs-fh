import { envs } from "../../config";


export class DiscordService {
  private readonly discordWebhookUrl = envs.DISCROD_WEBHOOK_URL;

  constructor(){}

  async notify( message: string ) {
    const body = {
      content: message,
      embeds: [
        {
          image: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTJ4czB3ZGp3NDNxaGJ4bWJyaGwzdDBxMnd6OGJ2a3I0YjVlbmR5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WiM5K1e9MtEic/giphy.gif' }
        }
      ]
    }

    const resp = await fetch(this.discordWebhookUrl, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( body )
    });

    if( !resp.ok ) {
      console.log(" Error sending message to discord");
      return false;
    }

    return true;
  }

}
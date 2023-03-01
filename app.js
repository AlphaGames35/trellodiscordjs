const Trello = require('trello');
const Discord = require('discord.js');
const cron = require('cron');

const trello = new Trello('', ''); // api, token
const client = new Discord.Client();

client.on('ready', () => {
  console.log(авторизован ${client.user.tag});
  const job = new cron.CronJob('21 23 * * *', async () => { // time
    const cards = await trello.getCardsOnBoard(''); // card id (url)
    const user = await client.users.fetch(''); // user

    cards.forEach(async card => {
      if (card.dueComplete) {
        return;
      }
      const prDate = new Date(card.due);
      prDate.setDate(prDate.getDate() - 1);
      if (prDate.toDateString() === new Date().toDateString()) {
        try {
          await user.send(Карточка "${card.name}" завтра просрочится);
        } catch (err) {
          console.error(Ошибка при отправлении, err);
        }
      }
    });
  });
  job.start();
});

client.login('');

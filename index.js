const request = require("request");
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "783353878:AAFvV6RnJV7QMK-vsLZyFWsEYXDaFh-Jj7M";
const botOptions = {
  polling: true,
  webHook: {
    port: process.env.PORT
  }
};

const opts = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{ text: "Показать курсы валют" }],
      [{ text: "Купить $" }, { text: "Купить €" }, { text: "Купить ₽" }],
      [{ text: "Продать $" }, { text: "Продать €" }, { text: "Продать ₽" }]
    ],
    one_time_keyboard: true,
    resize_keyboard: true
  })
};

const url = process.env.APP_URL || "https://varus-test-app.herokuapp.com:443";

const bot = new TelegramBot(TOKEN, botOptions);
bot.setWebHook(`${url}/bot${TOKEN}`);

bot.on("text", function(msg) {
  const messageChatId = msg.chat.id;
  const messageText = msg.text;
  const startPhoto = "./img/start.jpeg";
  const currencyPhoto = "./img/currency.jpg";
  const url =
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

  const hi = `Доброго времени суток, ${
    msg.from.first_name
  }. Данный бот позволяет проводить конвертацию валют`;

  const enterCurr = [
    "Введите сумму в UAH",
    "Введите сумму в USD",
    "Введите сумму в EURO",
    "Введите сумму в RUB"
  ];

  if (messageText === "/start") {
    bot.sendPhoto(messageChatId, startPhoto, {
      caption: hi,
      reply_markup: opts.reply_markup
    });
  }

  if (messageText === "Показать курсы валют") {
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        const msg = `
            USD: Покупка ${data[0].buy} / Продажа ${
          data[0].sale
        } \nEUR: Покупка ${data[1].buy} / Продажа ${
          data[1].sale
        }\nRUR: Покупка ${data[2].buy} / Продажа ${data[2].sale}  
            
            `;

        bot.sendPhoto(messageChatId, currencyPhoto, { caption: msg });
      }
    });
  }

  //USD
  const BUSD = () => {
    if (messageText === "Купить $") {
      bot.sendMessage(messageChatId, enterCurr[0]).then(payload => {
        const fixTwice = () => {
          bot.once("message", msg => {
            request(url, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                const newMsg = msg.text.replace(/\s+/g, "").replace(/\D+/g, "");
                const num = parseInt(newMsg);
                const summ = num / data[0].sale;

                if (isNaN(num)) {
                  bot.sendMessage(
                    messageChatId,
                    `Неверный формат. ${
                      msg.from.first_name
                    }, введите, пожалуйста, число`
                  );
                  fixTwice();
                } else {
                  bot.sendMessage(
                    messageChatId,
                    `${msg.from.first_name}, Вы можете купить ${summ.toFixed(
                      2
                    )} USD`
                  );
                }
              }
            });
          });
        };
        fixTwice();
      });
    }
  };

  BUSD();

  const SUSD = () => {
    if (messageText === "Продать $") {
      bot.sendMessage(messageChatId, enterCurr[1]).then(payload => {
        const fixTwice = () => {
          bot.once("message", msg => {
            request(url, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                const newMsg = msg.text.replace(/\s+/g, "").replace(/\D+/g, "");
                const num = parseInt(newMsg);
                const summ = num * data[0].buy;

                if (isNaN(num)) {
                  bot.sendMessage(
                    messageChatId,
                    `Неверный формат. ${
                      msg.from.first_name
                    }, введите, пожалуйста, число`
                  );
                  fixTwice();
                } else {
                  bot.sendMessage(
                    messageChatId,
                    `${msg.from.first_name}, Вы можете купить ${summ.toFixed(
                      2
                    )} UAH`
                  );
                }
              }
            });
          });
        };
        fixTwice();
      });
    }
  };

  SUSD();

  //EURO
  const BEUR = () => {
    if (messageText === "Купить €") {
      bot.sendMessage(messageChatId, enterCurr[0]).then(payload => {
        const fixTwice = () => {
          bot.once("message", msg => {
            request(url, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                const newMsg = msg.text.replace(/\s+/g, "").replace(/\D+/g, "");
                const num = parseInt(newMsg);
                const summ = num / data[1].sale;

                if (isNaN(num)) {
                  bot.sendMessage(
                    messageChatId,
                    `Неверный формат. ${
                      msg.from.first_name
                    }, введите, пожалуйста, число`
                  );
                  fixTwice();
                } else {
                  bot.sendMessage(
                    messageChatId,
                    `${msg.from.first_name}, Вы можете купить ${summ.toFixed(
                      2
                    )} EUR`
                  );
                }
              }
            });
          });
        };
        fixTwice();
      });
    }
  };

  BEUR();

  const SEUR = () => {
    if (messageText === "Продать €") {
      bot.sendMessage(messageChatId, enterCurr[2]).then(payload => {
        const fixTwice = () => {
          bot.once("message", msg => {
            request(url, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                const newMsg = msg.text.replace(/\s+/g, "").replace(/\D+/g, "");
                const num = parseInt(newMsg);
                const summ = num * data[1].buy;

                if (isNaN(num)) {
                  bot.sendMessage(
                    messageChatId,
                    `Неверный формат. ${
                      msg.from.first_name
                    }, введите, пожалуйста, число`
                  );
                  fixTwice();
                } else {
                  bot.sendMessage(
                    messageChatId,
                    `${msg.from.first_name}, Вы можете купить ${summ.toFixed(
                      2
                    )} UAH`
                  );
                }
              }
            });
          });
        };
        fixTwice();
      });
    }
  };

  SEUR();

  //RUB
  const BRUB = () => {
    if (messageText === "Купить ₽") {
      bot.sendMessage(messageChatId, enterCurr[0]).then(payload => {
        const fixTwice = () => {
          bot.once("message", msg => {
            request(url, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                const newMsg = msg.text.replace(/\s+/g, "").replace(/\D+/g, "");
                const num = parseInt(newMsg);
                const summ = num / data[2].sale;

                if (isNaN(num)) {
                  bot.sendMessage(
                    messageChatId,
                    `Неверный формат. ${
                      msg.from.first_name
                    }, введите, пожалуйста, число`
                  );
                  fixTwice();
                } else {
                  bot.sendMessage(
                    messageChatId,
                    `${msg.from.first_name}, Вы можете купить ${summ.toFixed(
                      2
                    )} RUB`
                  );
                }
              }
            });
          });
        };
        fixTwice();
      });
    }
  };

  BRUB();

  const SRUB = () => {
    if (messageText === "Продать ₽") {
      bot.sendMessage(messageChatId, enterCurr[3]).then(payload => {
        const fixTwice = () => {
          bot.once("message", msg => {
            request(url, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                const newMsg = msg.text.replace(/\s+/g, "").replace(/\D+/g, "");
                const num = parseInt(newMsg);
                const summ = num * data[2].buy;

                if (isNaN(num)) {
                  bot.sendMessage(
                    messageChatId,
                    `Неверный формат. ${
                      msg.from.first_name
                    }, введите, пожалуйста, число`
                  );
                  fixTwice();
                } else {
                  bot.sendMessage(
                    messageChatId,
                    `${msg.from.first_name}, Вы можете купить ${summ.toFixed(
                      2
                    )} UAH`
                  );
                }
              }
            });
          });
        };
        fixTwice();
      });
    }
  };

  SRUB();
});

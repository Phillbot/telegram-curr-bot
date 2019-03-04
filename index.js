const request = require("request");
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "783353878:AAFvV6RnJV7QMK-vsLZyFWsEYXDaFh-Jj7M";
const botOptions = { polling: true };

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

const bot = new TelegramBot(TOKEN, botOptions);

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
        bot.once("message", msg => {
          request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
              const data = JSON.parse(body);
              const num = parseInt(msg.text);
              const summ = num / data[0].sale;

              if (isNaN(num)) {
                bot.sendMessage(messageChatId, "Неверный формат");
                BUSD();
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
      });
    }
  };

  BUSD();

  const SUSD = () => {
    if (messageText === "Продать $") {
      bot.sendMessage(messageChatId, enterCurr[1]).then(payload => {
        bot.once("message", msg => {
          request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
              const data = JSON.parse(body);
              const num = parseInt(msg.text);
              const summ = num * data[0].buy;

              if (isNaN(num)) {
                bot.sendMessage(messageChatId, "Неверный формат");
                SUSD();
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
      });
    }
  };

  SUSD();

  //EURO
  const BEUR = () => {
    if (messageText === "Купить €") {
      bot.sendMessage(messageChatId, enterCurr[0]).then(payload => {
        bot.once("message", msg => {
          request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
              const data = JSON.parse(body);
              const num = parseInt(msg.text);
              const summ = num / data[1].sale;

              if (isNaN(num)) {
                bot.sendMessage(messageChatId, "Неверный формат");
                BEUR();
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
      });
    }
  };

  BEUR();

  const SEUR = () => {
    if (messageText === "Продать €") {
      bot.sendMessage(messageChatId, enterCurr[2]).then(payload => {
        bot.once("message", msg => {
          request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
              const data = JSON.parse(body);
              const num = parseInt(msg.text);
              const summ = num * data[1].buy;

              if (isNaN(num)) {
                bot.sendMessage(messageChatId, "Неверный формат");
                SEUR();
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
      });
    }
  };

  SEUR();

  //RUB
  const BRUB = () => {
    if (messageText === "Купить ₽") {
      bot.sendMessage(messageChatId, enterCurr[0]).then(payload => {
        bot.once("message", msg => {
          request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
              const data = JSON.parse(body);
              const num = parseInt(msg.text);
              const summ = num / data[2].sale;

              if (isNaN(num)) {
                bot.sendMessage(messageChatId, "Неверный формат");
                BRUB();
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
      });
    }
  };

  BRUB();

  const SRUB = () => {
    if (messageText === "Продать ₽") {
      bot.sendMessage(messageChatId, enterCurr[3]).then(payload => {
        bot.once("message", msg => {
          request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
              const data = JSON.parse(body);
              const num = parseInt(msg.text);
              const summ = num * data[2].buy;

              if (isNaN(num)) {
                bot.sendMessage(messageChatId, "Неверный формат");
                SRUB();
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
      });
    }
  };

  SRUB();
});

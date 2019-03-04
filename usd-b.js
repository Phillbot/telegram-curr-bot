var myFunc = function() {
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
}

module.exports.myFunc = myFunc;
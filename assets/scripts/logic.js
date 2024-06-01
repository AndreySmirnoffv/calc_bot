
async function askDetails(bot, msg) {
  try {
    await bot.sendMessage(msg.chat.id, "Укажите адрес");
    const address = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Количество этажей");
    const floors = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Укажите периметр");
    const perimeter = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Укажите высоту стен гипс");
    const wallHeight = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Укажите высоту стен ЦПС");
    const wallHeightCps = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Укажите ширину стен гипс");
    const wallWidth = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Укажите ширину стен ЦПС");
    const wallWidthCps = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Укажите ширину откосов");
    const otkosWidth = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Укажите высоту откосов");
    const otkosHeight = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Какую желаете штукатурку, цементную или гипсовую");
    const stuk = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Укажите ширину окна");
    const windowWidth = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Укажите высоту окна");
    const windowHeight = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Вам нужна штукатурка откосов? (да/нет)");
    const stukOtk = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Вам нужна штукатурка с 4 сторон? (да/нет)");
    const fourStuk = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Укажите площадь проемов");
    const proem = await waitForText(bot, msg.from.username);

    await bot.sendMessage(msg.chat.id, "Укажите погонные метры");
    const pogon = await waitForText(bot, msg.from.username);

    const layerThickness = 2;
    const consumptionPerSquareMeter = (layerThickness === 2) ? 27 : 0;
    const totalConsumption = (parseInt(wallHeightCps) * parseInt(wallWidthCps)) * consumptionPerSquareMeter;
    const bagsNeeded = Math.ceil(totalConsumption / 30);

    await bot.sendMessage(msg.chat.id, `Адрес: ${JSON.stringify(address.text)}\nКол.во Этажей: ${parseInt(floors.text)}\nОбщая площадь стен, откосов, погонных метров: ${parseInt(perimeter.text) * parseInt(wallHeight.text)}\nСтены гипс: ${parseInt(wallHeight.text) * parseInt(wallWidth.text)}\nОткосы гипс: ${parseInt(otkosHeight.text) * parseInt(otkosWidth.text)}\nПроемы: ${parseInt(proem.text)}\nЦПС: ${bagsNeeded.text}\nОткосы и погонаж гипс: ${parseInt(wallWidth.text) * 0.4 * 18}\nОткосы погонаж ЦПС: ${parseInt(wallWidthCps.text) * 0.4 * 27}\nМаяки: ${1 * 0.6}\nМаяки: ${(parseInt(Math.ceil(otkosWidth.text + pogon.text))) / 3}\n${parseInt(windowHeight.text * windowWidth.text)}\nШтукатурка: ${stuk}\nШтукатурка откосов: ${stukOtk.text}\nШтукатурка с 4 сторон: ${fourStuk.text}`);
  } catch (error) {
    console.log(error);
  }
}

async function waitForText(bot, chatId) {
  return new Promise((resolve) => {
    bot.onText(/.*/, (msg) => {
      if (msg.from.username === chatId) {
        resolve(msg);
        console.log(msg.text)
      }
    });
  });
}

module.exports = {
  askDetails: askDetails
}
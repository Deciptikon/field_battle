import { checkAds, showAds } from "../../adsManager.js";
import { baseScreen } from "./baseScreen.js";
import { ButtonColored } from "../../utils/buttonColored.js";
import { STATE_BUTTON } from "../../utils/constants.js";
import { createTextForButton, RGB } from "../../utils/utils.js";

export class adsScreen extends baseScreen {
  constructor(imageAssets, soundAssets, options, params, toScreen) {
    super(imageAssets, soundAssets, options, params, toScreen);
    this.titleScreen = "Бонусы";
  }

  init() {
    this.addButton(
      "bttShowAds",
      new ButtonColored(
        () => {
          console.log(`Запускаем рекламу ...`);
          showAds(() => {
            console.log(`Посмотрели ...`);
            this.options.incrementAdsStats_Count();
            const inc = this.options.getAdsStats_MoneyForView();
            this.options.incrementGameResource_Money(inc);
            this.options.resaveOptions(); // сохоаняем прогресс
          });
        },
        {
          x: (this.w - 400) / 2,
          y: (this.h - 150) / 2,
          w: 400,
          h: 150,
          rgba: {
            [STATE_BUTTON.NONE]: {
              rgb: RGB(200, 200, 0),
              a: 1.0,
            },
            [STATE_BUTTON.DOWN]: {
              rgb: RGB(100, 100, 0),
              a: 1.0,
            },
            [STATE_BUTTON.UP]: {
              rgb: RGB(250, 250, 250),
              a: 1.0,
            },
          },
          text: createTextForButton("Смотреть"),
        }
      )
    );
    super.init();
  }

  restate() {
    checkAds(() => {
      console.log("Реклама есть");
    });
    super.restate();
  }

  update(touch, stateApp) {
    super.update(touch, stateApp);
  }

  render(ctx) {
    super.render(ctx);
  }
}

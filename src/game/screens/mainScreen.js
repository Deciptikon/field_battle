import { isEmpty } from "../../utils/utils.js";
import { Button } from "../../utils/button.js";

import { setData, getData, getKeys } from "../../saveLoadManager.js";

export class mainScreen {
  constructor(imageAssets, soundAssets, model, options, params, toScreen) {
    //
    this.model = model;
    this.options = options;

    this.x = params.x;
    this.y = params.y;
    this.w = params.w;
    this.h = params.h;

    this.bridge = params.bridge;

    this.background = null;
    this.imageAssets = imageAssets;
    this.soundAssets = soundAssets;

    this.soundPlay = false;

    this.listObjects = [];
    this.listObjects.push(
      new Button(
        function () {
          console.log(`читаем все ключи ...`);

          getKeys(0, 20, params.bridge)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });

          console.log(`записываем данные ...`);
          setData("test_key_from_init", "00--00--==--00--00", params.bridge)
            .then((result) => {
              console.log(result);
              console.log(`result = ${result}`);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        {
          x: 500,
          y: 200,
          w: 300,
          h: 100,
        }
      )
    );
    this.listObjects.push(
      new Button(
        function () {
          console.log(`to options`);
          toScreen("optionsScreen");
        },
        {
          x: 500,
          y: 350,
          w: 300,
          h: 100,
        }
      )
    );
  }

  init() {
    this.background = this.imageAssets.get("menu_background");

    //this.listObjects.forEach((obj) => {
    //obj.init();
    //});
    const key = "test_key_from_init";
    console.log(`запрос данных`);
    getData([key], this.bridge)
      .then((data) => {
        console.log(data);
        console.log(`getData = ${data[key]}`);
      })
      .catch((err) => {
        //
      });
  }

  update(touch, stateApp) {
    //this.imageAssets.get("test_anima")?.update();

    if (!this.soundPlay) {
      this.soundAssets.playSound("main_theme");
      this.soundPlay = true;
    }

    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.update(touch);
      });
    }
  }

  render(ctx) {
    //console.log("menuScreen.render");
    ctx.save();

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, this.w, this.h);

    const h_bg = this.background.height;
    const w_bg = this.background.width;

    const k = this.h / h_bg;

    ctx.drawImage(
      this.background,
      (this.w - w_bg * k) / 2,
      0,
      w_bg * k,
      h_bg * k
    );

    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.render(ctx);
      });
    }

    //this.imageAssets.get("test_anima")?.draw(ctx, 0, 0);

    //const fr = this.imageAssets.get("test_anima").getCurrentFrame();
    //ctx.drawImage(fr, 0, 0, fr.width, fr.height);

    ctx.restore();
  }
}

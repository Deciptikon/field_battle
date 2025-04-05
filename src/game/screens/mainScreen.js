import { isEmpty, RGB, A } from "../../utils/utils.js";
import { Button } from "../../utils/button.js";
import { ButtonColored } from "../../utils/buttonColored.js";
import { ButtonColoredAnimation } from "../../utils/buttonColoredAnimation.js";
import {
  STATE_BUTTON,
  LEFT_BORDER_FOR_CLOUD_IN_MENU,
  RIGHT_BORDER_FOR_CLOUD_IN_MENU,
} from "../../utils/constants.js";
import { SceneAnimation } from "../../utils/scene_animation/scene_animation.js";
import { ObjectScene } from "../../utils/scene_animation/objectScene.js";

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

    this.scene = new SceneAnimation({});

    this.listObjects = [];
    this.listObjects.push(
      new ButtonColored(
        function () {
          console.log(`читаем все ключи ...`);
        },
        {
          x: 100,
          y: 200,
          w: 400,
          h: 125,
          rgba: {
            [STATE_BUTTON.NONE]: {
              rgb: RGB(200, 0, 0),
              a: 1.0,
            },
            [STATE_BUTTON.DOWN]: {
              rgb: RGB(100, 0, 0),
              a: 1.0,
            },
            [STATE_BUTTON.UP]: {
              rgb: RGB(250, 250, 250),
              a: 1.0,
            },
          },
          text: {
            fillStyle: "#FFFFFF",
            font: "Arial",
            fontSize: 50,
            isItalic: false,
            isBold: true,
            text: "Играть",
            shiftY: -25,
          },
        }
      )
    );

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
        },
        {
          x: 100,
          y: 350,
          w: 300,
          h: 100,
          rgb: RGB(50, 200, 50),
          //a: A(0.2, 0.1, 0.0),
          text: {
            fillStyle: "#FFFFFF",
            font: "Arial",
            fontSize: 50,
            isItalic: false,
            isBold: true,
            text: "Развитие",
            shiftY: -25,
          },
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
          x: 100,
          y: 500,
          w: 300,
          h: 100,
          rgb: RGB(200, 0, 200),
          //a: A(0.2, 0.1, 0.0),
          text: {
            fillStyle: "#FFFFFF",
            font: "Arial",
            fontSize: 50,
            isItalic: false,
            isBold: true,
            text: "Опции",
            shiftY: -25,
          },
        }
      )
    );

    this.listObjects.push(
      new ButtonColoredAnimation(
        function () {
          console.log(`Colored...`);
        },
        {
          x: 100,
          y: 650,
          w: 300,
          h: 100,
          text: {
            fillStyle: "#FFFFFF",
            font: "Arial",
            fontSize: 50,
            isItalic: false,
            isBold: true,
            text: "О игре",
            shiftY: -25,
          },
        }
      )
    );
  }

  init() {
    //this.background = this.imageAssets.get("menu_background");
    this.scene.addObject(
      new ObjectScene(
        {
          x: 0,
          y: 0,
          w: this.w,
          h: this.h,
          img: this.imageAssets.get("menu_bg_grad"),
        },
        function () {
          //this.x++;
        }
      )
    );
    this.scene.addObject(
      new ObjectScene(
        {
          x: this.w * 0.5,
          y: this.h * 0.1,
          w: this.w * 0.2,
          h: this.h * 0.1,
          img: this.imageAssets.get("menu_bg_cloud_1"),
        },
        function () {
          this.x -= 1;
          if (this.x < LEFT_BORDER_FOR_CLOUD_IN_MENU)
            this.x = RIGHT_BORDER_FOR_CLOUD_IN_MENU;
        }
      )
    );
    this.scene.addObject(
      new ObjectScene(
        {
          x: this.w * 0.25,
          y: this.h * 0.35,
          w: this.w * 0.2,
          h: this.h * 0.1,
          img: this.imageAssets.get("menu_bg_cloud_1"),
        },
        function () {
          this.x -= 1.2;
          if (this.x < LEFT_BORDER_FOR_CLOUD_IN_MENU)
            this.x = RIGHT_BORDER_FOR_CLOUD_IN_MENU;
        }
      )
    );
    this.scene.addObject(
      new ObjectScene(
        {
          x: this.w * 0.85,
          y: this.h * 0.35,
          w: this.w * 0.2,
          h: this.h * 0.1,
          img: this.imageAssets.get("menu_bg_cloud_1"),
        },
        function () {
          this.x -= 1.2;
          if (this.x < LEFT_BORDER_FOR_CLOUD_IN_MENU)
            this.x = RIGHT_BORDER_FOR_CLOUD_IN_MENU;
        }
      )
    );

    this.scene.addObject(
      new ObjectScene(
        {
          x: -800,
          y: this.h * 0.35,
          w: this.w * 0.2,
          h: this.h * 0.1,
          img: this.imageAssets.get("menu_bg_cloud_1"),
        },
        function () {
          this.x -= 1.2;
          if (this.x < LEFT_BORDER_FOR_CLOUD_IN_MENU)
            this.x = RIGHT_BORDER_FOR_CLOUD_IN_MENU;
        }
      )
    );

    this.scene.addObject(
      new ObjectScene(
        {
          x: this.w * 0.95,
          y: this.h * 0.55,
          w: this.w * 0.1,
          h: this.h * 0.05,
          img: this.imageAssets.get("menu_bg_cloud_4"),
        },
        function () {
          this.x -= 2;
          if (this.x < LEFT_BORDER_FOR_CLOUD_IN_MENU)
            this.x = RIGHT_BORDER_FOR_CLOUD_IN_MENU;
        }
      )
    );

    this.scene.addObject(
      new ObjectScene(
        {
          x: this.w * 0.15,
          y: this.h * 0.65,
          w: this.w * 0.1,
          h: this.h * 0.05,
          img: this.imageAssets.get("menu_bg_cloud_4"),
        },
        function () {
          this.x -= 1.8;
          if (this.x < LEFT_BORDER_FOR_CLOUD_IN_MENU)
            this.x = RIGHT_BORDER_FOR_CLOUD_IN_MENU;
        }
      )
    );

    this.scene.addObject(
      new ObjectScene(
        {
          x: this.w * 0.5,
          y: this.h * 0.1,
          w: this.w * 0.75,
          h: this.h * 0.8,
          img: this.imageAssets.get("menu_bg_castle"),
        },
        function () {
          //this.x++;
        }
      )
    );

    this.scene.addObject(
      new ObjectScene(
        {
          x: this.w * 0.75,
          y: this.h * 0.15,
          w: this.w * 0.25,
          h: this.h * 0.15,
          img: this.imageAssets.get("menu_bg_cloud_2"),
        },
        function () {
          this.x -= 0.2;
          if (this.x < LEFT_BORDER_FOR_CLOUD_IN_MENU)
            this.x = RIGHT_BORDER_FOR_CLOUD_IN_MENU;
        }
      )
    );

    this.scene.addObject(
      new ObjectScene(
        {
          x: RIGHT_BORDER_FOR_CLOUD_IN_MENU,
          y: this.h * 0.2,
          w: this.w * 0.25,
          h: this.h * 0.15,
          img: this.imageAssets.get("menu_bg_cloud_2"),
        },
        function () {
          this.x -= 0.2;
          if (this.x < LEFT_BORDER_FOR_CLOUD_IN_MENU)
            this.x = RIGHT_BORDER_FOR_CLOUD_IN_MENU;
        }
      )
    );

    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.init();
      });
    }

    this.options.updateLoginStats();
    this.options.resaveOptions();
  }

  update(touch, stateApp) {
    //this.imageAssets.get("test_anima")?.update();
    this.scene.update(touch, stateApp);

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

    this.scene.draw(ctx);

    /*const h_bg = this.background.height;
    const w_bg = this.background.width;

    const k = this.h / h_bg;

    ctx.drawImage(
      this.background,
      (this.w - w_bg * k) / 2,
      0,
      w_bg * k,
      h_bg * k
    );*/

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

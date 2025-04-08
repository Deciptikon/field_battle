import { RGB, createTextForButton } from "../../utils/utils.js";
import { Button } from "../../utils/button.js";
import { ButtonColored } from "../../utils/buttonColored.js";

import {
  COLORS,
  STATE_BUTTON,
  LEFT_BORDER_FOR_CLOUD_IN_MENU,
  RIGHT_BORDER_FOR_CLOUD_IN_MENU,
  X_CORD_BTT_IN_MENU,
  W_BTT_IN_MENU,
  H_BTT_IN_MENU,
} from "../../utils/constants.js";

import { SceneAnimation } from "../../utils/scene_animation/scene_animation.js";
import { ObjectScene } from "../../utils/scene_animation/objectScene.js";

import { ResourceLabel } from "../../utils/resource_bar/resourceLabel.js";
import { ResourceBar } from "../../utils/resource_bar/resourceBar.js";

import { checkAds } from "../../adsManager.js";

export class mainScreen {
  constructor(imageAssets, soundAssets, options, params, toScreen) {
    //
    this.options = options;

    this.x = params.x;
    this.y = params.y;
    this.w = params.w;
    this.h = params.h;

    this.bridge = params.bridge;
    this.toScreen = toScreen;

    this.background = null;
    this.imageAssets = imageAssets;
    this.soundAssets = soundAssets;

    this.soundPlay = false;

    this.scene = new SceneAnimation({});
    this.resBar = new ResourceBar(
      0,
      0,
      this.w,
      100,
      COLORS.BACKGROUND_INTERFACE_ELEMENTS
    );

    this.listObjects = {};
    this.listButtons = {};
  }

  addObject(key, obj) {
    this.listObjects[key] = obj;
  }

  addButton(key, obj) {
    this.listButtons[key] = obj;
  }

  init() {
    const toScreen = this.toScreen;

    this.addButton(
      "bttStartGame",
      new ButtonColored(
        function () {
          //this.soundAssets.playSound("");
          //options.setGameResource_Money(options.getGameResource_Money() + 10);
          //console.log(`Money = ${options.getGameResource_Money()}`);
          toScreen("battleScreen");
        },
        {
          x: X_CORD_BTT_IN_MENU,
          y: 180,
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
          text: createTextForButton("Играть"),
        }
      )
    );

    this.addButton(
      "bttUpgrade",
      new Button(
        function () {
          toScreen("upgradeScreen");
        },
        {
          x: X_CORD_BTT_IN_MENU,
          y: 350,
          w: W_BTT_IN_MENU,
          h: H_BTT_IN_MENU,
          rgb: RGB(50, 200, 50),
          //a: A(0.2, 0.1, 0.0),
          text: createTextForButton("Развитие"),
        }
      )
    );

    this.addButton(
      "bttOptions",
      new Button(
        function () {
          console.log(`to options`);
          toScreen("optionsScreen");
        },
        {
          x: X_CORD_BTT_IN_MENU,
          y: 500,
          w: W_BTT_IN_MENU,
          h: H_BTT_IN_MENU,
          rgb: RGB(200, 0, 200),
          //a: A(0.2, 0.1, 0.0),
          text: createTextForButton("Опции"),
        }
      )
    );
    this.addButton(
      "bttAbout",
      new ButtonColored(
        function () {
          console.log(`about ...`);
          toScreen("aboutScreen");
        },
        {
          x: X_CORD_BTT_IN_MENU,
          y: 650,
          w: W_BTT_IN_MENU,
          h: H_BTT_IN_MENU,
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
          text: createTextForButton("О игре"),
        }
      )
    );
    this.addButton(
      "bttAchievements",
      new ButtonColored(
        function () {
          console.log(`Достижения ...`);
          toScreen("achievementsScreen");
        },
        {
          x: X_CORD_BTT_IN_MENU,
          y: 800,
          w: W_BTT_IN_MENU,
          h: H_BTT_IN_MENU,
          rgba: {
            [STATE_BUTTON.NONE]: {
              rgb: RGB(0, 0, 200),
              a: 1.0,
            },
            [STATE_BUTTON.DOWN]: {
              rgb: RGB(0, 0, 100),
              a: 1.0,
            },
            [STATE_BUTTON.UP]: {
              rgb: RGB(250, 250, 250),
              a: 1.0,
            },
          },
          text: createTextForButton("Достижения"),
        }
      )
    );
    this.addButton(
      "bttAds",
      new ButtonColored(
        function () {
          toScreen("adsScreen");
        },
        {
          x: this.w - 220,
          y: 180,
          w: 200,
          h: 200,
          rgba: {
            [STATE_BUTTON.NONE]: {
              rgb: RGB(0, 200, 200),
              a: 1.0,
            },
            [STATE_BUTTON.DOWN]: {
              rgb: RGB(0, 100, 100),
              a: 1.0,
            },
            [STATE_BUTTON.UP]: {
              rgb: RGB(250, 250, 250),
              a: 1.0,
            },
          },
          text: createTextForButton("$"),
        }
      )
    );
    this.addButton(
      "bttDaily",
      new ButtonColored(
        function () {
          console.log(`Дэйлики ...`);
          toScreen("dailyScreen");
        },
        {
          x: this.w - 220,
          y: 400,
          w: 200,
          h: 200,
          rgba: {
            [STATE_BUTTON.NONE]: {
              rgb: RGB(200, 0, 200),
              a: 1.0,
            },
            [STATE_BUTTON.DOWN]: {
              rgb: RGB(100, 0, 100),
              a: 1.0,
            },
            [STATE_BUTTON.UP]: {
              rgb: RGB(250, 250, 250),
              a: 1.0,
            },
          },
          text: createTextForButton("events"),
        }
      )
    );

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
          x: this.w * 0.43,
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

    const options = this.options;
    const rb_p = 800;
    const rb_w = 300;
    const rb_h = 100;
    const rb_s = 100;
    this.resBar.addObject(
      "icon_money",
      new ResourceLabel(
        rb_p,
        0,
        rb_w,
        rb_h,
        this.imageAssets.get("icon_money"),
        function () {
          this.text.text = `${options.getGameResource_Money()}`;
        }
      )
    );
    this.resBar.addObject(
      "icon_crystall",
      new ResourceLabel(
        rb_p + rb_w + rb_s,
        0,
        rb_w,
        rb_h,
        this.imageAssets.get("icon_crystall"),
        function () {
          this.text.text = `${options.getGameResource_Crystall()}`;
        }
      )
    );

    for (let key in this.listObjects) {
      this.listObjects[key]?.init();
    }

    const snd = () => {
      this.soundAssets.playSound("btt_click");
    };

    for (let key in this.listButtons) {
      this.listButtons[key].sound = snd;
      this.listButtons[key]?.init();
    }

    if (!this.soundPlay) {
      this.soundAssets.playSound("main_theme");
      this.soundPlay = true;
    }

    this.resBar.init();

    this.options.updateLoginStats();
    this.options.resaveOptions();

    checkAds(() => {
      console.log("Реклама есть");
    });
  }

  // сброс параметров при каждой загрузке экрана
  restate() {
    for (let key in this.listObjects) {
      this.listObjects[key]?.init();
    }
    for (let key in this.listButtons) {
      this.listButtons[key]?.init(); //restate()
    }

    if (!this.soundPlay) {
      this.soundAssets.playSound("main_theme");
      this.soundPlay = true;
    }

    this.resBar.restate();
    this.options.resaveOptions();

    checkAds(() => {
      console.log("Реклама есть");
    });
  }

  update(touch, stateApp) {
    //this.imageAssets.get("test_anima")?.update();
    this.scene.update(touch, stateApp);

    for (let key in this.listObjects) {
      this.listObjects[key]?.update(touch);
    }
    for (let key in this.listButtons) {
      this.listButtons[key]?.update(touch);
    }

    this.resBar.update(touch, stateApp);
  }

  render(ctx) {
    //console.log("menuScreen.render");
    ctx.save();

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, this.w, this.h);

    this.scene.draw(ctx);

    for (let key in this.listObjects) {
      this.listObjects[key]?.render(ctx);
    }
    for (let key in this.listButtons) {
      this.listButtons[key]?.render(ctx);
    }
    this.resBar.render(ctx);

    ctx.restore();
  }
}

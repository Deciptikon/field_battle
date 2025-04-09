import {
  STATE_APP,
  STATE_BATTLE,
  STATE_BUTTON,
} from "../../../utils/constants.js";
import { RGB, createTextForButton } from "../../../utils/utils.js";
import { ButtonColored } from "../../../utils/buttonColored.js";
import { windowPause } from "../../window/windowPause.js";

export class baseBattleScreen {
  constructor(imageAssets, soundAssets, options, params, toScreen) {
    this.options = options;

    this.x = params.x;
    this.y = params.y;
    this.w = params.w;
    this.h = params.h;
    this.toScreen = toScreen;
    this.titleScreen = null;
    this.title = null;

    this.background = null;
    this.imageAssets = imageAssets;
    this.soundAssets = soundAssets;

    this.windowPlay = null;
    this.windowPause = null;
    this.windowWellEnd = null;
    this.windowBadEnd = null;

    this.stateBattle = STATE_BATTLE.PLAY;

    this.buttonPause = null;

    this.windowPause = new windowPause(
      imageAssets,
      soundAssets,
      options,
      params,
      toScreen,
      () => {
        //console.log("RESUME");
        this.stateBattle = STATE_BATTLE.PLAY;
      }
    );

    //toScreen("mainScreen");
  }

  // первоначальная инициализация
  init() {
    this.stateBattle = STATE_BATTLE.PLAY;

    const h_btt = 100;
    const s_btt = 20;

    this.buttonPause = new ButtonColored(
      () => {
        console.log(`Pause...`);
        this.stateBattle = STATE_BATTLE.PAUSE;
      },
      {
        x: this.w - h_btt - s_btt,
        y: s_btt,
        w: h_btt,
        h: h_btt,
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
        text: createTextForButton("||"),
      }
    );

    if (this.windowPlay) this.windowPlay.init();
    if (this.windowPause) this.windowPause.init();
    if (this.windowWellEnd) this.windowWellEnd.init();
    if (this.windowBadEnd) this.windowBadEnd.init();
    this.buttonPause.init();
  }

  // сброс параметров при каждой загрузке экрана
  restate() {
    this.stateBattle = STATE_BATTLE.PLAY;

    this.soundAssets.pauseSound("main_theme");
    this.soundAssets.playSound("battle_theme");

    if (this.windowPlay) this.windowPlay.restate();
    if (this.windowPause) this.windowPause.restate();
    if (this.windowWellEnd) this.windowWellEnd.restate();
    if (this.windowBadEnd) this.windowBadEnd.restate();
    this.buttonPause;
  }

  // обновление на каждом кадре
  update(touch, stateApp) {
    console.log(stateApp);

    if (stateApp === STATE_APP.PAUSE) {
      this.stateBattle = STATE_BATTLE.PAUSE;
    }

    // Если играем/////////////////////////////////////////////////////
    if (this.stateBattle === STATE_BATTLE.PLAY) {
      if (this.windowPlay) this.windowPlay.update(touch, stateApp);
      this.buttonPause.update(touch, stateApp);

      // Если на паузе/////////////////////////////////////////////////
    } else if (this.stateBattle === STATE_BATTLE.PAUSE) {
      if (this.windowPause) this.windowPause.update(touch, stateApp);

      // Если закончили уровень////////////////////////////////////////
    } else if (this.stateBattle === STATE_BATTLE.WELL_END) {
      if (this.windowWellEnd) this.windowWellEnd.update(touch, stateApp);
    } else if (this.stateBattle === STATE_BATTLE.BAD_END) {
      if (this.windowBadEnd) this.windowBadEnd.update(touch, stateApp);
    }
  }

  // отрисовка каждого кадра
  render(ctx) {
    ctx.save();

    // Если играем/////////////////////////////////////////////////////
    if (this.stateBattle === STATE_BATTLE.PLAY) {
      if (this.windowPlay) this.windowPlay.render(ctx);
      this.buttonPause.render(ctx);

      // Если на паузе/////////////////////////////////////////////////
    } else if (this.stateBattle === STATE_BATTLE.PAUSE) {
      if (this.windowPause) this.windowPause.render(ctx);

      // Если закончили уровень////////////////////////////////////////
    } else if (this.stateBattle === STATE_BATTLE.WELL_END) {
      if (this.windowWellEnd) this.windowWellEnd.render(ctx);
    } else if (this.stateBattle === STATE_BATTLE.BAD_END) {
      if (this.windowBadEnd) this.windowBadEnd.render(ctx);
    }

    ctx.restore();
  }
}

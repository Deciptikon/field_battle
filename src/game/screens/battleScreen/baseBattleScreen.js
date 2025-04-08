import { STATE_APP, STATE_BATTLE } from "../../../utils/constants.js";

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

    this.listObjects = {};
    this.listButtons = {};

    this.stateBattle = STATE_BATTLE.PLAY;

    //toScreen("mainScreen");
  }

  addObject(key, obj) {
    this.listObjects[key] = obj;
  }

  addButton(key, obj) {
    this.listButtons[key] = obj;
  }

  // первоначальная инициализация
  init() {
    const toScreen = this.toScreen;
    this.stateBattle = STATE_BATTLE.PLAY;

    const snd = () => {
      this.soundAssets.playSound("btt_click");
    };

    for (let key in this.listObjects) {
      this.listObjects[key]?.init();
    }
    for (let key in this.listButtons) {
      this.listButtons[key]?.setSound(snd);
      this.listButtons[key]?.init();
    }
  }

  // сброс параметров при каждой загрузке экрана
  restate() {
    this.stateBattle = STATE_BATTLE.PLAY;

    for (let key in this.listObjects) {
      this.listObjects[key]?.restate();
    }
    for (let key in this.listButtons) {
      this.listButtons[key]?.restate();
    }
  }

  // обновление на каждом кадре
  update(touch, stateApp) {
    console.log(stateApp);

    if (stateApp === STATE_APP.PAUSE) {
      this.stateBattle = STATE_BATTLE.PAUSE;
    }

    // Если играем/////////////////////////////////////////////////////
    if (this.stateBattle === STATE_BATTLE.PLAY) {
      for (let key in this.listObjects) {
        this.listObjects[key]?.update(touch);
      }
      for (let key in this.listButtons) {
        this.listButtons[key]?.update(touch);
      }

      // Если на паузе/////////////////////////////////////////////////
    } else if (this.stateBattle === STATE_BATTLE.PAUSE) {
      //
      // Если закончили уровень////////////////////////////////////////
    } else if (this.stateBattle === STATE_BATTLE.WELL_END) {
      //
    } else if (this.stateBattle === STATE_BATTLE.BAD_END) {
      //
    }
  }

  // отрисовка каждого кадра
  render(ctx) {
    if (this.stateBattle === STATE_BATTLE.PLAY) {
      ctx.save();

      for (let key in this.listObjects) {
        this.listObjects[key]?.render(ctx);
      }
      for (let key in this.listButtons) {
        this.listButtons[key]?.render(ctx);
      }

      ctx.restore();
    } else if (this.stateBattle === STATE_BATTLE.PAUSE) {
      //
    } else if (this.stateBattle === STATE_BATTLE.WELL_END) {
      //
    } else if (this.stateBattle === STATE_BATTLE.BAD_END) {
      //
    }
  }
}

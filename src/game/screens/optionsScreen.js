import { isEmpty } from "../../utils/utils.js";
import { Button } from "../../utils/button.js";
import { Label } from "../../utils/label.js";
import { TYPE_SOUND } from "../../utils/constants.js";
import { baseScreen } from "./baseScreen.js";

import { IncrementDecrementControl } from "../../utils/incrementDecrementControl.js";

export class optionsScreen extends baseScreen {
  constructor(imageAssets, soundAssets, model, options, params, toScreen) {
    super(imageAssets, soundAssets, model, options, params, toScreen);
    this.titleScreen = "Настройки";

    const Y = 250; // положение по высоте
    const W = 400; // ширина
    const H = 200; // высота
    const S = 200; // отступ
    const P = (this.w - (3 * W + 2 * S)) / 2; // начальная точка по ширине

    this.listObjects.push(
      new IncrementDecrementControl(
        P,
        Y,
        W,
        H,
        "Музыка",
        () => {
          const type = TYPE_SOUND.MUSIC;
          const vol = this.options.getVolumeSound(type);
          if (vol < 1) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 + 1) * 0.1);
            this.soundAssets.replayAll();
          }
        },
        () => {
          const type = TYPE_SOUND.MUSIC;
          const vol = this.options.getVolumeSound(type);
          if (vol > 0) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 - 1) * 0.1);
            this.soundAssets.replayAll();
          }
        },
        function () {
          const type = TYPE_SOUND.MUSIC;
          const val = options.getVolumeSound(type);
          this.text.text = `${Math.floor(val * 100)}%`;
        }
      )
    );

    this.listObjects.push(
      new IncrementDecrementControl(
        P + W + S,
        Y,
        W,
        H,
        "Эффекты",
        () => {
          const type = TYPE_SOUND.EFFECT;
          const vol = this.options.getVolumeSound(type);
          if (vol < 1) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 + 1) * 0.1);
            this.soundAssets.replayAll();
          }
        },
        () => {
          const type = TYPE_SOUND.EFFECT;
          const vol = this.options.getVolumeSound(type);
          if (vol > 0) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 - 1) * 0.1);
            this.soundAssets.replayAll();
          }
        },
        function () {
          const type = TYPE_SOUND.EFFECT;
          const val = options.getVolumeSound(type);
          this.text.text = `${Math.floor(val * 100)}%`;
        }
      )
    );

    this.listObjects.push(
      new IncrementDecrementControl(
        P + 2 * (W + S),
        Y,
        W,
        H,
        "Интерфейс",
        () => {
          const type = TYPE_SOUND.INTERFACE;
          const vol = this.options.getVolumeSound(type);
          if (vol < 1) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 + 1) * 0.1);
            this.soundAssets.replayAll();
          }
        },
        () => {
          const type = TYPE_SOUND.INTERFACE;
          const vol = this.options.getVolumeSound(type);
          if (vol > 0) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 - 1) * 0.1);
            this.soundAssets.replayAll();
          }
        },
        function () {
          const type = TYPE_SOUND.INTERFACE;
          const val = options.getVolumeSound(type);
          this.text.text = `${Math.floor(val * 100)}%`;
        }
      )
    );
  }

  init() {
    super.init();
  }

  restate() {
    super.restate();
  }

  update(touch, stateApp) {
    super.update(touch, stateApp);
  }

  render(ctx) {
    super.render(ctx);
  }
}

import { isEmpty } from "../../utils/utils.js";
import { Button } from "../../utils/button.js";
import { Label } from "../../utils/label.js";
import { TYPE_SOUND } from "../../utils/constants.js";
import { baseScreen } from "./baseScreen.js";

import { IncrementDecrementControl } from "../../utils/incrementDecrementControl.js";

export class optionsScreen extends baseScreen {
  constructor(imageAssets, soundAssets, model, options, params, toScreen) {
    super(imageAssets, soundAssets, model, options, params, toScreen);

    this.listObjects.push(
      new IncrementDecrementControl(
        200,
        250,
        400,
        200,
        "Музыка",
        () => {
          const type = TYPE_SOUND.MUSIC;
          const vol = this.options.getVolumeSound(type);
          if (vol < 1) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 + 1) * 0.1);
            this.soundAssets.replayAll();
          }
          console.log(
            `Прибавляем громкость vol = ${this.options.getVolumeSound(type)}`
          );
        },
        () => {
          const type = TYPE_SOUND.MUSIC;
          const vol = this.options.getVolumeSound(type);
          if (vol > 0) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 - 1) * 0.1);
            this.soundAssets.replayAll();
          }
          console.log(
            `Убавляем громкость   vol = ${this.options.getVolumeSound(type)}`
          );
        },
        function () {
          console.log(`Обновляем лайбел`);
          const type = TYPE_SOUND.MUSIC;
          const val = options.getVolumeSound(type);
          this.text.text = `${Math.floor(val * 100)}%`;
        }
      )
    );

    this.listObjects.push(
      new IncrementDecrementControl(
        700,
        250,
        400,
        200,
        "Эффекты",
        () => {
          const type = TYPE_SOUND.EFFECT;
          const vol = this.options.getVolumeSound(type);
          if (vol < 1) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 + 1) * 0.1);
            this.soundAssets.replayAll();
          }
          console.log(
            `Прибавляем громкость vol = ${this.options.getVolumeSound(type)}`
          );
        },
        () => {
          const type = TYPE_SOUND.EFFECT;
          const vol = this.options.getVolumeSound(type);
          if (vol > 0) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 - 1) * 0.1);
            this.soundAssets.replayAll();
          }
          console.log(
            `Убавляем громкость   vol = ${this.options.getVolumeSound(type)}`
          );
        },
        function () {
          console.log(`Обновляем лайбел`);
          const type = TYPE_SOUND.EFFECT;
          const val = options.getVolumeSound(type);
          this.text.text = `${Math.floor(val * 100)}%`;
        }
      )
    );

    this.listObjects.push(
      new IncrementDecrementControl(
        1200,
        250,
        400,
        200,
        "Интерфейс",
        () => {
          const type = TYPE_SOUND.INTERFACE;
          const vol = this.options.getVolumeSound(type);
          if (vol < 1) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 + 1) * 0.1);
            this.soundAssets.replayAll();
          }
          console.log(
            `Прибавляем громкость vol = ${this.options.getVolumeSound(type)}`
          );
        },
        () => {
          const type = TYPE_SOUND.INTERFACE;
          const vol = this.options.getVolumeSound(type);
          if (vol > 0) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 - 1) * 0.1);
            this.soundAssets.replayAll();
          }
          console.log(
            `Убавляем громкость   vol = ${this.options.getVolumeSound(type)}`
          );
        },
        function () {
          console.log(`Обновляем лайбел`);
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

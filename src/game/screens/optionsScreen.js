import { isEmpty } from "../../utils/utils.js";
import { Button } from "../../utils/button.js";
import { Label } from "../../utils/label.js";
import { TYPE_SOUND } from "../../utils/constants.js";
import { baseScreen } from "./baseScreen.js";

import { IncrementDecrementControl } from "../../utils/incrementDecrementControl.js";
import { CheckBox } from "../../utils/checkBox.js";
import { CheckBoxLabel } from "../../utils/checkBoxLabel.js";

export class optionsScreen extends baseScreen {
  constructor(imageAssets, soundAssets, model, options, params, toScreen) {
    super(imageAssets, soundAssets, model, options, params, toScreen);
    this.titleScreen = "Настройки";
  }

  init() {
    const Y = 250; // положение по высоте
    const W = 400; // ширина
    const H = 200; // высота
    const S = 200; // отступ
    const P = (this.w - (3 * W + 2 * S)) / 2; // начальная точка по ширине

    this.addButton(
      "incrementMusic",
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

    this.addButton(
      "incrementEffect",
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

    this.addButton(
      "incrementInterface",
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

    const Ycb = 550;
    const Wcb = 700;
    const Hcb = 100;
    const Scb = 200;
    const Pcb = (this.w - (2 * Wcb + Scb)) / 2;
    const options = this.options;

    this.addButton(
      "checkboxHP",
      new CheckBoxLabel(
        Pcb,
        Ycb,
        Wcb,
        Hcb,
        "Отображение HP",
        function () {
          console.log(`CheckBox: ${this.isChecked}`);
          options.setDamageDraw_HP(this.isChecked);
        },
        function () {
          this.isChecked = options.getDamageDraw_HP();
          console.log(`CheckBox Restate: ${this.isChecked}`);
        }
      )
    );

    this.addButton(
      "checkboxDamage",
      new CheckBoxLabel(
        Pcb + Wcb + Scb,
        Ycb,
        Wcb,
        Hcb,
        "Отображение урона",
        function () {
          console.log(`CheckBox: ${this.isChecked}`);
          options.setDamageDraw_Damage(this.isChecked);
        },
        function () {
          this.isChecked = options.getDamageDraw_Damage();
          console.log(`CheckBox Restate: ${this.isChecked}`);
        }
      )
    );

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

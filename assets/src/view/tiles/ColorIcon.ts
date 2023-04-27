import { _decorator, Component, Node, Enum, ParticleSystem2D, log, AudioSource } from 'cc';
import {ColorType} from "../../logic/entities/EntityTile";
import {Icon} from "./Icon";
const { ccclass, property } = _decorator;

@ccclass('ColorIcon')
export class ColorIcon extends Icon {
    @property({
        type: Enum(ColorType),
        override: true
    })
    type: ColorType;

    // TODO: звук и партиклы лучше вынести в отдельные компоненты
    @property(ParticleSystem2D)
    particle: ParticleSystem2D;

    // TODO: для звука лучше сделать общий sound manager чтобы не плодить источники
    @property(AudioSource)
    sound: AudioSource;

    onTileDestroy() {
        this.playParticles();
        this.playSound();
        super.onTileDestroy();
    }

    playParticles() {
        if (this.particle) {
            this.particle.node.active = true;
            const worldPos = this.particle.node.worldPosition;
            this.particle.node.removeFromParent();
            this.particle.node.setParent(this.gameFiledView.node);
            this.particle.node.worldPosition = worldPos;
            this.particle.resetSystem();
            this.particle = undefined;
        }
    }

    playSound() {
        if (this.sound) {
            this.sound.node.active = true;
            this.sound.play();
            this.sound.node.setParent(this.gameFiledView.node);
            this.sound = undefined;
        }
    }

    onClick() {

    }

}



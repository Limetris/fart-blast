import { _decorator, Component, Node, Enum, ParticleSystem2D, log } from 'cc';
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

    @property(ParticleSystem2D)
    particle: ParticleSystem2D;

    start() {
        super.start();
    }

    onTileDestroy() {
        if (this.particle) {
            this.particle.node.active = true;
            const worldPos = this.particle.node.worldPosition;
            this.particle.node.removeFromParent();
            this.particle.node.setParent(this.gameFiledView.node);
            this.particle.node.worldPosition = worldPos;
            this.particle.resetSystem();
            this.particle = undefined;
        }
        super.onTileDestroy();
    }

    onClick() {

    }

}



import { _decorator, Component, Node, Enum, ParticleSystem2D, log } from 'cc';
import {ColorType} from "../../logic/entities/EntityTile";
import {Icon} from "./Icon";
import {Tile} from "../../logic/tiles/Tile";
import {Cell} from "../../logic/cell/Cell";
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
        super.onTileDestroy();
        if (!this.particle)
            return;
        // log('particle');
        // TODO: not working
        // this.particle.node.active = true;
        // this.particle.enabled = true;
        // this.particle.resetSystem();
        // this.particle.addParticle();

        // this.particle.addParticle();
        // this.particle.
        // this.particle.stopSystem();
        // super.onTileDestroy();
    }

    onClick() {

    }

}


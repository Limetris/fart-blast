import { _decorator, Component, Node, Sprite, Color, log, tween, Vec3, UITransform } from 'cc';
import { Cell } from '../../logic/cell/Cell';
import {Tile, TileEvent} from '../../logic/tiles/Tile';
import {GameFieldIcons} from "../game/GameFieldIcons";
import {IconBase} from "./IconBase";
const { ccclass, property, requireComponent } = _decorator;

@ccclass('Icon')
@requireComponent(Sprite)
export class Icon extends IconBase {

    static DROP_SPEED = 1300;
    static DROP_DELAY = 0.015;

    gameFiledView: GameFieldIcons;
    protected sprite: Sprite;

    onLoad() {
        this.sprite = this.getComponent(Sprite);
        this.tile.subscribe(TileEvent.hit, this.onTileHit.bind(this), this);
        this.tile.subscribe(TileEvent.destroy, this.onTileDestroy.bind(this), this);
        this.tile.subscribe(TileEvent.changeCell, this.onTileChangeCell.bind(this), this);
    }

    onDestroy() {
        this.tile.unsubscribeTag(this);
    }

    alpha(alpha: number) {
        if(!this.sprite)
            return;
        let color = this.sprite.color;
        this.sprite.color = new Color(color.r, color.g, color.b, 255 * alpha);
    }

    onTileHit() {
        // log(this.tile);
    }

    onTileDestroy() {
        this.node.removeFromParent();
    }

    onTileChangeCell(tile: Tile, cellPrev: Cell, cellNew: Cell) {
        let viewCell = this.gameFiledView.getCell(cellNew.x, cellNew.y);
        if (viewCell) {
            const wordPos = this.node.getWorldPosition();
            this.node.setParent(viewCell.node);
            this.node.worldPosition = wordPos;
        }
    }

    async drop(delay: number = 0): Promise<Icon> {
        if (this.node.position.y === 0)
            return this;
        let tweenDuration: number = this.node.position.y / Icon.DROP_SPEED;
        if(tweenDuration <= 0) {
            this.node.position = Vec3.ZERO;
            return this;
        }
        return new Promise(resolve => {
            tween(this.node)
                .delay(delay)
                .to(tweenDuration, { position: Vec3.ZERO }, {
                    // easing: "bounceOut",
                    easing: "sineIn",
                    onComplete: (target?: object) => {
                        this.node.position = Vec3.ZERO;
                        resolve(this);
                    }
                })
                .start();
        });
    }

    async flyTo(target: Node, delay: number = 0): Promise<Icon> {

        const transformTarget = target.getComponent(UITransform);
        let targetWorldPos = transformTarget.convertToWorldSpaceAR(Vec3.ZERO);

        const transform = this.node.getComponent(UITransform);
        let pos = transform.convertToNodeSpaceAR(targetWorldPos);

        let tweenDuration: number = 0.25;
        return new Promise(resolve => {
            tween(this.node)
                .delay(delay)
                .to(tweenDuration, { position: pos }, {
                    easing: "backIn",
                    onComplete: (target?: object) => {
                        this.node.position = pos;
                        resolve(this);
                    }
                })
                .start();
        });
    }

    async flyToHome(delay: number = 0): Promise<Icon> {
        const pos = Vec3.ZERO;
        let tweenDuration: number = 0.8;
        return new Promise(resolve => {
            tween(this.node)
                .delay(delay)
                .to(tweenDuration, { position: pos }, {
                    easing: "backInOut",
                    onComplete: (target?: object) => {
                        this.node.position = pos;
                        resolve(this);
                    }
                })
                .start();
        });
    }

    onClick() {

    }

}


import { _decorator, Component, Node, Button, Sprite } from 'cc';
import {BoosterEvent} from "../../../logic/boosters/Booster";
const { ccclass, property, requireComponent } = _decorator;

@ccclass('ButtonBase')
@requireComponent(Button)
@requireComponent(Sprite)
export abstract class  ButtonBase extends Component {
    abstract onClick(...args: any[]);

    protected button: Button;
    protected sprite: Sprite;
    start() {
        this.button = this.getComponent(Button);
        this.sprite = this.getComponent(Sprite);
    }
}


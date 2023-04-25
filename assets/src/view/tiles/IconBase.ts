import { _decorator, Component, Node } from 'cc';
import {Tile} from "../../logic/tiles/Tile";
const { ccclass, property } = _decorator;

@ccclass('IconBase')
export class IconBase extends Component {

    tile: Tile;

    start() {

    }

}


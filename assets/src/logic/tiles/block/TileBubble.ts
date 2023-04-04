import {BlockType} from "../../entities/EntityTile";
import { TileBlock } from "./TileBlock";

export class TileBubble extends  TileBlock {

    constructor() {
        super(BlockType.bubble);
    }
}

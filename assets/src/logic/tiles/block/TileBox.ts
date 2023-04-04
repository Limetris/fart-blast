import {BlockType} from "../../entities/EntityTile";
import { TileBlock } from "./TileBlock";

export class TileBox extends  TileBlock {

    constructor() {
        super(BlockType.box);
    }
}

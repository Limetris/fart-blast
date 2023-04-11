import {IGameFieldData} from "../entities/EntityGame";
import {TileGroup} from "../tiles/TileGroup";
import { GameFieldCells } from "./GameFieldCells";
import {Group} from "../tiles/Group";

export class GameFieldLogic extends  GameFieldCells {

    private _groups: TileGroup[];
    get groups(): TileGroup[] { return this._groups;  }

    constructor(gameFieldData: IGameFieldData) {
        super(gameFieldData);

        this._searchGroups();
    }

    private _searchGroups () {
        this._clearGroups();
        this.eachCell((cell) => {
            let group = Group.create(cell);
            if (group)
                this._groups.push(group);
        })
    }

    private _clearGroups () {
        this.eachCell((cell) => {
            cell.tile?.resetGroup();
        });
        this._groups = [];
    }


}


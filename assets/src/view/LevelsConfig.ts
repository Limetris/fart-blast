import { _decorator, Component, Node, JsonAsset, assert, director } from 'cc';
import { IGameFieldData } from "../logic/entities/EntityGame";
const { ccclass, property } = _decorator;

@ccclass('LevelsConfig')
export class LevelsConfig extends Component {

    // TODO: в идеале грузить с сервера

    @property({type: [JsonAsset]})
    configs: JsonAsset[] = [];

    private static _instance: LevelsConfig = null;

    public static get instance(): LevelsConfig {
        assert(this._instance, "LevelsConfig instance is null");
        return this._instance;
    }

    onLoad() {
        assert(!LevelsConfig._instance, "Only one instance allowed");
        LevelsConfig._instance = this;
    }

    get(level: number): IGameFieldData {
        const config = this.configs[level - 1];
        assert(config, 'level config is undefined');
        return <IGameFieldData> config.json;
    }
}


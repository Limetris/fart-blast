import { _decorator, Component, Node, Label } from 'cc';
import EventManager from "../../../logic/EventManager";
const { ccclass, property, requireComponent } = _decorator;

@ccclass('LabelEvent')
@requireComponent(Label)
export abstract class LabelEvent extends Component {

    protected label: Label;

    abstract get event(): string;
    abstract initStartValue();

    start() {
        this.label = this.getComponent(Label);
        EventManager.subscribe(this.event, this.setValue.bind(this), this);
        this.initStartValue();
    }

    onDestroy() {
        EventManager.unsubscribeTag(this);
    }

    protected getValueString(value: number, ...args: any[]): string {
        return value.toString();
    }

    setValue(value: number, ...args: any[]) {
        this.label.string = this.getValueString(value, args);
    }

}


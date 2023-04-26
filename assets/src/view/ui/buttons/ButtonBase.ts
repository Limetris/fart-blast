import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('ButtonBase')
@requireComponent(Button)
export abstract class  ButtonBase extends Component {
    abstract onClick();
}


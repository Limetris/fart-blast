import { _decorator, Component, Node, Sprite, UITransform, Texture2D } from 'cc';
const { ccclass, property, requireComponent} = _decorator;

@ccclass('RenderNode')

@requireComponent(UITransform)
@requireComponent(Sprite)
export class RenderNode extends Component {

    @property(Node)
    target: Node;

    private _sprite: Sprite;
    private _transform: UITransform;


    start() {
        this._sprite = this.getComponent(Sprite);
        this._transform = this.node.getComponent(UITransform);

    }

    update(deltaTime: number) {

    }
}



import { _decorator, Component, Node, log, UITransform, Size, size, Enum, v2, Vec2, Vec3, v3 } from 'cc';
const { ccclass, property, executeInEditMode, requireComponent } = _decorator;

/**
 * Predefined variables
 * Name = WidgetScale
 * DateTime = Thu Mar 31 2022 20:28:49 GMT+0300 (Москва, стандартное время)
 * Author = limetris
 * FileBasename = WidgetFit.ts
 * FileBasenameNoExtension = WidgetFit
 * URL = db://assets/Scripts/Components/WidgetFit.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

export enum WidgetFitType {
    NONE= 0,
    WIDTH= 1,
    HEIGHT= 2,
    ALL= 3
}

@ccclass('WidgetFit')
@requireComponent(UITransform)
@executeInEditMode
export class WidgetFit extends Component {

    @property(Node) _target: Node = undefined;
    @property(Node) get target () : Node { return this._target;  }
    set target (value: Node) {
        this._removeListeners();
        this._target = value;
        this._init();
    }

    @property({type: Enum(WidgetFitType)}) _scaleType = WidgetFitType.NONE;
    @property({type: Enum(WidgetFitType)}) get scaleType () : WidgetFitType { return this._scaleType;  }
    set scaleType (value: WidgetFitType) { this._scaleType = value;  this._resized();  }

    private _transform: UITransform = undefined;
    private _targetTransform: UITransform = undefined;
    private _startSize: Size = Size.ZERO;
    private _startScale: Vec3 = Vec3.ONE;
    private _ratio: number = 0;
    start () {
        this._transform = this.getComponent(UITransform);
        this._startScale = this.node.scale.clone();
        this._startSize = size(this._transform.width * this._startScale.x, this._transform.height * this._startScale.y);
        this._ratio = this._startSize.width / this._startSize.height;
        if(!this._target)
            this._target = this.node.parent;
        this._init();
    }

    protected onDisable () {
        this._removeListeners();
    }

    private _init() {

        this._targetTransform = undefined;
        if (!this._target)
            return;
        this._initTransform();
        this._initListeners();
        this._resized();
    }

    private  _initTransform() {
        this._targetTransform = this._target?.getComponent(UITransform);
        if (this._targetTransform)
            return;
    }

    private _initListeners() {
        this._target?.on(Node.EventType.SIZE_CHANGED, this._resized.bind(this), this);
    }

    private _removeListeners() {
        this._targetTransform = undefined;
        this._target?.off(Node.EventType.SIZE_CHANGED, this._resized.bind(this), this);
    }

    private _resized() {
        if (!this._targetTransform)
            return;

        switch (this._scaleType) {
            case WidgetFitType.NONE:
                break;
            case WidgetFitType.WIDTH:
                this._fitWidth();
                break;
            case WidgetFitType.HEIGHT:
                this._fitHeight();
                break;
            case WidgetFitType.ALL:
                let scale = Math.min(this._targetTransform.width / this._startSize.width, this._targetTransform.height / this._startSize.height);
                this.node.scale = v3(scale, scale, scale);

                // if (this._ratio > 1)
                //     this._fitHeight();
                // else
                //     this._fitWidth();
                break;
        }
    }

    private _fitWidth() {
        const scale = this._targetTransform.width / this._startSize.width;
        this.node.scale = v3(scale, scale, scale);
        // this._transform.width = this._targetTransform.width;
        // this._transform.height = this._transform.width / this._ratio;
    }

    private _fitHeight() {
        const scale = this._targetTransform.height / this._startSize.height;
        this.node.scale = v3(scale, scale, scale);
        // this._transform.height = this._targetTransform.height;
        // this._transform.width = this._transform.height * this._ratio;
    }
}

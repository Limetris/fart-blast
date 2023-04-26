import { _decorator, Component, Node, UIOpacity, tween } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('WindowBase')
@requireComponent(UIOpacity)
export class WindowBase extends Component {

    open(...args: any[]) {
        this.fadeOut(() => {

        });
    }

    close() {
        this.fadeIn(() => {
            this.node.removeFromParent();
        });
    }

    fadeIn(callback?: Function) {
        this.fade(255,0, callback);
    }

    fadeOut(callback?: Function) {
        this.fade(0, 255, callback);
    }

    fade(startOpacity: number, endOpacity: number, callback?: Function) {
        let opa = this.getComponent(UIOpacity);

        opa.opacity = startOpacity;
        tween(opa)
            .to(0.5, { opacity: endOpacity }, {
                onComplete: (target?: object) => {
                    opa.opacity = endOpacity;
                    if (callback)
                        callback();
                }
            })
            .start();
    }
}


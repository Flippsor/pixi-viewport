import { CanvasRenderer } from "./canvas-renderer";
import { Viewport } from "./viewport";
import { WheelEventArgs } from "./wheel-event-args";

export class ViewportZoom {
    private _zoomDirty: boolean;

    private _scale = 1;
    private _zoomPoint: { x: number, y: number };

    constructor(canvasRenderer: CanvasRenderer, private viewport: Viewport) {

        canvasRenderer.ticker.add(() => this.onTimerTick());
        canvasRenderer.interaction.onMouseWheel$.subscribe((event: WheelEventArgs) => this._mouseWheelHandler(event));
    }

    private onTimerTick(): void {

        if (this._zoomDirty) {
            this.viewport.zoomBy(this._scale, this._zoomPoint);
            this._scale = 1;
            this._zoomDirty = false;
        }
    }

    private _mouseWheelHandler(event: WheelEventArgs) {
        // const mousePoint : CanvasPoint = { X : notification.pageX - this._element.offsetLeft, Y : notification.pageY - this._element.offsetTop};
        if (event.wheelDelta !== 0) {
            const change = Math.pow(2, -1.1 * event.wheelDelta / 1000);
            this._scale = this._scale * change;
            this._zoomPoint = event.mousePoint;
            this._zoomDirty = true;
        }

        event.preventDefaults();
    }
}

import { Subscription } from "rxjs";
import { CanvasRenderer } from "./canvas-renderer";
import { Viewport } from "./viewport";
import { MouseEventArgs } from "./mouse-event-args";

export class ViewportDrag  {

    private subscriptions: Subscription[] = [];
    private mouseDown = false;

    private mouseDownX = 0;
    private mouseDownY = 0;
    private mouseX = 0;
    private mouseY = 0;
    private lastMouseX = 0;
    private lastMouseY = 0;

    private translateDirty: boolean;

    private positionX = 0;
    private positionY = 0;

    private mouseMoveSubscription: Subscription;

    constructor(private canvasRenderer: CanvasRenderer, private viewport: Viewport) {
        canvasRenderer.ticker.add((delta: any) => this.onTimerTick(delta));

        this.canvasRenderer.interaction.onMouseDownMiddle$.subscribe((event) => this.onMouseDown(event));
        this.canvasRenderer.interaction.onMouseUpMiddle$.subscribe((event) => this.onMouseUp(event));
        this.canvasRenderer.interaction.onMouseEnter$.subscribe((event) => this.onMouseUp(event));
        this.canvasRenderer.interaction.onMouseLeave$.subscribe((event) => this.onMouseUp(event));
    }

    private onTimerTick(deltaTime: number): void {

        if (this.translateDirty) {
            this.viewport.translateBy(this.positionX, this.positionY);
            this.reset();
        }
    }

    private reset(): void {
        this.positionX = 0;
        this.positionY = 0;
        this.translateDirty = false;
    }

    private onMouseDown(event: MouseEventArgs) {
        this.mouseDown = true;
        this.mouseDownX = event.mousePoint.x;
        this.mouseDownY = event.mousePoint.y;

        this.lastMouseX = this.mouseDownX;
        this.lastMouseY = this.mouseDownY;

        this.mouseMoveSubscription = this.canvasRenderer.interaction.onMouseMove$.subscribe((mouseEvent) => this.mouseMoveHandler(mouseEvent));
        this.subscriptions.push(this.mouseMoveSubscription);
        event.preventDefaults();
    }

    private onMouseUp(event: MouseEventArgs) {
        this.mouseDown = false;
        this.mouseMoveSubscription?.unsubscribe();
        event.preventDefaults();
    }

    private mouseMoveHandler(event: MouseEventArgs) {
        if (this.mouseDown) {
            this.mouseX = event.mousePoint.x;
            this.mouseY = event.mousePoint.y;

            this.positionX += this.mouseX - this.lastMouseX;
            this.positionY += this.mouseY - this.lastMouseY;
            this.translateDirty = true;

            this.lastMouseX = this.mouseX;
            this.lastMouseY = this.mouseY;
        }

        event.preventDefaults();
    }
}
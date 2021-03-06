import * as PIXI from "pixi.js";
import { CanvasRenderer } from "./canvas-renderer";
import { ViewportDrag } from "./viewport-drag";
import { ViewportZoom } from "./viewport-zoom";
import { ViewportInteraction } from "./viewport-interaction";
import { BehaviorSubject, Observable } from "rxjs";

export class Viewport {

    private scaleContainers: PIXI.Container[] = [];
    private pixiContainer: PIXI.Container = new PIXI.Container();

    public interaction: ViewportInteraction;

    private scaleSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1.0);
    public scale$: Observable<number> = this.scaleSubject.asObservable();

    constructor(private canvasRenderer: CanvasRenderer, private scaleMin: number = 0.001, private scaleMax: number = 10) {
        this.pixiContainer.sortableChildren = true;
        this.pixiContainer.scale.y = -1;
        this.canvasRenderer.addContainer(this.pixiContainer, 5);

        this.interaction = new ViewportInteraction(canvasRenderer, this.pixiContainer);
        new ViewportDrag(canvasRenderer, this);
        new ViewportZoom(canvasRenderer, this);

        this.translateToOrigin();
    }

    public scaleTo(value: number): void {
        this.pixiContainer.scale.set(value, -value);
        for (const scaleContainer of this.scaleContainers) {
            scaleContainer.scale.set(1 / value, 1 / value);
        }
        this.scaleSubject.next(value);
    }

    public scaleBy(delta: number): void {
        this.scaleContainerBy(delta);
        for (const scaleContainer of this.scaleContainers) {
            scaleContainer.scale.x *= 1 / delta;
            scaleContainer.scale.y *= 1 / delta;
        }
        this.scaleSubject.next(this.scale);
    }

    public addContainer(container: PIXI.Container, layer = 0) : void{
        container.zIndex = layer;
        this.pixiContainer.addChild(container);
    }

    public removeContainer(container: PIXI.Container): void {
        this.pixiContainer.removeChild(container);
    }

    public addScaleInvariantContainer(container: PIXI.Container, layer: number): void {
        container.scale.set(1 / this.pixiContainer.scale.x, 1 / this.pixiContainer.scale.x);
        this.addContainer(container, layer);
        this.scaleContainers.push(container);
    }

    public get scale(): number {
        return this.pixiContainer.scale.x;
    }


    public zoomAroundCenterBy(deltaPercent: number): void {
        this.zoomBy(deltaPercent, { x: this.canvasRenderer.width / 2, y: this.canvasRenderer.height / 2 });
    }

    public zoomBy(deltaPercent: number, zoomPointGlobal: { x: number, y: number }): void {
        const newScale = this.scale * deltaPercent;
        const clampedDelta = this.clamp(newScale, this.scaleMin, this.scaleMax);

        if (clampedDelta === newScale) {
            const oldPoint = this.pixiContainer.toLocal(zoomPointGlobal);

            this.scaleTo(newScale);
            const newPoint = this.pixiContainer.toGlobal(oldPoint);

            const zoomX = zoomPointGlobal.x - newPoint.x;
            const zoomY = zoomPointGlobal.y - newPoint.y;

            if (zoomX !== 0 || zoomY !== 0) {
                this.translateBy(zoomX, zoomY);
            }
        }
    }

    private clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }

    public zoomToRectangle(rectangle: { x: number, y: number, width: number, height: number }, marginInPercentage = 0.95): void {
        const canvasWidth = this.canvasRenderer.width;
        const canvasHeight = this.canvasRenderer.height;

        const x = canvasWidth / 2 - (rectangle.x + rectangle.width / 2);
        const y = canvasHeight / 2 - (rectangle.y + rectangle.height / 2);

        this.translateBy(x, y);
        const scaleX = canvasWidth / rectangle.width;
        const scaleY = canvasHeight / rectangle.height;

        const scaleMin = Math.min(scaleX, scaleY);

        this.zoomAroundCenterBy(scaleMin * marginInPercentage);
    }

    public translateToOrigin(margin = 100): void {
        // this.scaleTo(1 / 55);
        this.translateTo({ x: margin, y: -margin + this.canvasRenderer.height });
    }

    private scaleContainerTo(value: number) {
        this.pixiContainer.scale.set(value, value);
    }

    private scaleContainerBy(delta: number) {
        this.pixiContainer.scale.x *= delta;
        this.pixiContainer.scale.y *= delta;
    }

    public translateBy(x: number, y: number): void {
        this.pixiContainer.x += x;
        this.pixiContainer.y += y;
    }

    private rotateBy(rotation: number) {
        this.pixiContainer.rotation += rotation;
    }

    public translateTo(point: { x: number, y: number }): void {
        this.pixiContainer.x = point.x;
        this.pixiContainer.y = point.y;
    }

    private rotateTo(rotation: number) {
        this.pixiContainer.rotation = rotation;
    }
}
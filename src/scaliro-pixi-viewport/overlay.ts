import { CanvasRenderer } from "./canvas-renderer";
import * as PIXI from 'pixi.js';

export class Overlay {

    public pixiContainer: PIXI.Container = new PIXI.Container();

    constructor(canvasRenderer: CanvasRenderer) {
        canvasRenderer.addContainer(this.pixiContainer, 20);
    }

    public addContainer(container: PIXI.Container, layer = 0): void {
        container.zIndex = layer;
        this.pixiContainer.addChild(container);
    }

    public removeContainer(container: PIXI.Container): void {
        this.pixiContainer.removeChild(container);
    }
}

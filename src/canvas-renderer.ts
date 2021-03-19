import * as PIXI from "pixi.js";
import { CanvasInteraction } from "./canvas-interaction";

export class CanvasRenderer {
    private canvasContainer: PIXI.Container = new PIXI.Container();
    public readonly renderer: PIXI.AbstractRenderer;
    public ticker: PIXI.Ticker = new PIXI.Ticker();

    public interaction: CanvasInteraction;

    constructor(private htmlElementRoot: HTMLElement, backgroundColor = 0x123465) {

        CanvasRenderer.disableDefaultContextMenu(htmlElementRoot);

        this.renderer = PIXI.autoDetectRenderer({
            width: 0, height: 0,
            antialias: true,
            transparent: false,
            backgroundColor: backgroundColor
        });
        this.interaction = new CanvasInteraction(this.renderer, htmlElementRoot);

        htmlElementRoot.appendChild(this.renderer.view);
        this.resize();

        this.ticker.add(() => this.render());
        this.startRenderer();

        this.canvasContainer.sortableChildren = true;
    }

    public startRenderer():void {
        this.ticker.start();
    }

    public stopRenderer():void {
        this.ticker.stop();
    }

    public get width():number{
        return this.renderer.width;
    }

    public get height():number{
        return this.renderer.height;
    }

    public addContainer(container: PIXI.Container, layer = 0): void {
        container.zIndex = layer;
        this.canvasContainer.addChild(container);
    }

    private static disableDefaultContextMenu(htmlElementRoot: HTMLElement) {
        htmlElementRoot.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });
    }

    private render(): void {
        this.renderer.render(this.canvasContainer);
    }

    public resizeTo(width: number, height: number): void {
        // console.log('resize canvas by user');
        this.renderer.resize(width, height);
    }

    public resize(): void {
        // hack because smaller resizing does not work
        this.renderer.resize(0, 0);
        const width = this.htmlElementRoot.clientWidth;
        const height = this.htmlElementRoot.scrollHeight;
        this.renderer.resize(width, height);
    }
}
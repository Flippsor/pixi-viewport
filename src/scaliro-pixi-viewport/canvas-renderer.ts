import * as PIXI from "pixi.js";

export class CanvasRenderer {
    private canvasContainer: PIXI.Container = new PIXI.Container();
    private readonly renderer: PIXI.AbstractRenderer;
    public ticker: PIXI.Ticker = new PIXI.Ticker();

    constructor(private htmlElementRoot: HTMLElement, backgroundColor = 0x123465) {

        this.disableDefaultContextMenu(htmlElementRoot);

        this.renderer = PIXI.autoDetectRenderer({
            width: 0, height: 0,
            antialias: true,
            transparent: false,
            backgroundColor: backgroundColor
        });
        htmlElementRoot.appendChild(this.renderer.view);
        this.resize();

        this.ticker.add((event: any) => this.render());
        this.startRenderer();

        this.canvasContainer.sortableChildren = true;
    }

    public startRenderer() {
        this.ticker.start();
    }

    public stopRenderer() {
        this.ticker.stop();
    }

    public get width(){
        return this.renderer.width;
    }

    public get height(){
        return this.renderer.height;
    }

    public addContainer(container: PIXI.Container, layer = 0): void {
        container.zIndex = layer;
        this.canvasContainer.addChild(container);
    }

    private disableDefaultContextMenu(htmlElementRoot: HTMLElement) {
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
        console.log(height)
        this.renderer.resize(width, height);
    }
}
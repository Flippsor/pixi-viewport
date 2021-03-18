import { Subscription } from "rxjs";
import * as PIXI from 'pixi.js'
import { Viewport } from "./viewport";

export class GridContainer {

    private scaleStep = 1;
    private gridSize = 100;
    private gridFactor = 10;

    private gridGraphics = new PIXI.Graphics();

    private subscription: Subscription;

    constructor(private viewport: Viewport, private bigLineColor: number = 0x969696, private smallLineColor: number = 0x5e5e5e) {

        this.viewport.addContainer(this.gridGraphics, -10);

        this.subscription = this.viewport.scale$.subscribe(scale => {

            this.calculateGridScale(scale);

            this.drawGrid(this.gridSize, -100000, -100000, 200000, 200000, scale);
        });
    }

    private calculateGridScale(scale: number) {

        while (scale > this.scaleStep * this.gridFactor) {
            this.scaleStep *= this.gridFactor;
            this.gridSize /= this.gridFactor;
        }

        while (scale < this.scaleStep) {
            this.scaleStep /= this.gridFactor;
            this.gridSize *= this.gridFactor;
        }
    }


    private drawGrid(gridSize: number, left: number, top: number, right: number, bottom: number, scale: number): void {

        this.gridGraphics.clear();

        let gridX = left;
        let gridY = top;
        let counter = 0;
        let lineWidth = 10;
        let lineColor;

        while (gridY < bottom) {

            if ( counter > 9) {
                counter = 0;
            }
            if (counter === 0) {
                lineWidth = 1 / scale;
                lineColor = this.bigLineColor;
            } else {
                lineWidth = 1 / scale;
                lineColor = this.smallLineColor;
            }

            this.gridGraphics.lineStyle(lineWidth, lineColor);
            this.gridGraphics.moveTo(left, gridY);
            this.gridGraphics.lineTo(right, gridY);
            gridY += gridSize;

            counter ++;
        }

        counter = 0;

        while (gridX < right) {

            if ( counter > 9) {
                counter = 0;
            }
            if (counter === 0) {
                lineWidth = 1 / scale;
                lineColor = this.bigLineColor;
            } else {
                lineWidth = 1 / scale;
                lineColor = this.smallLineColor;
            }

            this.gridGraphics.lineStyle(lineWidth, lineColor);
            this.gridGraphics.moveTo(gridX, top);
            this.gridGraphics.lineTo(gridX, bottom);
            gridX += gridSize;

            counter ++;
        }
    }
}
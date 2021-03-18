import { Viewport } from "./viewport";
import * as PIXI from 'pixi.js';

export class CoordinateOrigin {
    private pixiContainer: PIXI.Container = new PIXI.Container();

    constructor(viewportContainer: Viewport) {
        const color = 0xffffff;
        const lineWidth = 2;
        const offset = -5;
        const lengthHalf = 35;
        const xArrow = this.createArrowBetweenPoints(lineWidth, color, {
            x: -lengthHalf + offset,
            y: 0
        }, { x: lengthHalf + offset, y: 0 });
        const yArrow = this.createArrowBetweenPoints(lineWidth, color, { x: 0, y: -lengthHalf + offset }, {
            x: 0,
            y: lengthHalf + offset
        });
        this.pixiContainer.addChild(xArrow, yArrow);
        viewportContainer.addScaleInvariantContainer(this.pixiContainer, 5);
    }

    private createArrowBetweenPoints(lineWidth: number, lineColor: number, fromPoint: { x: number, y :number  }, toPoint: { x: number, y :number  }, container = new PIXI.Container(), isToArrowHeadVisible = true, isFromArrowHeadVisible = false, arrowHeadSize = 1): PIXI.Container {
        const angle = this.getAngleBetweenPoints(fromPoint, toPoint);
        return this.createArrow(lineWidth, lineColor, fromPoint, toPoint, angle, container, isToArrowHeadVisible, isFromArrowHeadVisible, arrowHeadSize);
    }

    private getAngleBetweenPoints(fromPoint: { x: number, y :number  }, toPoint: { x: number, y :number  }): number {
        return Math.atan2(toPoint.y - fromPoint.y, toPoint.x - fromPoint.x);
    }

    private createArrow(lineWidth: number, lineColor: number, fromPoint: { x: number, y :number  }, toPoint: { x: number, y: number }, angle: number, container = new PIXI.Container(), isToArrowHeadVisible = true, isFromArrowHeadVisible = false, headSize = 1) {
        if (isToArrowHeadVisible) {
            const toArrowHead = this.createArrowHead(lineColor, headSize);
            toArrowHead.rotation = angle;
            toArrowHead.x = toPoint.x;
            toArrowHead.y = toPoint.y;
            container.addChild(toArrowHead);
        }

        if (isFromArrowHeadVisible) {
            const fromArrowHead = this.createArrowHead(lineColor, headSize);
            fromArrowHead.rotation = angle + Math.PI;
            fromArrowHead.x = fromPoint.x;
            fromArrowHead.y = fromPoint.y;
            container.addChild(fromArrowHead);
        }

        const arrowLine = new PIXI.Graphics()
            .lineStyle(lineWidth, lineColor)
            .moveTo(fromPoint.x, fromPoint.y)
            .lineTo(toPoint.x, toPoint.y);
        container.addChild(arrowLine);


        return container;
    }

    public createArrowHead(lineColor: number, headSize: number = 1): PIXI.Graphics {
        return new PIXI.Graphics()
            .lineTextureStyle({
                width: 1,
                color: lineColor,
                alignment: 0.5,
                join: PIXI.LINE_JOIN.MITER,
                cap: PIXI.LINE_CAP.BUTT,
                miterLimit: 198
            })
            .beginFill(lineColor)
            .moveTo(0, -7 * headSize)
            .lineTo(16 * headSize, 0)
            .lineTo(0, 7 * headSize)
            .closePath();
    }
}
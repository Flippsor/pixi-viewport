import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import { MouseEventArgs } from "./mouse-event-args";
import { WheelEventArgs } from "./wheel-event-args";
import { CanvasRenderer } from "./canvas-renderer";
import * as PIXI from 'pixi.js';

export class ViewportInteraction {
    public onMouseUpLeft$: Observable<MouseEventArgs>;
    public onMouseUpMiddle$: Observable<MouseEventArgs>;
    public onMouseUpRight$: Observable<MouseEventArgs> ;
    public onMouseDownLeft$: Observable<MouseEventArgs>;
    public onMouseDownMiddle$: Observable<MouseEventArgs>;
    public onMouseDownRight$: Observable<MouseEventArgs>;
    public onMouseMove$: Observable<MouseEventArgs>;
    public onMouseWheel$: Observable<WheelEventArgs>;
    public onMouseDoubleClickLeft$: Observable<MouseEventArgs>;
    public onMouseEnter$: Observable<MouseEventArgs>;
    public onMouseLeave$: Observable<MouseEventArgs>;

    constructor(private canvasRenderer: CanvasRenderer, private viewportContainer: PIXI.Container) {
        this.onMouseUpLeft$ = canvasRenderer.interaction.onMouseUpLeft$.pipe(map(event => this.mapMouseEvent(event)));
        this.onMouseUpMiddle$ = canvasRenderer.interaction.onMouseUpMiddle$.pipe(map(event => this.mapMouseEvent(event)));
        this.onMouseUpRight$ = canvasRenderer.interaction.onMouseUpRight$.pipe(map(event => this.mapMouseEvent(event)));
        this.onMouseDownLeft$ = canvasRenderer.interaction.onMouseDownLeft$.pipe(map(event => this.mapMouseEvent(event)));
        this.onMouseDownMiddle$ = canvasRenderer.interaction.onMouseDownMiddle$.pipe(map(event => this.mapMouseEvent(event)));
        this.onMouseDownRight$ = canvasRenderer.interaction.onMouseDownRight$.pipe(map(event => this.mapMouseEvent(event)));
        this.onMouseMove$ = canvasRenderer.interaction.onMouseMove$.pipe(map(event => this.mapMouseEvent(event)));
        this.onMouseWheel$ = canvasRenderer.interaction.onMouseWheel$.pipe(map(event => this.mapWheelEvent(event)));
        this.onMouseDoubleClickLeft$ = canvasRenderer.interaction.onMouseDoubleClickLeft$.pipe(map(event => this.mapMouseEvent(event)));
        this.onMouseEnter$ = canvasRenderer.interaction.onMouseEnter$.pipe(map(event => this.mapMouseEvent(event)));
        this.onMouseLeave$ = canvasRenderer.interaction.onMouseLeave$.pipe(map(event => this.mapMouseEvent(event)));
    }

    private mapMouseEvent(event: MouseEventArgs): MouseEventArgs {
        return new MouseEventArgs(event.originalEvent, this.viewportContainer.toLocal(event.mousePoint));
    }

    private mapWheelEvent(event: WheelEventArgs): WheelEventArgs {
        return new WheelEventArgs(event.originalEvent, this.viewportContainer.toLocal(event.mousePoint));
    }

    public getMousePosition(): MouseEventArgs {
        const mousePosition = this.canvasRenderer.interaction.getMousePosition();
        return new MouseEventArgs(mousePosition.originalEvent, this.viewportContainer.toLocal(mousePosition.mousePoint));
    }
}
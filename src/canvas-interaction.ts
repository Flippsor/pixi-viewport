import {Observable, Subject} from 'rxjs';
import * as PIXI from 'pixi.js';
import { WheelEventArgs } from "./wheel-event-args";
import { MouseEventArgs } from "./mouse-event-args";

export class CanvasInteraction {

    private _onMouseUpLeft: Subject<MouseEventArgs> = new Subject<MouseEventArgs>();
    public onMouseUpLeft$: Observable<MouseEventArgs> = this._onMouseUpLeft.asObservable();

    private _onMouseUpMiddle: Subject<MouseEventArgs> = new Subject<MouseEventArgs>();
    public onMouseUpMiddle$: Observable<MouseEventArgs> = this._onMouseUpMiddle.asObservable();

    private _onMouseUpRight: Subject<MouseEventArgs> = new Subject<MouseEventArgs>();
    public onMouseUpRight$: Observable<MouseEventArgs> = this._onMouseUpRight.asObservable();

    private _onMouseDownLeft: Subject<MouseEventArgs> = new Subject<MouseEventArgs>();
    public onMouseDownLeft$: Observable<MouseEventArgs> = this._onMouseDownLeft.asObservable();

    private _onMouseDownMiddle: Subject<MouseEventArgs> = new Subject<MouseEventArgs>();
    public onMouseDownMiddle$: Observable<MouseEventArgs> = this._onMouseDownMiddle.asObservable();

    private _onMouseDownRight: Subject<MouseEventArgs> = new Subject<MouseEventArgs>();
    public onMouseDownRight$: Observable<MouseEventArgs> = this._onMouseDownRight.asObservable();

    private _onMouseMove: Subject<MouseEventArgs> = new Subject<MouseEventArgs>();
    public onMouseMove$: Observable<MouseEventArgs> = this._onMouseMove.asObservable();

    private _onMouseWheel: Subject<WheelEventArgs> = new Subject<WheelEventArgs>();
    public onMouseWheel$: Observable<WheelEventArgs> = this._onMouseWheel.asObservable();

    private _onMouseDoubleClickLeft: Subject<MouseEventArgs> = new Subject<MouseEventArgs>();
    public onMouseDoubleClickLeft$: Observable<MouseEventArgs> = this._onMouseDoubleClickLeft.asObservable();

    private _onMouseEnter: Subject<MouseEventArgs> = new Subject<MouseEventArgs>();
    public onMouseEnter$: Observable<MouseEventArgs> = this._onMouseEnter.asObservable();

    private _onMouseLeave: Subject<MouseEventArgs> = new Subject<MouseEventArgs>();
    public onMouseLeave$: Observable<MouseEventArgs> = this._onMouseLeave.asObservable();

    private interactionManager: PIXI.InteractionManager;
    constructor(renderer: PIXI.AbstractRenderer, htmlElement: HTMLElement) {
        this.interactionManager = renderer.plugins.interaction;
        this.subscribeMouseMove();
        this.subscribeMouseDown();
        this.subscribeMouseDownRight();
        this.subscribeMouseUp();
        this.subscribeMouseUpoutside();
        this.subscribeMouseOver();
        this.subscribeMouseOut();
        this.subscribeMouseWheel(htmlElement);
        this.subscribeDoubleClick(htmlElement);
    }

    public getMousePosition(): MouseEventArgs{
        const mouse = this.interactionManager.mouse;
        return new MouseEventArgs(mouse.originalEvent, {
            x: mouse.global.x,
            y: mouse.global.y
        });
    }

    private subscribeMouseWheel(htmlElement: HTMLElement){
        htmlElement.addEventListener('wheel',
            (event: WheelEvent) => {
                this._onMouseWheel.next(new WheelEventArgs(event, {x : event.pageX - htmlElement.offsetLeft, y : event.pageY - htmlElement.offsetTop}), )
            },
            {capture: false});
    }

    private subscribeMouseMove(): void {
        this.interactionManager.on('mousemove',
            (event: PIXI.InteractionEvent) => {
                if (event.stopped){
                    return;
                }
                this._onMouseMove.next(new MouseEventArgs(event.data.originalEvent, {
                    x: event.data.global.x,
                    y: event.data.global.y
                }));
            });
    }

    private subscribeMouseUpoutside(): void {
        this.interactionManager.on('mouseupoutside', (event: PIXI.InteractionEvent) => this.onMouseUp(event));
    }

    private subscribeMouseUp(): void {
        this.interactionManager.on('mouseup', (event: PIXI.InteractionEvent) => this.onMouseUp(event));
    }

    private subscribeMouseOver(): void {
        this.interactionManager.on('mouseover', (event: PIXI.InteractionEvent) => { this._onMouseEnter.next(new MouseEventArgs(event.data.originalEvent, {
            x: event.data.global.x,
            y: event.data.global.y
        })); });
    }

    private subscribeMouseOut(): void {
        this.interactionManager.on('mouseout', (event: PIXI.InteractionEvent) => { this._onMouseLeave.next(new MouseEventArgs(event.data.originalEvent, {
            x: event.data.global.x,
            y: event.data.global.y
        })); });
    }

    private onMouseUp(event: PIXI.InteractionEvent){
        if (event.stopped){
            return;
        }
        switch (event.data.button) {
            case 0:
                this._onMouseUpLeft.next(new MouseEventArgs(event.data.originalEvent, {
                    x: event.data.global.x,
                    y: event.data.global.y
                }), );
                break;
            case 1:
                this._onMouseUpMiddle.next(new MouseEventArgs(event.data.originalEvent, {
                    x: event.data.global.x,
                    y: event.data.global.y
                }));
                break;
            case 2:
                this._onMouseUpRight.next(new MouseEventArgs(event.data.originalEvent, {
                    x: event.data.global.x,
                    y: event.data.global.y
                }));
                break;
        }
    }

    private subscribeMouseDown(): void {
        this.interactionManager.on('mousedown', (event: PIXI.InteractionEvent) => {
            if (event.stopped){
                return;
            }
            switch (event.data.button) {
                case 0:
                    this._onMouseDownLeft.next(new MouseEventArgs(event.data.originalEvent, {x : event.data.global.x, y : event.data.global.y}));
                    break;
                case 1:
                    this._onMouseDownMiddle.next(new MouseEventArgs(event.data.originalEvent, {x : event.data.global.x, y : event.data.global.y}));
                    break;

            }});
    }

    private subscribeMouseDownRight(): void {
        this.interactionManager.on('rightdown', (event: PIXI.InteractionEvent) => {
            if (event.stopped){
                return;
            }
            this._onMouseDownRight.next(new MouseEventArgs(event.data.originalEvent, {x : event.data.global.x, y : event.data.global.y}));
        });
    }

    private subscribeDoubleClick(htmlElement: HTMLElement): void {
        htmlElement.addEventListener('dblclick',
            (event) => this._onMouseDoubleClickLeft.next(new MouseEventArgs(event, {x : event.pageX - htmlElement.offsetLeft, y : event.pageY - htmlElement.offsetTop})),
            false);
    }
}
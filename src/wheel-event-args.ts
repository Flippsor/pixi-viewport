export class WheelEventArgs {

  public wheelDelta: number;
  public mousePoint: { x: number, y: number };

  public shiftModifier: boolean;
  public altModifier: boolean;
  public ctrlModifier: boolean;

  public originalEvent: WheelEvent;

  constructor(private wheelEvent: WheelEvent, private mousePointer: { x: number, y: number }) {
    this.wheelDelta = wheelEvent.deltaY;
    this.shiftModifier = wheelEvent.shiftKey;
    this.altModifier = wheelEvent.altKey;
    this.ctrlModifier = wheelEvent.ctrlKey;
    this.mousePoint = mousePointer;
    this.originalEvent = wheelEvent;
  }

  public stopPropagation(): void {
    this.wheelEvent.stopPropagation();
  }

  public preventDefaults(): void {
    this.wheelEvent.preventDefault();
  }
}

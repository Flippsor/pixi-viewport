export class MouseEventArgs {

  public mousePoint: { x: number, y: number };

  public shiftModifier: boolean;
  public altModifier: boolean;
  public ctrlModifier: boolean;

  public originalEvent: MouseEvent | TouchEvent;

  constructor(private mouseEvent: MouseEvent | TouchEvent, mousePoint: { x: number, y: number }) {
    this.mousePoint = mousePoint;
    this.shiftModifier = mouseEvent.shiftKey;
    this.altModifier = mouseEvent.altKey;
    this.ctrlModifier = mouseEvent.ctrlKey;
    this.originalEvent = mouseEvent;
  }

  public stopPropagation(): void {
    this.mouseEvent.preventDefault();
    this.mouseEvent.stopPropagation();
  }

  public preventDefaults(): void {
    this.mouseEvent.preventDefault();
  }
}

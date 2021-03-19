```javascript
const renderer = new flup.CanvasRenderer(document.body, 0x393939);
const viewport = new flup.Viewport(renderer);
viewport.addContainer(new PIXI.Graphics().beginFill(0x654321).drawCircle(400, 400, 30), 10);
const overlay = new flup.Overlay(renderer);

viewport.addContainer(new PIXI.Graphics().beginFill(0x654321).drawCircle(600, 600, 30));
viewport.addContainer(new PIXI.Graphics().beginFill(0x654321).drawCircle(800, 800, 30));
overlay.addContainer(new PIXI.Graphics().beginFill(0x345128).drawCircle(400, 400, 30));

new flup.GridContainer(viewport);
new flup.CoordinateOrigin(viewport);
window.addEventListener("resize", () => renderer.resize());
```

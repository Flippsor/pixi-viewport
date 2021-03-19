import * as PIXI from 'pixi.js';
import * as canvas from '@flippsor/viewport';

### Installation
```npm install @flippsor/viewport```

### Code (Renderer + Viewport + Overlay)

```javascript
const renderer = new canvas.CanvasRenderer(document.body, 0x393939);

const viewport = new canvas.Viewport(renderer);
viewport.addContainer(new PIXI.Graphics().beginFill(0x654321).drawCircle(400, 400, 30), 10);

const overlay = new canvas.Overlay(renderer);
viewport.addContainer(new PIXI.Graphics().beginFill(0x654321).drawCircle(600, 600, 30));
viewport.addContainer(new PIXI.Graphics().beginFill(0x654321).drawCircle(800, 800, 30));
overlay.addContainer(new PIXI.Graphics().beginFill(0x345128).drawCircle(400, 400, 30));

new canvas.GridContainer(viewport);
new canvas.CoordinateOrigin(viewport);

window.addEventListener("resize", () => renderer.resize());
```

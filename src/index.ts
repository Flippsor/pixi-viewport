import * as PIXI from "pixi.js";
import "./style.css";
import { CanvasRenderer } from "./scaliro-pixi-viewport/canvas-renderer";
import { Viewport } from "./scaliro-pixi-viewport/viewport";

window.onload = async (): Promise<void> => {
    const renderer = new CanvasRenderer(document.body, 0x393939);
    const viewport = new Viewport(renderer);
    renderer.addContainer(new PIXI.Graphics().beginFill(0x123456).drawCircle(500, 500, 50));
    viewport.addContainer(new PIXI.Graphics().beginFill(0x654321).drawCircle(200, 200, 30));
    window.addEventListener("resize", () => renderer.resize());
};



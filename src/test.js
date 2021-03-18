import { CanvasRenderer } from "./scaliro-pixi-viewport/canvas-renderer";
import { Viewport } from "./scaliro-pixi-viewport/viewport";
import * as PIXI from "pixi.js";
import "./style.css";

window.onload = async () => {
    const renderer = new CanvasRenderer(document.body, 0x393939);
    const viewport = new Viewport(renderer);
    renderer.addContainer(new PIXI.Graphics().beginFill(0x123456).drawCircle(500, 500, 50))
    window.addEventListener("resize", () => renderer.resize());
};
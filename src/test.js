import { CanvasRenderer } from "./scaliro-pixi-viewport/canvas-renderer";
import { Viewport } from "./scaliro-pixi-viewport/viewport";
import * as PIXI from "pixi.js";
import "./style.css";
import { Overlay } from "./scaliro-pixi-viewport/overlay";

window.onload = async () => {
    const renderer = new CanvasRenderer(document.body, 0x393939);
    const viewport = new Viewport(renderer);
    const overlay = new Overlay(renderer);
    renderer.addContainer(new PIXI.Graphics().beginFill(0x123456).drawCircle(500, 500, 50));
    viewport.addContainer(new PIXI.Graphics().beginFill(0x654321).drawCircle(800, 800, 30));
    overlay.addContainer(new PIXI.Graphics().beginFill(0x345128).drawCircle(200, 200, 30));
    window.addEventListener("resize", () => renderer.resize());
};
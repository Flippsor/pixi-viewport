import { CanvasRenderer } from "./pixi-viewport/canvas-renderer";
import { Viewport } from "./pixi-viewport/viewport";
import * as PIXI from "pixi.js";
import "./style.css";
import { Overlay } from "./pixi-viewport/overlay";
import { GridContainer } from "./pixi-viewport/grid-container";
import { CoordinateOrigin } from "./pixi-viewport/coordinate-origin";

window.onload = async () => {
    const renderer = new CanvasRenderer(document.body, 0x393939);
    const viewport = new Viewport(renderer);
    const overlay = new Overlay(renderer);

    viewport.addContainer(new PIXI.Graphics().beginFill(0x654321).drawCircle(400, 400, 30));
    viewport.addContainer(new PIXI.Graphics().beginFill(0x654321).drawCircle(600,600, 30));
    viewport.addContainer(new PIXI.Graphics().beginFill(0x654321).drawCircle(800, 800, 30));
    overlay.addContainer(new PIXI.Graphics().beginFill(0x345128).drawCircle(200, 200, 30));
    overlay.addContainer(new PIXI.Graphics().beginFill(0x345128).drawCircle(400, 400, 30));

    new GridContainer(viewport);
    new CoordinateOrigin(viewport);
    window.addEventListener("resize", () => renderer.resize());
};
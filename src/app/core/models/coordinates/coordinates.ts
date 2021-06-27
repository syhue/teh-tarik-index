import { CoordinatesModel } from "./coordinates.model";

export class Coordinates {
    x: number;
    y: number;

    constructor(model: CoordinatesModel) {
        this.x = model.x;
        this.y = model.y;
    }
}
import { SelectiveModel } from "./selective-options.model";

export class Selective<T> {
    name!: string;
    value!: T;

    constructor(model: SelectiveModel<T>) {
        this.name = model.name;
        this.value = model.value;
    }
}
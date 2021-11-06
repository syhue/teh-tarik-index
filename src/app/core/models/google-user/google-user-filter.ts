import { GoogleUserFilterModel } from "./google-user-filter.model";

export class GoogleUserFilter {
    email: string;
    name: string;
    link: string;
    firstName: string;
    lastName: string;

    constructor(model: GoogleUserFilterModel) {
        this.email = model?.It ? model.It: '';
        this.name = model?.Ve ? model.Ve : '';
        this.link = model?.gJ ? model.gJ: '';
        this.firstName = model?.dS ? model.dS : '';
        this.lastName = model?.hU ? model.hU : '';
    }
}
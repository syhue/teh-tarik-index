import { GoogleUserFilterModel } from "./google-user-filter.model";

export class GoogleUserFilter {
    email: string;
    name: string;
    link: string;
    firstName: string;
    lastName: string;

    constructor(model: GoogleUserFilterModel) {
        this.email = model?.Tt ? model.Tt: '';
        this.name = model?.Se ? model.Se : '';
        this.link = model?.SJ ? model.SJ: '';
        this.firstName = model?.wU ? model.wU : '';
        this.lastName = model?.NS ? model.NS : '';
    }
}

export class Client {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    phone: string;
    website: string;
    company: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}


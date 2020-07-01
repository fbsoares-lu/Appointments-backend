import {uuid} from 'uuidv4';

interface AppointmentDTO {
    provider: string;

    date: Date;
}

export default class Appointment {
    id: string;

    provider: string;

    date: Date;

    constructor(provider:string, date: Date) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}
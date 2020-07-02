import Appointments from '../models/Appointment';
import { isEqual } from 'date-fns';

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

export default class AppointmentRepository {

    private appointmentRepository: Appointments[] ;

    constructor() {
        this.appointmentRepository = [];
    }

    public all(): Appointments[] {
        return this.appointmentRepository;
    }

    public create({provider, date}: CreateAppointmentDTO): Appointments {

        const appointment = new Appointments(provider, date);

        this.appointmentRepository.push(appointment);

        return appointment;
    }

    public findAppointment(date: Date): Appointments | null {

        const findAppointmentInSameDate = this.appointmentRepository.find(appointment => 
            isEqual(date, appointment.date)
        );
        //huhuhu

        return findAppointmentInSameDate || null;
    }
}
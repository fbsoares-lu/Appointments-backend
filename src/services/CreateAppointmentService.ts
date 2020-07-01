import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface appointmentsType {
    provider: string;
    date: Date;
}

export default class CreateAppointmentService {
    private appointment: AppointmentRepository;

    constructor(appointment: AppointmentRepository) {
        this.appointment = appointment;
    }

    public execute({provider, date}: appointmentsType): Appointment | null {

        const startHour = startOfHour(date);

        const findAppointmentInSameDate = this.appointment.findAppointment(startHour);

        if(findAppointmentInSameDate) {
            throw Error('This appointment is alredy booked!');
        }

        const appointments = this.appointment.create({
            provider,
            date: startHour,
        });

        return appointments || null;
    }
}
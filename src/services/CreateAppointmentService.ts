import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface appointmentsType {
    provider: string;
    date: Date;
}

export default class CreateAppointmentService {

    public async execute({provider, date}: appointmentsType): Promise<Appointment> {

        const appointment = getCustomRepository(AppointmentRepository);

        const startHour = startOfHour(date);

        const findAppointmentInSameDate = await appointment.findAppointment(startHour);

        if(findAppointmentInSameDate) {
            throw Error('This appointment is alredy booked!');
        }

        const appointments = appointment.create({
            provider,
            date: startHour,
        });

        await appointment.save(appointments);

        return appointments;
    }
}
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface appointmentsType {
    provider_id: string;
    date: Date;
}

export default class CreateAppointmentService {

    public async execute({provider_id, date}: appointmentsType): Promise<Appointment> {

        const appointment = getCustomRepository(AppointmentRepository);

        const startHour = startOfHour(date);

        const findAppointmentInSameDate = await appointment.findAppointment(startHour);

        if(findAppointmentInSameDate) {
            throw Error('This appointment is alredy booked!');
        }

        const appointments = appointment.create({
            provider_id,
            date: startHour,
        });

        await appointment.save(appointments);

        return appointments;
    }
}
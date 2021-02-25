import { startOfHour } from 'date-fns';

import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('ApponitmentRepository')
        private appointment: IAppointmentsRepository
    ){};

    public async execute({provider_id, date}: IRequest): Promise<Appointment> {
        const startHour = startOfHour(date);

        const findAppointmentInSameDate = await this.appointment.findAppointment(startHour);

        if(findAppointmentInSameDate) {
            throw new AppError('This appointment is alredy booked!');
        }

        const appointments = await this.appointment.create({
            provider_id,
            date: startHour,
        });

        return appointments;
    }
};

export default CreateAppointmentService;
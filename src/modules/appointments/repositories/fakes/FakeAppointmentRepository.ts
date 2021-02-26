import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
 
class AppointmentRepository implements IAppointmentsRepository{
    private appointments: Appointment[] = [];

    public async findAppointment(date: Date): Promise<Appointment | undefined> {
        const appointment = this.appointments.find(
            appointment => isEqual(appointment.date, date)
        );
        
        return appointment;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, {
            id: uuid(),
            provider_id,
            date
        });
        
        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentRepository;
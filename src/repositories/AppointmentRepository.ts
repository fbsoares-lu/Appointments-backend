import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
export default class AppointmentRepository extends Repository<Appointment>{

    public async  findAppointment(date: Date): Promise<Appointment | null> {

        const findAppointmentInSameDate = await this.findOne({
            where: {date}
        })

        return findAppointmentInSameDate || null;
    }
}
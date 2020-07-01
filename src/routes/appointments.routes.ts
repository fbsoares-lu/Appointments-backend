import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/appointmentRepository';

const appointmentsRoutes = Router();

const appointments = new AppointmentRepository();

appointmentsRoutes.post('/', (request, response) => {

    const { provider, date } = request.body;

    const parserDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointments.findAppointment(parserDate);

    if(findAppointmentInSameDate) {
        return response
            .status(400)
            .json({error: 'This appointment is alredy booked!'});
    }

    const appointment = appointments.create({
        provider,
        date: parserDate,
    });

    return response.json(appointment);
});

appointmentsRoutes.get('/', (request, response) => {

    const appointment = appointments.all();

    return response.json(appointment);
}); 

export default appointmentsRoutes;


import { Router } from 'express';
import { parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRoutes = Router();

const appointments = new AppointmentRepository();

appointmentsRoutes.post('/', (request, response) => {

    try {
        const { provider, date } = request.body;

        const parserDate = parseISO(date);

        const AppointmentService = new CreateAppointmentService(appointments);

        const appointment = AppointmentService.execute({
            provider,
            date: parserDate
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({error: err.message });
    }
});

appointmentsRoutes.get('/', (request, response) => {

    const appointment = appointments.all();

    return response.json(appointment);
}); 

export default appointmentsRoutes;


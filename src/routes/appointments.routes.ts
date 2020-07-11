import { Router } from 'express';
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parserDate = parseISO(date);

        const AppointmentService = new CreateAppointmentService();

        const appointment = await AppointmentService.execute({
            provider_id,
            date: parserDate
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({error: err.message });
    }
});

appointmentsRoutes.get('/', (request, response) => {
    const appointmentRespository = getCustomRepository(AppointmentRepository);

    const appointment = appointmentRespository.find();

    return response.json(appointment);
}); 

export default appointmentsRoutes;


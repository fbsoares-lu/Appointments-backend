import { Router } from 'express';
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRoutes = Router();


appointmentsRoutes.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body;

        const parserDate = parseISO(date);

        const AppointmentService = new CreateAppointmentService();

        const appointment = await AppointmentService.execute({
            provider,
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


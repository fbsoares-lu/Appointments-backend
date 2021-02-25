import { Router } from 'express';
import { parseISO } from 'date-fns'
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.post('/', async (request, response) => {
    
    const { provider_id, date } = request.body;

    const parserDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
        provider_id,
        date: parserDate
    });

    return response.json(appointment);
    
});

// appointmentsRoutes.get('/', (request, response) => {
//     const appointmentRespository = getCustomRepository(AppointmentRepository);

//     const appointment = appointmentRespository.find();

//     return response.json(appointment);
// }); 

export default appointmentsRoutes;


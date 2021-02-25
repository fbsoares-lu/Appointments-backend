import { Request, Response } from 'express';

import { parseISO } from 'date-fns'
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
    public async create(request: Request, response: Response){
        const { provider_id, date } = request.body;

        const parserDate = parseISO(date);

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            provider_id,
            date: parserDate
        });

        return response.json(appointment);
    };
};

export default AppointmentsController;
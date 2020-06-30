import { Router } from 'express';

import { uuid } from 'uuidv4';

import { startOfHour, parseISO, isEqual} from 'date-fns'

const appointmentsRoutes = Router();

interface AppointmentsInterface {
    id: string,
    provider: string,
    date: Date,
}

const appointments: AppointmentsInterface[] = [];

appointmentsRoutes.post('/',(request, response) => {

    const { provider, date } = request.body;

    const parserDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointments.find(appointment => 
        isEqual(parserDate, appointment.date)
    );

    if(findAppointmentInSameDate) {
        return response
            .status(400)
            .json({error: 'This appointment is alredy booked!'});
    }

    const appointment = {
        id: uuid(),
        provider,
        date: parserDate,
    }
    appointments.push(appointment);

    return response.json(appointment);
});

export default appointmentsRoutes;


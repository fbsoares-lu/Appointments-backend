import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

describe('CreateAppointment', () => {
    it('should be to create a new appointment', async () => {
        const appointmentRepository = new FakeAppointmentRepository();
        const createAppointmentService = new CreateAppointmentService(appointmentRepository);

        const appointment = await createAppointmentService.execute({
            date: new Date(),
            provider_id: '123123'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentRepository = new FakeAppointmentRepository();
        const createAppointmentService = new CreateAppointmentService(appointmentRepository);

        const appointment = await createAppointmentService.execute({
            date: new Date(),
            provider_id: '123123'
        });

        expect(
            createAppointmentService.execute({
                date: new Date(),
                provider_id: '123123'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
})

import { SendTestResultUseCase, SendTokenUseCase } from '@mail-sender-service/application/use-cases';
import { IEmailDomainService } from '@mail-sender-service/domain/services';
import { MailSenderDelegator } from '../mail-sender.delegator';
import { of } from 'rxjs';

describe('MailSenderDelegator', () => {
    let mailSenderDelegator: MailSenderDelegator;
    let mailServiceMock: jest.Mocked<IEmailDomainService>;

    beforeEach(() => {
        mailServiceMock = {
            sendEmail: jest.fn()
        } as jest.Mocked<IEmailDomainService>;
    });

    describe('toSendTestResultUseCase', () => {
        it('should create an instance of SendTestResultUseCase', () => {
            mailSenderDelegator = new MailSenderDelegator(mailServiceMock);
            mailSenderDelegator.toSendTestResultUseCase();

            expect(mailSenderDelegator['delegate']).toBeInstanceOf(SendTestResultUseCase);
        });
    });

    describe('toSendTokenUseCase', () => {
        it('should create an instance of SendTokenUseCase', () => {
            mailSenderDelegator = new MailSenderDelegator(mailServiceMock);
            mailSenderDelegator.toSendTokenUseCase();

            expect(mailSenderDelegator['delegate']).toBeInstanceOf(SendTokenUseCase);
        });
    });

    describe('execute', () => {
        it('should execute the delegate use case with the given arguments', () => {
            mailSenderDelegator = new MailSenderDelegator(mailServiceMock);
            mailSenderDelegator.toSendTestResultUseCase();
            const mockResponse = { success: true };
            const delegateExecuteSpy = jest.spyOn(mailSenderDelegator['delegate'], 'execute').mockReturnValueOnce(of(mockResponse));

            const result = mailSenderDelegator.execute<any>({ test: 'data' });

            
            expect(delegateExecuteSpy).toHaveBeenCalledWith({ test: 'data' });
        });
    });
});
import { MailAdapter } from './../adpters/mail-adpter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';
interface SubmitFeedbackUseCaseRequest {
   type: string;
   comment: string;
   screenshot?: string; 
}

export class SubmitFeedbackUseCase{


    constructor(
       private feedbacksRepository: FeedbacksRepository,
       private mailAdapter: MailAdapter
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const {type, comment, screenshot} = request;

        await this.feedbacksRepository.create({
            type, comment, screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<p>Tipo do feedback ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" alt="screenshot" />` : '',
            ].join('')
        })
    }

    
}
import { MailAdapter, SandMailData } from "../mail-adpter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "113391d07aea3f",
        pass: "66a1a339944b22"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    
    async sendMail({ subject, body }: SandMailData){
         await transport.sendMail({
        from: 'Equipe Feedget <oi@feedback.com>',
        to: 'Diego Silva <digssilva2000@gmail.com> ',
        subject,
        html: body
    });
    }
}
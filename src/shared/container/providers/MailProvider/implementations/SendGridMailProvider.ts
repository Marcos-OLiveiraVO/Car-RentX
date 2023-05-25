import nodemailer, { Transporter } from "nodemailer";
import { IMailProvider } from "../IMailProvider";
import { injectable } from "tsyringe";

import handlebars, { template } from "handlebars";
import fs from "fs";

import sgMail, { MailDataRequired } from "@sendgrid/mail";

@injectable()
class SendGridMailProvider implements IMailProvider {
  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY;

    sgMail.setApiKey(apiKey);
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message: MailDataRequired = {
      from: "Rentx <marcosoliveira.rd@gmail.com>",
      to,
      subject,
      html: templateHTML,
    };

    await sgMail
      .send(message)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export { SendGridMailProvider };

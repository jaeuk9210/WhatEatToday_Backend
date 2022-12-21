import { Twilio } from "twilio";

const twilioClient = new Twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

export const sendSMS = (to: string, body: string) => {
  return twilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE,
  });
};

export const sendVerificationSMS = (to: string, key: string) =>
  sendSMS(to, `인증번호는 [${key}]입니다.`);

export const makeCode = (): string => {
  let code = "";
  for (let i = 0; i < 6; i++) code += Math.floor(Math.random() * 10);

  return code;
};

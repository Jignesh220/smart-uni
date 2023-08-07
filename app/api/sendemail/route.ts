import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/mailer";
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, htmltable,subject,name } = reqBody;
    console.log(email);
    console.log(htmltable);

    const mailer = await sendEmail({ email, htmltable,subject,name });
    return NextResponse.json({ message: "Email Sent", sucess: true,mailer });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

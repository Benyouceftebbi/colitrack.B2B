import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sms = searchParams.get("sms");
  const phoneNumber = searchParams.get("phoneNumber");
  const senderId = searchParams.get("senderId");
  const smsToken = searchParams.get("smsToken");

  if (!sms || !phoneNumber || !senderId || !smsToken) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get("https://smspro-plus.com/playsms/index.php", {
      params: {
        app: "ws",
        u: "AcademySync",
        h: "e5034db5d93bd95a26710e83ac6c1aac",
        op: "pv",
        to: phoneNumber,
        msg: sms,
        unicode: 1,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to send SMS" },
      { status: 500 }
    );
  }
}
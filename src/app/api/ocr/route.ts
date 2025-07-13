import { NextRequest, NextResponse } from "next/server";
import { scanWithVision } from "@/utils/googleVision";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file)
    return NextResponse.json({ error: "Aucune image" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");

  const text = await scanWithVision(base64);

  console.log("text", text);

  // const response = await fetch(process.env.EXPRESS_API + "/uniqs", {
  //   method: "POST",
  //   body: JSON.stringify({ code_id: text }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const data = await response.json();

  if (text) {
    return NextResponse.json(
      { message: "Billet trouvé, vous êtes inscrit dans la raffle" },
      { status: 200 }
    );
  }

  return NextResponse.json({ message: "Billet non trouvé" }, { status: 200 });
}

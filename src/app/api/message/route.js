import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  readDB();
  const roomId = request.nextUrl.searchParams.get("roomId");

  //let filtered = DB.messages;

  const foundIndex

  if(roomId !== null)
  return NextResponse.json({
    ok: true,
    message: DB.messages,
  });
  // const message = DB.message;

  //   let filtered = message;
  //   if (roomId !== null) {
  //     filtered = filtered.filter((x) => x.roomId === roomId);
  //     return NextResponse.json({
  //       ok: true,
  //       message: DB.message,
  //     });
  //   } else {
  //     return NextResponse.json(
  //       {
  //         ok: false,
  //         message: `Room is not found`,
  //       },
  //       { status: 404 }
  //     );
  //   }
};

export const POST = async (request) => {
  readDB();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: `Room is not found`,
  //   },
  //   { status: 404 }
  // );

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    // messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request) => {
  let role = null;
  try {
    const payload = checkToken();
    role = payload.role;
  } catch {
    return NextResponse.json(
      {
        ok: true,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  if (role === "ADMIN")
    return NextResponse.json(
      {
        ok: true,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();
  const foundIndex = DB.message.findIndex(
    (x) => x.messageId === body.messageId
  );
  if (foundIndex === -1)
    return NextResponse.json(
      {
        ok: false,
        message: "Message is not found",
      },
      { status: 404 }
    );

  DB.message.splice(foundIndex, 1);

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};

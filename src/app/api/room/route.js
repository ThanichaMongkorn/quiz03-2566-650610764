import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    totalRooms: DB.rooms.length,
  });
};

export const POST = async (request) => {
  let role = null;

  try {
    const payload = checkToken();
    role = payload.role;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  readDB();
  const body = await request.json();
  //ชื่อห้องซ้ำ
  const foundRoom = DB.rooms.findIndex((r) => r.roomsName === body.roomsName);
  if (foundRoom >= 0) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${body.roomsName} already exists`,
        //message: `Room ${"replace this with room name"} already exists`,
      },
      { status: 400 }
    );
  }
  //ถ้าชื่อไม่ซ้ำ
  const roomId = nanoid(body);

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${body.roomsName} has been created`,
  });
};

import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Thanicha Mongkorn",
    studentId: "650610764",
  });
};

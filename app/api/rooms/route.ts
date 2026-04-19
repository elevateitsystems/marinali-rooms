import { NextResponse } from "next/server";
import { RoomService } from "@/lib/services/roomService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang");
  const isOfferParam = searchParams.get("isOffer");
  const isOffer = isOfferParam === "true" ? true : isOfferParam === "false" ? false : undefined;
  
  const isHighlightParam = searchParams.get("isHighlight");
  const isHighlight = isHighlightParam === "true" ? true : isHighlightParam === "false" ? false : undefined;

  try {
    if (lang) {
      const rooms = await RoomService.getRooms(lang, isOffer, isHighlight);
      return NextResponse.json(rooms);
    } else {
      const rooms = await RoomService.getAllRooms();
      return NextResponse.json(rooms);
    }
  } catch (error) {
    console.error("[API Rooms GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const room = await RoomService.createRoom(body);
    return NextResponse.json(room);
  } catch (error: any) {
    console.error("[API Rooms POST] Error details:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });
    return NextResponse.json({ 
      error: "Failed to create room",
      details: error.message
    }, { status: 500 });
  }
}

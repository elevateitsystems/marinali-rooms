import { NextResponse } from "next/server";
import { RoomService } from "@/lib/services/roomService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const room = await RoomService.getRoomById(id);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }
    return NextResponse.json(room);
  } catch (error) {
    console.error("[API Room ID GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch room" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const room = await RoomService.updateRoom(id, body);
    return NextResponse.json(room);
  } catch (error) {
    console.error("[API Room ID PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const room = await RoomService.updateRoom(id, body);
    return NextResponse.json(room);
  } catch (error) {
    console.error("[API Room ID PATCH] Error:", error);
    return NextResponse.json({ error: "Failed to update room status" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await RoomService.deleteRoom(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API Room ID DELETE] Error:", error);
    return NextResponse.json({ error: "Failed to delete room" }, { status: 500 });
  }
}

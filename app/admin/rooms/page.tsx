"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Globe, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { CustomTable, Column } from "@/components/common/CustomTable";
import { RoomModal } from "@/components/admin/RoomModal";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Room {
  id: string;
  image: string;
  imageKey?: string | null;
  location: string;
  order: number;
  isOffer: boolean;
  isHighlight: boolean;
  isLargeHighlight: boolean;
  nameEn: string;
  nameIt: string;
  nameDe: string;
  descriptionEn: string;
  descriptionIt: string;
  descriptionDe: string;
}

export default function RoomsListPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const { data: rooms = [], isLoading, isError } = useQuery<Room[]>({
    queryKey: ["rooms", "all"],
    queryFn: async () => {
      const response = await fetch("/api/rooms");
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: string;[key: string]: any }) => {
      const response = await fetch(`/api/rooms/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update status");
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      const field = Object.keys(variables).find(k => k !== 'id');
      toast.success(`${field === 'isOffer' ? 'Offer' : 'Highlight' || 'Status'} updated`);
    },
    onError: () => toast.error("Failed to update status"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/rooms/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Room deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => {
      toast.error("Failed to delete room");
    },
  });

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the room and all its translations (🇬🇧, 🇮🇹, 🇩🇪) permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#123149", // Matching the "Add Room" button color
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-xl border border-slate-200 shadow-2xl",
        title: "text-2xl font-bold text-slate-800",
        confirmButton: "rounded-lg px-6 py-2.5 font-semibold",
        cancelButton: "rounded-lg px-6 py-2.5 font-semibold",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRoom(null);
    setIsModalOpen(true);
  };

  const columns: Column<Room>[] = [
    {
      header: "Room Information & Translations",
      cell: (room) => (
        <div className="border border-slate-300 rounded overflow-hidden shadow-sm flex bg-white w-full">
          {/* Room Base Info: Image & Location */}
          <div className="w-[180px] flex flex-col items-center justify-center p-4 bg-slate-50/50 border-r border-slate-300 flex-shrink-0">
            <div className="w-28 h-28 rounded border border-slate-200 bg-white overflow-hidden mb-3 shadow-inner">
              {room.image ? (
                <img src={room.image} alt="room" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  <ImageIcon size={32} />
                </div>
              )}
            </div>
            <div className="text-center px-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">LOCATION</span>
              <span className="text-xs font-semibold text-slate-700 break-words">{room.location}</span>
              <div className="mt-2 text-[10px] font-mono text-slate-400">ORDER: {room.order}</div>
            </div>
          </div>

          {/* Translation Matrix */}
          <div className="flex-1 flex flex-col">
            {[
              { code: "EN", flag: "🇬🇧", title: room.nameEn, desc: room.descriptionEn },
              { code: "IT", flag: "🇮🇹", title: room.nameIt, desc: room.descriptionIt },
              { code: "DE", flag: "🇩🇪", title: room.nameDe, desc: room.descriptionDe },
            ].map((lang, idx) => (
              <div
                key={lang.code}
                className={cn(
                  "grid grid-cols-[60px_200px_500px] flex-1",
                  idx !== 2 && "border-b border-slate-300",
                )}
              >
                {/* Lang Code */}
                <div className="border-r border-slate-300 flex items-center justify-center p-2 bg-slate-50/30">
                  <span className={cn("px-2 py-0.5 rounded text-[12px] font-black shadow-sm flex items-center gap-1")}>
                    <span>{lang.flag}</span>
                    {lang.code}
                  </span>
                </div>

                {/* Title */}
                <div className="border-r border-slate-300 p-3 flex items-center">
                  <span className="text-sm font-bold text-slate-900 leading-tight">
                    {lang.title || <span className="text-slate-300 font-normal italic">No Title</span>}
                  </span>
                </div>

                {/* Description */}
                <div className="p-3 flex items-center bg-white/50">
                  <p className="text-[12px] text-slate-600 leading-relaxed italic line-clamp-4">
                    {lang.desc || <span className="text-slate-300 italic">No description provided for this language.</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      header: "Offer Status",
      className: "w-[120px] text-center",
      cell: (room) => (
        <div className="flex flex-col items-center gap-2 p-2 group">
          <Switch
            checked={room.isOffer}
            onCheckedChange={(checked) => toggleStatusMutation.mutate({ id: room.id, isOffer: checked })}
          />
          <span className={cn(
            "text-[10px] text-nowrap font-bold tracking-tight px-2 py-0.5 rounded-full transition-all",
            room.isOffer
              ? "bg-blue-100 text-blue-700 shadow-sm"
              : "bg-gray-100 text-gray-400 opacity-60"
          )}>
            {room.isOffer ? 'ACTIVE OFFER' : 'STANDARD'}
          </span>
        </div>
      )
    },
    {
      header: "Highlight Status",
      className: "w-[120px] text-center",
      cell: (room) => (
        <div className="flex flex-col items-center gap-2 p-2 group">
          <Switch
            checked={room.isHighlight}
            onCheckedChange={(checked) => toggleStatusMutation.mutate({ id: room.id, isHighlight: checked })}
          />
          <div className="flex flex-col items-center gap-1">
            <span className={cn(
              "text-[10px] font-bold tracking-tight px-2 py-0.5 rounded-full transition-all",
              room.isHighlight
                ? "bg-amber-100 text-amber-700 shadow-sm"
                : "bg-gray-100 text-gray-400 opacity-60"
            )}>
              {room.isHighlight ? 'HIGHLIGHTED' : 'STANDARD'}
            </span>
            {room.isHighlight && (
              <span
                className={cn(
                  "text-[9px] font-medium cursor-pointer hover:underline transition-all",
                  room.isLargeHighlight ? "text-blue-600" : "text-gray-400"
                )}
                onClick={() => toggleStatusMutation.mutate({ id: room.id, isLargeHighlight: !room.isLargeHighlight })}
              >
                {room.isLargeHighlight ? 'Large Layout' : 'Small Layout'}
              </span>
            )}
          </div>
        </div>
      )
    },
    {
      header: "Actions",
      className: "w-[120px] text-right",
      cell: (room) => (
        <div className="flex justify-end gap-1 px-4">
          <button
            onClick={() => handleEdit(room)}
            title="Edit Room"
            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-lg transition-all"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => handleDelete(room.id)}
            disabled={deleteMutation.status === "pending"}
            title="Delete Room"
            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-all"
          >
            {deleteMutation.status === "pending" && deleteMutation.variables === room.id ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full gap-8 p-6 md:p-12 overflow-hidden bg-slate-50/50">
      <div className="flex justify-between items-center px-1">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unified Rooms</h1>
          <p className="text-gray-500 mt-2">Manage room listings and translations across all languages.</p>
        </div>
        <Button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#123149] text-white px-5 py-2.5 rounded-lg hover:bg-[#123149]/90 transition-all shadow-md active:scale-95"
        >
          <Plus size={18} />
          Add Room
        </Button>
      </div>

      <CustomTable
        data={rooms}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        emptyMessage="No rooms found. Create a unified room to get started."
        rowKey={(room) => room.id}
        className="flex-1"
      />

      <RoomModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

// Helper to avoid import bloat for a simple class
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

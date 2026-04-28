"use client";

import { useState, useEffect } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Bed,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Layers,
  Save,
  Loader2,
  X
} from "lucide-react";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";

interface RoomsManagerProps {
  lang: string;
}

export function RoomsManager({ lang }: RoomsManagerProps) {
  const queryClient = useQueryClient();
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);
  const [localRooms, setLocalRooms] = useState<any[]>([]);
  const [changedRoomIds, setChangedRoomIds] = useState<Set<string>>(new Set());
  const [roomTabs, setRoomTabs] = useState<Record<string, "content" | "gallery">>({});

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await fetch("/api/rooms");
      if (!res.ok) throw new Error("Failed to fetch rooms");
      return res.json();
    },
  });

  // Sync local state with query data when it loads or changes
  useEffect(() => {
    if (rooms && changedRoomIds.size === 0) {
      setLocalRooms(rooms);
    }
  }, [rooms, changedRoomIds.size]);



  const updateMutation = useMutation({
    mutationFn: async (room: any) => {
      const res = await fetch(`/api/rooms/${room.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      });
      if (!res.ok) throw new Error(`Failed to update room ${room.slug}`);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setChangedRoomIds(prev => {
        const next = new Set(prev);
        next.delete(data.id);
        return next;
      });
      toast.success(`Room ${data.slug} saved!`);
    },
    onError: (err) => {
      toast.error("Failed to save room changes.");
      console.error(err);
    },
  });

  const handleFieldChange = (roomId: string, field: string, value: any, isTranslation = false) => {
    setLocalRooms(prev => prev.map(r => {
      if (r.id !== roomId) return r;

      const updated = { ...r };
      if (isTranslation) {
        if (!updated.translations[lang]) updated.translations[lang] = {};
        updated.translations[lang] = { ...updated.translations[lang], [field]: value };
      } else {
        updated[field] = value;
      }
      return updated;
    }));
    setChangedRoomIds(prev => new Set(prev).add(roomId));
  };

  const saveRoom = (roomId: string) => {
    const room = localRooms.find(r => r.id === roomId);
    if (room) {
      updateMutation.mutate(room);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-900" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Bed className="text-blue-900" />
            Le Suite Management
          </h2>
          <p className="text-slate-500 text-sm">Manage your rooms, descriptions, and galleries.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {localRooms?.map((room: any) => {
          const isExpanded = expandedRoom === room.id;
          const hasChanges = changedRoomIds.has(room.id);
          const t = room.translations[lang] || room.translations['en'] || {};


          return (
            <div key={room.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-blue-200">
              {/* Header */}
              <div
                className="p-6 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedRoom(isExpanded ? null : room.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                    <img src={room.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 uppercase">{t.name || "Unnamed Room"}</h3>
                    <p className="text-sm text-slate-500">{t.location || "No location set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase bg-slate-100 px-2 py-1 rounded text-slate-500">
                    {room.slug}
                  </span>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-8 border-t border-slate-100 bg-slate-50/50 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
                  {/* Tabs & Save Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit">
                      <button
                        onClick={() => setRoomTabs(prev => ({ ...prev, [room.id]: "content" }))}
                        className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${(roomTabs[room.id] || "content") === "content"
                          ? "bg-white text-blue-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                          }`}
                      >
                        Room Content
                      </button>
                      <button
                        onClick={() => setRoomTabs(prev => ({ ...prev, [room.id]: "gallery" }))}
                        className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${roomTabs[room.id] === "gallery"
                          ? "bg-white text-blue-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                          }`}
                      >
                        Image Gallery
                      </button>
                    </div>

                    {hasChanges && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          saveRoom(room.id);
                        }}
                        disabled={updateMutation.isPending}
                        className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:opcaity-90 transition-all active:scale-95 disabled:opacity-50 animate-in fade-in slide-in-from-right-4 cursor-pointer"
                      >
                        {updateMutation.isPending && expandedRoom === room.id ? (
                          <Loader2 className="animate-spin" size={14} />
                        ) : (
                          <Save size={14} />
                        )}
                        SAVE CHANGES
                      </button>
                    )}
                  </div>

                  {(roomTabs[room.id] || "content") === "content" ? (
                    <div className="space-y-8 animate-in fade-in duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Side: Basic Info */}
                        <div className="space-y-6">
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Room Name</label>
                            <input
                              type="text"
                              value={t.name || ""}
                              onChange={(e) => handleFieldChange(room.id, 'name', e.target.value, true)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Location</label>
                            <input
                              type="text"
                              value={t.location || ""}
                              onChange={(e) => handleFieldChange(room.id, 'location', e.target.value, true)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Capacity</label>
                            <input
                              type="text"
                              value={t.capacity || ""}
                              onChange={(e) => handleFieldChange(room.id, 'capacity', e.target.value, true)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                          </div>
                        </div>

                        {/* Right Side: Description */}
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Description</label>
                          <textarea
                            rows={8}
                            value={t.description || ""}
                            onChange={(e) => handleFieldChange(room.id, 'description', e.target.value, true)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                          />
                        </div>
                      </div>

                      {/* Amenities Section */}
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Amenities</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {t.amenities?.map((amenity: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-2 group">
                              <input
                                type="text"
                                value={amenity}
                                onChange={(e) => {
                                  const newAmenities = [...t.amenities];
                                  newAmenities[idx] = e.target.value;
                                  handleFieldChange(room.id, 'amenities', newAmenities, true);
                                }}
                                className="flex-1 text-sm bg-transparent border-none focus:ring-0 p-0"
                              />
                              <button
                                onClick={() => {
                                  const newAmenities = [...t.amenities];
                                  newAmenities.splice(idx, 1);
                                  handleFieldChange(room.id, 'amenities', newAmenities, true);
                                }}
                                className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const newAmenities = [...(t.amenities || [])];
                              newAmenities.push("");
                              handleFieldChange(room.id, 'amenities', newAmenities, true);
                            }}
                            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg p-2 text-sm transition-all border border-dashed border-slate-300"
                          >
                            <Plus size={14} /> Add Amenity
                          </button>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="space-y-8 animate-in fade-in duration-300">
                      {/* Media Section */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Main Image */}
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block flex items-center gap-2">
                            <ImageIcon size={14} /> Main Image
                          </label>
                          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 group border border-slate-200 shadow-inner">
                            <img src={room.image} alt="Main" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  if (res && res[0]) handleFieldChange(room.id, 'image', res[0].url);
                                }}
                                appearance={{
                                  button: "bg-white !text-slate-900 px-4 py-2 rounded-lg font-bold text-xs uppercase shadow-xl hover:bg-blue-50 transition-all",
                                  allowedContent: "hidden"
                                }}
                                content={{
                                  button: "Change Photo"
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Gallery Images */}
                        <div className="md:col-span-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block flex items-center gap-2">
                            <Layers size={14} /> Gallery Images
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {room.images?.map((img: string, idx: number) => (
                              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 group border border-slate-200 shadow-sm">
                                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                <button
                                  onClick={() => {
                                    const newImages = [...room.images];
                                    newImages.splice(idx, 1);
                                    handleFieldChange(room.id, 'images', newImages);
                                  }}
                                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                            <div className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50/50 hover:bg-slate-100 transition-all group overflow-hidden">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  if (res && res[0]) {
                                    const newImages = [...(room.images || [])];
                                    newImages.push(res[0].url);
                                    handleFieldChange(room.id, 'images', newImages);
                                  }
                                }}
                                appearance={{
                                  button: "w-full h-full bg-transparent !text-slate-400 font-bold text-xs uppercase flex flex-col items-center justify-center gap-2",
                                  allowedContent: "hidden"
                                }}
                                content={{
                                  button: (
                                    <>
                                      <Plus size={24} />
                                      <span>Add Photo</span>
                                    </>
                                  )
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}


                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}


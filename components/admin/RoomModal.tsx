"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Save, Globe } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "@/components/common/FileUploader";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

interface Room {
  id?: string;
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

interface RoomModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

const initialData: Room = {
  nameEn: "",
  nameIt: "",
  nameDe: "",
  location: "Positano, Italy",
  descriptionEn: "",
  descriptionIt: "",
  descriptionDe: "",
  image: "",
  imageKey: null,
  order: 0,
  isOffer: false,
  isHighlight: false,
  isLargeHighlight: false,
};

type Language = "en" | "it" | "de";

export function RoomModal({ room, isOpen, onClose }: RoomModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Room>(initialData);
  const [activeTab, setActiveTab] = useState<Language>("en");

  useEffect(() => {
    if (room) {
      setFormData(room);
    } else {
      setFormData(initialData);
    }
  }, [room, isOpen]);

  const mutation = useMutation({
    mutationFn: async (data: Room) => {
      const url = room?.id ? `/api/rooms/${room.id}` : "/api/rooms";
      const method = room?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Operation failed");
      return response.json();
    },
    onSuccess: () => {
      toast.success(room?.id ? "Room updated successfully" : "Room created successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("Please upload an image for the room");
      return;
    }
    mutation.mutate(formData);
  };

  const handleImageChange = (url: string, key: string | null) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
      imageKey: key,
    }));
  };

  const languages: { key: Language; label: string; flag: string }[] = [
    { key: "en", label: "English", flag: "🇬🇧" },
    { key: "it", label: "Italian", flag: "🇮🇹" },
    { key: "de", label: "German", flag: "🇩🇪" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[1000px] max-h-[95vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{room ? "Edit Room" : "Add New Room"}</DialogTitle>
            <DialogDescription>
              Enter the room details for all supported languages.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
            {/* LEFT COLUMN: TRANSLATIONS */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                {languages.map((lang) => (
                  <button
                    key={lang.key}
                    type="button"
                    onClick={() => setActiveTab(lang.key)}
                    className={cn(
                      "px-4 py-1.5 text-xs font-bold rounded-md transition-all",
                      activeTab === lang.key
                        ? "bg-white text-[#123149] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{lang.flag}</span>
                      {lang.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* EN SECTION */}
              <div className={cn("space-y-4", activeTab !== "en" && "hidden")}>
                <div className="space-y-2">
                  <Label className="font-bold flex items-center gap-2">
                    <Globe size={14} className="text-blue-500" /> 🇬🇧 Room Name (English)
                  </Label>
                  <Input
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    placeholder="e.g., DELUXE POOLSIDE ROOM"
                    required={activeTab === "en"}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Description (English)</Label>
                  <Textarea
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    placeholder="English description..."
                    className="h-20 resize-none"
                    required={activeTab === "en"}
                  />
                </div>
              </div>

              {/* IT SECTION */}
              <div className={cn("space-y-4", activeTab !== "it" && "hidden")}>
                <div className="space-y-2">
                  <Label className="font-bold flex items-center gap-2">
                    <Globe size={14} className="text-green-600" /> 🇮🇹 Room Name (Italian)
                  </Label>
                  <Input
                    value={formData.nameIt}
                    onChange={(e) => setFormData({ ...formData, nameIt: e.target.value })}
                    placeholder="e.g., CAMERA DELUXE BORDO PISCINA"
                    required={activeTab === "it"}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Description (Italian)</Label>
                  <Textarea
                    value={formData.descriptionIt}
                    onChange={(e) => setFormData({ ...formData, descriptionIt: e.target.value })}
                    placeholder="Descrizione in italiano..."
                    className="h-20 resize-none"
                    required={activeTab === "it"}
                  />
                </div>
              </div>

              {/* DE SECTION */}
              <div className={cn("space-y-4", activeTab !== "de" && "hidden")}>
                <div className="space-y-2">
                  <Label className="font-bold flex items-center gap-2">
                    <Globe size={14} className="text-red-500" /> 🇩🇪 Room Name (German)
                  </Label>
                  <Input
                    value={formData.nameDe}
                    onChange={(e) => setFormData({ ...formData, nameDe: e.target.value })}
                    placeholder="e.g., DELUXE-ZIMMER AM POOL"
                    required={activeTab === "de"}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Description (German)</Label>
                  <Textarea
                    value={formData.descriptionDe}
                    onChange={(e) => setFormData({ ...formData, descriptionDe: e.target.value })}
                    placeholder="Beschreibung auf Deutsch..."
                    className="h-20 resize-none"
                    required={activeTab === "de"}
                  />
                </div>
              </div>

              {/* <hr className="border-gray-300" /> */}

              {/* SHARED FIELDS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Positano, Italy"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Display Order</label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg border border-green-200 bg-green-50/50">
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block transition-colors">Special Offer</span>
                    <span className="text-[10px] text-slate-500">Show in homepage offers slider</span>
                  </div>
                  <Switch
                    checked={formData.isOffer}
                    onCheckedChange={(checked) => setFormData({ ...formData, isOffer: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg border border-amber-200 bg-amber-50/50">
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block transition-colors">Homepage Highlight</span>
                    <span className="text-[10px] text-slate-500">Show in homepage highlights grid</span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Switch
                      checked={formData.isHighlight}
                      onCheckedChange={(checked) => setFormData({ ...formData, isHighlight: checked })}
                    />
                    {formData.isHighlight && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 font-medium">Large Layout</span>
                        <Switch
                          disabled={!formData.isHighlight}
                          checked={formData.isLargeHighlight}
                          onCheckedChange={(checked) => setFormData({ ...formData, isLargeHighlight: checked })}
                          className="scale-75 origin-right"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: SHARED IMAGE */}
            <div className="space-y-4">
              <FileUploader
                label="Shared Room Image"
                value={formData.image}
                imageKey={formData.imageKey}
                onChange={handleImageChange}
                aspectRatio="4/3"
              />

            </div>
          </div>

          <DialogFooter className="sticky bottom-0  pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.status === "pending"}
              className="bg-[#123149] hover:bg-[#123149]/90"
            >
              {mutation.status === "pending" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {room ? "Save Unified Room" : "Create Unified Room"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

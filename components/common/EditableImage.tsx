"use client";

import { useState } from "react";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { ImageIcon, Loader2, Edit2, Check, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface EditableImageProps {
  lang: string;
  page: string;
  path: string;
  currentValue: string;
  className?: string;
  label?: string;
}

export default function EditableImage({
  lang,
  page,
  path,
  currentValue,
  className = "",
  label = "Change Image"
}: EditableImageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { startUpload } = useUploadThing("imageUploader");

  const mutation = useMutation({
    mutationFn: async (newUrl: string) => {
      const res = await fetch(`/api/content/${lang}/${page}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, value: newUrl }),
      });
      if (!res.ok) throw new Error("Failed to update image");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Image updated successfully!");
      const LANGUAGES = ["en", "it", "de"];
      LANGUAGES.forEach(l => {
        queryClient.invalidateQueries({ queryKey: ["content", l, page] });
      });
      setIsUploading(false);
      setPendingFile(null);
      setPreviewUrl(null);
    },
    onError: (err) => {
      toast.error("Failed to update image path in database.");
      console.error(err);
      setIsUploading(false);
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPendingFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!pendingFile) return;
    setIsUploading(true);
    try {
      const res = await startUpload([pendingFile]);
      if (res && res[0]) {
        mutation.mutate(res[0].url);
      } else {
        setIsUploading(false);
      }
    } catch (error) {
      setIsUploading(false);
      toast.error("Upload failed");
    }
  };

  const handleCancel = () => {
    setPendingFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Visual Preview for pending upload */}
      {previewUrl && (
        <div className="absolute inset-0 z-10 rounded-inherit overflow-hidden border-4 border-blue-500 shadow-2xl animate-in zoom-in-95 duration-200">
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-widest animate-pulse">
            Preview Mode
          </div>
        </div>
      )}

      {/* Upload Trigger Container */}
      <div className={cn(
        "z-20 flex items-center gap-2 bg-white/90 p-1 rounded-xl shadow-2xl border border-slate-200 backdrop-blur-md transition-all",
        previewUrl ? "fixed bottom-10 left-1/2 -translate-x-1/2 scale-110" : "absolute top-28 right-4"
      )}>
        {pendingFile ? (
          <div className="flex items-center gap-1">
            <button
              onClick={handleSave}
              disabled={isUploading || mutation.isPending}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-green-700 transition-all disabled:opacity-50"
            >
              {isUploading || mutation.isPending ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Check size={14} />
              )}
              Apply Changes
            </button>
            <button
              onClick={handleCancel}
              disabled={isUploading || mutation.isPending}
              className="flex items-center gap-2 bg-slate-100 text-slate-600 px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-slate-200 transition-all"
            >
              <X size={14} />
              Discard
            </button>
          </div>
        ) : (
          <label className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer">
            <ImageIcon size={14} />
            <span>{label}</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}

// Add Check icon to the imports at top

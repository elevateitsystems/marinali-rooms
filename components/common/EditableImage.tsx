"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { ImageIcon, Loader2, Edit2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

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
      // Invalidate for all languages since images are global
      const LANGUAGES = ["en", "it", "de"];
      LANGUAGES.forEach(l => {
        queryClient.invalidateQueries({ queryKey: ["content", l, page] });
      });
      setIsUploading(false);
    },
    onError: (err) => {
      toast.error("Failed to update image path in database.");
      console.error(err);
      setIsUploading(false);
    }
  });

  return (
    <div className={`relative group ${className}`}>
      {/* Upload Trigger Container */}
      <div className="flex items-center justify-center bg-white/90 p-1 m-2 rounded-lg shadow-lg border border-slate-200 backdrop-blur-sm w-fit">
        <UploadButton
          endpoint="imageUploader"
          onUploadBegin={() => setIsUploading(true)}
          onClientUploadComplete={(res) => {
            if (res && res[0]) {
              mutation.mutate(res[0].url);
            } else {
              setIsUploading(false);
            }
          }}
          onUploadError={(error: Error) => {
            setIsUploading(false);
            toast.error(`Upload failed: ${error.message}`);
          }}
          appearance={{
            button: `bg-blue-900 text-white text-[10px] px-3 py-1.5 h-8 rounded-lg font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 ${isUploading || mutation.isPending ? "opacity-80 cursor-not-allowed" : ""
              }`,
            allowedContent: "hidden"
          }}
          content={{
            button: (isUploading || mutation.isPending) ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={14} />
                <span>Uploading...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ImageIcon size={14} />
                <span>{label}</span>
              </div>
            )
          }}
        />
      </div>
    </div>
  );
}

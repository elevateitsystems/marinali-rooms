"use client";

import { toast } from "sonner";
import { Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  label?: string;
  value: string;
  imageKey?: string | null;
  onChange: (url: string, key: string | null) => void;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait" | "4/3";
}

const aspectRatios = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
};

export function FileUploader({
  label = "Upload Image",
  value,
  imageKey,
  onChange,
  className,
  aspectRatio = "4/3",
}: FileUploaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <Label className="text-base font-bold">{label}</Label>
      
      {value ? (
        <div className={cn("relative group rounded-xl overflow-hidden border bg-gray-50 flex items-center justify-center", aspectRatios[aspectRatio])}>
          <img 
            src={value} 
            alt="Upload preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              type="button"
              variant="destructive" 
              size="sm" 
              onClick={() => onChange("", null)}
              className="h-9 flex items-center gap-2"
            >
              <X size={16} />
              Replace Image
            </Button>
          </div>
        </div>
      ) : (
        <div className={cn("border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-gray-50 transition-colors", aspectRatios[aspectRatio])}>
          <div className="p-4 rounded-full bg-blue-50 text-blue-500">
            <ImageIcon size={40} />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-bold">Select a file or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WebP up to 10MB</p>
          </div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]) {
                onChange(res[0].url, res[0].key);
                toast.success("Image uploaded successfully");
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(`Error: ${error.message}`);
            }}
            appearance={{
              button: "bg-[#123149] text-sm h-10 px-4",
              allowedContent: "hidden"
            }}
          />
        </div>
      )}
    </div>
  );
}

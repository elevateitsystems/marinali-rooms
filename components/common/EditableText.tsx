"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Pencil, Check, X, Edit } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditableTextProps {
  lang: string;
  page: string;
  path: string;
  initialValue: string;
  as?: any;
  className?: string;
  multiline?: boolean;
}

export default function EditableText({
  lang,
  page,
  path,
  initialValue,
  as: Component = "span",
  className = "",
  multiline = false
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const queryClient = useQueryClient();
  const inputRef = useRef<any>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const mutation = useMutation({
    mutationFn: async (newValue: string) => {
      const res = await fetch(`/api/content/${lang}/${page}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, value: newValue }),
      });
      if (!res.ok) throw new Error("Failed to update text");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Text updated successfully!", { className: "text-green-600 bg-green-50" });
      queryClient.invalidateQueries({ queryKey: [page, lang] });
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Failed to update text.");
      setValue(initialValue);
    }
  });

  const handleSave = () => {
    if (value !== initialValue) {
      mutation.mutate(value);
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };

  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className={`relative inline-block w-full max-w-full z-50 ${className}`}>
        {multiline ? (
          <textarea
            ref={inputRef}
            className="w-full font-sans text-base bg-white/90 backdrop-blur-md text-black p-3 border-2 border-blue-500 rounded-lg shadow-2xl outline-none min-h-[120px] resize-y"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <input
            ref={inputRef}
            className="w-full font-sans text-base bg-white/90 backdrop-blur-md text-black px-3 py-2 border-2 border-blue-500 rounded-lg shadow-2xl outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}
        <div className="absolute right-2 bottom-[-45px] flex gap-2 bg-white shadow-xl rounded-md p-1 border">
          <button
            onClick={handleSave}
            disabled={mutation.isPending}
            className="text-green-600 p-1.5 hover:bg-green-50 rounded"
            title="Save"
          >
            <Check size={18} strokeWidth={3} />
          </button>
          <button
            onClick={handleCancel}
            disabled={mutation.isPending}
            className="text-red-500 p-1.5 hover:bg-red-50 rounded"
            title="Cancel"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <Component className={`relative group w-fit ${className}`}>
      {value}
      <button
        onClick={() => setIsEditing(true)}
        className="absolute -right-10 top-0 opacity-0 group-hover:opacity-100 transition-all duration-200 text-primary p-2 z-20 cursor-pointer"
        aria-label="Edit text"
        title="Inline Edit"
      >
        <Edit size={14} />
      </button>
    </Component>
  );
}

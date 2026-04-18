"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
}

export default function SettingsPage() {
  const queryClient = useQueryClient();

  const { data: currentSettings, isLoading } = useQuery<ThemeSettings>({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Failed to fetch settings");
      return res.json();
    }
  });

  const [formData, setFormData] = useState<ThemeSettings>({
    primaryColor: "#123149",
    secondaryColor: "#F2DE97",
    backgroundColor: "#F8F6F2",
    textColor: "#111111",
    fontFamily: "var(--font-playfair)",
  });

  useEffect(() => {
    if (currentSettings) {
      setFormData(currentSettings);
    }
  }, [currentSettings]);

  const mutation = useMutation({
    mutationFn: async (updates: ThemeSettings) => {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['settings'], data);
      toast.success("Settings saved successfully!",);
      // Force reload to apply injected SSR CSS variables globally properly
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    },
    onError: () => {
      toast.error("Failed to save settings.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleColorChange = (key: keyof ThemeSettings, val: string) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  if (isLoading) {
    return (
      <div className="flex animate-pulse flex-col gap-6">
        <div className="h-8 w-64 bg-gray-200 rounded-md mb-8"></div>
        <div className="h-96 w-full bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Left Column: Form & Actions */}
      <div className="flex-1">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Theme Settings</h2>
          <p className="text-gray-500 mt-2">Manage the global colors and typography of your website. Changes apply immediately upon save.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="shadow-none border-gray-200">
            <CardHeader>
              <CardTitle>Colors & Fonts</CardTitle>
              <CardDescription>Adjust the primary aesthetics. Choose colors carefully to ensure good contrast.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Primary Color */}
                <div className="space-y-3">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="color"
                      id="primaryColor-picker"
                      className="w-14 h-14 p-1 cursor-pointer min-w-[56px]"
                      value={formData.primaryColor || "#000000"}
                      onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                    />
                    <Input
                      type="text"
                      className="font-mono uppercase flex-1"
                      value={formData.primaryColor || ""}
                      onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>

                {/* Secondary Color */}
                <div className="space-y-3">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="color"
                      id="secondaryColor-picker"
                      className="w-14 h-14 p-1 cursor-pointer min-w-[56px]"
                      value={formData.secondaryColor || "#000000"}
                      onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                    />
                    <Input
                      type="text"
                      className="font-mono uppercase flex-1"
                      value={formData.secondaryColor || ""}
                      onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div className="space-y-3">
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="color"
                      id="backgroundColor-picker"
                      className="w-14 h-14 p-1 cursor-pointer min-w-[56px]"
                      value={formData.backgroundColor || "#000000"}
                      onChange={(e) => handleColorChange("backgroundColor", e.target.value)}
                    />
                    <Input
                      type="text"
                      className="font-mono uppercase flex-1"
                      value={formData.backgroundColor || ""}
                      onChange={(e) => handleColorChange("backgroundColor", e.target.value)}
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div className="space-y-3">
                  <Label htmlFor="textColor">Text Color</Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="color"
                      id="textColor-picker"
                      className="w-14 h-14 p-1 cursor-pointer min-w-[56px]"
                      value={formData.textColor || "#000000"}
                      onChange={(e) => handleColorChange("textColor", e.target.value)}
                    />
                    <Input
                      type="text"
                      className="font-mono uppercase flex-1"
                      value={formData.textColor || ""}
                      onChange={(e) => handleColorChange("textColor", e.target.value)}
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>

              </div>

              {/* Typography */}
              <div className="border-t pt-8 space-y-3">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select
                  value={formData.fontFamily}
                  onValueChange={(val) => handleColorChange("fontFamily", val as string)}
                >
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="var(--font-geist-sans)">Geist Sans</SelectItem>
                    <SelectItem value="var(--font-playfair)">Playfair Display</SelectItem>
                    <SelectItem value="var(--font-montserrat)">Montserrat</SelectItem>
                    <SelectItem value="var(--font-lora)">Lora</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">This font class is applied globally to headings and body text.</p>
              </div>
            </CardContent>

            <CardFooter className="border-t flex justify-end bg-gray-50 rounded-b-xl border-gray-200 px-6 py-4">
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>

      {/* Right Column: Live Preview Pane */}
      <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0 lg:mt-24">
        <div className="sticky top-8 flex flex-col min-h-[560px] max-h-[calc(100vh-4rem)] border border-gray-200 rounded-xl overflow-hidden shadow-2xl bg-white">
          {/* Browser Header Bar (Faux Chrome) */}
          <div className="bg-gray-100 flex items-center px-4 py-3 gap-2 border-b">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="mx-auto text-xs font-mono text-gray-400 bg-white px-8 py-1 rounded-md text-center shadow-sm">
              Live Preview
            </div>
            <div className="w-12"></div> {/* Spacer for flex balance */}
          </div>

          {/* Simulated Website Frame */}
          <div
            className="flex-1 flex flex-col overflow-y-auto transition-colors duration-500 relative"
            style={{
              backgroundColor: formData.backgroundColor,
              color: formData.textColor,
              fontFamily: formData.fontFamily
            }}
          >
            {/* Navbar */}
            <div className="flex items-center justify-between px-5 py-1 border-b border-current/10">
              <div className="font-bold text-xl drop-shadow-sm" style={{ color: formData.primaryColor }}>
                Marinali
              </div>
              <div className="flex gap-5 text-[10px] uppercase font-bold tracking-widest opacity-80">
                <span>Rooms</span>
                <span>Offers</span>
                <span>Contact</span>
              </div>
            </div>

            {/* Banner / Hero */}
            <div className="relative flex flex-col items-center justify-center text-center px-6 py-3 border-b border-current/5" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--background)]/20"></div>
              <h1 className="text-2xl font-bold mb-2 tracking-tight z-10">Welcome Home</h1>
              <p className="text-[10px] opacity-70 mb-4 max-w-[250px] leading-relaxed z-10">
                Experience luxury and tranquility wrapped in our newly tailored aesthetics.
              </p>
              <button
                type="button"
                className="px-4 py-2 shadow-xl tracking-widest uppercase text-[10px] font-bold z-10 transition-transform hover:scale-105"
                style={{ backgroundColor: formData.primaryColor, color: '#fff' }}
              >
                Book Your Stay
              </button>
            </div>

            {/* Main Content Area */}
            <div className="px-5 py-3 flex-1">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-3">
                <span className="w-4 h-[1px] block" style={{ backgroundColor: formData.primaryColor }}></span>
                Our Services
              </h2>
              <p className="text-[10px] leading-relaxed opacity-80 mb-5">
                This environment simulates your exact configurations. Try tweaking the settings on the left to see how different hues stack up against the background and font-family choices.
              </p>

              <div className="flex gap-4">
                <div className="flex-1 rounded-sm border border-current/10 p-3 flex flex-col gap-3 shadow-sm bg-white/5">
                  <div className="w-8 h-8 rounded-full shadow-md" style={{ backgroundColor: formData.secondaryColor }}></div>
                  <div className="h-2 w-full bg-current/20 rounded"></div>
                  <div className="h-2 w-2/3 bg-current/20 rounded"></div>
                </div>
                <div className="flex-1 rounded-sm border border-current/10 p-4 flex flex-col gap-3 shadow-sm bg-white/5">
                  <div className="w-8 h-8 rounded-full shadow-md" style={{ backgroundColor: formData.primaryColor }}></div>
                  <div className="h-2 w-full bg-current/20 rounded"></div>
                  <div className="h-2 w-2/3 bg-current/20 rounded"></div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-2 px-3 py-3 border-t border-white/10" style={{ backgroundColor: formData.primaryColor, color: '#fff' }}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-md font-bold tracking-wide">Marinali</span>
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center p-1"></div>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center p-1"></div>
                </div>
              </div>
              <div className="h-[1px] w-full bg-white/20 mb-4"></div>
              <div className="flex justify-between text-[9px] opacity-70 tracking-widest uppercase font-mono">
                <span>© Copyright 2026</span>
                <div className="flex gap-3">
                  <span>Privacy</span>
                  <span>Terms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

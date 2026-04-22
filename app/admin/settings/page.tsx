"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FileUploader } from "@/components/common/FileUploader";
import { ImageIcon, Plus, Trash2, GripVertical, X } from "lucide-react";
import { SettingsSkeleton } from "./_components/SettingsSkeleton";
import { SettingsPreview } from "./_components/SettingsPreview";
import { ThemeSettings, FooterConfig } from "./_components/types";

const DEFAULT_FOOTER_CONFIG: Record<string, FooterConfig> = {
  en: {
    columns: [
      {
        title: "Locations",
        links: [
          { label: "MARINALI EL GOUNA", url: "#" },
          { label: "MARINALI MADONNA", url: "#" },
          { label: "MARINALI NORTH COAST", url: "#" },
          { label: "MARINALI RHODES", url: "#" },
          { label: "MARINALI SAMOS", url: "#" },
        ],
      },
      {
        title: "Quick Links",
        links: [
          { label: "ABOUT US", url: "#" },
          { label: "MANAGE MY BOOKING", url: "#" },
          { label: "COMPANY INFORMATION", url: "#" },
          { label: "CONTACT US", url: "#" },
          { label: "CAREER", url: "#" },
        ],
      },
    ],
    socialLinks: [
      { icon: "instagram", url: "https://instagram.com" },
      { icon: "facebook", url: "https://facebook.com" },
      { icon: "linkedin", url: "https://linkedin.com" },
      { icon: "youtube", url: "https://youtube.com" },
    ],
    copyright: "© 2026 Marinali Rooms, All rights reserved",
    bottomLinks: [
      { label: "Privacy Policy", url: "#" },
      { label: "Cookie Policy", url: "#" },
      { label: "User Generated Content", url: "#" },
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11311.238128362706!2d10.428581023773539!3d44.86608935447101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47801be6ca7f363b%3A0xc3f83737ec38a2e!2sMarinali%20Rooms!5e0!3m2!1sen!2sit!4v1709669524458!5m2!1sen!2sit",
    address: "Piazza dell Unita', 1\n40128 Bologna, Italy",
    phone: "+39 123 456 7890",
    email: "info@marinalirooms.com",
    whatsapp: "+391234567890",
  },
  it: {
    columns: [
      {
        title: "Sedi",
        links: [
          { label: "MARINALI EL GOUNA", url: "#" },
          { label: "MARINALI MADONNA", url: "#" },
          { label: "MARINALI NORTH COAST", url: "#" },
          { label: "MARINALI RHODES", url: "#" },
          { label: "MARINALI SAMOS", url: "#" },
        ],
      },
      {
        title: "Link Rapidi",
        links: [
          { label: "CHI SIAMO", url: "#" },
          { label: "GESTISCI PRENOTAZIONE", url: "#" },
          { label: "INFORMAZIONI AZIENDALI", url: "#" },
          { label: "CONTATTACI", url: "#" },
          { label: "CARRIERA", url: "#" },
        ],
      },
    ],
    socialLinks: [
      { icon: "instagram", url: "https://instagram.com" },
      { icon: "facebook", url: "https://facebook.com" },
      { icon: "linkedin", url: "https://linkedin.com" },
      { icon: "youtube", url: "https://youtube.com" },
    ],
    copyright: "© 2026 Marinali Rooms, Tutti i diritti riservati",
    bottomLinks: [
      { label: "Privacy Policy", url: "#" },
      { label: "Cookie Policy", url: "#" },
      { label: "Contenuti degli utenti", url: "#" },
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11311.238128362706!2d10.428581023773539!3d44.86608935447101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47801be6ca7f363b%3A0xc3f83737ec38a2e!2sMarinali%20Rooms!5e0!3m2!1sen!2sit!4v1709669524458!5m2!1sen!2sit",
    address: "Piazza dell Unita', 1\n40128 Bologna, Italia",
    phone: "+39 123 456 7890",
    email: "info@marinalirooms.com",
    whatsapp: "+391234567890",
  },
  de: {
    columns: [
      {
        title: "Standorte",
        links: [
          { label: "MARINALI EL GOUNA", url: "#" },
          { label: "MARINALI MADONNA", url: "#" },
          { label: "MARINALI NORTH COAST", url: "#" },
          { label: "MARINALI RHODES", url: "#" },
          { label: "MARINALI SAMOS", url: "#" },
        ],
      },
      {
        title: "Quick-Links",
        links: [
          { label: "ÜBER UNS", url: "#" },
          { label: "BUCHUNG VERWALTEN", url: "#" },
          { label: "UNTERNEHMENSINFORMATIONEN", url: "#" },
          { label: "KONTAKT", url: "#" },
          { label: "KARRIERE", url: "#" },
        ],
      },
    ],
    socialLinks: [
      { icon: "instagram", url: "https://instagram.com" },
      { icon: "facebook", url: "https://facebook.com" },
      { icon: "linkedin", url: "https://linkedin.com" },
      { icon: "youtube", url: "https://youtube.com" },
    ],
    copyright: "© 2026 Marinali Rooms, Alle Rechte vorbehalten",
    bottomLinks: [
      { label: "Datenschutz", url: "#" },
      { label: "Cookie-Richtlinie", url: "#" },
      { label: "Nutzerinhalte", url: "#" },
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11311.238128362706!2d10.428581023773539!3d44.86608935447101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47801be6ca7f363b%3A0xc3f83737ec38a2e!2sMarinali%20Rooms!5e0!3m2!1sen!2sit!4v1709669524458!5m2!1sen!2sit",
    address: "Piazza dell Unita', 1\n40128 Bologna, Italien",
    phone: "+39 123 456 7890",
    email: "info@marinalirooms.com",
    whatsapp: "+391234567890",
  },
};

const SOCIAL_ICON_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "twitter", label: "Twitter / X" },
  { value: "tiktok", label: "TikTok" },
];

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
    logo: null,
    logoKey: null,
    heroImage: null,
    heroImageKey: null,
    retreatImage: null,
    retreatImageKey: null,
    footerConfig: DEFAULT_FOOTER_CONFIG,
  });
  const [showPreviewDrawer, setShowPreviewDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState<"colors" | "images" | "footer">("colors");
  const [activeFooterLang, setActiveFooterLang] = useState<"en" | "it" | "de">("en");

  useEffect(() => {
    if (currentSettings) {
      setFormData({
        ...currentSettings,
        footerConfig: currentSettings.footerConfig || DEFAULT_FOOTER_CONFIG,
      });
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
      toast.success("Settings saved successfully!");
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

  // Footer config helpers
  const footerConfigs = formData.footerConfig || DEFAULT_FOOTER_CONFIG;
  const fc = footerConfigs[activeFooterLang] || DEFAULT_FOOTER_CONFIG[activeFooterLang];

  const updateFooterConfig = (updates: Partial<FooterConfig>) => {
    setFormData(prev => {
      const currentConfigs = prev.footerConfig || DEFAULT_FOOTER_CONFIG;
      const currentLangConfig = currentConfigs[activeFooterLang] || DEFAULT_FOOTER_CONFIG[activeFooterLang];

      return {
        ...prev,
        footerConfig: {
          ...currentConfigs,
          [activeFooterLang]: { ...currentLangConfig, ...updates }
        },
      };
    });
  };

  const addColumn = () => {
    updateFooterConfig({ columns: [...fc.columns, { title: "New Column", links: [] }] });
  };

  const removeColumn = (colIdx: number) => {
    updateFooterConfig({ columns: fc.columns.filter((_, i) => i !== colIdx) });
  };

  const updateColumnTitle = (colIdx: number, title: string) => {
    const cols = [...fc.columns];
    cols[colIdx] = { ...cols[colIdx], title };
    updateFooterConfig({ columns: cols });
  };

  const addLinkToColumn = (colIdx: number) => {
    const cols = [...fc.columns];
    cols[colIdx] = { ...cols[colIdx], links: [...cols[colIdx].links, { label: "New Link", url: "#" }] };
    updateFooterConfig({ columns: cols });
  };

  const removeLinkFromColumn = (colIdx: number, linkIdx: number) => {
    const cols = [...fc.columns];
    cols[colIdx] = { ...cols[colIdx], links: cols[colIdx].links.filter((_, i) => i !== linkIdx) };
    updateFooterConfig({ columns: cols });
  };

  const updateLinkInColumn = (colIdx: number, linkIdx: number, field: "label" | "url", value: string) => {
    const cols = [...fc.columns];
    const links = [...cols[colIdx].links];
    links[linkIdx] = { ...links[linkIdx], [field]: value };
    cols[colIdx] = { ...cols[colIdx], links };
    updateFooterConfig({ columns: cols });
  };

  const addSocialLink = () => {
    updateFooterConfig({ socialLinks: [...fc.socialLinks, { icon: "instagram", url: "" }] });
  };

  const removeSocialLink = (idx: number) => {
    updateFooterConfig({ socialLinks: fc.socialLinks.filter((_, i) => i !== idx) });
  };

  const updateSocialLink = (idx: number, field: "icon" | "url", value: string) => {
    const socials = [...fc.socialLinks];
    socials[idx] = { ...socials[idx], [field]: value };
    updateFooterConfig({ socialLinks: socials });
  };

  const addBottomLink = () => {
    updateFooterConfig({ bottomLinks: [...fc.bottomLinks, { label: "New Link", url: "#" }] });
  };

  const removeBottomLink = (idx: number) => {
    updateFooterConfig({ bottomLinks: fc.bottomLinks.filter((_, i) => i !== idx) });
  };

  const updateBottomLink = (idx: number, field: "label" | "url", value: string) => {
    const links = [...fc.bottomLinks];
    links[idx] = { ...links[idx], [field]: value };
    updateFooterConfig({ bottomLinks: links });
  };

  if (isLoading) return <SettingsSkeleton />;

  return (
    <div className="flex h-full overflow-hidden bg-[oklch(0.98_0_0)]">
      {/* Left Column: Form & Actions */}
      <div className="flex-1 h-full p-6 overflow-y-auto  scrollbar-hide">
        <div className="sticky -top-6 z-20 bg-[oklch(0.98_0_0)] py-6 mb-2 border-b border-gray-200/50 backdrop-blur-sm -mt-4">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
              <p className="text-gray-500 mt-2">Manage colors, branding, and footer content across all languages.</p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex bg-gray-100/80 p-1 rounded-xl w-fit">
                {[
                  { id: "colors", label: "Colors & Fonts" },
                  { id: "images", label: "Logo & Images" },
                  { id: "footer", label: "Footer" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === tab.id
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="h-8 w-[1px] bg-gray-200 hidden xl:block" />

              <Button
                onClick={() => handleSubmit({ preventDefault: () => { } } as any)}
                disabled={mutation.isPending}
                className="bg-primary text-white shadow-lg px-8 py-6 rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {mutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="pt-6">
          {activeTab === "images" && (
            <Card className="shadow-none border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CardHeader>
                <CardTitle>Branding & Assets</CardTitle>
                <CardDescription>Upload your website logo and manage hero banners.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <FileUploader
                    label="Site Logo"
                    value={formData.logo || ""}
                    imageKey={formData.logoKey}
                    onChange={(url, key) => setFormData(prev => ({ ...prev, logo: url, logoKey: key }))}

                  />
                  <FileUploader
                    label="Hero Banner"
                    value={formData.heroImage || ""}
                    imageKey={formData.heroImageKey}
                    onChange={(url, key) => setFormData(prev => ({ ...prev, heroImage: url, heroImageKey: key }))}

                  />
                  <FileUploader
                    label="Retreat Banner"
                    value={formData.retreatImage || ""}
                    imageKey={formData.retreatImageKey}
                    onChange={(url, key) => setFormData(prev => ({ ...prev, retreatImage: url, retreatImageKey: key }))}

                  />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex gap-4">
                  <div className="bg-blue-600/10 p-2.5 rounded-full h-fit mt-0.5">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-900 leading-tight">Asset Guidelines</h4>
                    <p className="text-xs text-blue-700/80 leading-relaxed mt-1.5 max-w-xl">
                      For high-resolution displays, we recommend images at least 1920px wide for banners.
                      Transparent PNGs are best for logos. Changes apply site-wide after saving.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "colors" && (
            <Card className="shadow-none border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CardHeader>
                <CardTitle>Colors & Typography</CardTitle>
                <CardDescription>Adjust the global aesthetics. Choose colors that ensure high contrast for accessibility.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-10">
                {/* Color Scheme */}
                <div className="space-y-6">
                  <Label className="text-base font-bold text-gray-900 border-l-4 border-blue-500 pl-3">Color Palette</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {[
                      { key: "primaryColor", label: "Primary Color", desc: "Used for buttons, navbar, and major accents." },
                      { key: "secondaryColor", label: "Secondary Color", desc: "Used for highlights and subtle details." },
                      { key: "backgroundColor", label: "Background", desc: "The main background color of your site." },
                      { key: "textColor", label: "Text Color", desc: "Primary color for all readability." },
                    ].map((item) => (
                      <div key={item.key} className="space-y-4 group">
                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl transition-all group-hover:bg-white border border-transparent group-hover:border-gray-200 group-hover:shadow-sm">
                          <div className="space-y-1">
                            <Label htmlFor={item.key} className="text-sm font-semibold text-gray-800">{item.label}</Label>
                            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-gray-400 uppercase">{formData[item.key as keyof ThemeSettings] as string}</span>
                            <div className="relative overflow-hidden w-10 h-10 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-all cursor-pointer ring-1 ring-gray-100">
                              <Input
                                type="color"
                                id={item.key}
                                value={formData[item.key as keyof ThemeSettings] as string}
                                onChange={(e) => handleColorChange(item.key as keyof ThemeSettings, e.target.value)}
                                className="absolute -top-2 -left-2 w-[200%] h-[200%] scale-150 cursor-pointer p-0 opacity-0"
                              />
                              <div
                                className="w-full h-full pointer-events-none"
                                style={{ backgroundColor: formData[item.key as keyof ThemeSettings] as string }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
            </Card>
          )}

          {activeTab === "footer" && (
            <Card className="shadow-none border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Footer Configuration</CardTitle>
                    <CardDescription>Manage your site's bottom navigation, social links, and legal text.</CardDescription>
                  </div>

                  <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
                    {[
                      { id: "en", label: "EN" },
                      { id: "it", label: "IT" },
                      { id: "de", label: "DE" }
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        type="button"
                        onClick={() => setActiveFooterLang(lang.id as any)}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeFooterLang === lang.id
                          ? "bg-white text-black shadow-sm"
                          : "text-gray-500 hover:text-gray-800"
                          }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Link Columns */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Link Columns</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addColumn}>
                      <Plus size={14} className="mr-1" /> Add Column
                    </Button>
                  </div>

                  {fc.columns.map((col, colIdx) => (
                    <div key={colIdx} className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50/50">
                      <div className="flex items-center gap-3">
                        <GripVertical size={16} className="text-gray-400 flex-shrink-0" />
                        <Input
                          value={col.title}
                          onChange={(e) => updateColumnTitle(colIdx, e.target.value)}
                          placeholder="Column Title"
                          className="flex-1 font-semibold"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeColumn(colIdx)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>

                      <div className="space-y-2 ml-7">
                        {col.links.map((link, linkIdx) => (
                          <div key={linkIdx} className="flex items-center gap-2">
                            <Input
                              value={link.label}
                              onChange={(e) => updateLinkInColumn(colIdx, linkIdx, "label", e.target.value)}
                              placeholder="Label"
                              className="flex-1 text-sm"
                            />
                            <Input
                              value={link.url}
                              onChange={(e) => updateLinkInColumn(colIdx, linkIdx, "url", e.target.value)}
                              placeholder="URL"
                              className="flex-1 text-sm font-mono"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-600 flex-shrink-0"
                              onClick={() => removeLinkFromColumn(colIdx, linkIdx)}
                            >
                              <X size={14} />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => addLinkToColumn(colIdx)}
                        >
                          <Plus size={14} className="mr-1" /> Add Link
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="border-t pt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Social Icons</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addSocialLink}>
                      <Plus size={14} className="mr-1" /> Add Icon
                    </Button>
                  </div>
                  {fc.socialLinks.map((social, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Select
                        value={social.icon}
                        onValueChange={(val) => updateSocialLink(idx, "icon", val as any)}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Select icon" />
                        </SelectTrigger>
                        <SelectContent>
                          {SOCIAL_ICON_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={social.url}
                        onChange={(e) => updateSocialLink(idx, "url", e.target.value)}
                        placeholder="URL"
                        className="flex-1 font-mono text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-600 flex-shrink-0"
                        onClick={() => removeSocialLink(idx)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Bottom Links */}
                <div className="border-t pt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Legal & Privacy Links</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addBottomLink}>
                      <Plus size={14} className="mr-1" /> Add Link
                    </Button>
                  </div>
                  {fc.bottomLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={link.label}
                        onChange={(e) => updateBottomLink(idx, "label", e.target.value)}
                        placeholder="Label"
                        className="flex-1 text-sm"
                      />
                      <Input
                        value={link.url}
                        onChange={(e) => updateBottomLink(idx, "url", e.target.value)}
                        placeholder="URL"
                        className="flex-1 text-sm font-mono"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-600 flex-shrink-0"
                        onClick={() => removeBottomLink(idx)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Copyright */}
                <div className="border-t pt-8 space-y-3">
                  <Label>Copyright Text</Label>
                  <Input
                    value={fc.copyright}
                    onChange={(e) => updateFooterConfig({ copyright: e.target.value })}
                    placeholder="© 2026 Marinali Rooms"
                    className="max-w-md"
                  />
                </div>

                {/* Contact & Map */}
                <div className="border-t pt-8 space-y-6">
                  <Label className="text-base font-semibold">Contact Info & Map</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-xs">Address</Label>
                      <textarea
                        value={fc.address || ""}
                        onChange={(e) => updateFooterConfig({ address: e.target.value })}
                        placeholder="Street, City, Country"
                        className="w-full min-h-[80px] p-2 text-sm border rounded-md"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Phone</Label>
                        <Input
                          value={fc.phone || ""}
                          onChange={(e) => updateFooterConfig({ phone: e.target.value })}
                          placeholder="+39 123 456 7890"
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Email</Label>
                        <Input
                          value={fc.email || ""}
                          onChange={(e) => updateFooterConfig({ email: e.target.value })}
                          placeholder="info@marinalirooms.com"
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">WhatsApp Number (e.g. +391234567890)</Label>
                        <Input
                          value={fc.whatsapp || ""}
                          onChange={(e) => updateFooterConfig({ whatsapp: e.target.value })}
                          placeholder="+391234567890"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs">Google Maps Embed URL</Label>
                    <Input
                      value={fc.mapUrl || ""}
                      onChange={(e) => updateFooterConfig({ mapUrl: e.target.value })}
                      placeholder="https://www.google.com/maps/embed?..."
                      className="text-sm font-mono"
                    />
                    <p className="text-[10px] text-gray-400 italic">Paste the "src" attribute from the Google Maps iframe embed code.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>

      <SettingsPreview
        formData={formData}
        fc={fc}
        showPreviewDrawer={showPreviewDrawer}
        setShowPreviewDrawer={setShowPreviewDrawer}
      />
    </div>
  );
}

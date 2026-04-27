import { LayoutDashboard, FileText, Settings, Image as ImageIcon, Globe } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { label: "Active Pages", value: "4", icon: FileText, color: "text-blue-900", bg: "bg-blue-50" },
    { label: "Languages", value: "3", icon: Globe, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Media Assets", value: "24", icon: ImageIcon, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const quickLinks = [
    { name: "Manage Content", href: "/admin/content", desc: "Edit text and images for all pages", icon: FileText },
    { name: "Site Settings", href: "/admin/settings", desc: "Logo, colors, and global config", icon: Settings },
  ];

  return (
    <div className="p-6 md:p-12 bg-slate-50/50 min-h-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here's an overview of your CMS.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-start gap-4"
          >
            <div className="p-3 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors">
              <link.icon className="text-slate-600 group-hover:text-blue-900" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                {link.name}
              </h3>
              <p className="text-sm text-slate-500 mt-1">{link.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

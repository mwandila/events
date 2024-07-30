
"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../../public/images/quick.png";
import { useState } from "react";
import { Calendar, Users, Ticket, Mail, Tag, MapPin, Briefcase, TrendingUp, Settings, Menu, X } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { href: "/admin/createevent", label: "Create Event", icon: <Calendar size={20} /> },
    { href: "/admin/myEvents", label: "Events", icon: <Calendar size={20} /> },
    { href: "/attendees", label: "Attendees", icon: <Users size={20} /> },
    { href: "/Tickets", label: "Tickets", icon: <Ticket size={20} /> },
    { href: "/venue-management", label: "Emails", icon: <Mail size={20} /> },
    { href: "/tag Mangement", label: "Tag Management", icon: <Tag size={20} /> },
    { href: "/venue-management", label: "Venue Management", icon: <MapPin size={20} /> },
    { href: "/sponsors", label: "Sponsors", icon: <Briefcase size={20} /> },
    { href: "/marketing", label: "Marketing", icon: <TrendingUp size={20} /> },
    { href: "/admin/analytics", label: "Analytics", icon: <TrendingUp size={20} /> },
    { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 md:hidden">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className={`bg-white flex flex-col justify-between items-center p-4 shadow-md h-full fixed top-0 left-0 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-0'} md:w-64 overflow-hidden`}>
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-center w-full mb-4">
            <Image src={logo} alt="Logo" width={100} height={50} />
          </div>
          <div className="flex flex-col gap-2 w-full items-center">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "default" : "outline"}
                asChild
                className="w-full justify-start"
              >
                <Link href={item.href} className="flex items-center gap-2">
                  {item.icon}
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 items-center mt-4">
          <UserButton />
        </div>
      </div>
    </>
  );
}
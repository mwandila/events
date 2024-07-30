import React from "react";
import EventsPage from "./categories/[[...category]]/page";
import AppLayout from "@/components/ui/layout";
import Footer from "@/components/ui/Footer/Footer";
import Header from "@/components/ui/Header/Header";

export default function Home() {
  return (
    <AppLayout> 
   
      <EventsPage />
     
     
    </AppLayout>
  );
}
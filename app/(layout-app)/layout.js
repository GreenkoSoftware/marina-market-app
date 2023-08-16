'use client'
import { Navigation } from "@/components/navigation/Navigation";
import  { Header }  from "./header";
export default function LayoutApp ({ children }) {
  return (
    <section className="min-h-screen flex flex-col bg-primary-200">
    <Header/>
    <div className="flex-1 flex flex-col sm:flex-row">
      <main className="flex-1">
        {children}
      </main>
      {/* Sidebar */}
      <nav className="order-first sm:w-[10rem]"></nav>
      {/* Right Sidebar */}
      <aside className="sm:w-[10rem]"></aside>
    </div>
    <footer className="h-[4rem] sm:h-[8rem]">
      <Navigation/>
    </footer>
    </section>
  );
}

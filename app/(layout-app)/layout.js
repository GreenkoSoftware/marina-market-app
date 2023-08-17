'use client'
import { Navigation } from "@/components/navigation/Navigation";
import  { Header }  from "./header";
export default function LayoutApp ({ children }) {
  return (
    <section className="min-h-screen w-full h-full flex flex-col bg-primary-200 dark:bg-secondary-500">
    <Header/>
    <div className="flex-1 flex flex-col sm:flex-row  overflow-y-scroll">
      <main className="flex-1">
        {children}
      </main>
      {/* Sidebar */}
      <nav className="order-first sm:w-[10rem]"></nav>
      {/* Right Sidebar */}
      <aside className="sm:w-[10rem]"></aside>
    </div>
    <footer className="sticky z-10 bg-primary-200  bottom-0 h-[4rem] sm:h-[8rem]">
      <Navigation/>
    </footer>
    </section>
  );
}

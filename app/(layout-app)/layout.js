'use client'
import { Navigation } from "@/components/navigation/Navigation";
import  { Header }  from "./header";
export default function LayoutApp ({ children }) {
  return (
    <section className="min-h-screen w-full h-full flex flex-col bg-primary-200 dark:bg-secondary-500">
    <header className="sticky z-20 bg-primary-200 dark:bg-secondary-500 top-0 h-[4rem]">
      <Header/>
    </header>
    <div className="flex-1 flex flex-col sm:flex-row  pt-[1rem]">
      <main className="flex-1 mx-[1rem] xl:mx-[14rem]">
        {children}
      </main>
    </div>
    <footer className="sticky z-20 bg-primary-200 dark:bg-secondary-500 bottom-0 h-[6rem] pt-[1rem]">
      <Navigation/>
    </footer>
    </section>
  );
}

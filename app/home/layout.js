'use client'
import SettingFooter from "@/app/home/footer";
import { motion } from "framer-motion"

export default function ApplicationLayout({ children }) {
  return (
    <section className="min-h-screen flex-1 flex flex-col bg-primary-300 dark:bg-secondary-500">
      <div className="flex-1 flex flex-col sm:flex-row">
        <main className="flex-1 flex h-[10rem] sm:h-[12rem]">
          {children}
        </main>
      </div>
      <footer className="h-[8rem] sm:h-[8rem] mr-5 sm:mr-5 mb-5 mt-2">

        <SettingFooter></SettingFooter>
      <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
        >
          <SettingFooter/>
        </motion.div>
      </footer>
    </section>
  );
}
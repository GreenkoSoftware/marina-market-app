import SettingFooter from "@/components/ui/settingsFooter";

export default function ApplicationLayout({ children }) {
  return (
    <section className="min-h-screen flex-1 flex flex-col bg-primary-300 dark:bg-secondary-500">
      <div className="flex-1 flex flex-col sm:flex-row">
        <main className="flex-1 flex h-[10rem] sm:h-[12rem]">
          {children}
        </main>
      </div>
      <footer className="h-[8rem] sm:h-[8rem] sm:mt-0 mt-20 mr-5 sm:mr-5 ">
            <SettingFooter></SettingFooter>
      </footer>
    </section>
  );
}
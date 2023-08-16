import SettingFooter from "@/components/ui/settingsFooter";

export default function LayoutApp ({ children }) {
  return (
    <section className="min-h-screen flex flex-col bg-primary-200 dark:bg-secondary-500">
      <div className="flex-1 flex flex-col sm:flex-row">
        <main className="flex-1">
          {children}
        </main>
      </div>
      <footer className="h-[8rem] sm:h-[8rem] bottom-0">
          <SettingFooter></SettingFooter>
      </footer>
    </section>
  );
}
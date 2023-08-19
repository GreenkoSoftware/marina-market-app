import SettingFooter from "@/app/home/footer";


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
      </footer>
    </section>
  );
}
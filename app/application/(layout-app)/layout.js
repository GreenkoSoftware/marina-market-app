 import { Navigation } from "@/components/navigation/Navigation";
export default function LayoutApp ({ children }) {
  return (
    <section className="min-h-screen flex flex-col bg-primary-200">
    <header className="">Header</header>
    <div className="flex-1 flex flex-col sm:flex-row">
      <main className="flex-1">
        {children}
      </main>
      {/* Sidebar */}
      <nav className="order-first sm:w-32"></nav>
      {/* Right Sidebar */}
      <aside className="sm:w-32 "></aside>
    </div>
    <footer className="sm:h-32"><Navigation/></footer>
    </section>
  );
}

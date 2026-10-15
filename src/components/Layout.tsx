import { Link, Outlet } from "react-router";
import { problems } from "../problems";
import { paths } from "../routes/paths";
import ScrollToTop from "../routes/ScrollToTop";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            to={paths.home}
            className="text-base font-bold tracking-tight text-zinc-100 hover:text-white"
          >
            100 Rep Drill
          </Link>
          <span className="text-xs text-zinc-500 tabular-nums">
            {problems.length} / 100
          </span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

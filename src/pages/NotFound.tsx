import { Link } from "react-router";
import { paths } from "../routes/paths";

function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-6xl font-bold text-zinc-700 tabular-nums">404</p>
      <h1 className="text-xl font-bold tracking-tight">
        ページが見つかりません
      </h1>
      <Link
        to={paths.home}
        className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
      >
        問題一覧に戻る
      </Link>
    </div>
  );
}

export default NotFound;

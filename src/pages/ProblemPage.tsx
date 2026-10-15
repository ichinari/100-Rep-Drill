import { Link, useParams } from "react-router";
import { findAdjacentProblems, findProblem } from "../problems";
import { paths } from "../routes/paths";
import NotFound from "./NotFound";

const pagerLinkClass =
  "flex flex-col rounded-lg border border-zinc-800 px-4 py-3 transition-colors hover:border-zinc-600 hover:bg-zinc-900";

function ProblemPage() {
  const { id } = useParams();
  const problem = findProblem(id);

  if (!problem) return <NotFound />;

  const { prev, next } = findAdjacentProblems(problem.id);
  const Component = problem.component;
  return (
    <article className="space-y-8">
      <div className="space-y-3">
        <Link
          to={paths.home}
          className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-100"
        >
          ← 問題一覧
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{problem.title}</h1>
      </div>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <Component />
      </section>

      <nav
        aria-label="前後の問題"
        className="grid grid-cols-2 gap-3 border-t border-zinc-800 pt-6"
      >
        {prev ? (
          <Link to={paths.problem(prev.id)} className={pagerLinkClass}>
            <span className="text-xs text-zinc-500">← 前の問題</span>
            <span className="text-sm text-zinc-200">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={paths.problem(next.id)}
            className={`${pagerLinkClass} items-end text-right`}
          >
            <span className="text-xs text-zinc-500">次の問題 →</span>
            <span className="text-sm text-zinc-200">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}

export default ProblemPage;

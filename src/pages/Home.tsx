import { Link } from "react-router";
import { findProblem, problems } from "../problems";
import { paths } from "../routes/paths";
import ProgressBar from "@components/ProgressBar";

const TOTAL = 100;
const BLOCK_SIZE = 10;

const blocks = Array.from({ length: TOTAL / BLOCK_SIZE }, (_, i) => {
  const start = i * BLOCK_SIZE + 1;
  const numbers = Array.from({ length: BLOCK_SIZE }, (_, j) => start + j);
  return { start, end: start + BLOCK_SIZE - 1, numbers };
});

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/3 px-4 py-3">
      <dt className="text-xs text-zinc-500">{label}</dt>
      <dd className="mt-1 text-xl font-semibold text-zinc-100 tabular-nums">
        {value}
      </dd>
    </div>
  );
}

function ProblemTile({ number }: { number: number }) {
  const problem = findProblem(String(number));

  if (!problem) {
    return (
      <div
        aria-hidden
        className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-zinc-800/80 text-sm text-zinc-700 tabular-nums"
      >
        {number}
      </div>
    );
  }

  return (
    <Link
      to={paths.problem(problem.id)}
      aria-label={problem.title}
      className="group relative flex aspect-square items-center justify-center rounded-lg bg-linear-to-br from-indigo-500/80 via-violet-500/80 to-sky-400/80 p-px shadow-lg shadow-violet-500/10 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
    >
      <span className="flex h-full w-full items-center justify-center rounded-[7px] bg-zinc-950/90 text-sm font-semibold text-zinc-100 tabular-nums transition-colors group-hover:bg-zinc-900/70">
        {number}
      </span>
    </Link>
  );
}

function Home() {
  const solved = problems.length;
  const percent = Math.round((solved / TOTAL) * 100);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl"
        />
        <div className="relative space-y-6">
          <div>
            <p className="text-xs font-medium tracking-widest text-violet-300/80 uppercase">
              Progress
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              問題一覧
            </h1>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-zinc-400">
                <span className="text-2xl font-bold text-zinc-100 tabular-nums">
                  {solved}
                </span>{" "}
                / {TOTAL}
              </span>
              <span className="text-zinc-400 tabular-nums">{percent}%</span>
            </div>
            <ProgressBar value={solved} max={TOTAL} />
          </div>
          <dl className="grid grid-cols-3 gap-3">
            <Stat label="解答済み" value={`${solved}`} />
            <Stat label="残り" value={`${TOTAL - solved}`} />
            <Stat label="達成率" value={`${percent}%`} />
          </dl>
        </div>
      </section>

      <nav aria-label="問題一覧" className="space-y-6">
        {blocks.map((block) => {
          const blockSolved = block.numbers.filter((n) =>
            findProblem(String(n)),
          ).length;
          return (
            <section key={block.start} className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold text-zinc-300 tabular-nums">
                  {block.start}–{block.end}
                </h2>
                <div className="h-px flex-1 bg-zinc-800" />
                <span className="text-xs text-zinc-500 tabular-nums">
                  {blockSolved} / {BLOCK_SIZE}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                {block.numbers.map((number) => (
                  <ProblemTile key={number} number={number} />
                ))}
              </div>
            </section>
          );
        })}
      </nav>
    </div>
  );
}

export default Home;

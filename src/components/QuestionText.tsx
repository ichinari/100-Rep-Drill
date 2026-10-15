import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function QuestionText({ children }: Props) {
  return (
    <div className="mb-5">
      <section className="rounded-lg border-l-4 border-violet-500 bg-zinc-900 px-5 py-4 mb-5">
        <p className="mb-2 text-xs font-semibold tracking-widest text-violet-300 uppercase">
          課題
        </p>
        <div className="space-y-1 text-sm leading-relaxed text-zinc-300 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_ol]:marker:text-violet-300">
          {children}
        </div>
      </section>

      <hr />
    </div>
  );
}

export default QuestionText;

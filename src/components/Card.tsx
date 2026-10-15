import type { ElementType, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  tag?: ElementType;
  title: string;
};

function Card({ children, tag: Tag = "div", title }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-sm leading-relaxed text-zinc-300 shadow-lg shadow-black/20 transition-colors hover:border-zinc-700 text-center">
      <Tag className="mb-2 text-base font-semibold text-zinc-100 mb-5">
        {title}
      </Tag>
      <div>{children}</div>
    </div>
  );
}

export default Card;

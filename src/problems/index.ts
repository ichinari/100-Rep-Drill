import type { ComponentType } from "react";

export type Problem = {
  id: string;
  title: string;
  component: ComponentType;
};

// src/answers 配下の problemN.tsx を自動で登録する
const modules = import.meta.glob<{ default: ComponentType }>(
  "../answers/**/problem*.tsx",
  { eager: true },
);

export const problems: Problem[] = Object.entries(modules)
  .flatMap(([path, module]) => {
    const match = path.match(/problem(\d+)\.tsx$/);
    if (!match) return [];
    const id = String(Number(match[1]));
    return [{ id, title: `問題 ${id}`, component: module.default }];
  })
  .sort((a, b) => Number(a.id) - Number(b.id));

export function findProblem(id: string | undefined) {
  return problems.find((problem) => problem.id === id);
}

export function findAdjacentProblems(id: string) {
  const index = problems.findIndex((problem) => problem.id === id);
  return {
    prev: index > 0 ? problems[index - 1] : undefined,
    next: index >= 0 ? problems[index + 1] : undefined,
  };
}

import { useState } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import Button from "@components/Button";
import useCounter from "@hooks/useCounter";

function Problem46() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <>
      <QuestionText>
        <ol>
          <li>カウンターロジックをuseCounterというカスタムフックに切り出す</li>
          <li>increment、decrement、reset の 3 つの機能を提供</li>
          <li>初期値を引数で受け取れるようにする</li>
        </ol>
      </QuestionText>

      <Card title="基本的なカスタムフックの作成" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          {/* 現在のカウント */}
          <div className="flex flex-col items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-950/40 py-8">
            <span className="text-[10px] font-medium tracking-widest text-zinc-500 uppercase">
              Count
            </span>
            <output className="font-mono text-5xl font-bold text-zinc-100 tabular-nums">
              {count}
            </output>
          </div>

          {/* 操作ボタン */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button text="-1" backgroundColor="#7d7d7e" onClick={decrement} />
            <Button text="+1" backgroundColor="#7c3aed" onClick={increment} />
            <Button text="Reset" backgroundColor="#dc2626" onClick={reset} />
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem46;

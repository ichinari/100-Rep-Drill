import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import Button from "@components/Button";
import { useEffect, useState } from "react";

// リング表示用（初期値 60 秒を 100% とする）
const TOTAL_SECONDS = 60;
const RING_RADIUS = 44;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function Problem41() {
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;

    if (isRunning && seconds > 0) {
      // タイマーを開始
      intervalId = window.setInterval(() => {
        // 1秒ずつ減らす
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      // 0になったらアラート
      setIsRunning(false);
    }

    // クリーンアップ関数
    return () => {
      // タイマーをクリア
      clearInterval(intervalId);
    };
  }, [isRunning, seconds]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(60);
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>カウントダウンタイマーを実装</li>
          <li>スタート/ストップ/リセット機能</li>
          <li>コンポーネントアンマウント時にタイマーをクリア</li>
          <li>残り時間が 0 になったらアラート</li>
        </ol>
      </QuestionText>

      <Card title="カウントダウンタイマー" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          {/* 残り時間（リング + 数字） */}
          <div className="relative mx-auto h-48 w-48">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r={RING_RADIUS}
                fill="none"
                strokeWidth="6"
                className="stroke-zinc-800"
              />
              <circle
                cx="50"
                cy="50"
                r={RING_RADIUS}
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={
                  RING_CIRCUMFERENCE * (1 - seconds / TOTAL_SECONDS)
                }
                className={`transition-[stroke-dashoffset] duration-1000 ease-linear ${
                  seconds === 0
                    ? "stroke-red-500"
                    : seconds <= 10
                      ? "stroke-amber-400"
                      : "stroke-violet-500"
                }`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <p
                role="timer"
                className={`font-mono text-4xl font-bold tabular-nums ${
                  seconds === 0
                    ? "text-red-400"
                    : seconds <= 10
                      ? "text-amber-300"
                      : "text-zinc-100"
                }`}
              >
                {Math.floor(seconds / 60)}:
                {(seconds % 60).toString().padStart(2, "0")}
              </p>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  seconds === 0
                    ? "bg-red-500/15 text-red-300"
                    : isRunning
                      ? "bg-violet-500/15 text-violet-300"
                      : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {seconds === 0 ? "終了" : isRunning ? "カウント中" : "停止中"}
              </span>
            </div>
          </div>

          {/* 操作ボタン */}
          <div className="flex justify-center gap-3">
            <Button
              text="スタート"
              backgroundColor="#7c3aed"
              isDisabled={isRunning || seconds === 0}
              onClick={handleStart}
            />
            <Button
              text="ストップ"
              backgroundColor="#d97706"
              isDisabled={!isRunning}
              onClick={handleStop}
            />
            <Button
              text="リセット"
              backgroundColor="#7d7d7e"
              onClick={handleReset}
            />
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem41;

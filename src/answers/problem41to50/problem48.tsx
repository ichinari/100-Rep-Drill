import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import Button from "@components/Button";
import { useState } from "react";
import useFetch from "@hooks/useFetch";

type User = {
  name: string;
  email: string;
};

function Problem48() {
  const [userId, setUserId] = useState(1);
  const { data, loading, error } = useFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  return (
    <>
      <QuestionText>
        <ol>
          <li>useFetchフックを作成</li>
          <li>loading、data、error の状態を管理</li>
          <li>URL が変更されたら再フェッチする</li>
        </ol>
      </QuestionText>

      <Card title="API 呼び出しカスタムフック" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
              User Info
            </h3>
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 tabular-nums">
              ID: {userId}
            </span>
          </div>

          {/* 表示エリア（状態が変わっても高さを保つ） */}
          <div className="flex min-h-32 flex-col justify-center rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-4">
            {loading ? (
              <div
                role="status"
                className="flex flex-col items-center gap-3 text-xs text-zinc-400"
              >
                <span className="h-7 w-7 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-500" />
                Loading...
              </div>
            ) : error ? (
              <div
                role="alert"
                className="flex flex-col items-center gap-1 text-center"
              >
                <p className="text-sm font-semibold text-red-300">
                  ユーザーの取得に失敗しました
                </p>
                <p className="text-xs wrap-anywhere text-zinc-400">
                  Error: {error.message}
                </p>
              </div>
            ) : (
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="text-zinc-500">Name</dt>
                <dd className="font-semibold wrap-anywhere text-zinc-100">
                  {data?.name}
                </dd>
                <dt className="text-zinc-500">Email</dt>
                <dd className="wrap-anywhere text-zinc-300">{data?.email}</dd>
              </dl>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              text="Next User"
              size="small"
              backgroundColor="#7c3aed"
              isDisabled={loading}
              onClick={() => setUserId(userId + 1)}
            />
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem48;

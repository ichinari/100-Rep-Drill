import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import Button from "@components/Button";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  company?: {
    name: string;
  };
};

function Problem43() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  // true の間は存在しない URL を叩いてエラーを発生させる（動作確認用）
  const [shouldFail, setShouldFail] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // API通信を実装
        // https://jsonplaceholder.typicode.com/users
        const response = await fetch(
          shouldFail
            ? "https://jsonplaceholder.typicode.com/users-not-found" // 404 になる
            : "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        // エラーハンドリング
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [retryCount, shouldFail]); // リトライ時・エラー発生ボタン押下時に再実行

  const handleRetry = () => {
    setShouldFail(false);
    setRetryCount((prev) => prev + 1);
  };

  // エラーを発生させて再取得（エラー表示・リトライの確認用）
  const handleForceError = () => {
    setShouldFail(true);
    setRetryCount((prev) => prev + 1);
  };
  return (
    <>
      <QuestionText>
        <ol>
          <li>
            JSONPlaceholder API からユーザー一覧を取得
            <ul>
              <li>
                <a
                  href="https://jsonplaceholder.typicode.com/users"
                  target="_blank"
                  rel="noreferrer"
                  className="text-violet-300 underline-offset-2 hover:underline"
                >
                  users
                </a>
              </li>
            </ul>
          </li>
          <li>ローディング状態を表示</li>
          <li>エラーハンドリングを実装</li>
          <li>リトライ機能を追加</li>
        </ol>
      </QuestionText>

      <Card title="ユーザー一覧" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-4 text-left">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500">
              {isLoading ? "取得中..." : !error && `${users.length} 件`}
            </p>
            <div className="flex gap-2">
              <Button
                text="エラーを発生"
                size="small"
                backgroundColor="#7d7d7e"
                isDisabled={isLoading}
                onClick={handleForceError}
              />
              <Button
                text="再読み込み"
                size="small"
                backgroundColor="#7c3aed"
                isDisabled={isLoading}
                onClick={handleRetry}
              />
            </div>
          </div>

          {isLoading ? (
            /* 読み込み中 */
            <div
              role="status"
              className="flex flex-col items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 py-10"
            >
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-500" />
              <span className="text-xs text-zinc-400">
                ユーザーを読み込み中…
              </span>
            </div>
          ) : error ? (
            /* エラー表示 */
            <div
              role="alert"
              className="flex flex-col items-center gap-3 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-8 text-center"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-lg font-bold text-red-300">
                ✕
              </span>
              <p className="text-sm font-semibold text-red-300">
                ユーザーの取得に失敗しました
              </p>
              <p className="text-xs break-all text-zinc-400">{error}</p>
              <Button
                text="再試行"
                size="small"
                backgroundColor="#dc2626"
                onClick={handleRetry}
              />
            </div>
          ) : (
            /* ユーザー一覧 */
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3 transition-colors hover:border-zinc-600"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
                    {user.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-zinc-100">
                      {user.name}
                    </h3>
                    <p className="truncate text-xs text-violet-300">
                      {user.email}
                    </p>
                    {user.company?.name && (
                      <p className="truncate text-[11px] text-zinc-500">
                        {user.company.name}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </>
  );
}

export default Problem43;

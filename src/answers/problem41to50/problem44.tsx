import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import InputField from "@components/InputField";
import { useEffect, useState } from "react";

// GitHub API の検索結果（表示に使う項目だけ）
type Repository = {
  id: number;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
};

function Problem44() {
  const [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // AbortControllerを作成
    const controller = new AbortController();

    const searchRepositories = async () => {
      const keyword = query.trim();
      if (!keyword) {
        setRepositories([]);
        setError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // GitHub API を呼び出し
        // https://api.github.com/search/repositories?q={query}
        // signalを渡してキャンセル可能にする（fetchの第二引数で渡している）
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${encodeURIComponent(keyword)}`,
          { signal: controller.signal },
        );
        // 403（回数制限）などは fetch が例外にしないので自分で判定する
        if (!response.ok) {
          throw new Error(`検索に失敗しました（${response.status}）`);
        }
        const data = await response.json();
        setRepositories(data.items || []);
      } catch (err) {
        // キャンセルエラーと通常のエラーを区別
        if (err instanceof DOMException && err.name === "AbortError") {
          // 通信がキャンセルされた場合は何もしない
        } else {
          setRepositories([]);
          setError((err as Error).message);
        }
      } finally {
        // キャンセル時は次の検索が控えているのでローディングを続ける
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    // デバウンス処理
    const timeoutId = setTimeout(() => {
      searchRepositories();
    }, 500);

    // クリーンアップ
    return () => {
      clearTimeout(timeoutId);
      // 通信をキャンセル
      controller.abort();
    };
  }, [query]);
  return (
    <>
      <QuestionText>
        <ol>
          <li>
            検索キーワードで GitHub リポジトリを検索
            <ul>
              <li>{"https://api.github.com/search/repositories?q={query}"}</li>
            </ul>
          </li>
          <li>入力の度に前の通信をキャンセル（デバウンス機能）</li>
          <li>AbortController を使用</li>
          <li>ローディング中の表示</li>
        </ol>
      </QuestionText>

      <Card title="GitHub リポジトリ検索" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          {/* 検索入力 + 状態表示 */}
          <div className="flex flex-col gap-2">
            <InputField
              type="search"
              aria-label="リポジトリ検索キーワード"
              className="w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="検索キーワードを入力..."
            />
            <div className="flex h-4 items-center text-xs" aria-live="polite">
              {isLoading ? (
                <span className="inline-flex items-center gap-2 text-violet-300">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-400" />
                  検索中...
                </span>
              ) : (
                query.trim() &&
                !error && (
                  <span className="text-zinc-500">
                    {repositories.length} 件表示
                  </span>
                )
              )}
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-300"
            >
              エラー: {error}
            </p>
          )}

          {/* 検索結果 */}
          {repositories.length ? (
            <ul
              className={`flex max-h-[480px] flex-col gap-2 overflow-y-auto overscroll-contain pr-1 transition-opacity scrollbar-thin [scrollbar-color:var(--color-zinc-600)_transparent] ${
                isLoading ? "opacity-50" : ""
              }`}
            >
              {repositories.map((repo) => (
                <li
                  key={repo.id}
                  className="flex flex-col gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3 transition-colors hover:border-zinc-600"
                >
                  <h3 className="truncate text-sm font-semibold">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-300 underline-offset-2 hover:text-violet-200 hover:underline"
                    >
                      {repo.full_name}
                    </a>
                  </h3>
                  {repo.description && (
                    <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-500 tabular-nums">
                    <span>⭐ {repo.stargazers_count.toLocaleString()}</span>
                    <span>🍴 {repo.forks_count.toLocaleString()}</span>
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-violet-400" />
                        {repo.language}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !isLoading &&
            !error && (
              <p className="rounded-lg border border-dashed border-zinc-800 py-8 text-center text-xs text-zinc-500">
                {query.trim()
                  ? "該当するリポジトリが見つかりませんでした"
                  : "キーワードを入力するとリポジトリを検索します"}
              </p>
            )
          )}
        </div>
      </Card>
    </>
  );
}

export default Problem44;

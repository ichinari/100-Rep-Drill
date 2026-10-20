import { useState } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@components/Card";

type User = {
  id: number;
  name: string;
  age: number;
  email: string;
};

function Problem32() {
  const [users] = useState<User[]>([
    { id: 1, name: "太郎", age: 18, email: "taro@example.com" },
    { id: 2, name: "花子", age: 25, email: "hanako@example.com" },
    { id: 3, name: "次郎", age: 30, email: "jiro@example.com" },
    { id: 4, name: "三郎", age: 65, email: "saburo@example.com" },
  ]);

  // 年齢に応じた背景色（赤 / 緑 / 青）とラベルを返す
  const getAgeTone = (age: number) => {
    if (age < 20)
      return {
        label: "20 歳未満",
        className: "border-red-500/40 bg-red-500/10",
        badgeClassName: "bg-red-500/20 text-red-300",
      };
    if (age <= 60)
      return {
        label: "20-60 歳",
        className: "border-green-500/40 bg-green-500/10",
        badgeClassName: "bg-green-500/20 text-green-300",
      };
    return {
      label: "60 歳以上",
      className: "border-blue-500/40 bg-blue-500/10",
      badgeClassName: "bg-blue-500/20 text-blue-300",
    };
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>ユーザー情報（id, name, age, email）の配列を表示</li>
          <li>カード形式で各ユーザー情報を表示</li>
          <li>
            年齢によって背景色を変更（20 歳未満、20-60 歳、60 歳以上）
            <ul>
              <li>20 歳未満：赤</li>
              <li>20-60 歳：緑</li>
              <li>60 歳以上：青</li>
            </ul>
          </li>
          <li>メールアドレスはリンクとして表示</li>
        </ol>
      </QuestionText>

      <Card title="ユーザー一覧" tag="h2">
        <div className="mx-auto grid w-full max-w-lg grid-cols-1 gap-3 text-left sm:grid-cols-2">
          {users.map((user) => {
            const tone = getAgeTone(user.age);
            return (
              <div
                key={user.id}
                className={`flex flex-col gap-3 rounded-lg border px-4 py-3 shadow-sm shadow-black/20 transition hover:-translate-y-0.5 ${tone.className}`}
              >
                {/* ヘッダー：アバター・名前・年齢帯 */}
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${tone.badgeClassName}`}
                  >
                    {user.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-zinc-100">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-zinc-500">ID: {user.id}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${tone.badgeClassName}`}
                  >
                    {tone.label}
                  </span>
                </div>

                {/* 詳細 */}
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                  <dt className="text-zinc-500">Age</dt>
                  <dd className="text-zinc-200">{user.age} 歳</dd>
                  <dt className="text-zinc-500">Email</dt>
                  <dd className="min-w-0">
                    <a
                      href={`mailto:${user.email}`}
                      className="block truncate text-violet-300 underline-offset-2 transition-colors hover:text-violet-200 hover:underline"
                    >
                      {user.email}
                    </a>
                  </dd>
                </dl>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

export default Problem32;

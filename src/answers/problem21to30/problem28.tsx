import { useState } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@/components/Card";
import Button from "@/components/Button";
import type { ReactNode } from "react";

const ROLES = ["guest", "user", "admin"];

// 権限レベルごとの枠の色
const TONE_CLASS = {
  public: "border-zinc-700 bg-zinc-900/60 text-zinc-300",
  login: "border-sky-500/40 bg-sky-500/5 text-sky-300",
  guest: "border-orange-500/40 bg-orange-500/5 text-orange-300",
  user: "border-emerald-500/40 bg-emerald-500/5 text-emerald-300",
  admin: "border-violet-500/40 bg-violet-500/5 text-violet-300",
  detail: "border-amber-500/40 bg-amber-500/5 text-amber-300",
};

type InfoSectionProps = {
  title: string;
  badge: string;
  tone: keyof typeof TONE_CLASS;
  children: ReactNode;
};

// 権限ごとの情報を表示する枠
function InfoSection({ title, badge, tone, children }: InfoSectionProps) {
  return (
    <section className={`rounded-lg border p-4 ${TONE_CLASS[tone]}`}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
        <span className="rounded-full border border-current px-2 py-0.5 text-[10px] font-medium">
          {badge}
        </span>
      </div>
      <div className="text-sm text-zinc-400">{children}</div>
    </section>
  );
}

function Problem28() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<(typeof ROLES)[number]>(""); // guest, user, admin
  const [showDetails, setShowDetails] = useState(false);

  const isAdmin = userRole === "admin";

  // ログインしたら guest は選べないので、guest を選んでいれば未選択に戻す
  const handleLoginChange = (checked: boolean) => {
    setIsLoggedIn(checked);
    if (checked && userRole === "guest") {
      setUserRole("");
    }
  };

  // 権限を変えたら、管理者向けの詳細表示は閉じる
  const handleRoleChange = (role: string) => {
    setUserRole(role);
    setShowDetails(false);
  };
  // ゲストユーザーかどうか
  const isGuest = userRole === "guest";
  // 一般ユーザー以上 = user または admin
  const isUserOrAbove = userRole === "user" || isAdmin;

  return (
    <>
      <QuestionText>
        <ol>
          <li>ユーザーの権限レベル（guest/user/admin）で表示制御</li>
          <li>ログイン状態をチェックボックスで管理</li>
          <li>
            ログイン状態と権限の組み合わせで表示を変更
            <ul>
              <li>
                ログイン済みの場合
                <ul>
                  <li>「ログインユーザー専用」と表示</li>
                </ul>
              </li>
              <li>
                ログイン済み、かつ権限レベルが user, または admin
                <ul>
                  <li>「一般ユーザー以上」と表示</li>
                </ul>
              </li>
              <li>
                ログイン済み、かつ権限レベルが admin
                <ul>
                  <li>「管理者専用」と表示</li>
                  <li>詳細表示チェックボックスを表示</li>
                </ul>
              </li>
              <li>
                ログイン済み、かつ権限レベルが admin、詳細表示 ON
                <ul>
                  <li>「管理者詳細」と表示</li>
                </ul>
              </li>
            </ul>
          </li>
        </ol>
      </QuestionText>

      <Card title="ユーザー情報" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          {/* 操作パネル */}
          <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer accent-violet-500"
                checked={isLoggedIn}
                onChange={(e) => handleLoginChange(e.target.checked)}
              />
              ログイン状態
            </label>

            <label className="flex items-center gap-2 text-sm text-zinc-300">
              権限レベル：
              <select
                value={userRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 transition-colors hover:border-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              >
                <option>select role</option>
                {ROLES.map((role) => (
                  <option
                    key={role}
                    value={role}
                    // guest は未ログインのときだけ選べる
                    disabled={role === "guest" && isLoggedIn}
                  >
                    {role}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <InfoSection title="公開情報" badge="全員" tone="public">
            <p>誰でも確認可能な情報</p>
          </InfoSection>

          {isLoggedIn && (
            <div className="flex flex-col gap-3">
              {/* ログインユーザーのみ */}
              <InfoSection
                title="ログインユーザー専用"
                badge="ログイン"
                tone="login"
              >
                <p>マイページ・お気に入り一覧・閲覧履歴</p>
              </InfoSection>

              {/* 一般ユーザー以上 */}
              {isUserOrAbove && (
                <InfoSection
                  title="一般ユーザー以上"
                  badge="user 以上"
                  tone="user"
                >
                  <p>投稿の作成・コメント・プロフィール編集</p>
                </InfoSection>
              )}

              {/* 管理者のみ */}
              {isAdmin && (
                <InfoSection title="管理者専用" badge="admin" tone="admin">
                  <p className="mb-3">ユーザー管理・投稿の削除・サイト設定</p>
                  <Button
                    text={showDetails ? "詳細を閉じる" : "詳細表示"}
                    size="small"
                    backgroundColor="#7c3aed"
                    onClick={() => setShowDetails(!showDetails)}
                  />
                </InfoSection>
              )}

              {/* 管理者でかつ詳細表示ON */}
              {isAdmin && showDetails && (
                <InfoSection title="管理者詳細" badge="admin" tone="detail">
                  <ul className="list-disc space-y-1 pl-5 marker:text-amber-400">
                    <li>登録ユーザー数：1,234 人</li>
                    <li>本日のアクセス数：5,678 件</li>
                    <li>未対応の通報：3 件</li>
                  </ul>
                </InfoSection>
              )}
            </div>
          )}

          {/* 未ログイン（ゲスト）のみ */}
          {!isLoggedIn && isGuest && (
            <InfoSection title="ゲスト向け" badge="未ログイン" tone="guest">
              <p>
                ログインすると、権限に応じた情報が表示されます。投稿やコメントをするにはログインしてください。
              </p>
            </InfoSection>
          )}
        </div>
      </Card>
    </>
  );
}

export default Problem28;

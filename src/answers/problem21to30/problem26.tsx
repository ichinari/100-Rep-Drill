import { useState } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@/components/Card";
import UserCard from "@/components/UserCard";

function Problem26() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("ゲスト");

  const handleLogin = () => {
    setUsername("田中太郎");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("ゲスト");
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>ログイン状態を管理するコンポーネントを作成</li>
          <li>ログイン時のみユーザー情報を表示</li>
          <li>未ログイン時はログインボタンを表示</li>
          <li>ログイン時はログアウトボタンを表示</li>
        </ol>
      </QuestionText>

      <Card title="ログイン状態管理" tag="h2">
        <div className="flex justify-center">
          <UserCard
            userInfo={{
              name: username,
              isActive: isLoggedIn,
            }}
          />
        </div>
        <div className="flex justify-center mt-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              ログアウト
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              ログイン
            </button>
          )}
        </div>
      </Card>
    </>
  );
}

export default Problem26;

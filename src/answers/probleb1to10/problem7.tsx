import UserCard from "@/components/UserCard";
import QuestionText from "@components/QuestionText";
import { useState } from "react";

const USER_INFO = {
  name: "Taro Tanaka",
  age: 30,
  isActive: true,
};

function Problem7() {
  const [userInfo, setUserInfo] = useState(USER_INFO);

  const toggleStatus = () => {
    setUserInfo((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>UserCard コンポーネントを作成</li>
          <li>name（文字列）、age（数値）、isActive（真偽値）を受け取る</li>
          <li>
            isActive が true なら「アクティブ」、false
            なら「非アクティブ」と表示
          </li>
          <li>２名の異なるユーザー情報を表示する</li>
        </ol>
      </QuestionText>

      <div className="flex flex-col items-center gap-5">
        <UserCard userInfo={userInfo} />

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={userInfo.isActive}
            aria-label="ステータス切り替え"
            onClick={toggleStatus}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
              userInfo.isActive ? "bg-emerald-500" : "bg-zinc-700"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                userInfo.isActive ? "translate-x-5.5" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-sm text-zinc-400">
            {userInfo.isActive ? "アクティブ" : "非アクティブ"}
          </span>
        </div>
      </div>
    </>
  );
}

export default Problem7;

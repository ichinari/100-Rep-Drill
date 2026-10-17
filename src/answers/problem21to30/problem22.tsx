import { useRef, useState, type SubmitEvent } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@components/Card";

const labelClass = "text-sm font-medium text-zinc-300";
const inputClass =
  "rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30";

type SubmittedData = {
  name: string;
  email: string;
  fileName: string;
};

function Problem22() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(
    null,
  );
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // refから値を取得
    setSubmittedData({
      name: nameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      fileName: fileRef.current?.files?.[0]?.name ?? "",
    });
  };

  const handleFileChange = () => {
    // ファイル選択処理
    const file = fileRef.current?.files?.[0];
    console.log(file?.name);
    setFileName(file?.name ?? "");
  };

  const handleFileRemove = () => {
    // ファイル削除処理（file input は "" 以外を代入できない）
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setFileName("");
  };

  const focusFirstEmpty = () => {
    // 最初の空フィールドにフォーカス
    const targetRefs = [nameRef, emailRef];
    const emptyInput = targetRefs
      .map((ref) => ref.current)
      .find((input) => !input?.value.trim());

    if (emptyInput) {
      emptyInput.focus();
      return;
    }

    alert("全ての入力フィールドが入力されています");
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>
            useRef を使った非制御コンポーネントフォーム
            <ul>
              <li>名前</li>
              <li>メールアドレス</li>
              <li>ファイル</li>
            </ul>
          </li>
          <li>ファイル入力の処理</li>
          <li>送信時に値を取得</li>
          <li>
            フォーカス制御
            <ul>
              <li>「空欄にフォーカス」ボタンを用意</li>
              <li>
                名前、メールアドレスどちらかが未入力の状態で、フォーカスボタンを押すと、未入力の
                input タグがフォーカスされること
              </li>
              <li>
                全て入力済みであれば、「全ての入力フィールドが入力されています」とアラートを表示
              </li>
            </ul>
          </li>
        </ol>
      </QuestionText>

      <Card title="ユーザー登録" tag="h2">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-md flex-col gap-5 text-left"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="p22-name" className={labelClass}>
              名前
            </label>
            <input
              id="p22-name"
              ref={nameRef}
              type="text"
              placeholder="山田 太郎"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="p22-email" className={labelClass}>
              メール
            </label>
            <input
              id="p22-email"
              ref={emailRef}
              type="email"
              placeholder="example@email.com"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="p22-file" className={labelClass}>
              ファイル
            </label>
            <input
              id="p22-file"
              ref={fileRef}
              type="file"
              onChange={handleFileChange}
              className="text-sm text-zinc-400 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-zinc-700 file:px-3 file:py-2 file:text-sm file:font-medium file:text-zinc-100 hover:file:bg-zinc-600"
            />
            {fileName && (
              <div className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2">
                <p className="truncate text-xs text-zinc-400">
                  選択: {fileName}
                </p>
                <button
                  type="button"
                  onClick={handleFileRemove}
                  className="shrink-0 cursor-pointer rounded-md px-2 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                >
                  削除
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 cursor-pointer rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
            >
              送信
            </button>
            <button
              type="button"
              onClick={focusFirstEmpty}
              className="flex-1 cursor-pointer rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              空欄にフォーカス
            </button>
          </div>
        </form>

        {submittedData && (
          <div className="mx-auto mt-6 w-full max-w-md text-left">
            <h4 className="mb-2 text-sm font-semibold text-zinc-100">
              送信データ
            </h4>
            <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </Card>
    </>
  );
}

export default Problem22;

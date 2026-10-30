import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import Button from "@components/Button";
import InputField from "@components/InputField";
import useLocalStorage from "@hooks/useLocalStorage";

function Problem47() {
  const [name, setName, removeName] = useLocalStorage("userName", "");

  return (
    <>
      <QuestionText>
        <ol>
          <li>useLocalStorageフックを作成</li>
          <li>値の読み込み、保存、削除機能を実装</li>
          <li>ページリロード後も値が保持されることを確認</li>
        </ol>
      </QuestionText>

      <Card title="ローカルストレージを扱うカスタムフック" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          <InputField
            label="名前"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

          {/* 保存されている値 */}
          <div className="flex flex-col gap-1 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3">
            <span className="flex items-center justify-between gap-3 text-[10px] font-medium tracking-widest text-zinc-500 uppercase">
              Stored name
              <code className="font-mono tracking-normal normal-case">
                userName
              </code>
            </span>
            <p
              className={`text-sm font-semibold wrap-anywhere ${
                name ? "text-zinc-100" : "text-zinc-600"
              }`}
            >
              {name || "未保存"}
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              text="Clear Storage"
              size="small"
              backgroundColor="#dc2626"
              isDisabled={!name}
              onClick={removeName}
            />
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem47;

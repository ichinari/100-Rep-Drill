import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import Button from "@components/Button";
import useToggle from "@hooks/useToggle";

const sectionClass =
  "flex flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 p-4";
const sectionTitleClass =
  "text-xs font-medium tracking-widest text-zinc-500 uppercase";

function Problem49() {
  const modal = useToggle();
  const sidebar = useToggle(true);

  return (
    <>
      <QuestionText>
        <ol>
          <li>useToggleフックを作成</li>
          <li>ON/OFF 状態の切り替え機能を実装</li>
          <li>任意の値で強制的に設定できる機能も追加</li>
        </ol>
      </QuestionText>

      <Card title="Toggle 機能のカスタムフック" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* モーダルの例 */}
            <section className={sectionClass}>
              <h3 className={sectionTitleClass}>Modal Example</h3>
              <Button
                text={`${modal.isOn ? "Close" : "Open"} Modal`}
                size="small"
                backgroundColor="#7c3aed"
                onClick={modal.toggle}
              />
              {modal.isOn && (
                <div className="flex flex-col items-center gap-3 rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-4 transition duration-200 starting:translate-y-1 starting:opacity-0">
                  <h4 className="text-sm font-semibold text-zinc-100">
                    Modal Content
                  </h4>
                  <Button
                    text="Close Modal"
                    size="small"
                    backgroundColor="#7d7d7e"
                    onClick={modal.setOff}
                  />
                </div>
              )}
            </section>

            {/* サイドバーの例 */}
            <section className={sectionClass}>
              <h3 className={sectionTitleClass}>Sidebar Example</h3>
              <Button
                text="Toggle Sidebar"
                size="small"
                backgroundColor="#7c3aed"
                onClick={sidebar.toggle}
              />
              <span
                className={`inline-flex items-center gap-1.5 self-center rounded-full px-2.5 py-1 text-xs font-medium ${
                  sidebar.isOn
                    ? "bg-emerald-500/10 text-emerald-300"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    sidebar.isOn ? "bg-emerald-400" : "bg-zinc-500"
                  }`}
                />
                Status: {sidebar.isOn ? "ON" : "OFF"}
              </span>
            </section>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem49;

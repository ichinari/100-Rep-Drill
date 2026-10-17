import { useState, type SubmitEvent } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import Button from "@components/Button";

const fieldClass =
  "rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30";

function Problem24() {
  const [skills, setSkills] = useState([
    { id: crypto.randomUUID(), name: "", level: "beginner" },
  ]);
  const [submittedJson, setSubmittedJson] = useState<string | null>(null);

  const addSkill = () => {
    // スキルフィールドを追加
    const id = crypto.randomUUID();
    setSkills((prev) => [...prev, { id, name: "", level: "beginner" }]);
    setSubmittedJson(null);
  };

  const removeSkill = (id: string) => {
    // スキルフィールドを削除
    const copySkills = skills;
    const newSkills = copySkills.filter((skill) => skill.id !== id);
    setSkills(newSkills);
    setSubmittedJson(null);
  };

  const updateSkill = (id: string, field: "name" | "level", value: string) => {
    // スキル情報を更新（id が一致するものだけ field を書き換える）
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    );
    setSubmittedJson(null);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 送信処理
    // 送信データに整形（画面用の id は除き、名前が空のスキルは送らない）
    const formattedSkills = skills
      .map(({ name, level }) => ({ name: name.trim(), level }))
      .filter((skill) => skill.name !== "");

    const data = {
      skills: formattedSkills,
      count: formattedSkills.length,
    };

    // インデント 2 の JSON 文字列にする
    setSubmittedJson(JSON.stringify(data, null, 2));
  };

  // ボタン制御関連
  const isDisabledDelete = skills.length === 1;
  const isDisabledAdd = skills.length === 5;
  return (
    <>
      <QuestionText>
        <ol>
          <li>「スキル」入力フィールドを動的に追加/削除</li>
          <li>各フィールドにレベル選択（初級/中級/上級）を追加</li>
          <li>最低 1 つ、最大 5 つまでのフィールド制限</li>
          <li>JSON として送信データを整形</li>
        </ol>
      </QuestionText>
      <Card title="スキル登録" tag="h2">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-xl flex-col gap-5 text-left"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-100">スキル一覧</h3>
            <span className="text-xs text-zinc-500 tabular-nums">
              {skills.length} / 5
            </span>
          </div>

          <ul className="flex flex-col gap-2">
            {skills.map((skill, index) => (
              <li
                key={skill.id}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/40 p-2"
              >
                <span className="w-6 shrink-0 text-center text-xs text-zinc-500 tabular-nums">
                  {index + 1}
                </span>

                <input
                  type="text"
                  placeholder="スキル名"
                  aria-label={`スキル名 ${index + 1}`}
                  value={skill.name}
                  onChange={(e) =>
                    updateSkill(skill.id, "name", e.target.value)
                  }
                  className={`min-w-0 flex-1 ${fieldClass}`}
                />

                <select
                  aria-label={`レベル ${index + 1}`}
                  value={skill.level}
                  onChange={(e) =>
                    updateSkill(skill.id, "level", e.target.value)
                  }
                  className={`w-24 shrink-0 cursor-pointer ${fieldClass}`}
                >
                  <option value="beginner">初級</option>
                  <option value="intermediate">中級</option>
                  <option value="advanced">上級</option>
                </select>

                <Button
                  text="削除"
                  size="small"
                  backgroundColor="#dc2626"
                  isDisabled={isDisabledDelete}
                  onClick={() => removeSkill(skill.id)}
                />
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-3">
            <Button
              text="＋ スキルを追加"
              backgroundColor="#3f3f46"
              isDisabled={isDisabledAdd}
              onClick={addSkill}
            />
            <Button text="送信" type="submit" backgroundColor="#7c3aed" />
          </div>

          {submittedJson && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-zinc-100">
                送信データ（JSON）
              </h4>
              <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300">
                {submittedJson}
              </pre>
            </div>
          )}
        </form>
      </Card>
    </>
  );
}

export default Problem24;

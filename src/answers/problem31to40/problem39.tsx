import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import Button from "@components/Button";
import InputField from "@components/InputField";
import SelectField from "@components/SelectField";
import { useEffect, useState } from "react";

const THEME_VALUES = ["light", "dark", "auto"];

const THEME_OPTIONS = [
  { value: THEME_VALUES[0], label: "ライト" },
  { value: THEME_VALUES[1], label: "ダーク" },
  { value: THEME_VALUES[2], label: "自動" },
];

const FONT_SIZE_VALUES = ["small", "medium", "large"];

const FONT_SIZE_OPTIONS = [
  { value: FONT_SIZE_VALUES[0], label: "小" },
  { value: FONT_SIZE_VALUES[1], label: "中" },
  { value: FONT_SIZE_VALUES[2], label: "大" },
];

const LANGUAGE_VALUES = ["ja", "en", "zh"];

const LANGUAGE_OPTIONS = [
  { value: LANGUAGE_VALUES[0], label: "日本語" },
  { value: LANGUAGE_VALUES[1], label: "English" },
  { value: LANGUAGE_VALUES[2], label: "中文" },
];

const INITIAL_SETTINGS = {
  theme: THEME_VALUES[0],
  fontSize: FONT_SIZE_VALUES[1],
  language: LANGUAGE_VALUES[0],
  notifications: true,
};

// 保存済みの値を読む（壊れた JSON やストレージ不可の環境では空オブジェクト）
const readLocalStorage = (key: string): Record<string, unknown> => {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
};

const saveLocalStorage = (
  key: string,
  subKey: string,
  value: string | boolean,
) => {
  const existing = readLocalStorage(key);
  existing[subKey] = value;
  try {
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {
    // 容量超過・プライベートモードなどで保存できない場合は何もしない
  }
};

const getLocalStorage = (key: string, subKey: string) => {
  return readLocalStorage(key)[subKey];
};

function Problem39() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [isInitialized, setIsInitialized] = useState(false);

  // マウント時に初期化フラグを設定
  useEffect(() => {
    const savedSettings = {
      theme: getLocalStorage("userSettings", "theme"),
      fontSize: getLocalStorage("userSettings", "fontSize"),
      language: getLocalStorage("userSettings", "language"),
      notifications: getLocalStorage("userSettings", "notifications"),
    };
    // 未保存の項目（undefined）は初期値のまま残す
    const restored = Object.fromEntries(
      Object.entries(savedSettings).filter(([, value]) => value !== undefined),
    );
    setSettings((prev) => ({
      ...prev,
      ...restored,
    }));
    setIsInitialized(true);
  }, []);

  // 設定変更時に自動保存
  useEffect(() => {
    // 復元が終わる前に保存すると、保存済みの値を初期値で上書きしてしまうので待つ
    if (!isInitialized) return;
    saveLocalStorage("userSettings", "theme", settings.theme);
    saveLocalStorage("userSettings", "fontSize", settings.fontSize);
    saveLocalStorage("userSettings", "language", settings.language);
    saveLocalStorage("userSettings", "notifications", settings.notifications);
  }, [settings, isInitialized]);

  // updateSetting関数は設定を更新するためのユーティリティ関数
  const updateSetting = (
    key: keyof typeof INITIAL_SETTINGS,
    value: (typeof INITIAL_SETTINGS)[keyof typeof INITIAL_SETTINGS],
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 設定をリセット
  const resetSettings = () => {
    // デフォルト設定に戻す
    setSettings(INITIAL_SETTINGS);
    // localStorageもクリア
    localStorage.removeItem("userSettings");
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>ユーザー設定をローカルストレージに保存</li>
          <li>ページリロード時に設定を復元</li>
          <li>設定変更時に自動保存</li>
          <li>リセット機能の実装</li>
        </ol>
      </QuestionText>

      <Card title="ユーザー設定" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          {/* 設定項目 */}
          <div className="grid grid-cols-1 gap-4 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-4 sm:grid-cols-3">
            <SelectField
              label="テーマ"
              options={THEME_OPTIONS}
              value={settings.theme}
              onChange={(e) => updateSetting("theme", e.target.value)}
            />
            <SelectField
              label="フォントサイズ"
              options={FONT_SIZE_OPTIONS}
              value={settings.fontSize}
              onChange={(e) => updateSetting("fontSize", e.target.value)}
            />
            <SelectField
              label="言語"
              options={LANGUAGE_OPTIONS}
              value={settings.language}
              onChange={(e) => updateSetting("language", e.target.value)}
            />
          </div>

          <InputField
            type="checkbox"
            label="通知を有効にする"
            className="w-full"
            checked={settings.notifications}
            onChange={(e) => updateSetting("notifications", e.target.checked)}
          />

          <div className="flex justify-end">
            <Button
              text="設定をリセット"
              size="small"
              backgroundColor="#dc2626"
              onClick={resetSettings}
            />
          </div>

          {/* 現在の設定（保存される内容） */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
              現在の設定
            </h3>
            <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-xs leading-relaxed text-emerald-300">
              {JSON.stringify(settings, null, 2)}
            </pre>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem39;

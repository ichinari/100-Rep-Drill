### 問題 36: マウント時の実行

**難易度**: ⭐  
**想定時間**: 10 分  
**学習ポイント**: useEffect の基本、マウント時の処理

#### 課題

- コンポーネントマウント時にメッセージを表示
- ページタイトルを変更

#### 評価基準

- [ ] useEffect が正しくインポートされている
- [ ] 空の依存配列が設定されている
- [ ] マウント時のみ実行される
- [ ] 複数の副作用が実行される

#### スターターコード

```jsx
import { useState, useEffect } from "react";

function MountEffect() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // マウント時の処理を記述
    // 1. コンソールにログ出力
    // 2. メッセージを設定
    // 3. ページタイトルを変更
  }, []); // 空の依存配列

  return (
    <div>
      <h2>マウント時の処理</h2>
      <p>メッセージ: {message}</p>
    </div>
  );
}

export default MountEffect;
```

---

### 問題 37: 状態変更の監視

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: 特定の状態の監視、更新時の処理

#### 課題

- カウンターの値を監視
- カウンターが変更されるたびに履歴に追加
- 変更回数をカウント
- カウントが 5 の倍数になったらアラート表示

#### 評価基準

- [ ] 依存配列に監視対象が設定されている
- [ ] 状態変更時に副作用が実行される
- [ ] 条件に応じた処理が動作する
- [ ] 履歴が正しく管理される

#### スターターコード

```jsx
import { useState, useEffect } from "react";

function StateWatcher() {
  const [count, setCount] = useState(0);
  const [changeCount, setChangeCount] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(
    () => {
      // countの変更を監視
      // 1. 変更回数を増やす
      // 2. 履歴に追加
      // 3. 5の倍数チェック
    },
    [
      /* 依存配列を設定 */
    ]
  );

  return (
    <div>
      <h2>状態変更の監視</h2>
      <p>カウント: {count}</p>
      <p>変更回数: {changeCount}</p>

      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(count + 5)}>+5</button>

      <div>
        <h3>履歴:</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StateWatcher;
```

---

### 問題 38: 複数の依存値

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: 複数の依存値、条件付き副作用

#### 課題

- 幅と高さの入力フィールドを監視
- 面積を自動計算
- アスペクト比を判定（正方形/横長/縦長）
- サイズ変更履歴を記録（最新 5 件）

#### 評価基準

- [ ] 複数の依存値が正しく設定されている
- [ ] どちらかが変更されると副作用が実行される
- [ ] 計算とアスペクト比判定が正しい
- [ ] 履歴が適切に管理される

#### スターターコード

```jsx
import { useState, useEffect } from "react";

function DimensionCalculator() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [area, setArea] = useState(0);
  const [aspectRatio, setAspectRatio] = useState("正方形");
  const [sizeHistory, setSizeHistory] = useState([]);

  useEffect(
    () => {
      // 幅と高さの変更を監視
      // 1. 面積を計算
      // 2. アスペクト比を判定
      // 3. 履歴に追加（最新5件）
    },
    [
      /* 複数の依存値 */
    ]
  );

  return (
    <div>
      <h2>寸法計算機</h2>

      <div>
        <label>
          幅:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label>
          高さ:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <p>面積: {area}</p>
        <p>形状: {aspectRatio}</p>
      </div>

      <div>
        <h3>変更履歴（最新5件）:</h3>
        <ul>
          {sizeHistory.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DimensionCalculator;
```

---

### 問題 39: ローカルストレージとの同期

**難易度**: ⭐⭐⭐  
**想定時間**: 15 分  
**学習ポイント**: localStorage 操作、データの永続化、初期値の読み込み

#### 課題

- ユーザー設定をローカルストレージに保存
- ページリロード時に設定を復元
- 設定変更時に自動保存
- リセット機能の実装

#### 評価基準

- [ ] localStorage への保存が動作する
- [ ] マウント時に設定が読み込まれる
- [ ] 設定変更が自動保存される
- [ ] リセット機能が正しく動作する

#### スターターコード

```jsx
import { useState, useEffect } from "react";

function UserSettings() {
  const [settings, setSettings] = useState({
    theme: "light",
    fontSize: "medium",
    language: "ja",
    notifications: true,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // マウント時に初期化フラグを設定
  useEffect(() => {}, []);

  // 設定変更時に自動保存
  useEffect(
    () => {},
    [
      /* 監視対象 */
    ]
  );

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetSettings = () => {
    // デフォルト設定に戻す
    // localStorageもクリア
  };

  return (
    <div>
      <h2>ユーザー設定</h2>

      <div>
        <label>
          テーマ:
          <select
            value={settings.theme}
            onChange={(e) => updateSetting("theme", e.target.value)}
          >
            <option value="light">ライト</option>
            <option value="dark">ダーク</option>
            <option value="auto">自動</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          フォントサイズ:
          <select
            value={settings.fontSize}
            onChange={(e) => updateSetting("fontSize", e.target.value)}
          >
            <option value="small">小</option>
            <option value="medium">中</option>
            <option value="large">大</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          言語:
          <select
            value={settings.language}
            onChange={(e) => updateSetting("language", e.target.value)}
          >
            <option value="ja">日本語</option>
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => updateSetting("notifications", e.target.checked)}
          />
          通知を有効にする
        </label>
      </div>

      <button onClick={resetSettings}>設定をリセット</button>

      <div>
        <h3>現在の設定:</h3>
        <pre>{JSON.stringify(settings, null, 2)}</pre>
      </div>
    </div>
  );
}

export default UserSettings;
```

---

### 問題 40: デバウンス処理

**難易度**: ⭐⭐⭐  
**想定時間**: 15 分  
**学習ポイント**: デバウンス、パフォーマンス最適化、タイマー処理

#### 課題

- 検索入力をデバウンス処理（500ms 待機）
- 入力中は「入力中...」を表示
- 検索実行回数をカウント
- 検索履歴を表示

#### 評価基準

- [ ] デバウンス処理が実装されている
- [ ] タイマーが正しく管理される
- [ ] 入力停止後に検索が実行される
- [ ] 検索回数と履歴が更新される

#### スターターコード

```jsx
import { useState, useEffect } from "react";

function SearchDebounce() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // デバウンス処理を実装
    // 1. 入力中フラグを立てる
    // 2. タイマーを設定（500ms）
    // 3. タイマー完了後に検索実行
    // クリーンアップでタイマーをクリア
  }, [inputValue]);

  useEffect(() => {
    // 実際の検索処理
    if (searchTerm) {
      // 検索を実行（シミュレーション）
      // 検索回数を増やす
      // 履歴に追加
    }
  }, [searchTerm]);

  return (
    <div>
      <h2>デバウンス検索</h2>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="検索キーワードを入力..."
      />

      {isTyping && <span>入力中...</span>}

      <div>
        <p>検索キーワード: {searchTerm}</p>
        <p>検索実行回数: {searchCount}</p>
      </div>

      <div>
        <h3>検索履歴:</h3>
        <ul>
          {searchHistory.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchDebounce;
```

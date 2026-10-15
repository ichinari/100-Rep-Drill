## 問題 46: 基本的なカスタムフックの作成

**難易度**: ⭐⭐
**想定時間**: 10 分
**学習ポイント**: カスタムフックの基本構造、useState の再利用

### 課題

- カウンターロジックを`useCounter`というカスタムフックに切り出す
- increment、decrement、reset の 3 つの機能を提供
- 初期値を引数で受け取れるようにする

### 評価基準

- [ ] useCounter フックが正しく作成されている
- [ ] increment、decrement、reset が正常に動作する
- [ ] 初期値が正しく設定される
- [ ] フック名が"use"で始まっている

### スターターコード

```jsx
import { useState } from "react";

// カスタムフックを作成
function useCounter(initialValue = 0) {
  // ここにロジックを実装
}

function App() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### 期待する動作

- 初期値 10 でカウンターが表示される
- +1 ボタンで値が増加
- -1 ボタンで値が減少
- Reset ボタンで初期値に戻る

---

## 問題 47: ローカルストレージを扱うカスタムフック

**難易度**: ⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: カスタムフックとローカルストレージ連携

### 課題

- `useLocalStorage`フックを作成
- 値の読み込み、保存、削除機能を実装
- ページリロード後も値が保持されることを確認

### 評価基準

- [ ] ローカルストレージへの保存が正しく動作する
- [ ] 初回ロード時に値が復元される
- [ ] removeValue で値が削除される
- [ ] JSON.stringify/parse が適切に使用されている

### スターターコード

```jsx
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // ローカルストレージから初期値を取得
  // 値の更新時に自動保存
  // removeValue関数の実装
}

function App() {
  const [name, setName, removeName] = useLocalStorage("userName", "");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Stored name: {name}</p>
      <button onClick={removeName}>Clear Storage</button>
    </div>
  );
}
```

### 期待する動作

- 入力した名前がローカルストレージに保存される
- ページをリロードしても値が残る
- Clear Storage ボタンで値が削除される

---

## 問題 48: API 呼び出しカスタムフック

**難易度**: ⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: 非同期処理、ローディング状態管理、エラーハンドリング

### 課題

- `useFetch`フックを作成
- loading、data、error の状態を管理
- URL が変更されたら再フェッチする

### 評価基準

- [ ] ローディング中の状態が表示される
- [ ] データ取得成功時に表示される
- [ ] エラー時にエラーメッセージが表示される
- [ ] URL の変更で再フェッチが発生する

### スターターコード

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  // loading, data, errorの状態管理
  // useEffectでfetch処理
  // クリーンアップ処理
}

function App() {
  const [userId, setUserId] = useState(1);
  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>User Info</h2>
      <p>Name: {data?.name}</p>
      <p>Email: {data?.email}</p>
      <button onClick={() => setUserId(userId + 1)}>Next User</button>
    </div>
  );
}
```

### 期待する動作

- ローディング表示後にユーザー情報が表示される
- Next User ボタンで次のユーザー情報を取得
- エラー時にエラーメッセージが表示される

---

## 問題 49: Toggle 機能のカスタムフック

**難易度**: ⭐⭐
**想定時間**: 10 分
**学習ポイント**: 汎用的なトグル機能の実装

### 課題

- `useToggle`フックを作成
- ON/OFF 状態の切り替え機能を実装
- 任意の値で強制的に設定できる機能も追加

### 評価基準

- [ ] toggle 関数で状態が反転する
- [ ] setOn、setOff で強制的に状態を設定できる
- [ ] 初期値が正しく設定される
- [ ] 複数のコンポーネントで独立して動作する

### スターターコード

```jsx
import { useState } from "react";

function useToggle(initialValue = false) {
  // isOn状態とtoggle、setOn、setOff関数を実装
}

function App() {
  const modal = useToggle();
  const sidebar = useToggle(true);

  return (
    <div className="toggle-container">
      <div className="toggle-section">
        <h3>Modal Example</h3>
        <button className="toggle-button" onClick={modal.toggle}>
          {modal.isOn ? "Close" : "Open"} Modal
        </button>
        {modal.isOn && (
          <div className="modal-content">
            <h4>Modal Content</h4>
            <button className="modal-close-button" onClick={modal.setOff}>
              Close Modal
            </button>
          </div>
        )}
      </div>

      <div className="toggle-section">
        <h3>Sidebar Example</h3>
        <button className="toggle-button" onClick={sidebar.toggle}>
          Toggle Sidebar
        </button>
        <span className="sidebar-status">
          Status: {sidebar.isOn ? "ON" : "OFF"}
        </span>
      </div>
    </div>
  );
}
```

```css
/* Question49: Toggle Hook Styles */

.toggle-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.toggle-section {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  background-color: #fafafa;
  transition: all 0.3s ease;
}

.toggle-section:hover {
  border-color: #646cff;
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.1);
}

.toggle-button {
  padding: 12px 24px;
  margin: 8px;
  border: 2px solid #646cff;
  background-color: white;
  color: #646cff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.toggle-button:hover {
  background-color: #646cff;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(100, 108, 255, 0.3);
}

.modal-content {
  background-color: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #2196f3;
  margin-top: 15px;
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.2);
}

.modal-close-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 10px;
  transition: background-color 0.2s ease;
}

.modal-close-button:hover {
  background-color: #d32f2f;
}

.sidebar-status {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-left: 10px;
}
```

### 期待する動作

- モーダルの開閉が独立して動作
- サイドバーのトグルが独立して動作
- 初期値が正しく反映される

---

## 問題 50: デバウンス機能のカスタムフック

**難易度**: ⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: デバウンス処理、タイマー制御

### 課題

- `useDebounce`フックを作成
- 指定時間経過後に値が更新される
- 連続入力時は前のタイマーをキャンセル

### 評価基準

- [ ] 入力が止まってから指定時間後に値が更新される
- [ ] 連続入力時は最後の入力のみ反映される
- [ ] クリーンアップ処理が適切に実装されている
- [ ] 遅延時間をカスタマイズできる

### スターターコード

```jsx
import { useState, useEffect } from "react";

function useDebounce(value, delay = 500) {
  // デバウンスされた値を返す
  // useEffectでタイマー制御
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log("Searching for:", debouncedSearchTerm);
      // ここでAPI呼び出しなど
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <p>Input value: {searchTerm}</p>
      <p>Debounced value: {debouncedSearchTerm}</p>
    </div>
  );
}
```

### 期待する動作

- 入力中は debounced value が更新されない
- 入力を止めて 1 秒後に debounced value が更新される
- コンソールに検索処理のログが出力される

---

## 問題 51: フォーム管理カスタムフック

**難易度**: ⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: 複数入力の状態管理、汎用的なフォーム処理

### 課題

- `useForm`フックを作成
- 複数の入力フィールドを一括管理
- バリデーション機能を追加
- リセット機能を実装

### 評価基準

- [ ] 複数のフィールドの値が管理できる
- [ ] handleChange で値が更新される
- [ ] バリデーションエラーが表示される
- [ ] reset で初期値に戻る

### スターターコード

```jsx
import { useState } from "react";

function useForm(initialValues, validate) {
  // values, errors, handleChange, handleSubmit, resetを実装
}

function App() {
  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = "メールアドレスは必須です";

    if (!values.password) errors.password = "パスワードは必須です";

    if (values.password && values.password.length < 6) {
      errors.password = "パスワードは6文字以上で入力してください";
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit, reset } = useForm(
    { email: "", password: "" },
    validate
  );

  const onSubmit = () => {
    console.log("Form submitted:", values);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />

      {errors.email && <span className="form-error">{errors.email}</span>}

      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />

      {errors.password && <span className="form-error">{errors.password}</span>}

      <button type="submit">Submit</button>

      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
}
```

```css
/* Question51: Form Styles */
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-container input {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-container input:focus {
  outline: none;
  border-color: #646cff;
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
}

.form-container button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-container button[type="submit"] {
  background-color: #646cff;
  color: white;
}

.form-container button[type="submit"]:hover {
  background-color: #535bf2;
  transform: translateY(-1px);
}

.form-container button[type="button"] {
  background-color: #6c757d;
  color: white;
}

.form-container button[type="button"]:hover {
  background-color: #5a6268;
}

.form-error {
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
}
```

---

## 問題 52: ウィンドウサイズ取得カスタムフック

**難易度**: ⭐⭐⭐
**想定時間**: 12 分
**学習ポイント**: Window イベントリスナー、リサイズ検知

### 課題

- `useWindowSize`フックを作成
- リアルタイムでウィンドウサイズを取得
- デバウンス処理を追加して性能最適化

### 評価基準

- [ ] 初期表示時にウィンドウサイズが取得できる
- [ ] リサイズ時にサイズが更新される
- [ ] デバウンス処理で過度な更新が防げる
- [ ] クリーンアップ処理が実装されている

### スターターコード

```jsx
import { useState, useEffect } from "react";

function useWindowSize() {
  // width, heightの状態管理
  // resizeイベントのリスナー登録
  // デバウンス処理の実装
}

function App() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <h2>Window Size Monitor</h2>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
      <div
        style={{
          width: "100px",
          height: "100px",
          background: width > 768 ? "green" : "red",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {width > 768 ? "Desktop" : "Mobile"}
      </div>
    </div>
  );
}
```

### 期待する動作

- 現在のウィンドウサイズが表示される
- ブラウザをリサイズすると値が更新される
- 768px 以上で Desktop 表示（緑）、未満で Mobile 表示（赤）

---

## 問題 53: 画像遅延ローディングカスタムフック

**難易度**: ⭐⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: Intersection Observer API、要素の可視性検知

### 課題

- `useIntersectionObserver`フックを作成
- 要素が画面内に入ったかを検知
- 遅延ローディングに活用できる実装

### 評価基準

- [ ] 要素の可視性が正しく検知される
- [ ] threshold オプションが機能する
- [ ] 複数要素で独立して動作する
- [ ] クリーンアップ処理が適切

### スターターコード

```jsx
import { useState, useEffect, useRef } from "react";

function useIntersectionObserver(options = {}) {
  // ref, isIntersectingを返す
  // Intersection Observer APIを使用
}

function LazyImage({ src, alt }) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <div ref={ref} style={{ minHeight: "200px", background: "#f0f0f0" }}>
      {isIntersecting ? (
        <img src={src} alt={alt} style={{ width: "100%" }} />
      ) : (
        <p>Scroll to load image...</p>
      )}
    </div>
  );
}

function App() {
  return (
    <div>
      <h2>Lazy Loading Images</h2>
      <div style={{ height: "150vh" }}>
        <p>Scroll down to see images load</p>
      </div>
      <LazyImage src="https://picsum.photos/400/200?random=1" alt="Image 1" />
      <div style={{ height: "50vh" }} />
      <LazyImage src="https://picsum.photos/400/200?random=2" alt="Image 2" />
      <div style={{ height: "50vh" }} />
      <LazyImage src="https://picsum.photos/400/200?random=3" alt="Image 3" />
    </div>
  );
}
```

### 期待する動作

- 初期表示では画像が読み込まれない
- スクロールして画像エリアが表示されると読み込まれる
- 各画像が独立して遅延ローディングされる

---

## 問題 54: クリップボードカスタムフック

**難易度**: ⭐⭐⭐
**想定時間**: 12 分
**学習ポイント**: Clipboard API、

### 課題

- `useClipboard`フックを作成
- テキストのコピー機能を実装
- コピー成功/失敗のフィードバック
- タイムアウトで状態をリセット
  - コピーボタン押下後、2 秒後にボタンのテキストが「✓ Copied!」→「Copy to Clipboard」に戻る

### 評価基準

- [ ] クリップボードへのコピーが動作する
- [ ] 成功/失敗の状態が表示される
- [ ] 2 秒後に状態が自動リセットされる
- [ ] エラーハンドリングが適切

### スターターコード

```jsx
import { useState } from "react";

function useClipboard(resetTimeout = 2000) {
  // copyToClipboard関数の実装
  // isCopied, error状態の管理
  // タイムアウト処理
}

function App() {
  const { copyToClipboard, isCopied, error } = useClipboard();
  const [text, setText] = useState("Hello, World!");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "300px" }}
      />
      <button onClick={() => copyToClipboard(text)}>
        {isCopied ? "✓ Copied!" : "Copy to Clipboard"}
      </button>
      {error && <p style={{ color: "red" }}>Failed to copy: {error}</p>}

      <div style={{ marginTop: "20px" }}>
        <p>Try pasting the copied text here:</p>
        <textarea
          placeholder="Paste here to test"
          style={{ width: "300px", height: "100px" }}
        />
      </div>
    </div>
  );
}
```

---

## 問題 55: 非同期処理を扱うカスタムフック

**難易度**: ⭐⭐⭐⭐
**想定時間**: 20 分
**学習ポイント**: 非同期処理、ローディング状態管理、エラーハンドリング、汎用的なデータフェッチング

### 課題

- 汎用的な`useFetch`フックを作成
- データ取得、ローディング、エラー状態を管理
- リトライ機能の実装
- AbortController でのキャンセル処理

### 評価基準

- [ ] 非同期処理が正しく実行される
- [ ] ローディング、データ、エラーの 3 つの状態が管理される
- [ ] コンポーネントのアンマウント時にリクエストがキャンセルされる
- [ ] 複数のコンポーネントで再利用可能

### スターターコード

```jsx
import { useState, useEffect, useRef } from "react";

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  // フェッチ処理の実装
  // AbortControllerの管理
  // リトライ機能

  const refetch = () => {
    // 再フェッチ機能
  };

  return { data, loading, error, refetch };
}

// 使用例1: ユーザー一覧
function UserList() {
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// 使用例2: 投稿詳細（動的URL）
function PostDetail({ postId }) {
  const {
    data: post,
    loading,
    error,
  } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { cache: true } // キャッシュ有効化
  );

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <article>
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>
    </article>
  );
}
```

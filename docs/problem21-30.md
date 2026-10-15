### 問題 21: 制御コンポーネントの基本

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: 制御コンポーネント、リアルタイムバリデーション、正規表現

#### 課題

- 名前、メール、電話番号の制御コンポーネントを作成
- リアルタイムでフォーマット検証
  - 名前：2 文字以上入力されていること
  - メールアドレス：正しいメールアドレス形式で入力されていること
  - 電話番号：10 桁以上入力されていること
- エラーメッセージ
  - 名前：名前は 2 文字以上で入力してください
  - メールアドレス：有効なメールアドレスを入力してください
  - 電話番号：電話番号は 10 桁以上で入力してください
- 入力値を整形（電話番号にハイフン自動挿入）
  - 080-, 090- から始まる電話番号に対応（フリーダイヤルは考慮しなくていい）
- 全フィールドの入力状態を一箇所で管理

#### 評価基準

- [ ] 全ての入力が制御コンポーネントとして実装されている
- [ ] value と onChange が正しく連携している
- [ ] リアルタイムバリデーションが動作する
- [ ] 電話番号の自動フォーマットが動作する

#### スターターコード

```jsx
import { useState } from "react";

function ControlledForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    // 入力処理とフォーマット
    // バリデーション
  };

  const formatPhoneNumber = (value) => {
    // 電話番号フォーマット（例: 090-1234-5678）
  };

  return (
    <form>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          名前:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </label>
        {errors.name && (
          <span
            style={{
              color: "red",
              display: "block",
              fontSize: "12px",
            }}
          >
            {errors.name}
          </span>
        )}
      </div>

      {/* 他のフィールドも実装 */}

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        <h4>入力内容:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  );
}

export default ControlledForm;
```

---

### 問題 22: 非制御コンポーネントと ref

**難易度**: ⭐⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: useRef、非制御コンポーネント、フォーム送信時の値取得

#### 課題

- useRef を使った非制御コンポーネントフォーム
  - 名前
  - メールアドレス
  - ファイル
- ファイル入力の処理
- 送信時に値を取得
- フォーカス制御
  - 「空欄にフォーカス」ボタンを用意
  - 名前、メールアドレスどちらかが未入力の状態で、フォーカスボタンを押すと、未入力の input タグがフォーカスされること
  - 全て入力済みであれば、「全ての入力フィールドが入力されています」とアラートを表示

#### 評価基準

- [ ] useRef が正しく使用されている
- [ ] 非制御コンポーネントとして動作する
- [ ] ファイルアップロードが処理される
- [ ] ref を使った DOM 操作が実装されている

#### スターターコード

```jsx
import { useRef, useState } from "react";

function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const fileRef = useRef(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // refから値を取得
  };

  const handleFileChange = () => {
    // ファイル選択処理
  };

  const focusFirstEmpty = () => {
    // 最初の空フィールドにフォーカス
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input ref={nameRef} type="text" />
        </div>

        <div>
          <label>メール:</label>
          <input ref={emailRef} type="email" />
        </div>

        <div>
          <label>ファイル:</label>
          <input ref={fileRef} type="file" onChange={handleFileChange} />
          {fileName && <p>選択: {fileName}</p>}
        </div>

        <button type="submit">送信</button>
        <button type="button" onClick={focusFirstEmpty}>
          空欄にフォーカス
        </button>
      </form>

      {submittedData && (
        <div>
          <h4>送信データ:</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UncontrolledForm;
```

---

### 問題 23: 複雑なフォームバリデーション

**難易度**: ⭐⭐⭐  
**想定時間**: 15 分  
**学習ポイント**: 複雑なバリデーション、リアルタイムバリデーション

#### 課題

ユーザー登録フォームのバリデーション機能を実装してください。

**必須機能:**

1. メールアドレスの形式チェック

- 正しいメールアドレス形式かどうかを検証
- 必須項目として空文字チェック

2. パスワード強度チェック

- 8 文字以上であること
- 大文字、小文字、数字を含むこと（最低限の要件）
- パスワード強度を視覚的に表示（★ マークなど）
- 特殊文字の使用も推奨

パスワード強度チェックに使用する正規表現

```
/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
```

3. パスワード確認機能

- パスワードと確認パスワードの一致確認
- リアルタイムでの一致チェック

4. 利用規約の同意

- チェックボックスでの同意確認
- 必須項目として検証

5. フォーム送信制御

- 全項目が正しく入力され、エラーがない場合のみ送信ボタンを有効化
- 送信時に全項目の再検証を実行

6. エラー表示

- 各フィールドのエラーメッセージを適切に表示
- ユーザーが入力中はエラーをクリア

#### 評価基準

- [ ] 各種バリデーションが正しく動作する
- [ ] パスワード強度がリアルタイムで表示される
- [ ] エラーメッセージが適切に表示される
- [ ] 送信ボタンの有効/無効が制御される

#### スターターコード

```jsx
// FormValidation.jsx
import { useState } from 'react';

function FormValidation() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateEmail = (email) => {
    // メールアドレスの検証
  };

  const checkPasswordStrength = (password) => {
    // パスワード強度チェック
    // 強度: 0-5のスコアを返す
  };

  const validateForm = () => {
    // フォーム全体の検証
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 送信処理
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>メールアドレス:</label>
        <input
          type="email"
          value={formData.email}
          // onChange処理
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label>パスワード:</label>
        <input
          type="password"
          value={formData.password}
          // onChange処理
        />
        <div className="password-strength">
          強度: {'★'.repeat(passwordStrength)}{'☆'.repeat(5 - passwordStrength)}
        </div>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      {/* 他のフィールドも実装 */}

      <button type="submit" disabled={/* バリデーション結果 */}>
        登録
      </button>
    </form>
  );
}

export default FormValidation;
```

---

### 問題 24: 動的フォームフィールド

**難易度**: ⭐⭐
**想定時間**: 15 分  
**学習ポイント**: 動的なフィールド追加/削除、配列の状態管理

#### 課題

- 「スキル」入力フィールドを動的に追加/削除
- 各フィールドにレベル選択（初級/中級/上級）を追加
- 最低 1 つ、最大 5 つまでのフィールド制限
- JSON として送信データを整形

#### 評価基準

- [ ] フィールドの追加/削除が動作する
- [ ] 各フィールドの値が独立して管理される
- [ ] 制限（最小/最大）が適用される
- [ ] 送信データが正しく整形される

#### スターターコード

```jsx
// DynamicForm.jsx
import { useState } from 'react';

function DynamicForm() {
  const [skills, setSkills] = useState([
    { id: 1, name: '', level: 'beginner' }
  ]);
  const nextIdRef = useRef(2);

  const addSkill = () => {
    // スキルフィールドを追加
  };

  const removeSkill = (id) => {
    // スキルフィールドを削除
  };

  const updateSkill = (id, field, value) => {
    // スキル情報を更新
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 送信処理
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>スキル一覧</h3>

      {skills.map((skill) => (
        <div key={skill.id}
	        className="skill-row"
	        style={{
				display: "flex",
				gap: "10px",
				marginBottom: "10px",
			}}
        >
          <input
            type="text"
            placeholder="スキル名"
            value={skill.name}
            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
          />

          <select
            value={skill.level}
            onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
            style={{ padding: "8px" }}
          >
            <option value="beginner">初級</option>
            <option value="intermediate">中級</option>
            <option value="advanced">上級</option>
          </select>

          <button
            type="button"
            onClick={() => removeSkill(skill.id)}
            disabled={/* 最低1つ確保 */}
            style={{
				padding: "8px 12px",
				backgroundColor:
				skills.length <= 1 ? "#ccc" : "#f44336",
				color: "white",
				border: "none",
				borderRadius: "4px",
				cursor: "white",
				skills.length <= 1 ? "not-allowed" : "pointer",
				}}
          >
            削除
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSkill}
        disabled={/* 最大5つまで */}
        style={{
			padding: "8px 16px",
			backgroundColor:
			skills.length >= 5 ? "#ccc" : "#2196F3",
			color: "white",
			border: "none",
			borderRadius: "4px",
			cursor: skills.length >= 5 ? "not-allowed" : "pointer",
			marginRight: "10px",
			}}
      >
        スキルを追加
      </button>

      <button type="submit"
		      style={{
				padding: "8px 16px",
				backgroundColor: "#4CAF50",
				color: "white",
				border: "none",
				borderRadius: "4px",
				cursor: "pointer",
				}}>送信</button>

      <div style={{
		marginTop: "20px",
		padding: "15px",
		backgroundColor: "#f5f5f5",
		borderRadius: "4px",
		}}>
        <h4>送信データ:</h4>
        <pre>{JSON.stringify(skills, null, 2)}</pre>
      </div>
    </form>
  );
}

export default DynamicForm;
```

---

### 問題 25: マルチステップフォーム

**難易度**: ⭐⭐⭐⭐  
**想定時間**: 20 分  
**学習ポイント**: フォームのステップ管理、プログレス表示

#### 課題

- 3 ステップのウィザード形式フォーム
  - Step1: 基本情報（名前、メール）
  - Step2: 詳細情報（住所、電話番号）
  - Step3: 確認画面
- 前後のナビゲーション
- 各ステップのバリデーション
- プログレスバー表示
- 最終確認後に送信

#### 評価基準

- [ ] ステップ間の遷移が正しく動作する
- [ ] 各ステップのデータが保持される
- [ ] バリデーションエラーで次に進めない
- [ ] プログレスバーが更新される
- [ ] 確認画面で全データが表示される

#### スターターコード

```jsx
import { useState } from "react";

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: "",
    email: "",
    // Step 2
    address: "",
    phone: "",
    // Step 3 は確認のみ
  });
  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    // 各ステップのバリデーション
  };

  const handleNext = () => {
    // 次のステップへ
  };

  const handlePrev = () => {
    // 前のステップへ
  };

  const handleSubmit = () => {
    // 最終送信処理
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3>Step 1: 基本情報</h3>
            {/* Step1のフォーム */}
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Step 2: 詳細情報</h3>
            {/* Step2のフォーム */}
          </div>
        );
      case 3:
        return (
          <div>
            <h3>Step 3: 確認</h3>
            {/* 確認画面 */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      <div className="step-indicator">
        {[1, 2, 3].map((step) => (
          <span key={step} className={step === currentStep ? "active" : ""}>
            Step {step}
          </span>
        ))}
      </div>

      {renderStep()}

      <div className="navigation">
        <button onClick={handlePrev} disabled={currentStep === 1}>
          前へ
        </button>

        {currentStep < 3 ? (
          <button onClick={handleNext}>次へ</button>
        ) : (
          <button onClick={handleSubmit}>送信</button>
        )}
      </div>
    </div>
  );
}

export default MultiStepForm;
```

---

## 解答例と解説

※ 各問題の解答例と詳細な解説は別ファイルで提供します。
受講者は自分で実装を試みた後、解答を確認することを推奨します。

## スタイル定義（参考）

```css
/* 共通スタイル */
.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.skill-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.password-strength {
  font-size: 14px;
  margin-top: 4px;
}

.multi-step-form {
  max-width: 600px;
  margin: 0 auto;
}

.progress-bar {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #4caf50;
  transition: width 0.3s ease;
}

.step-indicator {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.step-indicator span {
  padding: 10px;
  border-radius: 50%;
  background: #e0e0e0;
}

.step-indicator span.active {
  background: #4caf50;
  color: white;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
```

### 問題 26: 基本的な条件付きレンダリング

**難易度**: ⭐  
**想定時間**: 5 分  
**学習ポイント**: &&演算子、真偽値による表示制御

#### 課題

- ログイン状態を管理するコンポーネントを作成
- ログイン時のみユーザー情報を表示
- 未ログイン時はログインボタンを表示
- ログイン時はログアウトボタンを表示

#### 評価基準

- [ ] &&演算子が正しく使用されている
- [ ] ログイン状態によって表示が切り替わる
- [ ] 条件が偽の時は何も表示されない
- [ ] 状態の切り替えが動作する

#### スターターコード

```jsx
import { useState } from "react";

function LoginStatus() {
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
    <div>
      <h2>ログイン状態管理</h2>

      {/* ログイン時のみユーザー情報を表示 */}

      {/* 未ログイン時のみログインボタンを表示 */}
    </div>
  );
}

export default LoginStatus;
```

---

### 問題 27: 三項演算子での切り替え

**難易度**: ⭐  
**想定時間**: 5 分  
**学習ポイント**: 三項演算子、A/B パターンの切り替え

#### 課題

- テーマ切り替え（ライト/ダーク）機能を実装
- 三項演算子で表示内容とスタイルを切り替え
- アイコンとテキストも動的に変更

  - backgroundColor

    - ダークモード時は  #1a1a1a
    - ライトモード時は  #ffffff

  - color
    - ダークモード時は  #ffffff
    - ライトモード時は  `#000000`

- 背景色、文字色、ボタンスタイルを連動

#### 評価基準

- [ ] 三項演算子が正しく使用されている
- [ ] テーマによってスタイルが切り替わる
- [ ] 複数の要素が連動して変更される
- [ ] 読みやすいコードになっている

#### スターターコード

```jsx
import { useState } from 'react';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const containerStyle = {
    backgroundColor: /* 三項演算子でスタイル切り替え */,
    color: /* 三項演算子でスタイル切り替え */,
    minHeight: '200px',
    padding: '20px',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <h2>
        {/* 三項演算子でタイトル切り替え */}
      </h2>

      <p>
        現在のテーマ: {/* 三項演算子でテーマ名表示 */}
      </p>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          /* 三項演算子でボタンスタイル切り替え */
        }}
      >
        {/* 三項演算子でボタンテキスト切り替え */}
      </button>
    </div>
  );
}

export default ThemeToggle;
```

---

### 問題 28: 複数条件の組み合わせ

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: 複雑な条件分岐、ネストした条件、複数の状態管理

#### 課題

- ユーザーの権限レベル（guest/user/admin）で表示制御
- ログイン状態をチェックボックスで管理
- ログイン状態と権限の組み合わせで表示を変更
  - ログイン済みの場合
    - 「ログインユーザー専用」と表示
  - ログイン済み、かつ権限レベルが user, または admin
    - 「一般ユーザー以上」と表示
  - ログイン済み、かつ権限レベルが admin
    - 「管理者専用」と表示
    - 詳細表示チェックボックスを表示
  - ログイン済み、かつ権限レベルが admin、詳細表示 ON
    - 「管理者詳細」と表示

#### 評価基準

- [ ] 複数の条件が正しく評価される
- [ ] 権限レベルごとの表示が適切
- [ ] 全ての組み合わせが正しく動作する

#### スターターコード

```jsx
import { useState } from "react";

function PermissionControl() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("guest"); // guest, user, admin
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>権限管理システム</h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <label>
          <input type="checkbox" />
          ログイン状態
        </label>

        <label>
          権限レベル:
          <select style={{ marginLeft: "5px" }}>
            <option value="guest">ゲスト</option>
            <option value="user">一般ユーザー</option>
            <option value="admin">管理者</option>
          </select>
        </label>
      </div>

      {/* 基本情報（全員表示） */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          margin: "10px 0",
        }}
      >
        <h3>公開情報</h3>
        <p>誰でも見られる情報です</p>
      </div>

      {/* ログインユーザーのみ */}

      {/* 一般ユーザー以上 */}

      {/* 管理者のみ */}

      {/* 管理者でかつ詳細表示ON */}
    </div>
  );
}

export default PermissionControl;
```

---

### 問題 29: 条件付きクラス名とスタイル

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: 動的なクラス名設定、条件付きスタイル適用

#### 課題

- ステータスに応じたバッジコンポーネント
- success/warning/error/info の 4 種類
- 各ステータスで色とアイコンを変更
- 点滅アニメーション有無の切り替え
- 複数の条件でクラス名を組み立て

#### 評価基準

- [ ] 条件に応じてクラス名が変更される
- [ ] スタイルが動的に適用される
- [ ] 複数の条件が組み合わされている
- [ ] アニメーションの有無が制御される

#### スターターコード

```jsx
import { useState } from 'react';

function StatusBadge() {
  const [status, setStatus] = useState('info'); // success, warning, error, info
  const [isAnimated, setIsAnimated] = useState(false);
  const [size, setSize] = useState('medium'); // small, medium, large


  const getStatusIcon = () => {
    // ステータスに応じたアイコンを返す
    switch (status) {
		case "success":
			return "✓"; // チェックマーク
		case "warning":
			return "⚠"; // 警告マーク
		case "error":
			return "✕"; // バツマーク
		case "info":
			return "ℹ"; // 情報マーク
		default:
			return "?"; // 疑問符
	}
  };

  const badgeClassName = [
    'badge',
    /* 条件に応じてクラスを追加 */
  ].filter(Boolean).join(' ');


  return (
    <div>
      <h3>ステータスバッジ</h3>

      <div className="controls">
        <select>
          <option value="success">成功</option>
          <option value="warning">警告</option>
          <option value="error">エラー</option>
          <option value="info">情報</option>
        </select>

        <select>
          <option value="small">小</option>
          <option value="medium">中</option>
          <option value="large">大</option>
        </select>

        <label>
          <input
            type="checkbox"

          />
          アニメーション
        </label>
      </div>

      <div className={badgeClassName}>
        <span>{getStatusIcon()}</span>
        <span>{status.toUpperCase()}</span>
      </div>
    </div>
  );
}

export default StatusBadge;

/* CSS例
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
}

.badge-success {
  background-color: #10b981; /* 緑色 */
}

.badge-warning {
  background-color: #f59e0b; /* オレンジ色 */
}

.badge-error {
  background-color: #ef4444; /* 赤色 */
}

.badge-info {
  background-color: #3b82f6; /* 青色 */
}

.badge-small {
  padding: 4px 8px;
  font-size: 12px;
}

.badge-medium {
  padding: 8px 16px;
  font-size: 14px;
}

.badge-large {
  padding: 12px 24px;
  font-size: 16px;
}

.badge.animated {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
*/
```

---

### 問題 30: 条件による複数コンポーネントの切り替え

**難易度**: ⭐⭐
**想定時間**: 15 分  
**学習ポイント**: コンポーネントの動的レンダリング、switch 文的な条件分岐

#### 課題

- 選択された表示モード（card/list/grid）でレイアウト変更
- 同じデータを異なる形式で表示
- 各モードで異なるコンポーネントを使用

#### 評価基準

- [ ] モードに応じて異なるコンポーネントが表示される
- [ ] データは共通で見た目だけが変わる
- [ ] ローディング/エラー状態が適切に表示される
- [ ] 切り替えがスムーズに動作する

#### スターターコード

```jsx
import { useState } from "react";

// 個別の表示コンポーネント
function CardView({ items }) {
  return (
    <div className="card-view">
      {items.map((item) => (
        <div key={item.id} className="card">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function ListView({ items }) {
  return (
    <ul className="list-view">
      {items.map((item) => (
        <li key={item.id}>
          <strong>{item.title}:</strong> {item.description}
        </li>
      ))}
    </ul>
  );
}

function GridView({ items }) {
  return (
    <div className="grid-view">
      {items.map((item) => (
        <div key={item.id} className="grid-item">
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  );
}

function ViewModeSwitcher() {
  const [viewMode, setViewMode] = useState("card"); // card, list, grid

  const items = [
    { id: 1, title: "アイテム1", description: "説明1" },
    { id: 2, title: "アイテム2", description: "説明2" },
    { id: 3, title: "アイテム3", description: "説明3" },
  ];

  const renderContent = () => {
    // 各モードの表示を条件分岐
  };

  return (
    <div>
      <h2>表示モード切り替え</h2>

      <div className="mode-selector">
        <button className={viewMode === "card" ? "active" : ""}>カード</button>
        <button className={viewMode === "list" ? "active" : ""}>リスト</button>
        <button className={viewMode === "grid" ? "active" : ""}>
          グリッド
        </button>
      </div>

      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default ViewModeSwitcher;
```

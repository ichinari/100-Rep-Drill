### 問題 16: 基本的なクリックイベント

**難易度**: ⭐  
**想定時間**: 5 分  
**学習ポイント**: onClick イベント、イベントハンドラーの定義

#### 課題

- 3 つの異なるボタンを作成
- それぞれクリックしたときに異なるアラートを表示
- イベントハンドラーは関数として定義
- 最後にクリックしたボタンの名前を画面に表示

#### 評価基準

- [ ] onClick イベントが正しく設定されている
- [ ] 各ボタンで異なるアラートが表示される
- [ ] 最後にクリックしたボタン名が更新される
- [ ] イベントハンドラーが適切に定義されている

#### スターターコード

```jsx
// ClickButtons.jsx
import { useState } from "react";

function ClickButtons() {
  const [lastClicked, setLastClicked] = useState("なし");

  // イベントハンドラーを定義

  return (
    <div>
      <h3>最後にクリックしたボタン: {lastClicked}</h3>
      <button>ボタン1</button>
      <button>ボタン2</button>
      <button>ボタン3</button>
    </div>
  );
}

export default ClickButtons;
```

---

### 問題 17: イベントオブジェクトの活用

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: イベントオブジェクト、event.target、event.preventDefault

#### 課題

- クリック位置の座標（clientX, clientY）を表示
- クリック回数をカウントして表示
- Shift キーを押しながらクリックした場合は背景色を変更
- 右クリックを防止してカスタムメッセージを表示
- ダブルクリックでカウンターをリセット

#### 評価基準

- [ ] イベントオブジェクトから情報を取得できている
- [ ] 修飾キーの判定が動作する
- [ ] preventDefault が正しく使用されている
- [ ] 異なるイベントタイプが処理されている

#### スターターコード

```jsx
// EventInfo.jsx
import { useState } from "react";

function EventInfo() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bgColor, setBgColor] = useState("white");
  const [counter, setCounter] = useState(0);

  const handleClick = (e) => {
    // クリック処理
  };

  const handleContextMenu = (e) => {
    // 右クリック処理
  };

  return (
    <div
      style={{
        height: "300px",
        backgroundColor: bgColor,
        position: "relative",
        border: "1px solid #ccc",
      }}
      // イベントハンドラーを設定
    >
      <p>
        クリック位置: X={position.x}, Y={position.y}
      </p>
      <p>カウンター: {counter}</p>
      <p>Shiftキーを押しながらクリックで色が変わります</p>
    </div>
  );
}

export default EventInfo;
```

---

### 問題 18: マウスイベントの組み合わせ

**難易度**: ⭐⭐⭐  
**想定時間**: 15 分  
**学習ポイント**: onMouseEnter、onMouseLeave、onMouseMove、onMouseDown、onMouseUp

#### 課題

- コンテナ用の div 要素を容易し、その中にボックス用の div 要素を用意する。
- ボックスにマウスを乗せると色が変わる（hover 効果）
- div 要素内でマウスの動きに応じて座標を追跡表示
- ドラッグでボックスを移動できること
  - ボックスの移動はコンテナ内であること
- マウスが離れたら元の位置に戻る

#### 評価基準

- [ ] hover 効果が動作する
- [ ] マウス座標がリアルタイムで更新される
- [ ] ドラッグ&ドロップが実装されている
- [ ] 各イベントが適切に処理されている

#### スターターコード

```jsx
import { useState } from "react";

function MouseEvents() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [boxPos, setBoxPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  // マウスイベントハンドラーを実装

  return (
    <div
      style={{
        height: "400px",
        width: "400px",
        position: "relative",
        border: "1px solid #ccc",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: boxPos.x,
          top: boxPos.y,
          width: "100px",
          height: "100px",
          backgroundColor: isHovered ? "lightblue" : "gray",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          transition: isDragging ? "none" : "all 0.3s",
        }}
        // マウスイベントを設定
      >
        ドラッグ可能
      </div>
      <p>
        マウス座標: X={mousePos.x}, Y={mousePos.y}
      </p>
    </div>
  );
}

export default MouseEvents;
```

---

### 問題 19: キーボードイベント

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: onKeyDown、onKeyUp、onKeyPress、key コード

#### 課題

- タスク管理機能の実装
- 入力フィールドで Enter キーを押すとリストに追加
- Escape キーで入力をクリア
- Ctrl+Z で最後の項目を削除（Undo 機能）
- 特定のキーが押された回数をカウント
  - Enter
  - Escape
  - Space

#### 評価基準

- [ ] Enter キーでの追加が動作する
- [ ] Escape キーでのクリアが動作する
- [ ] Ctrl+Z で最後の項目がリストから削除されること
- [ ] キーイベントが正しく処理されている

#### スターターコード

```jsx
import { useState } from "react";

function KeyboardEvents() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [keyPressCount, setKeyPressCount] = useState({
    Enter: 0,
    Escape: 0,
    Space: 0,
  });

  return (
    <div>
      <input
        type="text"
        // キーイベントを設定
        placeholder="Enterで追加、Escでクリア、Ctrl+Zで削除"
        style={{ width: "300px", padding: "8px" }}
        aria-label="アイテム入力フィールド"
        maxLength={100}
      />

      <ul>{/* item 表示　*/}</ul>

      <div>
        <h4>キー押下回数:</h4>
        <p>Enter: {/* Enter入力回数　*/}回</p>
        <p>Escape: {/* Escape入力回数　*/}回</p>
        <p>Space: {/* Space入力回数　*/}回</p>
      </div>
    </div>
  );
}

export default KeyboardEvents;
```

---

### 問題 20: フォーカスとブラーイベント

**難易度**: ⭐⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: onFocus、onBlur、フォーカス管理、バリデーション

#### 課題

- 複数の入力フィールドでフォーカス状態を管理
- フォーカス時に枠線の色を変更
- ブラー時に入力値を検証
  - 3 文字以上入力してください
- 全フィールド入力完了で送信ボタンを有効化

#### 評価基準

- [ ] フォーカス/ブラーイベントが動作する
- [ ] フォーカス時のスタイル変更が反映される
- [ ] バリデーションが実行される
- [ ] 自動フォーカス移動が動作する

#### スターターコード

```jsx
// FocusBlurEvents.jsx
import { useState, useRef } from 'react';

function FocusBlurEvents() {
  const [focusedField, setFocusedField] = useState(null);
  const [values, setValues] = useState({ field1: '', field2: '', field3: '' });
  const [errors, setErrors] = useState({});


  const handleFocus = (fieldName) => {
    // フォーカス処理
  };

  const handleBlur = (fieldName) => {
    // ブラー処理とバリデーション
  };

  const handleChange = (fieldName, value) => {
    // 入力処理と自動フォーカス
  };

  const isFormValid = () => {
	  // 全フィールドが有効かチェック
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="3文字入力"
          style={{
            borderColor: focusedField === 'field1' ? 'blue' : '#ccc',
            borderWidth: '2px'
          }}
          // イベントハンドラーを設定
        />
        {errors.field1 && <span style={{ color: 'red' }}>{errors.field1}</span>}
      </div>

      {/* 他のフィールドも同様に実装 */}

      <button disabled={/* 全フィールド入力チェック */}
              style={{
		        padding: '10px 20px',
		        backgroundColor: isFormValid ? '#4CAF50' : '#ccc',
		        color: 'white',
		        border: 'none',
		        borderRadius: '4px',
		        cursor: isFormValid ? 'pointer' : 'not-allowed'
		      }}>
        送信
      </button>
    </div>
  );
}

export default FocusBlurEvents;
```

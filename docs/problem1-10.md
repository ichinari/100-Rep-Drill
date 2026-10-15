### 問題 1: 初めての JSX コンポーネント

**難易度**: ⭐  
**学習ポイント**: JSX の基本構文、コンポーネントの定義

#### 課題

- React コンポーネントを作成し、「Hello, React!」と表示する
- h1 タグを使用して見出しとして表示

#### 評価基準

- [ ] コンポーネントが正しく定義されている
- [ ] JSX 構文で h1 タグが正しく記述されている
- [ ] 「Hello, React!」が画面に表示される

#### 期待する動作

ブラウザに大きな見出しで「Hello, React!」が表示される

#### ヒント

- JSX では HTML のようにタグを書けますが、return 文の中に記述します
- return の後には必ず括弧()を付けましょう

---

### 問題 2: 複数要素の表示

[[section1_solutions#問題2 複数要素の表示]]

**難易度**: ⭐  
**想定時間**: 5 分  
**学習ポイント**: Fragment、複数要素のレンダリング

#### 課題

- 見出し（h1）とパラグラフ（p）の 2 つの要素を表示する
- Fragment または<>...</>を使用して複数要素をラップする
- 見出しは「私のプロフィール」、パラグラフは「React を学習中です」と表示

#### 評価基準

- [ ] 複数の要素が正しくレンダリングされる
- [ ] Fragment または React.Fragment が使用されている
- [ ] エラーなく表示される

#### 期待する動作

見出しとその下にパラグラフが表示される

#### ヒント

- JSX では単一の要素を返す必要があります
- `<>...</>`は`React.Fragment`の省略記法です

---

### 問題 3: JavaScript 式の埋め込み

**難易度**: ⭐
**学習ポイント**: JSX 内での JavaScript 式の評価、{}の使い方

#### 課題

- 名前と年齢を変数に格納し、JSX 内で表示する
- 現在の年も表示する
- 「私は[名前]です。[年齢]歳です。今年は[年]年です。」の形式で表示

#### 評価基準

- [ ] JavaScript 変数が JSX 内で正しく表示される
- [ ] 式の評価が正しく動作する
- [ ] {}を使った埋め込みが適切に行われている

#### スターターコード

```jsx
function Introduction() {
  const name = "田中太郎";
  const age = 25;

  return <div>{/* ここに変数を使った自己紹介文を記述 */}</div>;
}

export default Introduction;
```

#### 期待する動作

変数の値と計算結果が文章内に埋め込まれて表示される

---

### 問題 4: スタイルの適用

**難易度**: ⭐
**想定時間**: 10 分  
**学習ポイント**: インラインスタイル、className 属性、スタイルオブジェクト

#### 課題

- ボックスコンポーネントを作成し、以下のスタイルを適用：
  - 背景色: #f0f0f0
  - パディング: 20px
  - ボーダー: 2px solid #333
  - 角丸: 8px
- インラインスタイルと className の両方を試す

#### 評価基準

- [ ] インラインスタイルが正しく適用されている
- [ ] style オブジェクトの記法が正しい（キャメルケース）
- [ ] 見た目が期待通りになっている

#### スターターコード

```jsx
function StyledBox() {
  const boxStyle = {
    // スタイルオブジェクトを定義
  };

  return (
    <div>
      <div style={}>
        インラインスタイルのボックス
      </div>
      <div className="custom-box">
        CSSクラスのボックス
      </div>
    </div>
  );
}

export default StyledBox;

/* App.css に以下を追加
.custom-box {
  // CSSスタイルを記述
}
*/
```

#### 期待する動作

2 つのスタイル付きボックスが表示される

---

### 問題 5: 属性の動的設定

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: 動的な属性値、条件付き属性、データ属性

#### 課題

- 画像を表示するコンポーネントを作成
- src、alt、width を変数から動的に設定
- isLarge フラグが true の場合は width を 2 倍にする
- data-size 属性を追加し、isLarge フラグが true の場合は large、それ以外は small にする

#### 評価基準

- [ ] 画像が正しく表示される
- [ ] 属性が動的に設定されている
- [ ] 条件によってサイズが変わる
- [ ] data 属性が正しく設定されている

#### スターターコード

```jsx
// DynamicImage.jsx
function DynamicImage() {
  const imageUrl = "https://placehold.co/150";
  const altText = "サンプル画像";
  const baseWidth = 150;
  const isLarge = true;

  return (
    <div>
      <img
      // ここに動的な属性を設定
      />
    </div>
  );
}

export default DynamicImage;
```

## Props の受け渡しとデフォルト値（問題 6-10）

### 問題 6: 基本的な Props の受け渡し

**難易度**: ⭐  
**想定時間**: 5 分  
**学習ポイント**: Props の基本、親から子へのデータ受け渡し

#### 課題

- Greeting コンポーネントを作成し、name を props で受け取る
- 「こんにちは、[name]さん！」と表示する
- 親コンポーネントから異なる名前を 3 回渡して表示

#### 評価基準

- [ ] props が正しく受け取れている
- [ ] 複数の異なる名前が表示される
- [ ] props の型が定義されていること

#### スターターコード

```jsx
function Greeting(props) {
  return <div>{/* propsを使って挨拶を表示 */}</div>;
}

// 親コンポーネント
function Question06() {
  return <div>{/* Greetingコンポーネントを3回使用 */}</div>;
}
```

---

### 問題 7: 複数の Props と型

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: 複数 props、異なる型の props

#### 課題

- UserCard コンポーネントを作成
- name（文字列）、age（数値）、isActive（真偽値）を受け取る
- isActive が true なら「アクティブ」、false なら「非アクティブ」と表示
- ２名の異なるユーザー情報を表示する

#### 評価基準

- [ ] 3 つの props が正しく受け取れている
- [ ] 異なる型のデータが適切に処理されている
- [ ] 条件に応じた表示が行われている

#### スターターコード

```jsx
// UserCard.jsx
function UserCard(
  {
    /* propsを分割代入 */
  }
) {
  return <div className="user-card">{/* ユーザー情報を表示 */}</div>;
}

export default UserCard;
```

---

### 問題 8: Props のデフォルト値

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: デフォルト props、オプショナルな props

#### 課題

- Button コンポーネントを作成
- text（表示テキスト）、size（small/medium/large）、color（色）を受け取る
- デフォルト値：text="Click me", size="medium", color="blue"

#### 評価基準

- [ ] デフォルト値が正しく設定されている
- [ ] props が渡されない場合にデフォルト値が使用される
- [ ] props が渡された場合は上書きされる

#### スターターコード

```jsx
function Button(
  {
    // デフォルト値を設定
  }
) {
  const buttonStyle = {
    padding:
      size === "small"
        ? "5px 10px"
        : size === "large"
        ? "15px 30px"
        : "10px 20px",
    backgroundColor: color,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return <button style={buttonStyle}>{text}</button>;
}

export default Button;
```

---

### 問題 9: Children Props

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: children props、コンポーネントの合成

#### 課題

- Card コンポーネントを作成し、枠線付きのカードを表示
- children を使って任意のコンテンツを表示可能にする
- title props で見出しを表示
- 異なるコンテンツを持つカードを 3 つ作成

#### 評価基準

- [ ] children props が正しく使用されている
- [ ] 異なるコンテンツが表示される
- [ ] カードのスタイルが適用されている

#### スターターコード

```jsx
// Card.tsx
function Card(
  {
    /* props */
  }
) {
  return <div className="card">{/* タイトルとchildrenを表示 */}</div>;
}

// 使用例
<Card title="カード1">
  <p>任意のコンテンツ</p>
</Card>;
```

---

### 問題 10: Props の展開と Rest 演算子

**難易度**: ⭐⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: スプレッド演算子、rest 演算子、props の転送

#### 課題

- InputField コンポーネントを作成
- label props と、その他全ての props を input 要素に転送
- スプレッド演算子を使って props を展開
- type、placeholder、required などを親から渡せるようにする

#### 評価基準

- [ ] rest 演算子で残りの props を取得している
- [ ] スプレッド演算子で props を展開している
- [ ] 任意の HTML 属性が渡せる

#### スターターコード

```jsx
// InputField.tsx
function InputField({ label, // 残りのprops }) {
  return (
    <div className="input-field">
      {/* labelとinputを表示 */}
    </div>
  );
}

// 使用例
<InputField
  label="メールアドレス"
  type="email"
  placeholder="example@email.com"
  required
/>
```

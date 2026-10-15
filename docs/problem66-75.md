## 問題 66: React.memo の基本

**難易度**: ⭐⭐
**想定時間**: 10 分
**学習ポイント**: React.memo による不要な再レンダリング防止

### 課題

- 子コンポーネントを React.memo でラップ
- 親の状態変更時の再レンダリングを防ぐ

### 評価基準

- [ ] React.memo が正しく適用されている
- [ ] 関係ない状態変更で子が再レンダリングされない
- [ ] props が変更された時のみ再レンダリングされる

### スターターコード

```jsx
import React, { useState, useRef, useEffect } from "react";

// React.memoでラップする
const ExpensiveChild = ({ data }) => {
  return (
    <div style={{ padding: "10px", border: "1px solid blue" }}>
      <h3>Child Component</h3>
      <p>Data: {data}</p>
      <p>Render count: {renderCount.current}</p>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [childData, setChildData] = useState("Initial");

  return (
    <div>
      <h2>React.memo Demo</h2>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Parent Count: {count}
      </button>
      <button onClick={() => setChildData(`Updated ${Date.now()}`)}>
        Update Child Data
      </button>
      <ExpensiveChild data={childData} />
    </div>
  );
}
```

---

## 問題 67: useMemo で計算結果をメモ化

**難易度**: ⭐⭐⭐
**想定時間**: 12 分
**学習ポイント**: 重い計算処理のメモ化、依存配列の理解

### 課題

- 計算を useMemo でメモ化
- 不要な再計算を防ぐ

### 評価基準

- [ ] useMemo が正しく実装されている
- [ ] 依存配列が適切に設定されている
- [ ] 関係ない状態変更で再計算されない

### スターターコード

```jsx
import React, { useState, useMemo } from "react";

function expensiveCalculation(n: number): number {
  console.log(`Calculating: ${n} * 2`);
  // 重い計算をシミュレート
  for (let i = 0; i < 100000000; i++) {
    // 計算処理を遅延させる
  }
  return n * 2;
}

function App() {
  const [num, setNum] = useState < number > 5;
  const [isDark, setIsDark] = useState < boolean > false;
  const [calcTime, setCalcTime] = useState < number > 0;

  // useMemoで計算結果をメモ化
  // numが変更されたときのみ再計算される

  const startTime = performance.now();
  const calculatedResult = expensiveCalculation(num);
  const endTime = performance.now();
  setCalcTime(endTime - startTime);

  const theme = {
    backgroundColor: isDark ? "#333" : "#FFF",
    color: isDark ? "#FFF" : "#333",
    padding: "20px",
    minHeight: "100vh",
  };

  return (
    <div style={theme}>
      <h2>useMemo Example</h2>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(parseInt(e.target.value) || 0)}
        min="0"
        max="100"
      />
      <p>Result: {calculatedResult}</p>
      <p>計算時間: {calcTime.toFixed(2)}ms</p>
      <button onClick={() => setIsDark(!isDark)}>Toggle Theme</button>
      <p>Check console for calculation logs</p>
    </div>
  );
}

export default App;
```

---

## 問題 68: useCallback で関数をメモ化

**難易度**: ⭐⭐⭐
**想定時間**: 12 分
**学習ポイント**: useCallback を使用した関数の再生成防止、子コンポーネントの再レンダリング最適化

### 課題

- useCallback で関数をメモ化
- React.memo と組み合わせて最適化

### 評価基準

- [ ] useCallback が正しく使用されている
- [ ] 子コンポーネントの不要な再レンダリングが防げている
- [ ] 依存配列が適切に設定されている
- [ ] 関数の同一性が保たれている

### スターターコード

```jsx
import React, { useState } from "react";

// 通常の子コンポーネント
type ButtonProps = {
  onClick: () => void,
  children: React.ReactNode,
};

const Button = ({ onClick, children }: ButtonProps) => {
  console.log(`${children} レンダリング`);
  return <button onClick={onClick}>{children}</button>;
};

const App: React.FC = () => {
  const [count, setCount] = useState < number > 0;
  const [text, setText] = useState < string > "";

  // 通常の関数（メモ化なし）
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div>
      <div>
        <p>カウント: {count}</p>
        <Button onClick={handleIncrement}>+1</Button>
        <Button onClick={handleDecrement}>-1</Button>
      </div>

      <div>
        <p>テキスト入力（ボタンの再レンダリングを確認）:</p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="入力してください"
        />
      </div>
    </div>
  );
};

export default App;
```

---

## 問題 69: メモ化のカスタム比較関数

**難易度**: ⭐⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: React.memo の第 2 引数、カスタム比較ロジック

### 課題

- React.memo にカスタム比較関数を追加
- 特定の props のみで再レンダリング判定
- オブジェクトの深い比較を実装

### 評価基準

- [ ] カスタム比較関数が正しく実装されている
- [ ] 指定した props の変更のみで再レンダリングされる
- [ ] オブジェクトの内容で比較される
- [ ] パフォーマンスが改善されている

### スターターコード

```jsx
import { useState } from "react";

type User = {
  id: number,
  name: string,
  age: number,
  email: string,
};

type Theme = {
  background: string,
};

type UserCardProps = {
  user: User,
  isSelected: boolean,
  theme: Theme,
  onClick: () => void,
};

const UserCard = ({ user, isSelected, theme }: UserCardProps) => {
  console.log(`UserCard ${user.id} rendered`);

  return (
    <div
      style={{
        padding: "10px",
        margin: "10px",
        border: isSelected ? "2px solid blue" : "1px solid gray",
        backgroundColor: theme.background,
      }}
    >
      <h3>{user.name}</h3>
      <p>年齢: {user.age}</p>
      <p>メール: {user.email}</p>
    </div>
  );
};

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
    { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  ]);
  const [selectedId, setSelectedId] = useState(1);
  const [themeColor, setThemeColor] = useState("#ffffff");

  const theme = { background: themeColor };

  return (
    <div>
      <h2>カスタム比較によるユーザーカード</h2>
      <button
        onClick={() =>
          setThemeColor("#" + Math.random().toString(16).slice(-6))
        }
      >
        テーマ変更
      </button>
      <button
        onClick={() => {
          setUsers((prev) =>
            prev.map((u) => (u.id === 1 ? { ...u, age: u.age + 1 } : u))
          );
        }}
      >
        Aliceの年齢を増やす
      </button>

      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isSelected={selectedId === user.id}
          theme={theme}
          onClick={() => setSelectedId(user.id)}
        />
      ))}
    </div>
  );
}

export default App;
```

---

## 問題 70: useMemo と useCallback の組み合わせ

**難易度**: ⭐⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: 複数の最適化フックの効果的な組み合わせ

### 課題

- 検索とソート機能を最適化
- useMemo で結果をキャッシュ
- useCallback で関数をメモ化
- 不要な処理を削減

### 評価基準

- [ ] 検索結果がメモ化されている
- [ ] ソート結果がメモ化されている
- [ ] ハンドラー関数がメモ化されている
- [ ] パフォーマンスが向上している

### スターターコード

```jsx
import React, { useState } from "react";

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
};

const data: Product[] = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 1,
    category: ["Electronics", "Books", "Clothing"][i % 3],
}));

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "price">("name");
    const [category, setCategory] = useState("all");

    // 検索とフィルタリング
    const filteredData = data.filter((item) => {
        console.log("Filtering data...");
        const matchesSearch = item.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            category === "all" || item.category === category;
        return matchesSearch && matchesCategory;
    });

    // ソート処理
    const sortedData = [...filteredData].sort((a, b) => {
        console.log("Sorting data...");
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "price") return a.price - b.price;
        return 0;
    });

    // ハンドラー関数
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value as "name" | "price");
    };

    const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    return (
        <div>
            <h2>Product List</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <select value={sortBy} onChange={handleSort}>
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                </select>
                <select value={category} onChange={handleCategory}>
                    <option value="all">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                    <option value="Clothing">Clothing</option>
                </select>
            </div>
            <p>Showing {sortedData.length} products</p>
            <div style={{ height: "400px", overflow: "auto" }}>
                {sortedData.slice(0, 50).map((item) => (
                    <div
                        key={item.id}
                        style={{
                            padding: "5px",
                            borderBottom: "1px solid #eee",
                        }}
                    >
                        {item.name} - ${item.price} ({item.category})
                    </div>
                ))}
            </div>
            <p>Check console for processing logs</p>
        </div>
    );
};

export default App;
```

---

## 問題 71: スクロール処理の最適化

**難易度**: ⭐⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: 大量データの効率的な表示

### 課題

- 10000 件のリストをスクロールで表示
- 表示領域のみをレンダリング
- スムーズなスクロール体験を実現

### 評価基準

- [ ] 可視領域のアイテムのみがレンダリングされる
- [ ] スクロールがスムーズに動作する
- [ ] 全体の高さが正しく計算される
- [ ] パフォーマンスが向上している

### スターターコード

```jsx
import React, { useState } from "react";

const ITEM_HEIGHT = 50;
const CONTAINER_HEIGHT = 400;
const BUFFER_SIZE = 5;

type Item = {
  id: number,
  text: string,
};

type VisibleRange = {
  start: number,
  end: number,
};

type VirtualListProps = {
  items: Item[],
  itemHeight?: number,
  containerHeight?: number,
};

function VirtualList({
  items,
  itemHeight = ITEM_HEIGHT,
  containerHeight = CONTAINER_HEIGHT,
}: VirtualListProps) {
  const [scrollTop, setScrollTop] = useState(0);

  // 表示範囲の計算
  // 表示開始・終了インデックスを計算
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount, items.length);

  // バッファを含めた範囲を返す
  const visibleRange: VisibleRange = {
    start: Math.max(0, startIndex - BUFFER_SIZE),
    end: Math.min(items.length, endIndex + BUFFER_SIZE),
  };

  const handleSimport React, { useState } from "react";

const ITEM_HEIGHT = 50;
const CONTAINER_HEIGHT = 400;
const BUFFER_SIZE = 5;

type Item = {
  id: number,
  text: string,
};

type VisibleRange = {
  start: number,
  end: number,
};

type VirtualListProps = {
  items: Item[],
  itemHeight?: number,
  containerHeight?: number,
};

function VirtualList({
  items,
  itemHeight = ITEM_HEIGHT,
  containerHeight = CONTAINER_HEIGHT,
}: VirtualListProps) {
  const [scrollTop, setScrollTop] = useState(0);

  // 表示範囲の計算
  // 表示開始・終了インデックスを計算
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount, items.length);

  // バッファを含めた範囲を返す
  const visibleRange: VisibleRange = {
    start: Math.max(0, startIndex - BUFFER_SIZE),
    end: Math.min(items.length, endIndex + BUFFER_SIZE),
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // 全体の高さ
  const totalHeight = items.length * itemHeight;

  // 表示するアイテム
  const visibleItems = items.slice(visibleRange.start, visibleRange.end);

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: containerHeight,
        overflow: "auto",
        border: "1px solid #ccc",
      }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((item, index) => (
          <div
            key={visibleRange.start + index}
            style={{
              position: "absolute",
              top: (visibleRange.start + index) * itemHeight,
              height: itemHeight,
              width: "100%",
              borderBottom: "1px solid #eee",
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            Item {item.id}: {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    text: `This is item number ${i + 1}`,
  }));

  return (
    <div>
      <h2>Virtual Scroll - 10,000 Items</h2>
      <p>Only visible items are rendered in DOM</p>
      <VirtualList items={items} />
      <p>Rendered items: Check React DevTools</p>
    </div>
  );
}

export default App;croll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // 全体の高さ
  const totalHeight = items.length * itemHeight;

  // 表示するアイテム
  const visibleItems = items.slice(visibleRange.start, visibleRange.end);

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: containerHeight,
        overflow: "auto",
        border: "1px solid #ccc",
      }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((item, index) => (
          <div
            key={visibleRange.start + index}
            style={{
              position: "absolute",
              top: (visibleRange.start + index) * itemHeight,
              height: itemHeight,
              width: "100%",
              borderBottom: "1px solid #eee",
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            Item {item.id}: {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    text: `This is item number ${i + 1}`,
  }));

  return (
    <div>
      <h2>Virtual Scroll - 10,000 Items</h2>
      <p>Only visible items are rendered in DOM</p>
      <VirtualList items={items} />
      <p>Rendered items: Check React DevTools</p>
    </div>
  );
}

export default App;
```

---

## 問題 72: 遅延ローディング（React.lazy, Suspense, ErrorBoundary）

**難易度**: ⭐⭐⭐
**想定時間**: 12 分
**学習ポイント**: React.lazy を使用した遅延ローディング、レンダリング時のエラーハンドリング

### 課題

- React.lazy で複数のコンポーネントを遅延ロード
- Suspense でローディング状態を表示
- エラーバウンダリーを実装

### 評価基準

- [ ] コンポーネントが遅延ロードされる
- [ ] ローディング中の表示が適切
- [ ] エラー時の処理が実装されている
- [ ] タブ切り替えで動的にロードされる

### スターターコード

```jsx
import React, { Suspense, lazy, useState } from "react";

// 遅延ロードするコンポーネント（実際は別ファイル）
const Dashboard = () => (
  <div style={{ padding: "20px", background: "#f0f0f0" }}>
    <h3>Dashboard Component</h3>
    <p>Heavy dashboard with charts and data</p>
  </div>
);

const Analytics = () => (
  <div style={{ padding: "20px", background: "#e0e0e0" }}>
    <h3>Analytics Component</h3>
    <p>Complex analytics visualizations</p>
  </div>
);

const Settings = () => (
  <div style={{ padding: "20px", background: "#d0d0d0" }}>
    <h3>Settings Component</h3>
    <p>User settings and preferences</p>
  </div>
);

// React.lazyで遅延ロード設定
// const LazyDashboard = lazy(() => ...)
// const LazyAnalytics = lazy(() => ...)
// const LazySettings = lazy(() => ...)

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div>
      <h2>Lazy Loading Demo</h2>
      <div>
        <button
          onClick={() => setActiveTab("dashboard")}
          style={{
            fontWeight: activeTab === "dashboard" ? "bold" : "normal",
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          style={{
            fontWeight: activeTab === "analytics" ? "bold" : "normal",
          }}
        >
          Analytics
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          style={{
            fontWeight: activeTab === "settings" ? "bold" : "normal",
          }}
        >
          Settings
        </button>
      </div>

      {activeTab === "dashboard" && <LazyDashboard />}
      {activeTab === "analytics" && <LazyAnalytics />}
      {activeTab === "settings" && <LazySettings />}
    </div>
  );
}

export default App;
```

---

## 問題 73: メモ化の判断基準と過度な最適化

**難易度**: ⭐⭐⭐⭐⭐
**想定時間**: 20 分
**学習ポイント**: メモ化が必要なケースと不要なケースの判断、過度な最適化の問題点

### 課題

以下のコードは過度にメモ化されており、逆にパフォーマンスが悪化しています。

- 不要なメモ化を削除
- 本当に必要な箇所だけメモ化
- メモ化の判断基準を理解
- コメントで判断理由を説明

### 評価基準

- [ ] 必要な最適化だけが残されている
- [ ] 各判断の理由がコメントで説明されている
- [ ] コードが簡潔で読みやすくなっている

### スターターコード

```jsx
import { useState, useMemo, useCallback, memo } from "react";

// 過度にメモ化されたコンポーネント
function UserProfile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", price: 1000 },
    { id: 2, name: "Item 2", price: 2000 },
    { id: 3, name: "Item 3", price: 3000 },
  ]);

  const greeting = useMemo(() => {
    return `Hello, ${name}!`;
  }, [name]);

  const ageNumber = useMemo(() => {
    return Number(age);
  }, [age]);

  const styles = useMemo(
    () => ({
      container: { padding: "20px" },
      input: { margin: "10px" },
    }),
    []
  );

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    []
  );

  const handleAgeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAge(e.target.value);
    },
    []
  );

  const totalPrice = useMemo(() => {
    console.log("計算: totalPrice");
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  const expensiveItems = useMemo(() => {
    console.log("フィルタ: expensiveItems");
    return items.filter((item) => item.price > 1500);
  }, [items]);

  const handleAddItem = useCallback(() => {
    const newItem = {
      id: items.length + 1,
      name: `Item ${items.length + 1}`,
      price: Math.floor(Math.random() * 5000),
    };
    setItems([...items, newItem]);
  }, [items]);

  return (
    <div style={styles.container}>
      <h2>{greeting}</h2>

      <div>
        <input
          style={styles.input}
          value={name}
          onChange={handleNameChange}
          placeholder="名前"
        />
        <input
          style={styles.input}
          value={age}
          onChange={handleAgeChange}
          placeholder="年齢"
        />
        <p>年齢: {ageNumber}歳</p>
      </div>

      <button onClick={handleAddItem}>アイテムを追加</button>

      <ItemList items={expensiveItems} />
      <TotalPrice total={totalPrice} />
    </div>
  );
}

type ItemListProps = {
  items: Array<{ id: number, name: string, price: number }>,
};

const ItemList = memo(({ items }: ItemListProps) => {
  console.log("レンダリング: ItemList");
  return (
    <div>
      <h3>高額商品 (1500円以上)</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ¥{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
});

type TotalPriceProps = {
  total: number,
};

const TotalPrice = memo(({ total }: TotalPriceProps) => {
  console.log("レンダリング: TotalPrice");
  return (
    <div>
      <h3>合計金額: ¥{total}</h3>
    </div>
  );
});

export default UserProfile;
```

---

## 問題 74: リスト項目の動的レンダリング最適化

**難易度**: ⭐⭐⭐⭐

**想定時間**: 20 分

**学習ポイント**: React.memo、useCallback、再レンダリング最適化

### 課題

現在のコードは動作しますが、パフォーマンスに問題があります。コンソールを開いて操作を行うと、全てのリスト項目が毎回再レンダリングされていることが確認できます。

### 最適化前の問題点

1. **全アイテム再レンダリング**: 1 つのアイテムを追加/削除/移動すると、全 20 個のアイテムが再レンダリング
2. **関数の再生成**: 毎回新しい関数が作られ、memo が効かない

### 評価基準

- [ ] React.memo で ListItem コンポーネントを最適化
- [ ] useCallback で関数を最適化（handleAdd, handleDelete, handleMove）
- [ ] TypeScript の型定義を追加（Item, ListItemProps）
- [ ] コンソールログで最適化効果を確認（変更されたアイテムのみレンダリング）
- [ ] 操作がスムーズに動作（アニメーション含む）

### スターターコード

```jsx
import { useState, useRef } from "react";

type Item = {
  id: number,
  text: string,
};

type ListItemProps = {
  item: Item,
  onDelete: (id: number) => void,
  onMove: (id: number, direction: number) => void,
};

// memoを外す
const ListItem = ({ item, onDelete, onMove }: ListItemProps) => {
  console.log(`Rendering item ${item.id}`);

  return (
    <div
      style={{
        padding: "10px",
        margin: "5px",
        background: "#f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all 0.3s",
      }}
    >
      <span>{item.text}</span>
      <div>
        <button onClick={() => onMove(item.id, -1)}>↑</button>
        <button onClick={() => onMove(item.id, 1)}>↓</button>
        <button onClick={() => onDelete(item.id)}>×</button>
      </div>
    </div>
  );
};

function App() {
  const idCounterRef = useRef(0);

  const [items, setItems] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: ++idCounterRef.current,
      text: `Item ${i + 1}`,
    }))
  );
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      setItems((prev) => [
        ...prev,
        {
          id: ++idCounterRef.current,
          text: inputValue,
        },
      ]);
      setInputValue("");
    }
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMove = (id, direction) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) return prev;

      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const newItems = [...prev];
      [newItems[index], newItems[newIndex]] = [
        newItems[newIndex],
        newItems[index],
      ];
      return newItems;
    });
  };

  return (
    <div>
      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          placeholder="新しいアイテムを追加"
        />
        <button onClick={handleAdd}>追加</button>
      </div>
      <div>
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onMove={handleMove}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
```

### 期待する動作

- アイテムの追加・削除・移動がスムーズ
- 操作時に関係ないアイテムが再レンダリングされない
- アニメーションが適切に動作

---

## 問題 75: 総合的なパフォーマンス最適化

**難易度**: ⭐⭐⭐⭐⭐
**想定時間**: 20 分
**学習ポイント**: 複数の最適化技術の統合、実践的なアプリケーション

### 課題

- 商品検索アプリを総合的に最適化
- メモ化、遅延ローディング、仮想スクロールを組み合わせ
- デバウンス処理も追加

### 評価基準

- [ ] 検索がデバウンス処理されている
- [ ] 結果がメモ化されている
- [ ] 大量データでもスムーズに動作
- [ ] 画像が遅延ローディングされる
- [ ] レンダリング回数が最小限

### スターターコード

```jsx
import React, { useState, useRef } from "react";

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
};

type ProductCardProps = {
    product: Product;
};

type SortBy = "name" | "price";

// 仮想スクロール用の定数
const ITEM_HEIGHT = 100; // ProductCardの高さ
const CONTAINER_HEIGHT = 500; // コンテナの高さ
const BUFFER_SIZE = 5; // バッファサイズ

// 仮想スクロール用の型
type VisibleRange = {
    start: number;
    end: number;
};

type SearchControlsProps = {
    searchTerm: string;
    sortBy: SortBy;
    category: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

// 大量のダミーデータ
const generateProducts = (): Product[] =>
    Array.from({ length: 5000 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: Math.floor(Math.random() * 1000) + 1,
        category: ["Electronics", "Books", "Clothing", "Food", "Toys"][i % 5],
        image: `https://picsum.photos/seed/product${i + 1}/100/100`,
        description: `Description for product ${i + 1}`,
    }));

const ProductCard = ({ product }: ProductCardProps) => {
    const renderCount = useRef(0);
    renderCount.current++;

    return (
        <div
            style={{
                padding: "10px",
                border: "1px solid #ddd",
                margin: "5px",
                display: "flex",
                gap: "10px",
                height: ITEM_HEIGHT - 10, // マージンを考慮
            }}
        >
            <img
                src={product.image}
                alt={product.name}
                style={{ width: "50px", height: "50px" }}
                loading="lazy"
            />
            <div>
                <h4>{product.name}</h4>
                <p>
                    ${product.price} - {product.category}
                </p>
                <small>Renders: {renderCount.current}</small>
            </div>
        </div>
    );
};

// 検索コントロールコンポーネント
const SearchControls = ({
    searchTerm,
    sortBy,
    category,
    onSearchChange,
    onSortChange,
    onCategoryChange,
}: SearchControlsProps) => {
    const renderCount = useRef(0);
    renderCount.current++;

    return (
        <div style={{ marginBottom: "20px" }}>
            <div>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={onSearchChange}
                />
                <select value={sortBy} onChange={onSortChange}>
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                </select>
                <select value={category} onChange={onCategoryChange}>
                    <option value="all">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food">Food</option>
                    <option value="Toys">Toys</option>
                </select>
            </div>
        </div>
    );
};

// 仮想スクロールコンポーネント（最適化前）
type VirtualProductListProps = {
    products: Product[];
    itemHeight?: number;
    containerHeight?: number;
};

const VirtualProductList = ({
    products,
    itemHeight = ITEM_HEIGHT,
    containerHeight = CONTAINER_HEIGHT,
}: VirtualProductListProps) => {
    const [scrollTop, setScrollTop] = useState(0);

    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
        startIndex + visibleCount + BUFFER_SIZE,
        products.length
    );
    const start = Math.max(0, startIndex - BUFFER_SIZE);
    const end = endIndex;
    const visibleRange: VisibleRange = { start, end };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    };

    // 全体の高さ
    const totalHeight = products.length * itemHeight;

    // 表示するアイテム
    const visibleItems = products.slice(visibleRange.start, visibleRange.end);

    return (
        <div
            onScroll={handleScroll}
            style={{
                height: containerHeight,
                overflow: "auto",
                border: "1px solid #ccc",
            }}
        >
            <div style={{ height: totalHeight, position: "relative" }}>
                {visibleItems.map((product, index) => (
                    <div
                        key={product.id}
                        style={{
                            position: "absolute",
                            top: (visibleRange.start + index) * itemHeight,
                            height: itemHeight,
                            width: "100%",
                        }}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Question75() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<SortBy>("name");
    const [category, setCategory] = useState("all");

    const products = generateProducts();

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            category === "all" || product.category === category;
        return matchesSearch && matchesCategory;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else {
            return a.price - b.price;
        }
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value as SortBy);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const metrics = {
        totalProducts: products.length,
        filteredCount: filteredProducts.length,
        displayedCount: sortedProducts.length,
    };

    return (
        <div>
            <h2>Product Search </h2>

            <SearchControls
                searchTerm={searchTerm}
                sortBy={sortBy}
                category={category}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
                onCategoryChange={handleCategoryChange}
            />

            <div style={{ marginBottom: "10px" }}>
                <p>
                    Total: {metrics.totalProducts} | Filtered:{" "}
                    {metrics.filteredCount} | Displayed:{" "}
                    {metrics.displayedCount}
                </p>
            </div>

            <VirtualProductList products={sortedProducts} />
        </div>
    );
}

```

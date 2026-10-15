## 問題 56: 基本的な Context の作成と使用

**難易度**: ⭐⭐
**想定時間**: 10 分
**学習ポイント**: React.createContext、Provider、useContext の基本

### 課題

- ユーザー名を管理する UserContext を作成
- Provider コンポーネントで値を提供
- 子コンポーネントで useContext を使って値を取得・表示

### 評価基準

- [ ] UserContext が正しく作成されている
- [ ] Provider で値が提供されている
- [ ] useContext で値を取得できている
- [ ] TypeScript の型定義が適切（オプション）

### スターターコード

```jsx
import { createContext, useContext } from "react";

// ここにContextを作成

function App() {
    return (
        <div>
            {/* Providerで囲む */}
            <Header />
            <Profile />
        </div>
    );
}

function Header() {
    // ここでContextの値を取得
    return <h1>Welcome, {/* ユーザー名を表示 */}!</h1>;
}

function Profile() {
    // ここでContextの値を取得
    return <p>Profile: {/* ユーザー名を表示 */}</p>;
}

export default App;
```

---

## 問題 57: Context 値の動的更新

**難易度**: ⭐⭐
**想定時間**: 10 分
**学習ポイント**: Context の値を動的に変更する方法、カスタムフックの作成

### 課題

- テーマ（light/dark）を管理する ThemeContext を作成
- ボタンクリックでテーマを切り替える機能を実装
- 現在のテーマに応じてスタイルを変更
- `useTheme`カスタムフックを作成して Context の利用を簡潔にする

### 評価基準

- [ ] ThemeContext にテーマとトグル関数が含まれている
- [ ] ボタンクリックでテーマが切り替わる
- [ ] テーマに応じて UI が変化する
- [ ] コンテキストの値がオブジェクトとして提供されている
- [ ] `useTheme`カスタムフックが実装されている

### スターターコード

```jsx
import React, { createContext, useContext, useState } from 'react';

// ThemeContextを作成

function ThemeProvider({ children }) {
  // テーマ状態とトグル関数を実装

  return (
    // Providerで値を提供
  );
}

// カスタムフックを作成
function useTheme() {
  // Contextの値を取得して返す
}

function App() {
  return (
    <ThemeProvider>
      <ThemeContent />
    </ThemeProvider>
  );
}
function ThemeContent() {
  // useThemeフックでテーマを取得

  return (
    <div className={`theme-container ${theme}`}>
      <div className="theme-content">
        <Header />
        <ThemeToggle />
      </div>
    </div>
  );
}
function Header() {
  // useThemeフックでテーマを取得
  return <h1>Current theme: {/* テーマを表示 */}</h1>;
}

function ThemeToggle() {
  // useThemeフックでトグル関数を取得
  return <button onClick={/* トグル関数 */}>Toggle Theme</button>;
}
```

```css
/* Question57: Theme Switcher Styles */

.theme-container {
  min-height: 100vh;
  padding: 40px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.theme-container.light {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
}

.theme-container.dark {
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  color: #ffffff;
}

.theme-header {
  font-size: 48px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.theme-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.theme-toggle-btn {
  padding: 15px 40px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.theme-toggle-btn.light {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #333;
}

.theme-toggle-btn.dark {
  background: linear-gradient(135deg, #434343 0%, #000000 100%);
  color: #ffffff;
}

.theme-toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}

.theme-toggle-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
}

.theme-icon {
  display: inline-block;
  margin-right: 10px;
  font-size: 24px;
}
```

---

## 問題 58: 複数の Context の組み合わせ

**難易度**: ⭐⭐⭐
**想定時間**: 12 分
**学習ポイント**: 複数の Context を組み合わせて使用する

### 課題

- AuthContext（認証状態）と UserContext（ユーザー情報）を作成
- 両方の Context を使用してユーザー情報を表示
- ログイン/ログアウト機能を実装

### 評価基準

- [ ] 2 つの独立した Context が作成されている
- [ ] 両方の Context が適切にネストされている
- [ ] ログイン状態に応じて表示が変わる
- [ ] ログアウト時にユーザー情報がクリアされる

### スターターコード

```jsx
import React, { createContext, useContext, useState } from 'react';

// AuthContextを作成

// UserContextを作成

function App() {
  return (
    // 両方のProviderでラップ
    <div>
      <Dashboard />
    </div>
  );
}

function Dashboard() {
  // 両方のContextを使用

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>Welcome, {/* ユーザー名 */}!</h1>
      <button onClick={/* ログアウト */}>Logout</button>
    </div>
  );
}

function LoginForm() {
  // ログイン処理を実装
  return (
    <form onSubmit={/* ログイン処理 */}>
      <input type="text" placeholder="Username" />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 問題 59: Context のデフォルト値とフォールバック

**難易度**: ⭐⭐
**想定時間**: 8 分
**学習ポイント**: Context のデフォルト値設定と Provider 外での使用

### 課題

- 言語設定（日本語/英語）を管理する LanguageContext 作成
- デフォルト値を設定
- Provider 外でもエラーにならないようにする

### 評価基準

- [ ] Context にデフォルト値が設定されている
- [ ] Provider 外でもデフォルト値が使用される
- [ ] Provider 内では提供された値が優先される
- [ ] エラーハンドリングが適切

### スターターコード

```jsx
import React, { createContext, useContext, useState } from 'react';

// デフォルト値付きのLanguageContextを作成

function App() {
  return (
    <div>
      <OutsideProvider />
      <LanguageProvider>
        <InsideProvider />
      </LanguageProvider>
    </div>
  );
}

function OutsideProvider() {
  // Provider外でContextを使用
  return <p>Outside: {/* 言語を表示 */}</p>;
}

function InsideProvider() {
  // Provider内でContextを使用
  return <p>Inside: {/* 言語を表示 */}</p>;
}

function LanguageProvider({ children }) {
  // 言語状態を管理
  return (
    // Providerで値を提供
  );
}
```

### 期待する動作

- Provider 外ではデフォルト値（例：'ja'）が表示
- Provider 内では提供された値が表示

---

## 問題 60: Context 最適化

**難易度**: ⭐⭐⭐
**想定時間**: 12 分
**学習ポイント**: Context の不要な再レンダリングを防止

### 課題

- カウンターとユーザー情報を含む AppContext を作成しているが、処理が最適化されていないので改善する。
- 現状の実装ではカウンターをインクリメントするたびにユーザー情報コンポーネントが再レンダリングされてしまう。
- 処理を最適化し、カウンター更新時にユーザー情報コンポーネントを再レンダリングしないように修正

### 評価基準

- [ ] カウンター更新時にユーザー情報コンポーネントが再レンダリングされない
- [ ] パフォーマンスが改善されている

### スターターコード

```jsx
import React, { createContext, useContext, useState } from 'react';

// AppContextを作成

function AppProvider({ children }) {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'John' });


  const value = // ここを実装

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

const UserInfo = () => {
  console.log('UserInfo rendered');
  const { user } = useContext(AppContext);
  return <div>User: {user.name}</div>;
};

const Counter = () => {
  console.log('Counter rendered');
  const { count, increment } = useContext(AppContext);
  return (
    <div>
      Count: {count}
      <button onClick={increment}>+</button>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <UserInfo />
      <Counter />
    </AppProvider>
  );
}
```

---

## 問題 61: 実践的な Provider Pattern の実装

**難易度**: ⭐⭐⭐
**想定時間**: 12 分
**学習ポイント**: より実践的な Provider Pattern を使った状態管理の実装

### 課題

- 通知システムの NotificationProvider を作成
- 通知の追加、削除、全削除機能を実装
- 通知リストの表示とアクション

### 評価基準

- [ ] NotificationProvider が正しく実装されている
- [ ] 通知の追加・削除・全削除が動作する
- [ ] 各通知にユニーク ID が付与されている
- [ ] 通知リストが正しく表示される

### スターターコード

```jsx
import React, { createContext, useContext, useState } from 'react';

// NotificationContextを作成

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    // 実装
  };

  const removeNotification = (id) => {
    // 実装
  };

  const clearAll = () => {
    // 実装
  };

  return (
    // Providerで値を提供
  );
}

function NotificationList() {
  // 通知を取得
  if (notifications.length === 0) {
    return <div>通知はありません</div>;
  }

  return (
    <div>
      <h3>通知一覧 ({notifications.length}件)</h3>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "5px 0",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>{notification.message}</div>
          <button
            onClick={/* 通知削除 */}
            style={{ marginLeft: "10px" }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

function NotificationActions() {
  // アクションボタンを表示
  return (
    <div>
      <button onClick={() => /* 通知追加 */}>Add Notification</button>
      <button onClick={/* 全削除 */}>Clear All</button>
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <NotificationActions />
      <NotificationList />
    </NotificationProvider>
  );
}
```

---

## 問題 62: テーマ切り替えシステムの実装

**難易度**: ⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: Context、Local Storage を使用し実践的なテーマ管理システムの構築

### 課題

- 複数テーマ（light/dark/blue）を管理する ThemeProvider を作成
- LocalStorage に選択を保存
- CSS 変数を使用してテーマを適用

### 評価基準

- [ ] 3 つ以上のテーマが切り替え可能
- [ ] LocalStorage に保存・読み込みが実装されている
- [ ] CSS 変数が動的に更新される
- [ ] リロード時に前回のテーマが適用される

### スターターコード

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  light: {
    '--bg-color': '#ffffff',
    '--text-color': '#000000',
    '--primary-color': '#007bff'
  },
  dark: {
    '--bg-color': '#1a1a1a',
    '--text-color': '#ffffff',
    '--primary-color': '#4dabf7'
  },
  blue: {
    '--bg-color': '#e3f2fd',
    '--text-color': '#0d47a1',
    '--primary-color': '#2196f3'
  }
};

// ThemeContextを作成

function ThemeProvider({ children }) {
  // LocalStorageから初期値を読み込み
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // CSS変数を更新
    // LocalStorageに保存
  }, [theme]);

  return (
    // Providerで値を提供
  );
}

function ThemeSelector() {
  // テーマ選択UI
  return (
    <select onChange={/* テーマ変更 */}>
      {Object.keys(themes).map(themeName => (
        <option key={themeName} value={themeName}>
          {themeName}
        </option>
      ))}
    </select>
  );
}

function App() {
    return (
        <ThemeProvider>
            <div
                style={{
                    backgroundColor: "var(--bg-color)",
                    color: "var(--text-color)",
                    minHeight: "100vh",
                    padding: "20px",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                }}
            >
                <h1
                    style={{
                        color: "var(--primary-color)",
                        marginBottom: "30px",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                    }}
                >
                    テーマ切り替えシステム
                </h1>

                <ThemeSelector />
            </div>
        </ThemeProvider>
    );
}

export default App;
```

---

## 問題 63: 認証付きルーティングガード

**難易度**: ⭐⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: Context を使った認証ガードの実装

**注意**: この問題では React Router のようなライブラリは使わず、コンポーネントの表示/非表示でガード機能を実装します

### 課題

- 認証状態を管理する AuthProvider を作成
- 認証が必要なコンポーネントを保護
- リダイレクト機能を実装

### 評価基準

- [ ] AuthProvider で認証状態が管理されている
- [ ] ProtectedRoute コンポーネントが実装されている
- [ ] 未認証時はログイン画面にリダイレクト
- [ ] ログイン後は元のページに戻る

### スターターコード

```jsx
import React, { createContext, useContext, useState } from 'react';

// AuthContextを作成

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // ログイン処理
  };

  const logout = () => {
    // ログアウト処理
  };

  return (
    // Providerで値を提供
  );
}

function ProtectedRoute({ children }) {
  // 認証チェック
  // 未認証時はLoginPageを表示
  return children;
}

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ログイン処理
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        className="login-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" className="login-button">Login</button>
    </form>
  );
}

function Dashboard() {
  // 認証が必要なコンポーネント
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.username}!</h1>
      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;
```

```css
/* Question63: Login Form Styles */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.login-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.login-input:focus {
  outline: none;
  border-color: #007bff;
}

.login-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.logout-button {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}
```

### 期待する動作

- 未認証時はログインフォーム表示
- ログイン成功で Dashboard 表示
- ログアウトでログインフォームに戻る

---

## 問題 64: 3 つの Context 分割とパフォーマンス最適化

**難易度**: ⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: ３つの Context 管理、Context の分割による再レンダリング最適化

### 課題

- 頻繁に更新される値と静的な値を別の Context に分割
- 不要な再レンダリングを防ぐ

### 評価基準

- [ ] StateContext と ActionsContext が分離されている
- [ ] 状態更新時に関係ないコンポーネントが再レンダリングされない
- [ ] useCallback が適切に使用されている
- [ ] パフォーマンスが改善されている

### スターターコード

```jsx
import React, { createContext, useContext} from 'react';

// count用のContext

// items用のContext

// アクション用のContext（静的な関数）

function AppProvider({ children }) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  const increment = () => {
    setCount(c => c + 1);
  };

  const addItem = (item) => {
    setItems(prev => [...prev, item]);
  };

  return (
    // 3つのProviderでラップ
  );
}

const ItemList = () => {
  console.log('ItemList rendered');
  // contextから必要な値を取得

  return (
    <div>
      <button onClick={() => addItem(`Item ${Date.now()}`)}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const Counter = () => {
  console.log('Counter rendered');
  // contextから必要な値を取得

  return (
    <div>
      <button onClick={increment}>Count: {count}</button>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Counter />
      <ItemList />
    </AppProvider>
  );
}
```

### 期待する動作

- カウンター更新時に ItemList が再レンダリングされない
- アイテム追加時に Counter が再レンダリングされない

---

## 問題 65: 複合 Context パターンの実装

**難易度**: ⭐⭐⭐⭐
**想定時間**: 20-25 分
**学習ポイント**: 複数の Context を組み合わせた高度な状態管理

### 課題

- ショッピングカートシステムを実装
- 商品リスト、カート、合計金額を管理
- 在庫管理機能を含める

### 評価基準

- [ ] カートへの追加・削除が正しく動作
- [ ] 在庫切れ商品は追加できない
- [ ] 合計金額が正しく計算される

### スターターコード

```jsx
import React, { createContext, useContext, useState } from 'react';

// 商品データ
const initialProducts = [
  { id: 1, name: 'Product A', price: 1000, stock: 5 },
  { id: 2, name: 'Product B', price: 2000, stock: 3 },
  { id: 3, name: 'Product C', price: 3000, stock: 0 }
];

// 各Contextを作成

function ShopProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);

  // カートに追加
  const addToCart = (productId) => {
    // 在庫チェック
    // カートに追加
    // 在庫を減らす
  };

  // カートから削除
  const removeFromCart = (productId) => {
    // カートから削除
    // 在庫を戻す
  };


  return (
    // 複数のProviderで値を提供
  );
}

function ProductList() {
  // 商品リストを表示
  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: "10px" }}>
          <span>
            {product.name} - ¥{product.price}
          </span>
          <span style={{ marginLeft: "10px" }}>
            在庫: {product.stock}
          </span>
          <button
            onClick={() => addToCart(product.id)}
            disabled={product.stock === 0}
            style={{ marginLeft: "10px" }}
          >
            カートに追加
          </button>
        </div>
      ))}
    </div>
  );
}

function Cart() {
  // カート内容を表示

  // 合計金額
  const totalPrice = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>カートは空です</p>
      ) : (
        cart.map((item) => {
          const product = products.find(
            (p) => p.id === item.productId
          );
          if (!product) return null;
          return (
            <div
              key={item.productId}
              style={{ marginBottom: "10px" }}
            >
              <span>
                {product.name} x {item.quantity}
              </span>
              <span style={{ marginLeft: "10px" }}>
                ¥{product.price * item.quantity}
              </span>
              <button
                onClick={() => removeFromCart(item.productId)}
                style={{ marginLeft: "10px" }}
              >
                削除
              </button>
            </div>
          );
        })
      )}
      <p style={{ fontWeight: "bold", marginTop: "20px" }}>
        Total: ¥{totalPrice}
      </p>
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <ProductList />
      <Cart />
    </ShopProvider>
  );
}
```

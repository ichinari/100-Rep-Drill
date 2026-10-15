## 問題 76: React Router の基本設定

**難易度**: ⭐⭐
**想定時間**: 10 分
**学習ポイント**: React Router の基本設定、BrowserRouter、Routes、Route

### 課題

- React Router をインストール・設定
  - バージョンは v7 を使用
- 基本的なルーティングを実装
  - `/` Home
  - `/about` About
  - `/contact` Contact
  - それ以外 NotFound

### 評価基準

- [ ] BrowserRouter が正しく設定されている
- [ ] 3 つのルートが動作する
- [ ] URL パスと画面が対応している
- [ ] 404 ページが表示される

### スターターコード

```jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ページコンポーネントを作成
function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function Contact() {
  return <h1>Contact Page</h1>;
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

function App() {
  return (
    // BrowserRouterでラップ
    // Routesを設定
    <div>{/* ルーティング設定 */}</div>
  );
}

export default App;
```

---

## 問題 77: Link コンポーネントとナビゲーション

**難易度**: ⭐⭐
**想定時間**: 10 分
**学習ポイント**: Link、NavLink、ナビゲーションメニュー

### 課題

- ナビゲーションメニューを作成
  - `/` Home
  - `/about` About
  - `/services` Services
- Link コンポーネントでページ遷移
- NavLink でアクティブなリンクをハイライト
  - About, Services

### 評価基準

- [ ] Link でページ遷移が動作する
- [ ] NavLink でアクティブリンクがハイライトされる
- [ ] ページリロードが発生しない
- [ ] スタイリングが適切

### スターターコード

```jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      {/* Linkコンポーネントでメニューを作成 */}
      {/* NavLinkでアクティブ状態を表示 */}
    </nav>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function Services() {
  return <h1>Services Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <main>
          <Routes>{/* ルート設定 */}</Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
```

```css
/* Question77: Navigation Styles */
nav {
  background: #333;
  padding: 1rem;
}

nav a {
  color: white;
  margin: 0 1rem;
  text-decoration: none;
}

nav a.active {
  color: #61dafb;
  font-weight: bold;
}
```

---

## 問題 78: URL パラメータの取得と使用

**難易度**: ⭐⭐⭐
**想定時間**: 12 分
**学習ポイント**: useParams、動的ルーティング

### 課題

- ユーザー詳細ページを作成（/user/:id）
- URL パラメータから ID を取得
- ID に応じた情報を表示

### 評価基準

- [ ] 動的ルートが設定されている
- [ ] useParams でパラメータを取得できる
- [ ] パラメータに応じて表示が変わる
- [ ] ユーザーリストから詳細ページへ遷移できる

### スターターコード

```jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

// ユーザーデータ
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

function UserList() {
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserDetail() {
  // useParamsでIDを取得
  // IDに対応するユーザー情報を表示

  return (
    <div>
      <h1>User Detail</h1>
      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>User not found</p>
      )}
      <Link to="/users">Back to List</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UserList />} />
        {/* 動的ルートを設定 */}
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 問題 79: クエリパラメータの処理

**難易度**: ⭐⭐⭐
**想定時間**: 12 分
**学習ポイント**: useSearchParams、URLSearchParams

### 課題

- 検索機能付き商品リストを作成
- クエリパラメータで検索条件を管理
  - `category` カテゴリ
  - `maxPrice`　価格範囲
  - ex) `/?category=electronics&maxPrice=50000`
- 検索条件を変更すると URL クエリパラメータも変更

### 評価基準

- [ ] useSearchParams が正しく使用されている
- [ ] 検索条件が URL に反映される
- [ ] URL からの直接アクセスでもフィルタが適用される
- [ ] 検索条件のリセット機能がある

### スターターコード

```jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";

// 商品データ
const products = [
  { id: 1, name: "Laptop", category: "electronics", price: 100000 },
  { id: 2, name: "Shirt", category: "clothing", price: 3000 },
  { id: 3, name: "Phone", category: "electronics", price: 80000 },
  { id: 4, name: "Pants", category: "clothing", price: 5000 },
  { id: 5, name: "Tablet", category: "electronics", price: 50000 },
];

function ProductList() {
  // useSearchParamsを使用
  const [filteredProducts, setFilteredProducts] = useState(products);

  // 検索パラメータに基づいてフィルタリング
  useEffect(
    () => {
      // カテゴリと価格範囲でフィルタリング
    },
    [
      /* 依存配列 */
    ]
  );

  const handleCategoryChange = (category) => {
    // URLパラメータを更新
  };

  const handlePriceFilter = (maxPrice) => {
    // URLパラメータを更新
  };

  const resetFilters = () => {
    // フィルタをリセット
  };

  return (
    <div>
      <h1>Product Search</h1>

      <div>
        <select onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>

        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => handlePriceFilter(e.target.value)}
        />

        <button onClick={resetFilters}>Reset</button>
      </div>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.category} - ¥{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 問題 80: ナビゲーション

**難易度**: ⭐⭐⭐
**想定時間**: 10 分
**学習ポイント**: useNavigate、条件付きナビゲーション

### 課題

- ログイン → ダッシュボードへの遷移
- ログインフォーム送信後の自動遷移を実装
- 条件に応じた動的なナビゲーション
- 履歴の操作（戻る/進む）
- ログイン後は`replace`オプションを使用してログインページに戻れないようにする

### 評価基準

- [ ] useNavigate が正しく使用されている
- [ ] フォーム送信後に自動遷移する
- [ ] 戻る/進むボタンが動作する
- [ ] 条件付きナビゲーションが実装されている
- [ ] `replace: true`オプションが適切に使用されている

### スターターコード

```jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ログイン処理
    // 成功時にダッシュボードへ遷移（replaceオプションを使用）
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => /* 戻る */}>Go Back</button>
      <button onClick={() => /* ホームへ */}>Go Home</button>
      <button onClick={() => /* ログアウト */}>Logout</button>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 問題 81: ネストされたルーティング

**難易度**: ⭐⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: Outlet、ネストルート、レイアウトコンポーネント

### 課題

- 管理画面にネストされたルートを実装
  - `/admin/users`
  - `/admin/products`
  - `/admin/settings`
- 共通レイアウトとサブページを作成
- Outlet を使用して子ルートを表示

### 評価基準

- [ ] ネストされたルートが正しく設定されている
- [ ] Outlet が適切に配置されている
- [ ] 共通レイアウトが維持される
- [ ] サブナビゲーションが動作する
- [ ] `/admin`で`index`ルートが表示される

### スターターコード

```jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", background: "#f0f0f0", padding: "1rem" }}>
        <h2>Admin Menu</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/users">Users</Link>
            </li>
            <li>
              <Link to="/admin/products">Products</Link>
            </li>
            <li>
              <Link to="/admin/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "1rem" }}>
        {/* 子ルートをここに表示 */}
      </main>
    </div>
  );
}

function AdminDashboard() {
  return <h1>Admin Dashboard</h1>;
}

function AdminUsers() {
  return (
    <div>
      <h1>User Management</h1>
      <p>Manage users here</p>
    </div>
  );
}

function AdminProducts() {
  return (
    <div>
      <h1>Product Management</h1>
      <p>Manage products here</p>
    </div>
  );
}

function AdminSettings() {
  return (
    <div>
      <h1>Settings</h1>
      <p>Configure settings here</p>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/admin">Go to Admin</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 問題 82: 動的ネストルート

**難易度**: ⭐⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: 動的パラメータとネストルートの組み合わせ、URL パラメータ取得、Link

### 課題

- ブログシステムのルーティングを実装
- カテゴリ別・記事詳細のネストルート
  - `/blog` でカテゴリ一覧
  - `/blog/tech` で技術記事一覧
  - `/blog/tech/1` で記事詳細
- パンくずリストを表示

### 評価基準

- [ ] カテゴリ一覧 → 記事一覧 → 記事詳細の階層が実装されている
- [ ] URL パラメータが正しく取得できる
- [ ] パンくずリストが正確に表示される
- [ ] 各階層でのナビゲーションが動作する

### スターターコード

```jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  Outlet,
} from "react-router-dom";

// データ
const categories = [
  { id: "tech", name: "Technology" },
  { id: "travel", name: "Travel" },
  { id: "food", name: "Food" },
];

const posts = {
  tech: [
    { id: 1, title: "React Best Practices", content: "Content..." },
    { id: 2, title: "JavaScript Tips", content: "Content..." },
  ],
  travel: [
    { id: 3, title: "Tokyo Guide", content: "Content..." },
    { id: 4, title: "Kyoto Temples", content: "Content..." },
  ],
  food: [
    { id: 5, title: "Sushi Making", content: "Content..." },
    { id: 6, title: "Ramen Recipe", content: "Content..." },
  ],
};

function BlogLayout() {
  return (
    <div>
      <nav>{/* パンくずリスト */}</nav>
      {/* 子コンポーネントを表示 */}
    </div>
  );
}

function CategoryList() {
  return (
    <div>
      <h1>Blog Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/blog/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PostList() {
  // カテゴリIDを取得
  const { categoryId } = useParams();
  const categoryPosts = posts[categoryId] || [];

  return (
    <div>
      <h2>Posts in {categoryId}</h2>
      <ul>
        {categoryPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${categoryId}/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/blog">Back to Categories</Link>
    </div>
  );
}

function PostDetail() {
  // カテゴリIDと記事IDを取得
  const { categoryId, postId } = useParams();

  // 記事を検索
  const post = posts[categoryId]?.find((p) => p.id === parseInt(postId));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to={`/blog/${categoryId}`}>Back to Posts</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Link to="/blog">Go to Blog</Link>} />
        {/* ネストされた動的ルートを設定 */}
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 問題 83: ルートガードと認証

**難易度**: ⭐⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: 保護されたルート、リダイレクト、認証チェック

### 課題

- 認証が必要なルートを保護
  - `/dashboard`
  - `/profile`
- 未認証時はログインページへリダイレクト
- ログイン後は元のページへ戻る

### 評価基準

- [ ] ProtectedRoute コンポーネントが実装されている
- [ ] 未認証時は自動的にログインページへ
- [ ] ログイン後は元のページへ戻る
- [ ] ログアウト機能が動作する

### スターターコード

```jsx
import React, { createContext, useContext, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

// 認証AuthContext


function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  return (
   // Provider
  );
}

function useAuth() {
  // context返却
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // 未認証時はログインページへリダイレクト
  // 元のページをstateに保存

  return children;
}

function Login() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
    // 元のページまたはダッシュボードへ遷移
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.username}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profile</h1>
      <p>User: {user?.username}</p>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* 保護されたルートを設定 */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

### 期待する動作

- 未ログイン時、Dashboard/Profile アクセスでログインページへ
- ログイン後、元のページへ自動遷移
- ログアウトでホームページへ

---

## 問題 84: ルートローダーとエラーハンドリング（createBrowserRouter）

**難易度**: ⭐⭐⭐⭐
**想定時間**: 15 分
**学習ポイント**: createBrowserRouter

### 課題

- React Router v6.4 以降の createBrowserRouter を使用
- `useLoaderData`フックでデータを取得
- `errorElement`でエラーハンドリング
- `useNavigation`でローディング状態を管理

### 評価基準

- [ ] `createBrowserRouter`と`RouterProvider`が使用されている
- [ ] `loader`関数でデータをフェッチしている
- [ ] `useLoaderData`でデータを取得している
- [ ] `errorElement`でエラーページが表示される
- [ ] `useNavigation`でローディング状態が表示される

### スターターコード

```jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
  useNavigation,
  Link,
  useRouteError,
} from "react-router-dom";

// APIシミュレーション
const fetchUser = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === "999") {
        reject(new Error("User not found"));
      }
      resolve({
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
      });
    }, 1000);
  });
};

// ユーザーデータを取得するloader関数
async function userLoader({ params }) {
  // paramsからIDを取得してデータをフェッチ
  // エラーの場合は throw する
}

// エラーページコンポーネント
function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops!</h1>
      <p>{error?.message || "Something went wrong"}</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

// ルートレイアウト（ローディング状態を表示）
function RootLayout() {
  const navigation = useNavigation();

  return (
    <div>
      {/* navigation.stateが'loading'の時にローディング表示 */}
      <Outlet />
    </div>
  );
}

// ユーザープロフィールページ
function UserProfile() {
  // useLoaderDataでデータを取得

  return (
    <div>
      <h1>{/* ユーザー名 */}</h1>
      <p>Email: {/* メール */}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/user/1">User 1</Link>
        <Link to="/user/2">User 2</Link>
        <Link to="/user/999">User 999 (Error)</Link>
      </nav>
    </div>
  );
}

// ルーター設定
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "user/:id",
        element: <UserProfile />,
        loader: userLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

### 期待する動作

- ユーザープロフィール読み込み中はローディング表示
- User 999 でエラー表示（errorElement が表示される）
- データはコンポーネントレンダリング前にフェッチされる
- エラー時もアプリがクラッシュしない

---

## 問題 85: モーダルルーティング

**難易度**: ⭐⭐⭐⭐
**想定時間**: 20 分
**学習ポイント**: モーダルルーティング

### 課題

- モーダルとしても通常ページとしても表示できるルート
- ブラウザバックでモーダルを閉じる
- 直接 URL アクセスと内部遷移で異なる表示

### 評価基準

- [ ] モーダルルーティングが実装されている
- [ ] 直接 URL アクセスで通常ページ表示
- [ ] リンククリックでモーダル表示
- [ ] ブラウザバックでモーダルが閉じる

### スターターコード

```jsx
import {
    createBrowserRouter,
    RouterProvider,
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    useParams,
} from "react-router-dom";

// 画像データ
const images = [
    { id: 1, src: "https://picsum.photos/id/1/300", title: "Image 1" },
    { id: 2, src: "https://picsum.photos/id/2/300", title: "Image 2" },
    { id: 3, src: "https://picsum.photos/id/3/300", title: "Image 3" },
];

function Gallery() {
    const location = useLocation();
    // backgroundLocationの判定ロジックを実装

    return (
        <>
            {/* 通常のルート設定 */}
            {/* 条件に応じてモーダルルートを追加 */}
        </>
    );
}

function GalleryGrid() {
    const location = useLocation();

    return (
        <div>
            <h1>Image Gallery</h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                }}
            >
                {images.map((image) => (
                    <Link
                        key={image.id}
                        to={`/image/${image.id}`}
                        state={{ backgroundLocation: location }}
                    >
                        <img
                            src={image.src}
                            alt={image.title}
                            style={{ width: "100%" }}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

function ImagePage() {
    const { id } = useParams<{ id: string }>();
    const image = images.find((img) => img.id === parseInt(id || "0"));

    if (!image) {
        return <div>Image not found</div>;
    }

    return (
        <div>
            <h1>{image.title}</h1>
            <img src={image.src} alt={image.title} />
            <Link to="/">Back to Gallery</Link>
        </div>
    );
}

function ImageModal() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const image = images.find((img) => img.id === parseInt(id || "0"));

    const closeModal = () => {
        navigate(-1);
    };

    if (!image) {
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onClick={closeModal}
        >
            <div
                style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "8px",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2>{image.title}</h2>
                <img src={image.src} alt={image.title} />
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "*",
        element: <Gallery />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

```

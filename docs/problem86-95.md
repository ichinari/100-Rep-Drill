### 問題 86: Redux Toolkit の基本セットアップ

**難易度**: ⭐⭐  
**想定時間**: 15 分  
**学習ポイント**: Redux Toolkit 設定、slice 作成、store 構成

#### 課題

- Redux Toolkit でカウンターアプリを実装
- slice（reducer + actions）を作成
- store を設定して Provider で提供
- increment、decrement、reset アクションを実装

#### 評価基準

- [ ] Redux Toolkit が正しくセットアップされている
- [ ] slice が適切に定義されている
- [ ] store が正しく構成されている
- [ ] アクションがディスパッチされて状態が更新される

#### スターターコード

```jsx
// store/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // アクションを定義
    increment: (state) => {
      // state.valueを増加
    },
    decrement: (state) => {
      // state.valueを減少
    },
    incrementByAmount: (state, action) => {
      // 指定された値だけ増加
    },
    reset: (state) => {
      // 初期状態に戻す
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;
export default counterSlice.reducer;

// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Question86.tsx
import { Provider } from "react-redux";
import { store } from "./store";
import Counter from "./Counter";

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "./store/counterSlice";

function Counter() {
  // storeからcountを取得

  // dispatch 定義

  return (
    <div>
      <h2>Redux Toolkit カウンター</h2>
      <h3>カウント: {count}</h3>

      <div>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
        <button onClick={() => dispatch(reset())}>リセット</button>
      </div>
    </div>
  );
}
```

---

### 問題 87: Todo リストの CRUD 操作

**難易度**: ⭐⭐⭐  
**想定時間**: 20 分  
**学習ポイント**: Redux を使用して基本的な CRUD 機能の実装

#### 課題

- Todo リストアプリを Redux Toolkit で実装
- Todo 追加、削除、完了状態の切り替え機能を実装
- フィルター機能（全て/未完了/完了済み）を追加
- Todo の編集機能を実装

#### 評価基準

- [ ] Todo の追加が正しく動作する
- [ ] Todo の削除が正しく動作する
- [ ] 完了状態のトグルが正しく動作する
- [ ] フィルター機能が実装されている
- [ ] Todo の編集機能が実装されている

#### スターターコード

```jsx
// store/todoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: 1, text: "Redux Toolkitを学ぶ", completed: false },
    { id: 2, text: "Todoアプリを作る", completed: false },
    { id: 3, text: "昼食を食べる", completed: true },
  ],
  filter: "all", // 'all' | 'active' | 'completed'
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // 新しいTodoを追加
      // id: Date.now(), text: action.payload, completed: false
    },
    deleteTodo: (state, action) => {
      // 指定されたidのTodoを削除
    },
    toggleTodo: (state, action) => {
      // 指定されたidのTodoの完了状態を切り替え
    },
    editTodo: (state, action) => {
      // 指定されたidのTodoのテキストを編集
      // action.payload: { id, text }
    },
    setFilter: (state, action) => {
      // フィルターを変更
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, editTodo, setFilter } =
  todoSlice.actions;
export default todoSlice.reducer;

// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

// TodoList.jsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  setFilter,
} from "./store/todoSlice";

function TodoList() {
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const dispatch = useDispatch();

  // フィルター後のTodoリストを計算
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleAddTodo = () => {
    if (inputText.trim()) {
      // Todoを追加
      setInputText("");
    }
  };

  const handleEditStart = (todo) => {
    // 編集モードに入る
  };

  const handleEditSave = (id) => {
    // 編集を保存
  };

  return (
    <div>
      <h2>Todoリスト</h2>

      {/* Todo追加フォーム */}
      <div>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="新しいTodoを入力"
        />
        <button onClick={handleAddTodo}>追加</button>
      </div>

      {/* フィルターボタン */}
      <div>
        <button onClick={() => dispatch(setFilter("all"))}>全て</button>
        <button onClick={() => dispatch(setFilter("active"))}>未完了</button>
        <button onClick={() => dispatch(setFilter("completed"))}>
          完了済み
        </button>
      </div>

      {/* Todoリスト */}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <div>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleEditSave(todo.id)}>保存</button>
                <button onClick={() => setEditingId(null)}>キャンセル</button>
              </div>
            ) : (
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleEditStart(todo)}>編集</button>
                <button onClick={() => dispatch(deleteTodo(todo.id))}>
                  削除
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### 問題 88: ショッピングカートの実装

**難易度**: ⭐⭐⭐  
**想定時間**: 25 分  
**学習ポイント**: 数値計算、createSelector

#### 課題

- ショッピングカート機能を実装
- 商品の追加、削除、数量変更機能を実装
- 合計金額と合計数量を自動計算
- カートのクリア機能を実装

#### 評価基準

- [ ] 商品の追加が正しく動作する
- [ ] 商品の削除が正しく動作する
- [ ] 数量変更が正しく動作する
- [ ] 合計金額と合計数量が正しく計算される
- [ ] カートクリア機能が動作する

#### スターターコード

```jsx
// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  // items: [{ id, name, price, quantity }]
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // 商品を追加
      // 既に存在する場合は数量を増やす
      // action.payload: { id, name, price }
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      // 指定されたidの商品を削除
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const item = state.items.find((item) => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      // カートを空にする
      state.items = [];
    },
  },
});

// actionsをexport

// メモ化: 合計金額を計算
export const selectTotalPrice = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

// メモ化: 合計数量を計算
export const selectTotalQuantity = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};

export default cartSlice.reducer;

// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// ProductList.jsx
const products = [
  { id: 1, name: "ノートPC", price: 100000 },
  { id: 2, name: "マウス", price: 3000 },
  { id: 3, name: "キーボード", price: 8000 },
  { id: 4, name: "モニター", price: 30000 },
];

// Cart.jsx
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectTotalPrice,
  selectTotalQuantity,
} from "./store/cartSlice";

function ShoppingCart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQuantity = useSelector(selectTotalQuantity);
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    // カートに商品を追加
  };

  const handleQuantityChange = (id, newQuantity) => {
    // 数量を変更
  };

  return (
    <div>
      <h2>ショッピングカート</h2>

      {/* 商品一覧 */}
      <div>
        <h3>商品一覧</h3>
        {products.map((product) => (
          <div key={product.id}>
            <span>{product.name}</span>
            <span>¥{product.price.toLocaleString()}</span>
            <button onClick={() => handleAddProduct(product)}>
              カートに追加
            </button>
          </div>
        ))}
      </div>

      {/* カート内容 */}
      <div>
        <h3>カート内容 ({totalQuantity}点)</h3>
        {cartItems.length === 0 ? (
          <p>カートは空です</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id}>
                <span>{item.name}</span>
                <span>¥{item.price.toLocaleString()}</span>
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
                <span>
                  小計: ¥{(item.price * item.quantity).toLocaleString()}
                </span>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  削除
                </button>
              </div>
            ))}

            <div>
              <h4>合計: ¥{totalPrice.toLocaleString()}</h4>
              <button onClick={() => dispatch(clearCart())}>
                カートをクリア
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

---

### 問題 89: 複数 slice の連携管理

**難易度**: ⭐⭐⭐⭐  
**想定時間**: 30 分  
**学習ポイント**: 複数 slice、状態間の依存関係、extraReducers

#### 課題

- userSlice と cartSlice を連携させる
- ログイン/ログアウト機能を実装
- ログイン時のみカート機能を利用可能にする
- ログアウト時にカートを自動クリア

#### 評価基準

- [ ] userSlice と cartSlice が正しく定義されている
- [ ] ログイン/ログアウト機能が動作する
- [ ] 未ログイン時はカート機能が無効化される
- [ ] ログアウト時にカートがクリアされる
- [ ] ユーザー情報が UI に反映される

#### スターターコード

```jsx
// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      // ユーザー情報を設定
      // action.payload: { id, name, email }
    },
    logout: (state) => {
      // ユーザー情報をクリア
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // 商品を追加（問題88と同じ）
    },
    removeFromCart: (state, action) => {
      // 商品を削除
    },
    clearCart: (state) => {
      // カートをクリア
    }
  },
  extraReducers: (builder) => {
    // userSliceのlogoutアクションに反応してカートをクリア
    builder.addCase('user/logout', (state) => {
      state.items = [];
    });
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer
  }
});

// App.jsx
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './store/userSlice';
import { addToCart, removeFromCart } from './store/cartSlice';

const dummyProducts = [
  { id: 1, name: 'ノートPC', price: 100000 },
  { id: 2, name: 'マウス', price: 3000 }
];

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleLogin = () => {
    // ダミーユーザーでログイン
    dispatch(login({
      id: 1,
      name: '山田太郎',
      email: 'yamada@example.com'
    }));
  };

  const handleLogout = () => {
    // ログアウト（カートも自動クリア）
    dispatch(logout());
  };

  const handleAddToCart = (product) => {
    // 認証チェック
    if (!isAuthenticated) {
      alert('ログインしてください');
      return;
    }
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h1>ECサイト</h1>

      {/* ヘッダー */}
      <header>
        {isAuthenticated ? (
          <div>
            <span>ようこそ、{user.name}さん</span>
            <button onClick={handleLogout}>ログアウト</button>
            <span>カート: {cartItems.length}点</span>
          </div>
        ) : (
          <button onClick={handleLogin}>ログイン</button>
        )}
      </header>

      {/* 商品一覧 */}
      <div>
        <h2>商品一覧</h2>
        {dummyProducts.map(product => (
          <div key={product.id}>
            <span>{product.name}</span>
            <span>¥{product.price.toLocaleString()}</span>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={!isAuthenticated}
            >
              カートに追加
            </button>
          </div>
        ))}
      </div>

      {/* カート内容 */}
      {isAuthenticated && (
        <div>
          <h2>カート</h2>
          {cartItems.length === 0 ? (
            <p>カートは空です</p>
          ) : (
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  {item.name} - ¥{item.price.toLocaleString()}
                  <button onClick={() => dispatch(removeFromCart(item.id))}>
                    削除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
```

---

### 問題 90: Selector と最適化

**難易度**: ⭐⭐⭐⭐  
**想定時間**: 30 分  
**学習ポイント**: createSelector、パフォーマンス最適化

#### 課題

- createSelector を使って効率的な selector を作成
- 不必要な再レンダリングを防ぐ
- パフォーマンスの改善を確認

#### 評価基準

- [ ] createSelector が正しく使用されている
- [ ] 複数の派生データが適切に memoize されている
- [ ] 不要な再計算が防がれている
- [ ] コンポーネントの再レンダリングが最小化されている
- [ ] パフォーマンスの違いが理解できる

#### スターターコード

```jsx
import { useSelector, useDispatch } from "react-redux";
import {
    setSearchText,
    setCategory,
    setSortBy,
    toggleInStockFilter
} from "../../store/productSlice";
import type { RootState } from "../../store";



// productSlice.js
type Product = {
    id: number;
    name: string;
    price: number;
    category: "electronics" | "clothing" | "food" | "books";
    inStock: boolean;
};

type ProductState = {
    products: Product[];
    searchText: string;
    selectedCategory: "all" | "electronics" | "clothing" | "food" | "books";
    sortBy: "name" | "price-asc" | "price-desc";
    showInStockOnly: boolean;
};

// ダミーデータ: 100件の商品を生成する関数
const generateProducts = (): Product[] => {
    return Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `商品${i + 1}`,
        price: Math.floor(Math.random() * 10000) + 1000,
        category: ["electronics", "clothing", "food", "books"][
            Math.floor(Math.random() * 4)
        ] as Product["category"],
        inStock: Math.random() > 0.3,
    }));
};

// 初期状態の例（productSlice.ts で使用）
// const initialState: ProductState = {
//     products: generateProducts(),
//     searchText: "",
//     selectedCategory: "all",
//     sortBy: "name",
//     showInStockOnly: false,
// };

// productSlice.ts で以下の仕様に従って createSlice を実装してください
//
// 【slice名】
//   name: "products"
//
// 【initialState】
//   上記の initialState を使用
//
// 【reducers】
//   以下の4つのreducerを実装してください:
//
//   1. setSearchText
//      - action.payload: string
//      - 処理: state.searchText に action.payload を設定
//
//   2. setCategory
//      - action.payload: ProductState["selectedCategory"]
//      - 処理: state.selectedCategory に action.payload を設定
//
//   3. setSortBy
//      - action.payload: ProductState["sortBy"]
//      - 処理: state.sortBy に action.payload を設定
//
//   4. toggleInStockFilter
//      - action.payload: なし
//      - 処理: state.showInStockOnly を反転（true ↔ false）


function ProductList() {
    const dispatch = useDispatch();

    // フィルター状態
    const searchText = useSelector(
        (state: RootState) => state.products.searchText
    );
    const selectedCategory = useSelector(
        (state: RootState) => state.products.selectedCategory
    );
    const sortBy = useSelector((state: RootState) => state.products.sortBy);
    const showInStockOnly = useSelector(
        (state: RootState) => state.products.showInStockOnly
    );

    // 非メモ化版（パフォーマンス問題あり）:
    // この実装では、コンポーネントが再レンダリングされるたびに計算が実行されます
    const allProducts = useSelector(
        (state: RootState) => state.products.products
    );

    // フィルター処理（非メモ化版）
    const filteredProducts = allProducts.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" || product.category === selectedCategory;
        const matchesStock = !showInStockOnly || product.inStock;
        return matchesSearch && matchesCategory && matchesStock;
    });

    // ソート処理（非メモ化版）
    const sortedProducts = [...filteredProducts];
    switch (sortBy) {
        case "price-asc":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case "name":
        default:
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    // 統計情報計算（非メモ化版）
    const stats = {
        total: sortedProducts.length,
        averagePrice:
            sortedProducts.length > 0
                ? Math.round(
                      sortedProducts.reduce((sum, p) => sum + p.price, 0) /
                          sortedProducts.length
                  )
                : 0,
        inStockCount: sortedProducts.filter((p) => p.inStock).length,
        outOfStockCount: sortedProducts.filter((p) => !p.inStock).length,
    };

    return (
        <div>
            <h2>商品一覧（最適化版）</h2>

            {/* フィルター・ソートUI */}
            <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
                {/* 検索 */}
                <div>
                    <input
                        type="text"
                        placeholder="商品を検索"
                        value={searchText}
                        onChange={(e) =>
                            dispatch(setSearchText(e.target.value))
                        }
                    />
                </div>

                {/* カテゴリー */}
                <div>
                    <select
                        value={selectedCategory}
                        onChange={(e) =>
                            dispatch(
                                setCategory(
                                    e.target
                                        .value as RootState["products"]["selectedCategory"]
                                )
                            )
                        }
                    >
                        <option value="all">全てのカテゴリー</option>
                        <option value="electronics">家電</option>
                        <option value="clothing">衣類</option>
                        <option value="food">食品</option>
                        <option value="books">書籍</option>
                    </select>
                </div>

                {/* ソート */}
                <div>
                    <select
                        value={sortBy}
                        onChange={(e) =>
                            dispatch(
                                setSortBy(
                                    e.target
                                        .value as RootState["products"]["sortBy"]
                                )
                            )
                        }
                    >
                        <option value="name">名前順</option>
                        <option value="price-asc">価格: 安い順</option>
                        <option value="price-desc">価格: 高い順</option>
                    </select>
                </div>

                {/* 在庫フィルター */}
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={showInStockOnly}
                            onChange={() => dispatch(toggleInStockFilter())}
                        />
                        在庫ありのみ表示
                    </label>
                </div>
            </div>

            {/* 統計情報 */}
            <div style={{ padding: "10px", backgroundColor: "#e3f2fd" }}>
                <p>表示件数: {stats.total}件</p>
                <p>平均価格: ¥{stats.averagePrice.toLocaleString()}</p>
                <p>
                    在庫あり: {stats.inStockCount}件 / 在庫なし:{" "}
                    {stats.outOfStockCount}件
                </p>
            </div>

            {/* 商品リスト */}
            <div>
                {sortedProducts.length === 0 ? (
                    <p>該当する商品が見つかりません</p>
                ) : (
                    <ul>
                        {sortedProducts.map((product) => (
                            <li key={product.id}>
                                <strong>{product.name}</strong>
                                <span>
                                    {" "}
                                    - ¥{product.price.toLocaleString()}
                                </span>
                                <span> ({product.category})</span>
                                <span
                                    style={{
                                        color: product.inStock
                                            ? "green"
                                            : "red",
                                    }}
                                >
                                    {product.inStock
                                        ? " ✓在庫あり"
                                        : " ✗在庫なし"}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

```

---

## Redux Toolkit 非同期処理（問題 91-95）

### 問題 91: createAsyncThunk の基本

**難易度**: ⭐⭐⭐  
**想定時間**: 20 分  
**学習ポイント**: createAsyncThunk、非同期アクション、pending/fulfilled/rejected

#### 課題

- createAsyncThunk を使ってユーザーデータを取得
- JSONPlaceholder API からユーザー一覧を取得
- loading、success、error の各状態を管理
- エラーハンドリングを実装

#### 評価基準

- [ ] createAsyncThunk が正しく定義されている
- [ ] pending/fulfilled/rejected が適切に処理されている
- [ ] ローディング状態が表示される
- [ ] エラーメッセージが表示される
- [ ] 取得したデータが正しく表示される

#### スターターコード

```jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { store } from "../../store";
import { fetchUsers, clearError } from "../../store/usersSlice";
import type { RootState, AppDispatch } from "../../store";

// usersSlice.ts
type User = {
    id: number;
    name: string;
    email: string;
    company: {
        name: string;
    };
};

type UsersState = {
    users: User[];
    loading: boolean;
    error: string | null;
};

// 初期状態の例（usersSlice.ts で使用）
// const initialState: UsersState = {
//     users: [],
//     loading: false,
//     error: null,
// };

// usersSlice.ts で以下の仕様に従って createSlice と createAsyncThunk を実装してください
//
// 【slice名】
//   name: "users"
//
// 【initialState】
//   上記の initialState を使用
//
// 【非同期アクション: createAsyncThunk】
//   fetchUsers を実装してください:
//
//   1. createAsyncThunk の型パラメータ
//      - 第1引数: User[] (成功時の戻り値の型)
//      - 第2引数: void (引数の型、今回は引数なし)
//      - 第3引数: { rejectValue: string } (エラー時の型)
//
//   2. アクション名
//      - "users/fetchUsers"
//
//   3. 非同期処理
//      - JSONPlaceholder API からユーザー一覧を取得
//        URL: "https://jsonplaceholder.typicode.com/users"
//      - fetch を使用してデータを取得
//      - response.ok をチェックし、失敗時はエラーを throw
//      - 成功時は response.json() でデータを取得して返す
//      - エラー時は rejectWithValue を使用してエラーメッセージを返す
//
// 【reducers】
//   以下の1つのreducerを実装してください:
//
//   1. clearError
//      - action.payload: なし
//      - 処理: state.error を null に設定
//
// 【extraReducers】
//   fetchUsers の各状態に応じて処理を実装してください:
//
//   1. fetchUsers.pending
//      - ローディング開始時
//      - 処理: state.loading を true に設定
//      - 処理: state.error を null に設定
//
//   2. fetchUsers.fulfilled
//      - データ取得成功時
//      - action.payload: User[] (取得したユーザー一覧)
//      - 処理: state.loading を false に設定
//      - 処理: state.users に action.payload を設定
//      - 処理: state.error を null に設定
//
//   3. fetchUsers.rejected
//      - エラー発生時
//      - action.payload: string | undefined (エラーメッセージ)
//      - 処理: state.loading を false に設定
//      - 処理: state.error に action.payload または "エラーが発生しました" を設定

function UserList() {
    const { users, loading, error } = useSelector(
        (state: RootState) => state.users
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // コンポーネントマウント時にユーザーを取得
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleRetry = () => {
        dispatch(clearError());
        dispatch(fetchUsers());
    };

    if (loading) {
        return (
            <div>
                <h2>ユーザー一覧</h2>
                <p>読み込み中...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>ユーザー一覧</h2>
                <p style={{ color: "red" }}>エラー: {error}</p>
                <button onClick={handleRetry}>再試行</button>
            </div>
        );
    }

    return (
        <div>
            <h2>ユーザー一覧</h2>
            <button onClick={() => dispatch(fetchUsers())}>再読み込み</button>

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong>{user.name}</strong>
                        <p>Email: {user.email}</p>
                        <p>会社: {user.company.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function App() {
    return (
        <Provider store={store}>
            <UserList />
        </Provider>
    );
}

export default App;
```

---

### 問題 92: 複数の非同期アクションの管理

**難易度**: ⭐⭐⭐⭐  
**想定時間**: 30 分  
**学習ポイント**: 複数の createAsyncThunk、状態の切り替え、依存関係

#### 課題

- ユーザー一覧とユーザー詳細の 2 つの非同期アクションを実装
- ユーザー選択時に詳細データと投稿を取得
- それぞれの状態を独立して管理
- 連続した非同期処理を実装

#### 評価基準

- [ ] 複数の非同期アクションが正しく定義されている
- [ ] それぞれのローディング状態が独立して管理されている
- [ ] ユーザー選択時に詳細データが取得される
- [ ] エラーハンドリングが適切に行われている
- [ ] UI が状態に応じて適切に表示される

#### スターターコード

```jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { store } from "../../store";
import {
    fetchUsers,
    fetchUserDetails,
    clearSelectedUser,
} from "../../store/userDetailsSlice";
import type { RootState, AppDispatch } from "../../store";

// userDetailsSlice.ts
type Address = {
    street: string;
    city: string;
    zipcode: string;
    suite: string;
};

type Company = {
    name: string;
    catchPhrase: string;
    bs: string;
};

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: Address;
    company: Company;
};

type Post = {
    id: number;
    userId: number;
    title: string;
    body: string;
};

type UserDetailsState = {
    users: User[];
    selectedUser: User | null;
    userPosts: Post[];
    loadingUsers: boolean;
    loadingDetails: boolean;
    errorUsers: string | null;
    errorDetails: string | null;
};

// 初期状態の例（userDetailsSlice.ts で使用）
// const initialState: UserDetailsState = {
//     users: [],
//     selectedUser: null,
//     userPosts: [],
//     loadingUsers: false,
//     loadingDetails: false,
//     errorUsers: null,
//     errorDetails: null,
// };

// userDetailsSlice.ts で以下の仕様に従って createSlice と createAsyncThunk を実装してください
//
// 【slice名】
//   name: "userDetails"
//
// 【initialState】
//   上記の initialState を使用
//
// 【非同期アクション1: createAsyncThunk】
//   fetchUsers を実装してください:
//
//   1. createAsyncThunk の型パラメータ
//      - 第1引数: User[] (成功時の戻り値の型)
//      - 第2引数: void (引数の型、今回は引数なし)
//      - 第3引数: { rejectValue: string } (エラー時の型)
//
//   2. アクション名
//      - "userDetails/fetchUsers"
//
//   3. 非同期処理
//      - JSONPlaceholder API からユーザー一覧を取得
//        URL: "https://jsonplaceholder.typicode.com/users"
//      - fetch を使用してデータを取得
//      - response.ok をチェックし、失敗時はエラーを throw
//      - 成功時は response.json() でデータを取得して返す
//      - エラー時は rejectWithValue を使用してエラーメッセージを返す
//
// 【非同期アクション2: createAsyncThunk】
//   fetchUserDetails を実装してください:
//
//   1. createAsyncThunk の型パラメータ
//      - 第1引数: { user: User; posts: Post[] } (成功時の戻り値の型)
//      - 第2引数: number (引数の型、userId)
//      - 第3引数: { rejectValue: string } (エラー時の型)
//
//   2. アクション名
//      - "userDetails/fetchUserDetails"
//
//   3. 非同期処理
//      - ユーザー詳細と投稿を並列で取得（Promise.all を使用）
//      - ユーザー詳細: `https://jsonplaceholder.typicode.com/users/${userId}`
//      - 投稿一覧: `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
//      - 両方の fetch を Promise.all で並列実行
//      - 両方の response.ok をチェックし、失敗時はエラーを throw
//      - 成功時は { user, posts } の形式で返す
//      - エラー時は rejectWithValue を使用してエラーメッセージを返す
//
// 【reducers】
//   以下の1つのreducerを実装してください:
//
//   1. clearSelectedUser
//      - action.payload: なし
//      - 処理: state.selectedUser を null に設定
//      - 処理: state.userPosts を [] に設定
//      - 処理: state.errorDetails を null に設定
//
// 【extraReducers】
//   fetchUsers の各状態に応じて処理を実装してください:
//
//   1. fetchUsers.pending
//      - ユーザー一覧のローディング開始時
//      - 処理: state.loadingUsers を true に設定
//      - 処理: state.errorUsers を null に設定
//
//   2. fetchUsers.fulfilled
//      - ユーザー一覧の取得成功時
//      - action.payload: User[] (取得したユーザー一覧)
//      - 処理: state.loadingUsers を false に設定
//      - 処理: state.users に action.payload を設定
//      - 処理: state.errorUsers を null に設定
//
//   3. fetchUsers.rejected
//      - ユーザー一覧の取得失敗時
//      - action.payload: string | undefined (エラーメッセージ)
//      - 処理: state.loadingUsers を false に設定
//      - 処理: state.errorUsers に action.payload または "エラーが発生しました" を設定
//
//   fetchUserDetails の各状態に応じて処理を実装してください:
//
//   1. fetchUserDetails.pending
//      - ユーザー詳細のローディング開始時
//      - 処理: state.loadingDetails を true に設定
//      - 処理: state.errorDetails を null に設定
//
//   2. fetchUserDetails.fulfilled
//      - ユーザー詳細と投稿の取得成功時
//      - action.payload: { user: User; posts: Post[] } (取得したユーザー詳細と投稿一覧)
//      - 処理: state.loadingDetails を false に設定
//      - 処理: state.selectedUser に action.payload.user を設定
//      - 処理: state.userPosts に action.payload.posts を設定
//      - 処理: state.errorDetails を null に設定
//
//   3. fetchUserDetails.rejected
//      - ユーザー詳細の取得失敗時
//      - action.payload: string | undefined (エラーメッセージ)
//      - 処理: state.loadingDetails を false に設定
//      - 処理: state.errorDetails に action.payload または "エラーが発生しました" を設定

function UserManagement() {
    const {
        users,
        selectedUser,
        userPosts,
        loadingUsers,
        loadingDetails,
        errorUsers,
        errorDetails,
    } = useSelector((state: RootState) => state.userDetails);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSelectUser = (userId: number) => {
        dispatch(fetchUserDetails(userId));
    };

    const handleClearSelection = () => {
        dispatch(clearSelectedUser());
    };

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            {/* ユーザー一覧 */}
            <div style={{ flex: 1 }}>
                <h2>ユーザー一覧</h2>

                {loadingUsers && <p>読み込み中...</p>}

                {errorUsers && (
                    <p style={{ color: "red" }}>エラー: {errorUsers}</p>
                )}

                {!loadingUsers && !errorUsers && (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {users.map((user) => (
                            <li
                                key={user.id}
                                style={{
                                    padding: "10px",
                                    margin: "5px 0",
                                    backgroundColor:
                                        selectedUser?.id === user.id
                                            ? "#e3f2fd"
                                            : "#f5f5f5",
                                    cursor: "pointer",
                                    borderRadius: "4px",
                                }}
                                onClick={() => handleSelectUser(user.id)}
                            >
                                <strong>{user.name}</strong>
                                <p
                                    style={{
                                        margin: "5px 0",
                                        fontSize: "14px",
                                    }}
                                >
                                    {user.email}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* ユーザー詳細 */}
            <div style={{ flex: 2 }}>
                <h2>ユーザー詳細</h2>

                {!selectedUser && !loadingDetails && (
                    <p>左からユーザーを選択してください</p>
                )}

                {loadingDetails && (
                    <div>
                        <p>詳細を読み込み中...</p>
                    </div>
                )}

                {errorDetails && (
                    <p style={{ color: "red" }}>エラー: {errorDetails}</p>
                )}

                {selectedUser && !loadingDetails && (
                    <div>
                        <button onClick={handleClearSelection}>閉じる</button>

                        <div style={{ marginTop: "20px" }}>
                            <h3>{selectedUser.name}</h3>
                            <p>
                                <strong>ユーザー名:</strong>{" "}
                                {selectedUser.username}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedUser.email}
                            </p>
                            <p>
                                <strong>電話:</strong> {selectedUser.phone}
                            </p>
                            <p>
                                <strong>ウェブサイト:</strong>{" "}
                                {selectedUser.website}
                            </p>
                            <p>
                                <strong>会社:</strong>{" "}
                                {selectedUser.company.name}
                            </p>
                            <p>
                                <strong>住所:</strong>{" "}
                                {selectedUser.address.city},{" "}
                                {selectedUser.address.street}
                            </p>
                        </div>

                        <div style={{ marginTop: "30px" }}>
                            <h3>投稿一覧 ({userPosts.length}件)</h3>
                            {userPosts.map((post) => (
                                <div
                                    key={post.id}
                                    style={{
                                        padding: "15px",
                                        margin: "10px 0",
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <h4>{post.title}</h4>
                                    <p>{post.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function App() {
    return (
        <Provider store={store}>
            <UserManagement />
        </Provider>
    );
}

export default App;
```

---

### 問題 93: 検索機能とデバウンス処理

**難易度**: ⭐⭐⭐⭐  
**想定時間**: 35 分  
**学習ポイント**: デバウンス、検索 API、abortController、キャンセル処理

#### 課題

- リアルタイム検索機能を実装
- デバウンス処理で不要な API 呼び出しを削減
- 検索中に別の検索が実行された場合は前の検索をキャンセル
- 検索履歴を保存

#### 評価基準

- [ ] デバウンス処理が実装されている
- [ ] 検索 API 呼び出しが適切にキャンセルされる
- [ ] 検索結果が正しく表示される
- [ ] 検索履歴が管理されている
- [ ] ローディング状態が適切に表示される

#### スターターコード

```jsx
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { store } from "../../store";
import {
    searchPosts,
    setQuery,
    clearResults,
    clearHistory,
} from "../../store/searchSlice";
import type { RootState, AppDispatch } from "../../store";

// searchSlice.ts
type Post = {
    id: number;
    userId: number;
    title: string;
    body: string;
};

type SearchState = {
    query: string;
    results: Post[];
    loading: boolean;
    error: string | null;
    searchHistory: string[];
};

type SearchPostsResult = {
    query: string;
    results: Post[];
};

// 初期状態の例（searchSlice.ts で使用）
// const initialState: SearchState = {
//     query: "",
//     results: [],
//     loading: false,
//     error: null,
//     searchHistory: [], // 最新5件を保存
// };

// searchSlice.ts で以下の仕様に従って createSlice と createAsyncThunk を実装してください
//
// 【slice名】
//   name: "search"
//
// 【initialState】
//   上記の initialState を使用
//
// 【非同期アクション: createAsyncThunk】
//   searchPosts を実装してください:
//
//   1. createAsyncThunk の型パラメータ
//      - 第1引数: SearchPostsResult (成功時の戻り値の型)
//      - 第2引数: string (引数の型、検索クエリ)
//      - 第3引数: { rejectValue: string } (エラー時の型)
//
//   2. アクション名
//      - "search/searchPosts"
//
//   3. 非同期処理
//      - JSONPlaceholder API から投稿一覧を取得
//        URL: "https://jsonplaceholder.typicode.com/posts"
//      - fetch を使用してデータを取得
//      - AbortController の signal を fetch のオプションに含める（{ signal } を使用）
//        （Redux Toolkit が自動的に signal を提供します）
//      - response.ok をチェックし、失敗時はエラーを throw
//      - 成功時は response.json() でデータを取得
//      - 取得したデータ（Post[]）をクエリでフィルタリング
//        - post.title または post.body にクエリ（大文字小文字を区別しない）が含まれるものを抽出
//        - フィルタリングには toLowerCase() を使用して大文字小文字を無視する
//      - フィルタリング後の結果を { query, results: filtered } の形式で返す
//      - エラー時は rejectWithValue を使用してエラーメッセージを返す
//      - AbortError の場合は rejectWithValue("検索がキャンセルされました") を返す
//      - その他のエラーの場合は rejectWithValue(error.message) を返す
//
// 【reducers】
//   以下の3つのreducerを実装してください:
//
//   1. setQuery
//      - action.payload: string (検索クエリ)
//      - 処理: state.query に action.payload を設定
//
//   2. clearResults
//      - action.payload: なし
//      - 処理: state.results を [] に設定
//      - 処理: state.error を null に設定
//
//   3. clearHistory
//      - action.payload: なし
//      - 処理: state.searchHistory を [] に設定
//
// 【extraReducers】
//   searchPosts の各状態に応じて処理を実装してください:
//
//   1. searchPosts.pending
//      - 検索のローディング開始時
//      - 処理: state.loading を true に設定
//      - 処理: state.error を null に設定
//
//   2. searchPosts.fulfilled
//      - 検索の取得成功時
//      - action.payload: SearchPostsResult (取得した検索結果とクエリ)
//      - 処理: state.loading を false に設定
//      - 処理: state.results に action.payload.results を設定
//      - 処理: 検索履歴に追加（重複を避ける）
//        - action.payload.query を取得
//        - クエリが空でない、かつ state.searchHistory に含まれていない場合のみ追加
//        - 新しいクエリを先頭に追加し、最新5件に制限する（slice(0, 5) を使用）
//        - state.searchHistory = [query, ...state.searchHistory].slice(0, 5)
//
//   3. searchPosts.rejected
//      - 検索の取得失敗時
//      - action.payload: string | undefined (エラーメッセージ)
//      - 処理: state.loading を false に設定
//      - 処理: エラーメッセージが "検索がキャンセルされました" の場合は state.error を更新しない
//      - 処理: それ以外の場合は state.error に action.payload または "検索に失敗しました" を設定

function SearchPosts() {
    const { query, results, loading, error, searchHistory } = useSelector(
        (state: RootState) => state.search
    );
    const dispatch = useDispatch<AppDispatch>();

    const [inputValue, setInputValue] = useState("");
    const debounceTimerRef = useRef<number | null>(null);

    useEffect(() => {
        // デバウンス処理
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        if (inputValue.trim()) {
            debounceTimerRef.current = window.setTimeout(() => {
                dispatch(setQuery(inputValue));
                // Redux ToolkitのcreateAsyncThunkは自動的に前のリクエストをキャンセルする
                dispatch(searchPosts(inputValue));
            }, 500); // 500ms待機
        } else {
            dispatch(clearResults());
        }

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [inputValue, dispatch]);

    const handleHistoryClick = (historyQuery: string) => {
        setInputValue(historyQuery);
    };

    const handleClearHistory = () => {
        dispatch(clearHistory());
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <h2>投稿検索</h2>

            {/* 検索入力 */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="投稿を検索..."
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        border: "2px solid #ddd",
                        borderRadius: "4px",
                    }}
                />
                {loading && <p style={{ color: "#666" }}>検索中...</p>}
            </div>

            {/* 検索履歴 */}
            {searchHistory.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h3>検索履歴</h3>
                        <button onClick={handleClearHistory}>
                            履歴をクリア
                        </button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        {searchHistory.map((historyQuery, index) => (
                            <button
                                key={index}
                                onClick={() => handleHistoryClick(historyQuery)}
                                style={{
                                    padding: "5px 15px",
                                    backgroundColor: "#e3f2fd",
                                    border: "none",
                                    borderRadius: "20px",
                                    cursor: "pointer",
                                }}
                            >
                                {historyQuery}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* エラー表示 */}
            {error && (
                <div
                    style={{
                        padding: "10px",
                        backgroundColor: "#ffebee",
                        color: "red",
                        borderRadius: "4px",
                    }}
                >
                    {error}
                </div>
            )}

            {/* 検索結果 */}
            {query && !loading && (
                <div>
                    <h3>
                        検索結果: "{query}" ({results.length}件)
                    </h3>

                    {results.length === 0 ? (
                        <p>該当する投稿が見つかりませんでした</p>
                    ) : (
                        <div>
                            {results.map((post) => (
                                <div
                                    key={post.id}
                                    style={{
                                        padding: "15px",
                                        margin: "10px 0",
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <h4>{post.title}</h4>
                                    <p>{post.body}</p>
                                    <small style={{ color: "#666" }}>
                                        投稿ID: {post.id}
                                    </small>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function App() {
    return (
        <Provider store={store}>
            <SearchPosts />
        </Provider>
    );
}

export default App;
```

---

### 問題 94: RTK Query の基本

**難易度**: ⭐⭐⭐  
**想定時間**: 25 分  
**学習ポイント**: createApi、fetchBaseQuery、自動生成フック

#### 課題

- RTK Query を使って API を定義
- 自動生成されるフックを使用
- キャッシュ管理を理解

#### 評価基準

- [ ] RTK Query の API が正しく定義されている
- [ ] 自動生成されたフックが使用されている
- [ ] データの取得が動作する
- [ ] キャッシュが適切に機能している
- [ ] ローディングとエラー状態が管理されている

#### スターターコード

```jsx
import { useState } from "react";
import { Provider } from "react-redux";

// store/api/usersApi.ts
// 以下の仕様に従って usersApi.ts ファイルを作成してください
//
// 【ファイルパス】
//   src/store/api/usersApi.ts
//
// 【型定義】
//   以下の型を定義してください:
//
//   type User = {
//       id: number;
//       name: string;
//       username: string;
//       email: string;
//       phone: string;
//       website: string;
//   };
//
// 【RTK Query API の定義】
//   createApi と fetchBaseQuery を使用して usersApi を定義してください:
//
//   1. reducerPath: "usersApi"
//
//   2. baseQuery: fetchBaseQuery を使用
//      - baseUrl: "https://jsonplaceholder.typicode.com"
//
//   3. tagTypes: ["User"] を定義
//
//   4. endpoints に以下の2つのエンドポイントを定義:
//
//      a) getUsers (Query)
//         - ユーザー一覧を取得
//         - 戻り値の型: User[]
//         - 引数の型: void
//         - query: () => "/users"
//         - providesTags: ["User"]
//
//      b) getUserById (Query)
//         - 特定のユーザーを取得
//         - 戻り値の型: User
//         - 引数の型: number (id)
//         - query: (id) => `/users/${id}`
//         - providesTags: (_result, _error, id) => [{ type: "User", id }]
//
// 【エクスポート】
//   以下のように自動生成されるフックをエクスポートしてください:
//
//   export const {
//       useGetUsersQuery,
//       useGetUserByIdQuery,
//   } = usersApi;
//
//   また、User の型もエクスポートしてください

function UserManagement() {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    // ユーザー一覧を取得
    const { data: users, isLoading, error } = useGetUsersQuery();

    // 選択されたユーザーの詳細を取得
    const { data: selectedUser } = useGetUserByIdQuery(selectedUserId!, {
        skip: !selectedUserId,
    });

    if (isLoading) return <div>読み込み中...</div>;
    if (error) {
        const err = error as { message?: string };
        return <div>エラー: {err.message || "Unknown error"}</div>;
    }

    return (
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
            {/* ユーザー一覧 */}
            <div style={{ flex: 1 }}>
                <h2>ユーザー一覧</h2>

                <ul style={{ listStyle: "none", padding: 0 }}>
                    {users?.map((user) => (
                        <li
                            key={user.id}
                            style={{
                                padding: "10px",
                                margin: "10px 0",
                                backgroundColor:
                                    selectedUserId === user.id
                                        ? "#e3f2fd"
                                        : "#f5f5f5",
                                cursor: "pointer",
                                borderRadius: "4px",
                            }}
                            onClick={() => setSelectedUserId(user.id)}
                        >
                            <strong>{user.name}</strong>
                            <p style={{ margin: "5px 0", fontSize: "14px" }}>
                                {user.email}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ユーザー詳細 */}
            <div style={{ flex: 2 }}>
                <h2>ユーザー詳細</h2>

                {!selectedUser ? (
                    <p>左からユーザーを選択してください</p>
                ) : (
                    <div>
                        <h3>{selectedUser.name}</h3>
                        <p>
                            <strong>ユーザー名:</strong> {selectedUser.username}
                        </p>
                        <p>
                            <strong>Email:</strong> {selectedUser.email}
                        </p>
                        <p>
                            <strong>電話:</strong> {selectedUser.phone}
                        </p>
                        <p>
                            <strong>ウェブサイト:</strong>{" "}
                            {selectedUser.website}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function Question94() {
    return (
        <Provider store={store}>
            <UserManagement />
        </Provider>
    );
}

export default Question94;
```

---

### 問題 95: RTK Query の Mutation

**難易度**: ⭐⭐⭐⭐  
**想定時間**: 35 分  
**学習ポイント**: builder.mutation、invalidatesTags、自動生成される Mutation フック

## 課題

- RTK Query の Mutation エンドポイントを定義
- Create、Update、Delete の 3 つの Mutation を実装
- invalidatesTags を使用してキャッシュを無効化
- 自動生成された Mutation フックを使用

## 評価基準

- [ ] Mutation エンドポイントが正しく定義されている
- [ ] createUser、updateUser、deleteUser が実装されている
- [ ] invalidatesTags が適切に設定されている
- [ ] Mutation フックが正しく使用されている
- [ ] UI 操作でデータの作成・更新・削除が動作する
- [ ] キャッシュが適切に無効化されている

```jsx
import { useState } from "react";
import { Provider } from "react-redux";

// 型定義（実装時に usersApi.ts からインポートしてください）
type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
};

// store/api/usersApi.ts
// 以下の仕様に従って usersApi.ts ファイルにMutationエンドポイントを追加してください
//
// 【ファイルパス】
//   src/store/api/usersApi.ts
//   （既存のusersApi.tsに追加してください）
//
// 【追加するMutationエンドポイント】
//   endpoints に以下の3つのMutationエンドポイントを追加してください:
//
//   a) createUser (Mutation)
//      - 新しいユーザーを作成
//      - 戻り値の型: User
//      - 引数の型: Omit<User, 'id'> (idを除いたUser型)
//      - query: (newUser) => ({
//          url: "/users",
//          method: "POST",
//          body: newUser,
//        })
//      - invalidatesTags: ["User"]
//        （ユーザー一覧のキャッシュを無効化して再取得を促す）
//
//   b) updateUser (Mutation)
//      - 既存のユーザーを更新
//      - 戻り値の型: User
//      - 引数の型: User (idを含む完全なUser型)
//      - query: (user) => ({
//          url: `/users/${user.id}`,
//          method: "PUT",
//          body: user,
//        })
//      - invalidatesTags: (_result, _error, user) => [
//          { type: "User", id: user.id },
//          "User"
//        ]
//        （特定のユーザーとユーザー一覧のキャッシュを無効化）
//
//   c) deleteUser (Mutation)
//      - ユーザーを削除
//      - 戻り値の型: {} (空オブジェクト)
//      - 引数の型: number (id)
//      - query: (id) => ({
//          url: `/users/${id}`,
//          method: "DELETE",
//        })
//      - invalidatesTags: ["User"]
//        （ユーザー一覧のキャッシュを無効化して再取得を促す）
//
// 【エクスポート】
//   以下のように自動生成されるMutationフックをエクスポートしてください:
//
//   export const {
//       useGetUsersQuery,
//       useGetUserByIdQuery,
//       useCreateUserMutation,
//       useUpdateUserMutation,
//       useDeleteUserMutation,
//   } = usersApi;
//
// 【Mutationフックの使用方法】
//   Mutationフックは以下のような形式で使用します:
//
//   const [createUser, { isLoading, error }] = useCreateUserMutation();
//   const [updateUser, { isLoading, error }] = useUpdateUserMutation();
//   const [deleteUser, { isLoading, error }] = useDeleteUserMutation();
//
//   - 第1要素: Mutation関数（例: createUser(newUser)）
//   - 第2要素: オブジェクト（isLoading, error, isSuccess など）
//
//   Mutation関数を呼び出すと、Promiseを返します:
//   await createUser(newUser);
//   await updateUser(user);
//   await deleteUser(id);

function UserManagement() {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
    });

    // ユーザー一覧を取得
    const { data: users, isLoading, error } = useGetUsersQuery();

    // Mutationフックを使用
    // TODO: useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation をインポートして使用してください

    // フォームのリセット
    const resetForm = () => {
        setFormData({
            name: "",
            username: "",
            email: "",
            phone: "",
            website: "",
        });
        setIsCreating(false);
        setEditingUser(null);
    };

    // 新規作成のハンドラー
    const handleCreate = async () => {
        // TODO: createUser Mutationを使用してユーザーを作成してください
        // 成功後は resetForm() を呼び出してください
    };

    // 更新のハンドラー
    const handleUpdate = async () => {
        if (!editingUser) return;
        // TODO: updateUser Mutationを使用してユーザーを更新してください
        // 成功後は resetForm() を呼び出してください
    };

    // 削除のハンドラー
    const handleDelete = async (id: number) => {
        if (!confirm("このユーザーを削除しますか？")) return;
        // TODO: deleteUser Mutationを使用してユーザーを削除してください
    };

    // 編集開始のハンドラー
    const handleEdit = (user: User) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website,
        });
        setIsCreating(false);
    };

    if (isLoading) return <div>読み込み中...</div>;
    if (error) {
        const err = error as { message?: string };
        return <div>エラー: {err.message || "Unknown error"}</div>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>ユーザー管理</h1>

            {/* 作成/編集フォーム */}
            <div
                style={{
                    marginBottom: "20px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <h2>
                    {isCreating
                        ? "新規ユーザー作成"
                        : editingUser
                        ? "ユーザー編集"
                        : "ユーザー操作"}
                </h2>

                {isCreating || editingUser ? (
                    <div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>
                                名前:
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        marginTop: "5px",
                                    }}
                                />
                            </label>
                        </div>

                        <div style={{ marginBottom: "10px" }}>
                            <label>
                                ユーザー名:
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            username: e.target.value,
                                        })
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        marginTop: "5px",
                                    }}
                                />
                            </label>
                        </div>

                        <div style={{ marginBottom: "10px" }}>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        marginTop: "5px",
                                    }}
                                />
                            </label>
                        </div>

                        <div style={{ marginBottom: "10px" }}>
                            <label>
                                電話:
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value,
                                        })
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        marginTop: "5px",
                                    }}
                                />
                            </label>
                        </div>

                        <div style={{ marginBottom: "10px" }}>
                            <label>
                                ウェブサイト:
                                <input
                                    type="text"
                                    value={formData.website}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            website: e.target.value,
                                        })
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        marginTop: "5px",
                                    }}
                                />
                            </label>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                            <button
                                onClick={
                                    isCreating ? handleCreate : handleUpdate
                                }
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#4caf50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                {isCreating ? "作成" : "更新"}
                            </button>
                            <button
                                onClick={resetForm}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#f44336",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                キャンセル
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsCreating(true)}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#2196f3",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        新規ユーザーを作成
                    </button>
                )}
            </div>

            {/* ユーザー一覧 */}
            <div>
                <h2>ユーザー一覧</h2>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {users?.map((user) => (
                        <li
                            key={user.id}
                            style={{
                                padding: "15px",
                                margin: "10px 0",
                                backgroundColor:
                                    selectedUserId === user.id
                                        ? "#e3f2fd"
                                        : "#f5f5f5",
                                borderRadius: "4px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{ flex: 1, cursor: "pointer" }}
                                onClick={() => setSelectedUserId(user.id)}
                            >
                                <strong>{user.name}</strong>
                                <p
                                    style={{
                                        margin: "5px 0",
                                        fontSize: "14px",
                                    }}
                                >
                                    {user.email}
                                </p>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button
                                    onClick={() => handleEdit(user)}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#ff9800",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    編集
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#f44336",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    削除
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
```

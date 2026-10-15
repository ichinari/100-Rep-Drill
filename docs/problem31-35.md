### 問題 31: 基本的な map()の使用

**難易度**: ⭐  
**想定時間**: 5 分  
**学習ポイント**: map()の基本、key 属性の重要性

#### 課題

- 果物の配列をリスト表示
- map()を使って動的に生成
- 適切な key 属性を設定
- インデックスも表示（1 から開始）

#### 評価基準

- [ ] map()が正しく使用されている
- [ ] key 属性が設定されている
- [ ] インデックスが正しく表示される
- [ ] リストが正しくレンダリングされる

#### スターターコード

```jsx
import { useState } from "react";

function FruitList() {
  const [fruits] = useState([
    "りんご",
    "バナナ",
    "オレンジ",
    "ぶどう",
    "いちご",
  ]);

  return (
    <div>
      <h2>果物リスト</h2>
      <ul>{/* map()を使ってリスト生成 */}</ul>
    </div>
  );
}

export default FruitList;
```

---

### 問題 32: オブジェクト配列のレンダリング

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: オブジェクトのプロパティアクセス、複雑なデータ構造の表示

#### 課題

- ユーザー情報（id, name, age, email）の配列を表示
- カード形式で各ユーザー情報を表示
- 年齢によって背景色を変更（20 歳未満、20-60 歳、60 歳以上）
  - 20 歳未満：赤
  - 20-60 歳：緑
  - 60 歳以上：青
- メールアドレスはリンクとして表示

#### 評価基準

- [ ] オブジェクトの各プロパティが表示される
- [ ] id を key として使用している
- [ ] 条件に応じたスタイルが適用される
- [ ] メールリンクが正しく動作する

#### スターターコード

```jsx
import { useState } from "react";

function UserCards() {
  const [users] = useState([
    { id: 1, name: "田中太郎", age: 25, email: "tanaka@example.com" },
    { id: 2, name: "鈴木花子", age: 18, email: "suzuki@example.com" },
    { id: 3, name: "佐藤次郎", age: 65, email: "sato@example.com" },
    { id: 4, name: "高橋美咲", age: 32, email: "takahashi@example.com" },
  ]);

  const getAgeColor = (age) => {
    // 年齢に応じた背景色を返す
  };

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <div className="user-cards">{/* map()でユーザーカードを生成 */}</div>
    </div>
  );
}

export default UserCards;
```

```css
.grid-item:hover {
  transform: scale(1.05);
}

/* Question32: ユーザーカードのスタイル */

.user-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.user-card {
  border: 2px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: left;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.user-card h4 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2em;
}

.user-card p {
  margin: 8px 0;
  color: #666;
}

.email-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
}

.email-link:hover {
  color: #004499;
  text-decoration: underline;
}
```

---

### 問題 33: フィルタリングと map()の組み合わせ

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: filter()と map()の連携、条件付きリスト表示

#### 課題

- 商品リストをカテゴリーでフィルタリング
- 価格範囲でもフィルタリング可能
- 在庫切れ商品は別スタイルで表示
- フィルター結果の件数を表示

#### 評価基準

- [ ] filter()と map()が正しく連携している
- [ ] 複数の条件でフィルタリングできる
- [ ] 在庫状態によってスタイルが変わる
- [ ] 結果件数が正しく表示される

#### スターターコード

```jsx
import { useState } from "react";

function ProductFilter() {
  const [products] = useState([
    {
      id: 1,
      name: "ノートPC",
      category: "電子機器",
      price: 80000,
      inStock: true,
    },
    { id: 2, name: "マウス", category: "電子機器", price: 3000, inStock: true },
    { id: 3, name: "机", category: "家具", price: 25000, inStock: false },
    { id: 4, name: "椅子", category: "家具", price: 15000, inStock: true },
    { id: 5, name: "ペン", category: "文具", price: 100, inStock: true },
    { id: 6, name: "ノート", category: "文具", price: 200, inStock: false },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(100000);

  const filteredProducts = products.filter((product) => {
    // カテゴリーと価格でフィルタリング
  });

  return (
    <div>
      <h2>商品フィルター</h2>

      <div className="filters">
        <select>
          <option value="all">全カテゴリー</option>
          <option value="電子機器">電子機器</option>
          <option value="家具">家具</option>
          <option value="文具">文具</option>
        </select>

        <label>
          最大価格: ¥{maxPrice.toLocaleString()}
          <input type="range" min="0" max="100000" />
        </label>
      </div>

      <p>検索結果: {/* フィルタリング件数 */}件</p>

      <div className="product-list">{/* フィルタリング結果を表示 */}</div>
    </div>
  );
}

export default ProductFilter;
```

```css
/* Question33: Product Filter Styles */

.filters {
  margin: 20px 0;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.filters select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.filters label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
}

.filters input[type="range"] {
  width: 200px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-item {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.product-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.product-item.out-of-stock {
  opacity: 0.6;
  background-color: #f8f8f8;
  border-color: #ccc;
}

.product-item h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 18px;
}

.product-item p {
  margin: 4px 0;
  font-size: 14px;
  color: #666;
}

.stock-status {
  margin-top: 8px !important;
}

.in-stock {
  color: #22c55e;
  font-weight: 500;
}

.out-of-stock-text {
  color: #ef4444;
  font-weight: 500;
}
```

---

### 問題 34: ネストしたリストと key 属性

**難易度**: ⭐⭐⭐  
**想定時間**: 15 分  
**学習ポイント**: ネストした map()、複数レベルの key 属性、階層構造の表示

#### 課題

- カテゴリーごとにグループ化された商品リスト
- カテゴリーの展開/折りたたみ機能
- 各レベルで適切な key 属性を設定

#### 評価基準

- [ ] ネストした map()が正しく動作する
- [ ] 各レベルで key が適切に設定されている
- [ ] 展開/折りたたみが個別に動作する
- [ ] 階層構造が視覚的に分かりやすい

#### スターターコード

```jsx
import { useState } from "react";

function CategoryProducts() {
  const [categories] = useState([
    {
      id: "cat1",
      name: "電子機器",
      items: [
        { id: "item1", name: "スマートフォン", price: 50000 },
        { id: "item2", name: "タブレット", price: 40000 },
        { id: "item3", name: "イヤホン", price: 5000 },
      ],
    },
    {
      id: "cat2",
      name: "書籍",
      items: [
        { id: "item4", name: "プログラミング入門", price: 2500 },
        { id: "item5", name: "デザインの基礎", price: 3000 },
      ],
    },
    {
      id: "cat3",
      name: "衣類",
      items: [
        { id: "item6", name: "Tシャツ", price: 2000 },
        { id: "item7", name: "ジーンズ", price: 6000 },
        { id: "item8", name: "スニーカー", price: 8000 },
      ],
    },
  ]);

  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    // カテゴリーの展開/折りたたみを切り替え
  };

  return (
    <div>
      <h2>カテゴリー別商品リスト</h2>

      <div className="category-list">
        {/* ネストしたmap()でカテゴリーと商品を表示 */}
      </div>
    </div>
  );
}

export default CategoryProducts;
```

```css
/* Question34: Category Products Styles */

.category-products-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.category-products-title {
  margin-bottom: 20px;
  color: #333;
}

.category-item {
  margin-bottom: 20px;
}

.category-header {
  background-color: #f0f0f0;
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.category-header:hover {
  background-color: #e8e8e8;
}

.category-toggle-icon {
  margin-right: 10px;
  font-size: 12px;
}

.category-name {
  font-weight: 500;
}

.category-count {
  color: #666;
  font-size: 0.9em;
}

.products-list {
  margin-left: 20px;
  margin-top: 10px;
}

.product-item {
  padding: 8px;
  border: 1px solid #eee;
  margin-bottom: 5px;
  background-color: #fafafa;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.product-item:hover {
  background-color: #f0f0f0;
}

.product-name {
  font-weight: bold;
  color: #333;
}

.product-price {
  margin-left: 10px;
  color: #666;
}
```

---

### 問題 35: ソート機能付きリスト

**難易度**: ⭐⭐⭐  
**想定時間**: 15 分  
**学習ポイント**: 配列のソート、フィルタリング

#### 課題

- 従業員一覧の実装
- 従業員リストをソート
  - 名前（昇順/降順）、年齢、給与でソート可能
- ソート方向の切り替え（昇順/降順）
- 元の順序に戻す機能
- 検索フィルターも実装
  - 名前、部署で検索可能

#### 評価基準

- [ ] 各項目でソートが正しく動作する
- [ ] 昇順/降順が切り替えられる
- [ ] 元の配列を変更せずにソートする
- [ ] 検索とソートが組み合わせて動作する

#### スターターコード

```jsx
import { useState } from "react";

function EmployeeSort() {
  const [employees] = useState([
    { id: 1, name: "山田太郎", age: 28, department: "営業部", salary: 400000 },
    { id: 2, name: "佐藤花子", age: 35, department: "人事部", salary: 450000 },
    { id: 3, name: "鈴木一郎", age: 42, department: "開発部", salary: 600000 },
    { id: 4, name: "田中美咲", age: 26, department: "営業部", salary: 350000 },
    { id: 5, name: "高橋健", age: 31, department: "開発部", salary: 550000 },
    {
      id: 6,
      name: "伊藤さくら",
      age: 29,
      department: "人事部",
      salary: 380000,
    },
  ]);

  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // asc or desc
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (key) => {
    // ソートキーと方向を設定
  };

  const sortedAndFilteredEmployees = employees
    .filter((emp) => {
      // 検索フィルター
    })
    .sort((a, b) => {
      // ソート処理
    });

  return (
    <div className="employee-sort">
      <h2>従業員リスト</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="名前または部署で検索..."
          className="search-input"
        />

        <button className="reset-button">元の順序に戻す</button>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th className="sortable">
              名前 {sortKey === "name" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th className="sortable">
              年齢 {sortKey === "age" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th>部署</th>
            <th className="sortable">
              給与{" "}
              {sortKey === "salary" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>{/* 従業員情報の表示 */}</tbody>
      </table>

      <div className="info">
        <p>表示件数: {/* 表示件数 */}件</p>
      </div>
    </div>
  );
}

export default EmployeeSort;
```

```css
/* Question35: Employee Sort Styles */

.employee-sort {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.employee-sort h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.reset-button {
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.reset-button:hover {
  background-color: #5a6268;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.employee-table th {
  cursor: pointer;
  user-select: none;
  background: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
  font-weight: 600;
}

.employee-table th.sortable:hover {
  background: #e9ecef;
}

.employee-table td {
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
}

.employee-table tr:hover {
  background-color: #f8f9fa;
}

.info {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #666;
}

.info p {
  margin: 0;
}
```

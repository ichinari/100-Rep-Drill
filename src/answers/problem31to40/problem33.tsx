import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import InputField from "@components/InputField";
import SelectField from "@components/SelectField";
import { useState } from "react";

const CATEGORY_OPTIONS = [
  { value: "all", label: "全カテゴリー" },
  { value: "電子機器", label: "電子機器" },
  { value: "家具", label: "家具" },
  { value: "文具", label: "文具" },
];

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
};

function Problem33() {
  // 商品リストの状態管理
  const [products] = useState<Product[]>([
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

  // フィルター条件の状態管理
  const [selectedCategory, setSelectedCategory] = useState("all");
  // 価格の上限の状態管理
  const [maxPrice, setMaxPrice] = useState(100000);

  // フィルタリングされた商品リスト
  const filteredProducts = products.filter((product) => {
    // カテゴリーと価格でフィルタリング
    const isCategoryMatch =
      selectedCategory === "all" || product.category === selectedCategory;
    const isPriceMatch = product.price <= maxPrice;
    return isCategoryMatch && isPriceMatch;
  });

  return (
    <>
      <QuestionText>
        <ol>
          <li>商品リストをカテゴリーでフィルタリング</li>
          <li>価格範囲でもフィルタリング可能</li>
          <li>在庫切れ商品は別スタイルで表示</li>
          <li>フィルター結果の件数を表示</li>
        </ol>
      </QuestionText>

      <Card title="商品フィルター" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          {/* フィルター */}
          <div className="grid grid-cols-1 gap-4 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3 sm:grid-cols-2 sm:items-end">
            <SelectField
              label="カテゴリー"
              options={CATEGORY_OPTIONS}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />

            <InputField
              type="range"
              label={`最大価格: ¥${maxPrice.toLocaleString()}`}
              min="0"
              max="100000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          {/* フィルター結果 */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-zinc-400">
              フィルター結果:{" "}
              <span className="text-sm font-semibold text-zinc-100 tabular-nums">
                {filteredProducts.length}
              </span>{" "}
              / {products.length} 件
            </p>

            {filteredProducts.length ? (
              <ul className="divide-y divide-zinc-800 rounded-lg border border-zinc-800">
                {filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-zinc-800/40 ${
                      product.inStock ? "" : "bg-zinc-950/40"
                    }`}
                  >
                    <span
                      className={`flex-1 truncate text-sm font-medium ${
                        product.inStock ? "text-zinc-100" : "text-zinc-500"
                      }`}
                    >
                      {product.name}
                    </span>
                    <span className="shrink-0 rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
                      {product.category}
                    </span>
                    {!product.inStock && (
                      <span className="shrink-0 rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-300">
                        在庫切れ
                      </span>
                    )}
                    <span
                      className={`w-20 shrink-0 text-right text-sm tabular-nums ${
                        product.inStock
                          ? "text-zinc-200"
                          : "text-zinc-500 line-through"
                      }`}
                    >
                      ¥{product.price.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-lg border border-dashed border-zinc-800 py-8 text-center text-xs text-zinc-500">
                条件に一致する商品がありません
              </p>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem33;

import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import { useState } from "react";

function Problem34() {
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

  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (categoryId: string) => {
    // カテゴリーの展開/折りたたみを切り替え
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>カテゴリーごとにグループ化された商品リスト</li>
          <li>カテゴリーの展開/折りたたみ機能</li>
          <li>各レベルで適切な key 属性を設定</li>
        </ol>
      </QuestionText>

      <Card title="カテゴリー別商品リスト" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-3 text-left">
          {categories.map((category) => {
            const isExpanded = !!expandedCategories[category.id];
            const panelId = `${category.id}-items`;

            return (
              <section
                key={category.id}
                className={`overflow-hidden rounded-lg border transition-colors ${
                  isExpanded
                    ? "border-violet-500/40 bg-zinc-950/60"
                    : "border-zinc-800 bg-zinc-950/40 hover:border-zinc-700"
                }`}
              >
                {/* カテゴリー見出し（押すと展開 / 折りたたみ） */}
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => toggleCategory(category.id)}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-800/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
                >
                  <span
                    aria-hidden
                    className={`text-xs text-zinc-500 transition-transform duration-300 ${
                      isExpanded ? "rotate-90 text-violet-300" : ""
                    }`}
                  >
                    ▶
                  </span>
                  <span className="flex-1 text-sm font-semibold text-zinc-100">
                    {category.name}
                  </span>
                  <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 tabular-nums">
                    {category.items.length} 件
                  </span>
                </button>

                {/* 商品リスト（grid-rows 0fr ⇄ 1fr で高さをアニメーション） */}
                <div
                  id={panelId}
                  inert={!isExpanded}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul
                      className={`divide-y divide-zinc-800/60 border-t border-zinc-800 transition-opacity duration-300 ${
                        isExpanded ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {category.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center justify-between gap-4 py-2 pr-4 pl-10 text-sm"
                        >
                          <span className="text-zinc-300">{item.name}</span>
                          <span className="text-zinc-400 tabular-nums">
                            ¥{item.price.toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </Card>
    </>
  );
}

export default Problem34;

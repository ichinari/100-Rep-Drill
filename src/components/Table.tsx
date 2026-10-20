import type { ReactNode } from "react";

type Align = "left" | "center" | "right";

export type Column<T, S extends string = string> = {
  // 列の識別子（省略時の表示は row[key]）
  key: keyof T & string;
  header: ReactNode;
  // セルの表示をカスタマイズする（金額のフォーマットなど）
  render?: (row: T) => ReactNode;
  align?: Align;
  // 指定するとソート対象の列になり、見出しに ▲ / ▼ を表示する
  sortKey?: S;
};

type Props<T, S extends string> = {
  columns: Column<T, S>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  // 現在のソート状態（見出しの ▲ / ▼ 表示に使う）
  sortKey?: S | null;
  sortDirection?: "asc" | "desc";
  // 渡すとソート対象の見出しがクリックできるようになる
  onSort?: (key: S) => void;
  emptyMessage?: ReactNode;
};

const ALIGN_CLASS: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

// 列定義と行データから表を描画する
function Table<T, S extends string = string>({
  columns,
  rows,
  rowKey,
  sortKey,
  sortDirection = "asc",
  onSort,
  emptyMessage = "データがありません",
}: Props<T, S>) {
  const renderSortIcon = (key: S) => {
    if (sortKey !== key) return <span className="text-zinc-600">↕</span>;
    return (
      <span className="text-violet-300">
        {sortDirection === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-950/60 text-xs text-zinc-400">
          <tr>
            {columns.map((column) => {
              const alignClass = ALIGN_CLASS[column.align ?? "left"];
              const isSorted =
                column.sortKey !== undefined && sortKey === column.sortKey;

              return (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={
                    isSorted
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                  className={`px-4 py-2.5 font-medium whitespace-nowrap ${alignClass}`}
                >
                  {column.sortKey === undefined ? (
                    column.header
                  ) : onSort ? (
                    <button
                      type="button"
                      onClick={() => onSort(column.sortKey as S)}
                      className="inline-flex cursor-pointer items-center gap-1 transition-colors hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                    >
                      {column.header}
                      {renderSortIcon(column.sortKey)}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      {column.header}
                      {renderSortIcon(column.sortKey)}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {rows.length ? (
            rows.map((row) => (
              <tr
                key={rowKey(row)}
                className="transition-colors hover:bg-zinc-800/40"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-2.5 whitespace-nowrap text-zinc-200 tabular-nums ${
                      ALIGN_CLASS[column.align ?? "left"]
                    }`}
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-xs text-zinc-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

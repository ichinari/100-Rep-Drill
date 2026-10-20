import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import Button from "@/components/Button";
import { useState } from "react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import Table, { type Column } from "@/components/Table";

type Employee = {
  id: number;
  name: string;
  age: number;
  department: string;
  salary: number;
};

// ソートの対象（名前 / 年齢 / 給与）
type SortKey = "name" | "age" | "salary";
// ソートの方向（昇順 / 降順）
type SortDirection = "asc" | "desc";

type Option<T extends string> = {
  value: T;
  label: string;
};

// ソートキーの選択肢
// 空文字は「元の順序」（ソートなし）
const SORT_KEY_OPTIONS: Option<SortKey | "">[] = [
  { value: "", label: "元の順序" },
  { value: "name", label: "名前" },
  { value: "age", label: "年齢" },
  { value: "salary", label: "給与" },
];

// 表の列定義
const EMPLOYEE_COLUMNS: Column<Employee, SortKey>[] = [
  { key: "name", header: "名前", sortKey: "name" },
  { key: "age", header: "年齢", align: "right", sortKey: "age" },
  { key: "department", header: "部署" },
  {
    key: "salary",
    header: "給与",
    align: "right",
    sortKey: "salary",
    render: (employee) => `¥${employee.salary.toLocaleString()}`,
  },
];

// ソート方向の選択肢
const SORT_OPTIONS: Option<SortDirection>[] = [
  { value: "asc", label: "昇順" },
  { value: "desc", label: "降順" },
];

function Problem35() {
  const [employees] = useState<Employee[]>([
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

  // null のときは元の順序
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SORT_OPTIONS[0].value,
  ); // asc or desc
  // 入力中の文字列（検索ボタン / Enter で searchTerm に反映）
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setSearchTerm(inputValue.trim());
  };

  const handleSort = (key: SortKey) => {
    // ソートキーと方向を設定
    // 同じ列なら方向を反転、別の列なら昇順から始める
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection("asc");
  };

  const sortedAndFilteredEmployees = employees
    .filter((emp) => {
      // 検索フィルター
      // 未入力なら全件、入力があれば名前・部署の部分一致（大文字小文字は区別しない）
      if (!searchTerm) return true;
      const keyword = searchTerm.toLowerCase();
      return (
        emp.name.toLowerCase().includes(keyword) ||
        emp.department.toLowerCase().includes(keyword)
      );
    })
    .sort((a, b) => {
      // ソート処理
      // ソートキー未選択なら元の順序のまま
      if (!sortKey) return 0;

      const order = sortDirection === "asc" ? 1 : -1;
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      // 名前は文字列比較、年齢・給与は数値比較
      if (typeof valueA === "string" && typeof valueB === "string") {
        return valueA.localeCompare(valueB, "ja") * order;
      }
      return (Number(valueA) - Number(valueB)) * order;
    });

  return (
    <>
      <QuestionText>
        <ol>
          <li>従業員一覧の実装</li>
          <li>
            従業員リストをソート
            <ul>
              <li>名前（昇順/降順）、年齢、給与でソート可能</li>
            </ul>
          </li>
          <li>ソート方向の切り替え（昇順/降順）</li>
          <li>元の順序に戻す機能</li>
          <li>
            検索フィルターも実装
            <ul>
              <li>名前、部署で検索可能</li>
            </ul>
          </li>
        </ol>
      </QuestionText>

      <Card title="従業員リスト" tag="h2">
        <div className="flex flex-col items-center gap-5">
          <div className="flex w-full max-w-lg justify-end items-center gap-5">
            <InputField
              type="search"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                // 空にしたら（× ボタン含む）検索を解除して全件に戻す
                if (!e.target.value) setSearchTerm("");
              }}
              onKeyDown={(e) => {
                // 日本語変換の確定 Enter では検索しない
                if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                  handleSearch();
                }
              }}
              placeholder="名前または部署で検索"
              className="w-48"
            />
            <Button
              text="検索"
              size="small"
              backgroundColor="#7d7d7e"
              onClick={handleSearch}
            />
          </div>

          <div className="mx-auto flex w-full max-w-lg flex-col gap-5">
            <hr />
            <div className="flex w-full justify-between">
              <div>検索件数：{sortedAndFilteredEmployees.length}</div>
              <div className="flex items-center gap-2">
                {/* ソートオプション */}
                <SelectField
                  options={SORT_OPTIONS}
                  value={sortDirection}
                  disabled={!sortKey}
                  onChange={(e) =>
                    setSortDirection(e.target.value as SortDirection)
                  }
                />
                {/* ソートキーオプション */}
                <SelectField
                  options={SORT_KEY_OPTIONS}
                  value={sortKey ?? ""}
                  onChange={(e) =>
                    setSortKey((e.target.value || null) as SortKey | null)
                  }
                />
              </div>
            </div>
            <Table
              columns={EMPLOYEE_COLUMNS}
              rows={sortedAndFilteredEmployees}
              rowKey={(employee) => employee.id}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
              emptyMessage="該当する従業員がいません"
            />
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem35;

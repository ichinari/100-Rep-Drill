import { useState, type ChangeEvent } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

type Todo = {
  id: string;
  text: string;
};

function Problem15() {
  const [newList, setNewList] = useState("");
  const [todoLists, setTodoLists] = useState<Todo[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewList(e.target.value);
  };

  const handleAddList = () => {
    const addList: Todo = {
      id: crypto.randomUUID(),
      text: newList,
    };

    setTodoLists((prev) => [...prev, addList]);

    setNewList("");
  };

  const isDisabled = newList.trim() === "";

  return (
    <>
      <QuestionText>
        <ol>
          <li>ToDo リストの基本機能を実装</li>
          <li>新しいアイテムを追加できる</li>
          <li>各アイテムを削除できる</li>
          <li>各 ToDo は UUID で管理すること</li>
          <li>アイテム数を表示</li>
        </ol>
      </QuestionText>

      <div>
        <Card title="Todo List" tag="h2">
          <div className="flex flex-col items-center gap-5 mb-5">
            <InputField label="list" value={newList} onChange={handleChange} />

            <Button
              text="add"
              backgroundColor="#4f4f4f"
              isDisabled={isDisabled}
              onClick={handleAddList}
            />
          </div>

          <hr />

          <div className="mt-5">
            <ul className="flex flex-col gap-2">
              {todoLists.length > 0 ? (
                todoLists.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-2"
                  >
                    <span className="break-all">{todo.text}</span>
                  </li>
                ))
              ) : (
                <li className="py-4 text-center text-zinc-500">
                  ToDo はありません
                </li>
              )}
            </ul>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Problem15;

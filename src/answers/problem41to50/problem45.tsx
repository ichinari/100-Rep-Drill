import { useState, useEffect, useRef } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import InputField from "@components/InputField";
import Button from "@components/Button";

type ConnectionStatus = "connected" | "connecting" | "disconnected" | "error";

type ChatMessage = {
  id: number;
  type: "sent" | "received";
  content: string;
  timestamp: string;
};

const STATUS_LABELS: Record<ConnectionStatus, string> = {
  connected: "接続中",
  connecting: "接続しています...",
  disconnected: "切断",
  error: "エラー",
};

// 再接続までの待ち時間（ms）
const RECONNECT_DELAY = 3000;

function Problem45() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("disconnected");
  const [reconnectCount, setReconnectCount] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;

    const connectWebSocket = () => {
      // WebSocket接続を確立
      // エコーサーバー: wss://echo.websocket.org/
      setConnectionStatus("connecting");
      const ws = new WebSocket("wss://echo.websocket.org/");

      ws.onopen = () => {
        // 接続成功
        setConnectionStatus("connected");
        setReconnectCount(0);
        console.log("WebSocket接続成功");
      };

      ws.onmessage = (event) => {
        // メッセージ受信
        const timestamp = new Date().toLocaleTimeString();
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            type: "received",
            content: event.data,
            timestamp,
          },
        ]);
      };

      ws.onerror = () => {
        // エラー処理
        setConnectionStatus("error");
      };

      ws.onclose = () => {
        // 接続切断
        setConnectionStatus("disconnected");
        // 一定時間後に再接続
        reconnectTimer = setTimeout(() => {
          setReconnectCount((prev) => prev + 1);
          connectWebSocket();
        }, RECONNECT_DELAY);
      };

      wsRef.current = ws;
    };

    connectWebSocket();

    // クリーンアップ
    return () => {
      clearTimeout(reconnectTimer);
      // WebSocket接続を切断
      const ws = wsRef.current;
      if (ws) {
        ws.onerror = null;
        ws.onclose = null;
        ws.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN && inputMessage.trim()) {
      // メッセージ送信
      wsRef.current.send(inputMessage);

      const timestamp = new Date().toLocaleTimeString();

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "sent",
          content: inputMessage,
          timestamp,
        },
      ]);
      setInputMessage("");
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-400";
      case "connecting":
        return "bg-amber-400";
      case "disconnected":
        return "bg-red-400";
      default:
        return "bg-zinc-500";
    }
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>
            WebSocket でリアルタイムチャットを実装
            <ul>
              <li>
                WebSocket Echo Server を使用
                <ul>
                  <li>wss://echo.websocket.org/</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>接続状態を管理（接続中/切断/エラー）</li>
          <li>自動再接続機能</li>
          <li>メッセージ送受信</li>
        </ol>
      </QuestionText>

      <Card title="WebSocketチャット" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-3 text-left">
          {/* 接続状態 */}
          <div
            role="status"
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-xs text-zinc-300"
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${getStatusColor()} ${
                connectionStatus === "connecting" ? "animate-pulse" : ""
              }`}
            />
            {STATUS_LABELS[connectionStatus]}
            {reconnectCount > 0 && (
              <span className="ml-auto text-zinc-500 tabular-nums">
                再接続試行: {reconnectCount} 回目
              </span>
            )}
          </div>

          {/* メッセージ */}
          <div
            role="log"
            className="flex h-80 flex-col gap-2 overflow-y-auto overscroll-contain rounded-lg border border-zinc-800 bg-zinc-950/40 p-3 scrollbar-thin [scrollbar-color:var(--color-zinc-600)_transparent]"
          >
            {messages.length ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex max-w-[80%] flex-col gap-0.5 ${
                    msg.type === "sent" ? "items-end self-end" : "items-start"
                  }`}
                >
                  <span
                    className={`rounded-2xl px-3 py-1.5 text-sm wrap-anywhere ${
                      msg.type === "sent"
                        ? "rounded-br-sm bg-violet-600 text-white"
                        : "rounded-bl-sm bg-zinc-800 text-zinc-100"
                    }`}
                  >
                    {msg.content}
                  </span>
                  <span className="text-[10px] text-zinc-600 tabular-nums">
                    {msg.timestamp}
                  </span>
                </div>
              ))
            ) : (
              <p className="m-auto text-xs text-zinc-500">
                まだメッセージはありません
              </p>
            )}
          </div>

          {/* 入力欄 */}
          <div className="flex items-center gap-2">
            <InputField
              aria-label="メッセージ"
              className="min-w-0 flex-1"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="メッセージを入力..."
              disabled={connectionStatus !== "connected"}
            />
            <Button
              text="送信"
              backgroundColor="#7c3aed"
              isDisabled={connectionStatus !== "connected"}
              onClick={sendMessage}
            />
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem45;

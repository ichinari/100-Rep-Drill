### 問題 41: タイマーのクリーンアップ

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: クリーンアップ関数、メモリリーク防止

#### 課題

- カウントダウンタイマーを実装
- スタート/ストップ/リセット機能
- コンポーネントアンマウント時にタイマーをクリア
- 残り時間が 0 になったらアラート

#### 評価基準

- [ ] setInterval が適切に使用されている
- [ ] クリーンアップで clearInterval が呼ばれる
- [ ] メモリリークが発生しない
- [ ] 各操作が正しく動作する

#### スターターコード

```jsx
import { useState, useEffect } from "react";

function CountdownTimer() {
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(
    () => {
      let intervalId;

      if (isRunning && seconds > 0) {
        // タイマーを開始
        intervalId = setInterval(() => {
          // 1秒ずつ減らす
        }, 1000);
      } else if (seconds === 0) {
        // 0になったらアラート
        setIsRunning(false);
      }

      // クリーンアップ関数
      return () => {
        // タイマーをクリア
      };
    },
    [
      /* 監視対象 */
    ]
  );

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(60);
  };

  return (
    <div>
      <h2>カウントダウンタイマー</h2>
      <div className="timer-display">
        <h1>
          {Math.floor(seconds / 60)}:
          {(seconds % 60).toString().padStart(2, "0")}
        </h1>
      </div>

      <div className="controls">
        <button onClick={handleStart} disabled={isRunning || seconds === 0}>
          スタート
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          ストップ
        </button>
        <button onClick={handleReset}>リセット</button>
      </div>
    </div>
  );
}

export default CountdownTimer;
```

---

### 問題 42: イベントリスナーのクリーンアップ

**難易度**: ⭐⭐  
**想定時間**: 10 分  
**学習ポイント**: window オブジェクト（DOM イベント、addEventListener/removeEventListener）

#### 課題

- ウィンドウサイズの変更を監視
- スクロール位置を追跡
- キーボードショートカット（Ctrl+S）を実装
  - 最終保存日時を表示
- 全てのイベントリスナーを適切にクリーンアップ

#### 評価基準

- [ ] 複数のイベントリスナーが登録される
- [ ] 各イベントが正しく処理される
- [ ] クリーンアップで全て削除される
- [ ] メモリリークが発生しない

#### スターターコード

```jsx
import { useState, useEffect } from "react";

function EventListeners() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    // リサイズイベント
    const handleResize = () => {
      // ウィンドウサイズを更新
    };

    // スクロールイベント
    const handleScroll = () => {
      // スクロール位置を更新
    };

    // キーボードイベント
    const handleKeyDown = (e) => {
      // Ctrl+S で保存処理
    };

    // イベントリスナー登録

    // クリーンアップ
    return () => {
      // 全てのイベントリスナーを削除
    };
  }, []);

  return (
    <div style={{ minHeight: "150vh" }}>
      <h2>イベントリスナー管理</h2>

      <div className="info-panel">
        <p>
          ウィンドウサイズ: {windowSize.width} x {windowSize.height}
        </p>
        <p>スクロール位置: {scrollPosition}px</p>
        <p>最終保存: {lastSaved || "未保存"}</p>
        <p className="hint">Ctrl+Sで保存</p>
      </div>

      <div style={{ marginTop: "100px" }}>
        <p>スクロールして位置を確認してください</p>
      </div>
    </div>
  );
}

export default EventListeners;
```

---

### 問題 43: 基本的な API 通信

**難易度**: ⭐⭐⭐  
**想定時間**: 15 分  
**学習ポイント**: fetch API、async/await

#### 課題

- JSONPlaceholder API からユーザー一覧を取得
  - [users](https://jsonplaceholder.typicode.com/users)
- ローディング状態を表示
- エラーハンドリングを実装
- リトライ機能を追加

#### 評価基準

- [ ] API 通信が正しく実装されている
- [ ] ローディング状態が表示される
- [ ] エラーが適切に処理される
- [ ] リトライ機能が動作する

#### スターターコード

```jsx
import { useState, useEffect } from "react";

function UserFetch() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // API通信を実装
        // https://jsonplaceholder.typicode.com/users
      } catch (err) {
        // エラーハンドリング
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [retryCount]); // リトライ時に再実行

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return (
      <div>
        <p>エラー: {error}</p>
        <button onClick={handleRetry}>リトライ ({retryCount})</button>
      </div>
    );
  }

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <button onClick={handleRetry}>再読み込み</button>

      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.company?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserFetch;
```

```css
/* Question43: User Grid Styles */

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
```

---

### 問題 44: API 通信のキャンセル処理

**難易度**: ⭐⭐⭐⭐  
**想定時間**: 15 分  
**学習ポイント**: AbortController、通信のキャンセル、レースコンディション対策

#### 課題

- 検索キーワードで GitHub リポジトリを検索
  - https://api.github.com/search/repositories?q={query}
- 入力の度に前の通信をキャンセル（デバウンス機能）
- AbortController を使用
- ローディング中の表示

#### 評価基準

- [ ] AbortController が正しく実装されている
- [ ] 前の通信が適切にキャンセルされる
- [ ] レースコンディションが発生しない
- [ ] エラーハンドリングが適切

#### スターターコード

```jsx
import { useState, useEffect } from "react";

function GitHubSearch() {
  const [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortControllerを作成
    const controller = new AbortController();

    const searchRepositories = async () => {
      if (!query.trim()) {
        setRepositories([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // GitHub API を呼び出し
        // https://api.github.com/search/repositories?q={query}
        // signalを渡してキャンセル可能にする
      } catch (err) {
        // キャンセルエラーと通常のエラーを区別
      } finally {
        setIsLoading(false);
      }
    };

    // デバウンス処理
    const timeoutId = setTimeout(() => {
      searchRepositories();
    }, 500);

    // クリーンアップ
    return () => {
      clearTimeout(timeoutId);
      // 通信をキャンセル
    };
  }, [query]);

  return (
    <div>
      <h2>GitHub リポジトリ検索</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索キーワードを入力..."
      />

      {isLoading && <p>検索中...</p>}
      {error && <p>エラー: {error}</p>}

      <div className="repo-list">
        {repositories.map((repo) => (
          <div key={repo.id} className="repo-card">
            <h3>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.full_name}
              </a>
            </h3>
            <p>{repo.description}</p>
            <div className="repo-stats">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
              <span>📝 {repo.language}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GitHubSearch;
```

---

### 問題 45: WebSocket の管理

**難易度**: ⭐⭐⭐⭐  
**想定時間**: 20 分  
**学習ポイント**: WebSocket 接続、リアルタイム通信、接続管理、再接続処理

#### 課題

- WebSocket でリアルタイムチャットを実装
  - WebSocket Echo Server を使用
    - wss://echo.websocket.org/
- 接続状態を管理（接続中/切断/エラー）
- 自動再接続機能
- メッセージ送受信

#### 評価基準

- [ ] WebSocket 接続が確立される
- [ ] メッセージの送受信が動作する
- [ ] 接続状態が正しく表示される
- [ ] クリーンアップで接続が切断される
- [ ] 自動再接続が動作する

#### スターターコード

```jsx
import { useState, useEffect, useRef } from "react";

function WebSocketChat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [reconnectCount, setReconnectCount] = useState(0);
  const wsRef = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      // WebSocket接続を確立
      // エコーサーバー: wss://echo.websocket.org/
      const ws = new WebSocket("wss://echo.websocket.org/");

      ws.onopen = () => {
        // 接続成功
        setConnectionStatus("connected");
        setReconnectCount(0);
        console.log("WebSocket接続成功");
      };

      ws.onmessage = (event) => {
        // メッセージ受信
      };

      ws.onerror = (error) => {
        // エラー処理
      };

      ws.onclose = () => {
        // 接続切断
        setConnectionStatus("disconnected");
      };

      wsRef.current = ws;
    };

    connectWebSocket();

    // クリーンアップ
    return () => {
      // WebSocket接続を切断
    };
  }, [reconnectCount]);

  const sendMessage = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN && inputMessage.trim()) {
      // メッセージ送信

      setInputMessage("");
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "green";
      case "connecting":
        return "yellow";
      case "disconnected":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="websocket-chat">
      <h2>WebSocketチャット</h2>

      <div className="connection-status">
        <span className={`status-indicator ${connectionStatus}`} />
        接続状態: {connectionStatus}
        {reconnectCount > 0 && ` (再接続試行: ${reconnectCount}回目)`}
      </div>

      <div className="chat-window">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <span className="message-timestamp">{msg.timestamp}</span>

            <span className="message-content">{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="メッセージを入力..."
          disabled={connectionStatus !== "connected"}
          className="chat-input"
        />

        <button
          onClick={sendMessage}
          disabled={connectionStatus !== "connected"}
          className="send-button"
        >
          送信
        </button>
      </div>
    </div>
  );
}

export default WebSocketChat;
```

```css
/* Question45: WebSocket Chat Styles */

.websocket-chat {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.websocket-chat h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.connection-status {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.status-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}

.status-indicator.connected {
  background-color: #28a745;
}

.status-indicator.connecting {
  background-color: #ffc107;
}

.status-indicator.disconnected {
  background-color: #dc3545;
}

.status-indicator.error {
  background-color: #dc3545;
}

.chat-window {
  height: 300px;
  border: 1px solid #ddd;
  overflow-y: auto;
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 8px;
}

.message {
  margin: 5px 0;
  padding: 8px 12px;
  border-radius: 8px;
  max-width: 80%;
  word-wrap: break-word;
}

.message.sent {
  background: #e3f2fd;
  margin-left: auto;
  text-align: right;
}

.message.received {
  background: #f5f5f5;
  margin-right: auto;
  text-align: left;
}

.message-timestamp {
  font-size: 12px;
  color: #666;
  margin-right: 10px;
  display: block;
  margin-bottom: 4px;
}

.message-content {
  font-size: 14px;
  line-height: 1.4;
}

.chat-input-area {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.chat-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
}

.chat-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.chat-input:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.send-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.send-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.send-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
```

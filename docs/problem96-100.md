### 問題 96: useQuery の基本

**難易度**: ⭐⭐  
**想定時間**: 20 分  
**学習ポイント**: useQuery、データフェッチ、isLoading/isError/data

#### 課題

- TanStack Query を使って投稿一覧を取得
- QueryClientProvider でアプリをラップ
- isLoading、isError、data を使った条件分岐を実装
- 手動で再取得する機能を実装

#### 評価基準

- [ ] TanStack Query が正しくセットアップされている
- [ ] useQuery が適切に使用されている
- [ ] ローディング状態が表示される
- [ ] エラーハンドリングが実装されている
- [ ] データが正しく表示される

#### スターターコード

```jsx
type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
};

// APIリクエスト関数
const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("投稿の取得に失敗しました");
  }

  const data = await response.json();
  return data;
};

function PostList() {
  // useQueryでデータを取得

  // ローディング中
  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>投稿一覧</h2>
        <p>読み込み中...</p>
      </div>
    );
  }

  // エラー時
  if (isError) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>投稿一覧</h2>
        <p style={{ color: "red" }}>エラー: {error.message}</p>
        <button onClick={() => refetch()}>再試行</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>投稿一覧 ({posts.length ?? 0}件)</h2>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "更新中..." : "再読み込み"}
        </button>
      </div>

      <div>
        {posts?.map((post) => (
          <div
            key={post.id}
            style={{
              padding: "15px",
              margin: "10px 0",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0" }}>{post.title}</h3>
            <p style={{ color: "#666", margin: "0 0 10px 0" }}>{post.body}</p>
            <small style={{ color: "#999" }}>
              投稿者: ユーザー{post.userId} | 投稿ID: {post.id}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### 問題 97: useMutation とキャッシュ更新

**難易度**: ⭐⭐⭐  
**想定時間**: 25 分  
**学習ポイント**: useMutation、楽観的更新、キャッシュ無効化、onSuccess/onError

#### 課題

- useMutation で投稿の追加・削除を実装
- 楽観的更新で UI を即座に反映
- onSuccess でキャッシュを無効化
- エラー時のロールバック処理を実装

#### 評価基準

- [ ] useMutation が正しく使用されている
- [ ] 楽観的更新が実装されている
- [ ] キャッシュが適切に更新される
- [ ] エラー時のロールバックが動作する
- [ ] 成功/失敗時の通知が表示される

#### スターターコード

```jsx
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

// 型定義
type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
  likes?: number,
};

type NewPost = {
  title: string,
  body: string,
  userId: number,
};

type Notification = {
  type: "success" | "error",
  message: string,
};

type UpdatePostData = {
  id: number,
  title?: string,
  body?: string,
  userId?: number,
  likes?: number,
};

// APIリクエスト関数
const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("投稿の取得に失敗しました");
  return response.json();
};

const createPost = async (newPost: NewPost): Promise<Post> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) throw new Error("投稿の作成に失敗しました");
  return response.json();
};

const deletePost = async (postId: number): Promise<{ id: number }> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) throw new Error("投稿の削除に失敗しました");
  return { id: postId };
};

const updatePost = async ({ id, ...data }: UpdatePostData): Promise<Post> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) throw new Error("投稿の更新に失敗しました");
  return response.json();
};

// PostManagerコンポーネント
function PostManager() {
  const [title, setTitle] = useState < string > "";
  const [body, setBody] = useState < string > "";
  const [notification, setNotification] =
    (useState < Notification) | (null > null);

  // TODO: useQueryClient を使用して queryClient を取得してください

  // 投稿一覧を取得

  // 投稿を追加するミューテーション
  // TODO: useMutationを使用して投稿の追加を実装してください
  // 【実装仕様】
  //   1. mutationFn: createPost を使用
  //   2. 楽観的更新を実装（onMutate）:
  //      - queryClient.cancelQueries({ queryKey: ["posts"] }) で進行中のクエリをキャンセル
  //      - queryClient.getQueryData<Post[]>(["posts"]) で前のデータを保存
  //      - queryClient.setQueryData で楽観的にキャッシュを更新（新しい投稿を先頭に追加）
  //      - 一時的なIDとして Date.now() を使用
  //      - { previousPosts } を返す（ロールバック用）
  //   3. エラー時のロールバック（onError）:
  //      - context.previousPosts があれば、queryClient.setQueryData で元のデータに戻す
  //      - setNotification でエラー通知を表示
  //   4. 成功時の処理（onSuccess）:
  //      - setNotification で成功通知を表示
  //      - setTitle("") と setBody("") でフォームをリセット
  //   5. 最終処理（onSettled）:
  //      - queryClient.invalidateQueries({ queryKey: ["posts"] }) でキャッシュを無効化
  const createMutation = useMutation({
    mutationFn: createPost,
    // TODO: 楽観的更新とエラーハンドリングを実装してください
  });

  // 投稿を削除するミューテーション
  // TODO: useMutationを使用して投稿の削除を実装してください
  // 【実装仕様】
  //   1. mutationFn: deletePost を使用
  //   2. 楽観的更新を実装（onMutate）:
  //      - queryClient.cancelQueries({ queryKey: ["posts"] }) で進行中のクエリをキャンセル
  //      - queryClient.getQueryData<Post[]>(["posts"]) で前のデータを保存
  //      - queryClient.setQueryData で楽観的にキャッシュを更新（該当の投稿を削除）
  //      - { previousPosts } を返す（ロールバック用）
  //   3. エラー時のロールバック（onError）:
  //      - context.previousPosts があれば、queryClient.setQueryData で元のデータに戻す
  //      - setNotification でエラー通知を表示
  //   4. 成功時の処理（onSuccess）:
  //      - setNotification で成功通知を表示
  //   5. 最終処理（onSettled）:
  //      - queryClient.invalidateQueries({ queryKey: ["posts"] }) でキャッシュを無効化
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    // TODO: 楽観的更新とエラーハンドリングを実装してください
  });

  // いいねを追加するミューテーション（楽観的更新の練習）
  // TODO: useMutationを使用していいね機能を実装してください
  // 【実装仕様】
  //   1. mutationFn: updatePost を使用
  //   2. 楽観的更新を実装（onMutate）:
  //      - queryClient.cancelQueries({ queryKey: ["posts"] }) で進行中のクエリをキャンセル
  //      - queryClient.getQueryData<Post[]>(["posts"]) で前のデータを保存
  //      - queryClient.setQueryData で楽観的にキャッシュを更新（該当投稿のlikesを+1）
  //      - { previousPosts } を返す（ロールバック用）
  //   3. エラー時のロールバック（onError）:
  //      - context.previousPosts があれば、queryClient.setQueryData で元のデータに戻す
  const likeMutation = useMutation({
    mutationFn: updatePost,
    // TODO: 楽観的更新とエラーハンドリングを実装してください
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      // TODO: createMutation.mutate を使用して投稿を追加してください
      // createMutation.mutate({ title, body, userId: 1 });
    }
  };

  const handleDelete = (postId: number) => {
    if (window.confirm("この投稿を削除しますか？")) {
      // TODO: deleteMutation.mutate を使用して投稿を削除してください
      // ヒント: postId パラメータを使用してください
      // deleteMutation.mutate(postId);
    }
  };

  const handleLike = (post: Post) => {
    // TODO: likeMutation.mutate を使用していいねを追加してください
    // likeMutation.mutate({
    //     ...post,
    //     id: post.id,
    //     likes: (post.likes || 0) + 1,
    // });
  };

  if (isLoading) return <div>読み込み中...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>投稿管理</h2>

      {/* 通知 */}
      {notification && (
        <div
          style={{
            padding: "10px",
            marginBottom: "20px",
            backgroundColor:
              notification.type === "error" ? "#ffebee" : "#e8f5e9",
            color: notification.type === "error" ? "#c62828" : "#2e7d32",
            borderRadius: "4px",
          }}
        >
          {notification.message}
          <button
            onClick={() => setNotification(null)}
            style={{
              float: "right",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* 投稿フォーム */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>新しい投稿</h3>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="本文"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={createMutation.isPending}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {createMutation.isPending ? "投稿中..." : "投稿する"}
        </button>
      </form>

      {/* 投稿一覧 */}
      <div>
        <h3>投稿一覧 ({posts?.length || 0}件)</h3>
        {posts?.map((post) => (
          <div
            key={post.id}
            style={{
              padding: "15px",
              margin: "10px 0",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ margin: "0 0 10px 0" }}>{post.title}</h4>
            <p style={{ color: "#666", margin: "0 0 10px 0" }}>{post.body}</p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => handleLike(post)}
                disabled={likeMutation.isPending}
                style={{
                  padding: "5px 15px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                👍 {post.likes || 0}
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                disabled={deleteMutation.isPending}
                style={{
                  padding: "5px 15px",
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
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### 問題 98: queryKey の依存関係と自動再取得

**難易度**: ⭐⭐⭐  
**想定時間**: 25 分  
**学習ポイント**: queryKey 依存関係、enabled、自動再取得、staleTime

#### 課題

- ユーザー選択に基づいて投稿を自動取得
- queryKey の依存関係を理解
- enabled オプションで条件付きクエリを実装
- データの鮮度管理を最適化

#### 評価基準

- [ ] queryKey の依存関係が正しく設定されている
- [ ] ユーザー変更時に自動で再取得される
- [ ] enabled オプションが適切に使用されている
- [ ] staleTime と cacheTime が理解されている
- [ ] 不要な再取得が防がれている

#### スターターコード

```jsx
import { useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";

// 型定義
type User = {
    id: number;
    name: string;
    username: string;
    email: string;
};

type Post = {
    id: number;
    userId: number;
    title: string;
    body: string;
};

type Comment = {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
};

// API関数
const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("ユーザーの取得に失敗しました");
    return response.json();
};

const fetchUserPosts = async (userId: number): Promise<Post[]> => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (!response.ok) throw new Error("投稿の取得に失敗しました");
    return response.json();
};

const fetchPostComments = async (postId: number): Promise<Comment[]> => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    if (!response.ok) throw new Error("コメントの取得に失敗しました");
    return response.json();
};

function UserPostsViewer() {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    // TODO: ユーザー一覧を取得するuseQueryを実装してください
    // - queryKey: ["users"]
    // - queryFn: fetchUsers
    // - staleTime: 10分間（1000 * 60 * 10）
    // - gcTime: 30分間（1000 * 60 * 30）
    const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>({

    });

    // TODO: 選択されたユーザーの投稿を取得するuseQueryを実装してください
    // - queryKey: ["posts", selectedUserId] で依存関係を設定（重要：これによりuserIdが変わると自動で再取得されます）
    // - queryFn: selectedUserIdを使用してfetchUserPostsを呼び出す
    // - enabled: selectedUserIdが存在する時のみ実行（!!selectedUserId）
    // - staleTime: 5分間（1000 * 60 * 5）
    // - gcTime: 15分間（1000 * 60 * 15）
    // - isFetchingとdataUpdatedAtも取得してください
    const {
        data: posts,
        isLoading: isLoadingPosts,
        isFetching: isFetchingPosts,
        dataUpdatedAt: postsUpdatedAt,
    } = useQuery<Post[]>({

    });

    // TODO: 選択された投稿のコメントを取得するuseQueryを実装してください
    // - queryKey: ["comments", selectedPostId] で依存関係を設定（重要：これによりpostIdが変わると自動で再取得されます）
    // - queryFn: selectedPostIdを使用してfetchPostCommentsを呼び出す
    // - enabled: selectedPostIdが存在する時のみ実行（!!selectedPostId）
    // - staleTime: 5分間（1000 * 60 * 5）
    // - gcTime: 15分間（1000 * 60 * 15）
    // - isFetchingも取得してください
    const {
        data: comments,
        isLoading: isLoadingComments,
        isFetching: isFetchingComments,
    } = useQuery<Comment[]>({

    });

    const handleUserSelect = (userId: number) => {
        setSelectedUserId(userId);
        setSelectedPostId(null); // 投稿選択をリセット
    };

    const handlePostSelect = (postId: number) => {
        setSelectedPostId(postId);
    };

    if (isLoadingUsers) {
        return <div style={{ padding: "20px" }}>ユーザーを読み込み中...</div>;
    }

    return (
        <div
            style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
                height: "100vh",
            }}
        >
            {/* ユーザー一覧 */}
            <div style={{ flex: 1, overflowY: "auto" }}>
                <h2>ユーザー一覧</h2>
                <div>
                    {users?.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleUserSelect(user.id)}
                            style={{
                                padding: "15px",
                                margin: "10px 0",
                                backgroundColor:
                                    selectedUserId === user.id
                                        ? "#e3f2fd"
                                        : "#f5f5f5",
                                cursor: "pointer",
                                borderRadius: "8px",
                                border:
                                    selectedUserId === user.id
                                        ? "2px solid #2196F3"
                                        : "none",
                            }}
                        >
                            <strong>{user.name}</strong>
                            <p
                                style={{
                                    margin: "5px 0",
                                    fontSize: "14px",
                                    color: "#666",
                                }}
                            >
                                @{user.username}
                            </p>
                            <p
                                style={{
                                    margin: "0",
                                    fontSize: "12px",
                                    color: "#999",
                                }}
                            >
                                {user.email}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 投稿一覧 */}
            <div style={{ flex: 2, overflowY: "auto" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h2>投稿一覧</h2>
                    {isFetchingPosts && (
                        <span style={{ color: "#666" }}>🔄 更新中...</span>
                    )}
                </div>

                {!selectedUserId && (
                    <p style={{ color: "#999" }}>
                        左からユーザーを選択してください
                    </p>
                )}

                {isLoadingPosts && <p>投稿を読み込み中...</p>}

                {selectedUserId && !isLoadingPosts && (
                    <>
                        <p style={{ color: "#666", fontSize: "14px" }}>
                            最終更新:{" "}
                            {new Date(postsUpdatedAt).toLocaleTimeString()}
                        </p>
                        <div>
                            {posts?.map((post) => (
                                <div
                                    key={post.id}
                                    onClick={() => handlePostSelect(post.id)}
                                    style={{
                                        padding: "15px",
                                        margin: "10px 0",
                                        backgroundColor:
                                            selectedPostId === post.id
                                                ? "#fff9c4"
                                                : "#fff",
                                        cursor: "pointer",
                                        borderRadius: "8px",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    <h4 style={{ margin: "0 0 10px 0" }}>
                                        {post.title}
                                    </h4>
                                    <p
                                        style={{
                                            margin: "0",
                                            color: "#666",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {post.body.substring(0, 100)}...
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* コメント一覧 */}
            <div style={{ flex: 2, overflowY: "auto" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h2>コメント</h2>
                    {isFetchingComments && (
                        <span style={{ color: "#666" }}>🔄 更新中...</span>
                    )}
                </div>

                {!selectedPostId && (
                    <p style={{ color: "#999" }}>投稿を選択してください</p>
                )}

                {isLoadingComments && <p>コメントを読み込み中...</p>}

                {selectedPostId && !isLoadingComments && (
                    <div>
                        <p style={{ color: "#666", marginBottom: "15px" }}>
                            {comments?.length || 0}件のコメント
                        </p>
                        {comments?.map((comment) => (
                            <div
                                key={comment.id}
                                style={{
                                    padding: "15px",
                                    margin: "10px 0",
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: "8px",
                                    borderLeft: "4px solid #4CAF50",
                                }}
                            >
                                <div style={{ marginBottom: "10px" }}>
                                    <strong>{comment.name}</strong>
                                    <p
                                        style={{
                                            margin: "5px 0",
                                            fontSize: "12px",
                                            color: "#666",
                                        }}
                                    >
                                        {comment.email}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        margin: "0",
                                        color: "#333",
                                        fontSize: "14px",
                                    }}
                                >
                                    {comment.body}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// QueryClientの設定
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function Question98_Starter() {
    return (
        <QueryClientProvider client={queryClient}>
            <UserPostsViewer />
        </QueryClientProvider>
    );
}

export default Question98_Starter;
```

---

### 問題 99: useInfiniteQuery で無限スクロール

**難易度**: ⭐⭐⭐⭐  
**想定時間**: 30 分  
**学習ポイント**: useInfiniteQuery、ページネーション、getNextPageParam、無限スクロール

#### 課題

- useInfiniteQuery でページネーションを実装
- 「もっと見る」ボタンで次のページを読み込む
- 無限スクロールでの自動読み込みを実装
- ローディング状態とエラーハンドリング

#### 評価基準

- [ ] useInfiniteQuery が正しく使用されている
- [ ] ページネーションが動作する
- [ ] 無限スクロールが実装されている
- [ ] hasNextPage が適切に判定されている
- [ ] 全ページのデータが正しく表示される

#### スターターコード

```jsx
import {
    QueryClient,
    QueryClientProvider,
    useInfiniteQuery,
} from "@tanstack/react-query";

// 型定義
type Photo = {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
};

type PhotoPage = {
    photos: Photo[];
    nextPage: number | undefined;
    totalPhotos: number;
};

type FetchPhotosParams = {
    pageParam: number;
};

// API関数
const fetchPhotos = async ({
    pageParam = 1,
}: FetchPhotosParams): Promise<PhotoPage> => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${pageParam}&_limit=20`
    );

    if (!response.ok) throw new Error("写真の取得に失敗しました");

    const data: Photo[] = await response.json();

    // 画像URLをPicsum Photosに置き換え（実際の画像を表示）
    const photosWithRealImages = data.map((photo) => ({
        ...photo,
        thumbnailUrl: `https://picsum.photos/id/${photo.id}/200/150`,
        url: `https://picsum.photos/id/${photo.id}/600/600`,
    }));

    return {
        photos: photosWithRealImages,
        nextPage: data.length > 0 ? pageParam + 1 : undefined,
        totalPhotos: 5000, // JSONPlaceholderの全写真数
    };
};

function PhotoGallery() {
    // TODO: useInfiniteQueryでページネーションを実装してください
    // - queryKey: ["photos"] を使用
    // - queryFn: ({ pageParam }) => fetchPhotos({ pageParam: pageParam as number }) を使用
    // - getNextPageParam: (lastPage) => lastPage.nextPage を使用（次のページがあるかどうかを判定）
    // - initialPageParam: 1 を設定（最初のページ番号）
    // - staleTime: 5分間（1000 * 60 * 5）を設定
    // - 以下のプロパティを取得してください:
    //   - data: 全ページのデータ
    //   - fetchNextPage: 次のページを取得する関数
    //   - hasNextPage: 次のページがあるかどうか
    //   - isFetchingNextPage: 次のページを取得中かどうか
    //   - isLoading: 初回読み込み中かどうか
    //   - isError: エラーが発生したかどうか
    //   - error: エラーオブジェクト
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery<PhotoPage, Error>({});

    const allPhotos = data?.pages.flatMap((page) => page.photos) || [];

    // 読み込まれた写真の合計数
    const totalLoadedPhotos = allPhotos.length;


    if (isLoading) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h2>フォトギャラリー</h2>
                <p>読み込み中...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h2>フォトギャラリー</h2>
                <p style={{ color: "red" }}>
                    エラー: {error?.message || "エラーが発生しました"}
                </p>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "20px" }}>
                <h2>フォトギャラリー</h2>
                <p style={{ color: "#666" }}>
                    読み込み済み: {totalLoadedPhotos}枚 / 全
                    {data?.pages[0]?.totalPhotos}枚
                </p>
            </div>

            {/* 写真グリッド */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "15px",
                    marginBottom: "30px",
                }}
            >
                {allPhotos.map((photo) => (
                    <div
                        key={photo.id}
                        style={{
                            backgroundColor: "#f5f5f5",
                            borderRadius: "8px",
                            overflow: "hidden",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                    >
                        <img
                            src={photo.thumbnailUrl}
                            alt={photo.title}
                            style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                            }}
                        />
                        <div style={{ padding: "10px" }}>
                            <p
                                style={{
                                    margin: "0",
                                    fontSize: "14px",
                                    color: "#333",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                                title={photo.title}
                            >
                                {photo.title}
                            </p>
                            <p
                                style={{
                                    margin: "5px 0 0 0",
                                    fontSize: "12px",
                                    color: "#999",
                                }}
                            >
                                ID: {photo.id}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ローディングとボタン */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                {isFetchingNextPage && (
                    <p style={{ color: "#666" }}>さらに読み込み中...</p>
                )}

                {!isFetchingNextPage && hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        style={{
                            padding: "10px 30px",
                            fontSize: "16px",
                            backgroundColor: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        もっと見る
                    </button>
                )}

                {!hasNextPage && (
                    <p style={{ color: "#999" }}>全ての写真を読み込みました</p>
                )}
            </div>
        </div>
    );
}

// QueryClientの設定
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function Question99() {
    return (
        <QueryClientProvider client={queryClient}>
            <PhotoGallery />
        </QueryClientProvider>
    );
}

export default Question99;
```

---

### 問題 100: 総合演習 - Redux Toolkit と TanStack Query の併用

**難易度**: ⭐⭐⭐⭐⭐  
**想定時間**: 45 分  
**学習ポイント**: 状態管理の使い分け、グローバル UI 状態、サーバー状態、最適なアーキテクチャ

#### 課題

- Redux Toolkit でグローバルなアプリケーション状態を管理
- TanStack Query でサーバーデータを管理
- 両ライブラリの適切な使い分けを理解
- 実践的なダッシュボードアプリを構築

#### 評価基準

- [ ] Redux Toolkit と TanStack Query が適切に併用されている
- [ ] UI 状態とサーバー状態が適切に分離されている
- [ ] 両ライブラリの特性を活かしている
- [ ] パフォーマンスが最適化されている
- [ ] 実用的なアプリケーションとして完成している

#### スターターコード

```jsx
// store/uiSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";
type View = "dashboard" | "users" | "posts";

type Notification = {
  id: number,
  type: "info" | "error",
  message: string,
};

type UiState = {
  theme: Theme,
  sidebarOpen: boolean,
  selectedView: View,
  notifications: Notification[],
};

type NewNotification = {
  type: "info" | "error",
  message: string,
};

const initialState: UiState = {
  theme: "light",
  sidebarOpen: true,
  selectedView: "dashboard",
  notifications: [],
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setView: (state, action: PayloadAction<View>) => {
      state.selectedView = action.payload;
    },
    addNotification: (state, action: PayloadAction<NewNotification>) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const {
  toggleTheme,
  toggleSidebar,
  setView,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;

// api/dashboardApi.ts
export type DashboardStats = {
  totalUsers: number,
  totalPosts: number,
  avgPostsPerUser: string,
};

export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  company: {
    name: string,
  },
};

export type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
};

const ensureOk = (response: Response) => {
  if (!response.ok) {
    throw new Error("データの取得に失敗しました");
  }
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const [usersResponse, postsResponse] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts"),
  ]);

  ensureOk(usersResponse);
  ensureOk(postsResponse);

  const users: User[] = await usersResponse.json();
  const posts: Post[] = await postsResponse.json();

  return {
    totalUsers: users.length,
    totalPosts: posts.length,
    avgPostsPerUser: (posts.length / users.length).toFixed(1),
  };
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  ensureOk(response);
  return response.json();
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  ensureOk(response);
  return response.json();
};

// Dashboard.tsx
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { store } from "../../store";
import type { RootState } from "../../store";

type View = "dashboard" | "users" | "posts";

function Dashboard() {
  const dispatch = useDispatch();
  const { theme, sidebarOpen, selectedView, notifications } = useSelector(
    (state: RootState) => state.ui
  );

  // TanStack Queryでサーバーデータを取得
  const { data: stats, isLoading: isLoadingStats } = useQuery({});

  // ユーザービューの時のみ取得
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: selectedView === "users",
  });

  // 投稿ビューの時のみ取得
  const { data: posts, isLoading: isLoadingPosts } = useQuery({});

  const handleViewChange = (view: View) => {
    dispatch(setView(view));
    dispatch(
      addNotification({
        type: "info",
        message: `${getViewTitle(view)}に切り替えました`,
      })
    );
  };

  const getViewTitle = (view: View) => {
    switch (view) {
      case "dashboard":
        return "ダッシュボード";
      case "users":
        return "ユーザー管理";
      case "posts":
        return "投稿管理";
      default:
        return "";
    }
  };

  // テーマのスタイル
  const themeStyles = {
    light: {
      background: "#ffffff",
      text: "#333333",
      sidebar: "#f5f5f5",
      card: "#ffffff",
      border: "#e0e0e0",
    },
    dark: {
      background: "#1a1a1a",
      text: "#ffffff",
      sidebar: "#2a2a2a",
      card: "#2a2a2a",
      border: "#404040",
    },
  };

  const colors = themeStyles[theme];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: colors.background,
        color: colors.text,
        transition: "all 0.3s",
      }}
    >
      {/* サイドバー */}
      {sidebarOpen && (
        <div
          style={{
            width: "250px",
            backgroundColor: colors.sidebar,
            padding: "20px",
            borderRight: `1px solid ${colors.border}`,
            transition: "all 0.3s",
          }}
        >
          <h2 style={{ margin: "0 0 30px 0" }}>管理画面</h2>

          <nav>
            <button
              onClick={() => handleViewChange("dashboard")}
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "10px",
                backgroundColor:
                  selectedView === "dashboard" ? "#2196F3" : "transparent",
                color: selectedView === "dashboard" ? "white" : colors.text,
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "16px",
              }}
            >
              📊 ダッシュボード
            </button>

            <button
              onClick={() => handleViewChange("users")}
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "10px",
                backgroundColor:
                  selectedView === "users" ? "#2196F3" : "transparent",
                color: selectedView === "users" ? "white" : colors.text,
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "16px",
              }}
            >
              👥 ユーザー管理
            </button>

            <button
              onClick={() => handleViewChange("posts")}
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "10px",
                backgroundColor:
                  selectedView === "posts" ? "#2196F3" : "transparent",
                color: selectedView === "posts" ? "white" : colors.text,
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "16px",
              }}
            >
              📝 投稿管理
            </button>
          </nav>
        </div>
      )}

      {/* メインコンテンツ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* ヘッダー */}
        <header
          style={{
            padding: "20px",
            borderBottom: `1px solid ${colors.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button
              onClick={() => dispatch(toggleSidebar())}
              style={{
                padding: "10px",
                backgroundColor: "transparent",
                color: colors.text,
                border: `1px solid ${colors.border}`,
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ☰
            </button>
            <h1 style={{ margin: 0, fontSize: "24px" }}>
              {getViewTitle(selectedView)}
            </h1>
          </div>

          <button
            onClick={() => dispatch(toggleTheme())}
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              color: colors.text,
              border: `1px solid ${colors.border}`,
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {theme === "light" ? "🌙" : "☀️"} テーマ切替
          </button>
        </header>

        {/* 通知 */}
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          {notifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                padding: "15px",
                marginBottom: "10px",
                backgroundColor:
                  notification.type === "error" ? "#f44336" : "#4CAF50",
                color: "white",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                minWidth: "300px",
              }}
            >
              {notification.message}
              <button
                onClick={() => dispatch(removeNotification(notification.id))}
                style={{
                  float: "right",
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* コンテンツエリア */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
          }}
        >
          {selectedView === "dashboard" && (
            <div>
              <h2>統計情報</h2>
              {isLoadingStats ? (
                <p>読み込み中...</p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      padding: "30px",
                      backgroundColor: colors.card,
                      border: `1px solid ${colors.border}`,
                      borderRadius: "8px",
                    }}
                  >
                    <h3>総ユーザー数</h3>
                    <p
                      style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        margin: "10px 0",
                      }}
                    >
                      {stats?.totalUsers}
                    </p>
                  </div>

                  <div
                    style={{
                      padding: "30px",
                      backgroundColor: colors.card,
                      border: `1px solid ${colors.border}`,
                      borderRadius: "8px",
                    }}
                  >
                    <h3>総投稿数</h3>
                    <p
                      style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        margin: "10px 0",
                      }}
                    >
                      {stats?.totalPosts}
                    </p>
                  </div>

                  <div
                    style={{
                      padding: "30px",
                      backgroundColor: colors.card,
                      border: `1px solid ${colors.border}`,
                      borderRadius: "8px",
                    }}
                  >
                    <h3>平均投稿数/人</h3>
                    <p
                      style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        margin: "10px 0",
                      }}
                    >
                      {stats?.avgPostsPerUser}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedView === "users" && (
            <div>
              <h2>ユーザー一覧</h2>
              {isLoadingUsers ? (
                <p>読み込み中...</p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "15px",
                  }}
                >
                  {users?.map((user) => (
                    <div
                      key={user.id}
                      style={{
                        padding: "20px",
                        backgroundColor: colors.card,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "8px",
                      }}
                    >
                      <h3 style={{ margin: "0 0 10px 0" }}>{user.name}</h3>
                      <p style={{ margin: "5px 0", color: "#666" }}>
                        @{user.username}
                      </p>
                      <p style={{ margin: "5px 0", color: "#666" }}>
                        {user.email}
                      </p>
                      <p style={{ margin: "5px 0", color: "#666" }}>
                        {user.company.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedView === "posts" && (
            <div>
              <h2>投稿一覧</h2>
              {isLoadingPosts ? (
                <p>読み込み中...</p>
              ) : (
                <div>
                  {posts?.slice(0, 20).map((post) => (
                    <div
                      key={post.id}
                      style={{
                        padding: "20px",
                        marginBottom: "15px",
                        backgroundColor: colors.card,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "8px",
                      }}
                    >
                      <h3 style={{ margin: "0 0 10px 0" }}>{post.title}</h3>
                      <p style={{ margin: "0", color: "#666" }}>{post.body}</p>
                      <small style={{ color: "#999" }}>
                        投稿者: ユーザー{post.userId}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 🎉 100 本ノック完走おめでとうございます！

// app/memos/MemoForm.tsx

"use client";
// ↑ フォームはユーザー操作（入力・エラー表示）があるのでクライアントコンポーネント。
//   'use server' とは逆で「ブラウザで動かす」宣言。

import { useActionState } from "react";
// ↑ React 19 / Next.js 14以降の新しいフック。
//   Server Action の「実行中か」「エラーは何か」を管理してくれる。
//   ※ 旧名: useFormState（React 18以前）→ useActionState に改名された

import { createMemo } from "@/app/actions/memoActions";

// Server Action のラッパー（エラーを返す形に変換する）
async function createMemoAction(
  prevState: { error: string } | null, // 前の状態（初回は null）
  formData: FormData, // フォームのデータ
): Promise<{ error: string } | null> {
  try {
    await createMemo(formData);
    return null; // 成功時は null（エラーなし）
  } catch (e) {
    // createMemo 内で throw した Error を受け取る
    return { error: (e as Error).message };
  }
}

export default function MemoForm() {
  const [state, formAction, isPending] = useActionState(createMemoAction, null);
  // ↑ useActionState の戻り値:
  //   state     = 現在の状態（最初は null、エラー時は { error: "..." }）
  //   formAction = form の action に渡す関数
  //   isPending  = 送信中かどうか（true/false）← ボタンの無効化に使う

  return (
    <form action={formAction} className="mb-8 space-y-4">
      {/*
        action={formAction} が重要！
        通常の HTML form は action に URL を入れるが、
        Next.js では Server Action の関数を直接渡せる。
        送信時に自動でサーバーの関数が呼ばれる。
      */}

      {/* エラーメッセージの表示 */}
      {state?.error && (
        <div className="rounded bg-red-100 p-3 text-red-700">{state.error}</div>
      )}
      {/* ↑ state?.error = state が null でなく、error プロパティがある場合だけ表示 */}

      {/* タイトル入力 */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          タイトル
        </label>
        <input
          id="title"
          name="title"
          // ↑ name="title" ← Server Action で formData.get('title') と対応！
          type="text"
          required
          // ↑ HTML の required = ブラウザ側でも空送信を防ぐ（二重チェック）
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="メモのタイトル"
        />
      </div>

      {/* 本文入力 */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          本文
        </label>
        <textarea
          id="content"
          name="content"
          // ↑ name="content" ← Server Action で formData.get('content') と対応！
          required
          rows={4}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="メモの内容"
        />
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={isPending}
        // ↑ isPending = 送信中は true → ボタンを押せなくする（二重送信防止）
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        // ↑ disabled:opacity-50 = 無効時に半透明にして視覚的にわかりやすく
      >
        {isPending ? "送信中..." : "メモを追加"}
        {/* ↑ 送信中は文字を変えてフィードバック */}
      </button>
    </form>
  );
}

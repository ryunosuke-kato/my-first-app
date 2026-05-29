// app/actions/memoActions.ts

"use server";
// ↑ これが重要！「このファイルの関数はサーバーで実行してね」という宣言。
//   ブラウザからは直接呼べず、Next.js が安全にサーバーで動かしてくれる。

import { prisma } from "@/lib/prisma"; // Task 2.1 で作った Prisma クライアント
import { revalidatePath } from "next/cache";
// ↑ Next.js のキャッシュ管理関数。
//   Next.js はページを高速化のためにキャッシュするが、
//   DB を更新した後は「このページのキャッシュを捨てて再取得して」と伝える必要がある。

export async function createMemo(formData: FormData) {
  // FormData = ブラウザのフォームから送られてきたデータの入れ物
  // form の input の name 属性で値を取り出す
  console.log("🔥 Server Action が呼ばれた！"); // ← これを追加
  console.log("title:", formData.get("title"));

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  // ↑ .get('title') で <input name="title"> の値を取得
  //   TypeScript に「これは文字列だよ」と教えるため `as string` をつける
  // 「フォームの name="title" の入力値を文字列として取り出す」

  // --- バリデーション（空文字を弾く）---
  if (!title || title.trim() === "") {
    // trim() = 前後の空白を除去。スペースだけの入力も弾ける
    throw new Error("タイトルは必須です"); // ← これが弾いている
    // Server Action 内で throw すると、クライアント側でエラーとして扱われる
  }

  if (!content || content.trim() === "") {
    throw new Error("本文は必須です");
  }
  // フォームから投稿してメモが追加される
  // --- Prisma で DB に保存 ---
  await prisma.memo.create({
    // ← これがDBに保存している
    data: {
      title: title.trim(), // 前後の空白を除いて保存
      content: content.trim(),
    },
  });
  // ↑ Task 2.1 で作った memo テーブルに INSERT される

  // --- キャッシュを更新してページを再レンダリング ---
  revalidatePath("/memos"); // ← これが自動更新している
  // ↑ '/memos' ページのキャッシュを無効化。
  //   次回アクセス時（または即座に）最新のDBデータを取得し直す。
  //   これがないと投稿後も古い一覧が表示されたまま！
}

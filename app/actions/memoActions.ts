// app/actions/memoActions.ts

"use server";
// ↑ これが重要！「このファイルの関数はサーバーで実行してね」という宣言。
//   ブラウザからは直接呼べず、Next.js が安全にサーバーで動かしてくれる。

import { prisma } from "@/lib/prisma"; // Task 2.1 で作った Prisma クライアント
import { revalidatePath } from "next/cache";
// ↑ Next.js のキャッシュ管理関数。
//   Next.js はページを高速化のためにキャッシュするが、
//   DB を更新した後は「このページのキャッシュを捨てて再取得して」と伝える必要がある。
import { redirect } from "next/navigation";
// ↑ redirect を追加。更新・削除後に一覧へ自動で戻るために使う

export async function createMemo(formData: FormData) {
  // FormData = ブラウザのフォームから送られてきたデータの入れ物
  // form の input の name 属性で値を取り出す
  console.log("🔥 Server Action が呼ばれた！"); // ← これを追加
  console.log("title:", formData.get("title"));
  // const は 変数を宣言するキーワード
  // const title = formData.get("title") as string
  //    ↑
  // フォームから取った値は後から変えないので const
  const title = formData.get("title") as string;
  //  const memos = await prisma.memo.findMany()
  //    ↑
  // DBから取ったデータも後から変えないので const
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
    // ↑ これがDBに保存している
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

// =====================================================
// ✅ 追加: updateMemo（編集）
// =====================================================
export async function updateMemo(id: number, formData: FormData) {
  // ↑ createMemo との違いは第1引数に id がある点
  //   「どのメモを更新するか」を id で指定する
  console.log("✏️ updateMemo が呼ばれた！ id:", id);

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  // ↑ createMemo とまったく同じ方法でフォームの値を取り出す

  // --- バリデーション（createMemo とまったく同じ）---
  if (!title || title.trim() === "") {
    throw new Error("タイトルは必須です");
  }
  if (!content || content.trim() === "") {
    throw new Error("本文は必須です");
  }

  // --- Prisma で DB を更新（create → update に変わる）---
  await prisma.memo.update({
    where: { id },
    // ↑ 「id がこの値のメモを対象にして」という絞り込み条件
    //   create には where がなかったが、update は「どれを？」が必要
    data: {
      title: title.trim(),
      content: content.trim(),
      // ↑ data の書き方は create とまったく同じ
    },
  });

  revalidatePath("/memos");
  redirect("/memos");
  // ↑ 更新後は一覧ページに戻す。
  //   createMemo にはなかったが、編集後は元のページ（/memos/[id]/edit）を
  //   表示し続けても意味がないので redirect で一覧へ飛ばす
  // 編集後、ユーザーは /memos/3/edit にいます。
  // 更新が終わったのにそのページに留まっても意味がないので、一覧に飛ばします。
  // memos/3/edit  ──更新完了──→  /memos（一覧）
}

// =====================================================
// ✅ 追加: deleteMemo（削除）
// =====================================================
export async function deleteMemo(id: number) {
  // ↑ 削除は「どれを消すか」の id だけあれば十分
  //   フォームを使わないので formData は不要
  console.log("🗑️ deleteMemo が呼ばれた！ id:", id);

  await prisma.memo.delete({
    where: { id },
    // ↑ update と同じく where で「どれを？」を指定
    //   delete には data がない（消すだけなので書き換えるものがない）
  });

  revalidatePath("/memos");
  // redirect は不要。
  // DeleteButton（Client Component）から呼ばれるため、
  // Next.js が自動でページを再レンダリングしてくれる
  // 削除ボタンはすでに /memos（一覧ページ）にあります。
  // すでに一覧にいるので、わざわざ一覧に飛ばす必要がありません。
  // revalidatePath でキャッシュを捨てれば、その場で一覧が更新されます。
  // /memos（一覧）  ──削除完了──→  /memos（そのまま再レンダリング）
}

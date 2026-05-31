// app/memos/[id]/edit/page.tsx
// このファイルは /memos/3/edit のような URL にアクセスしたときに表示されるページ

// ============================================================
// 📦 import（使う道具を読み込む）
// ============================================================

import { prisma } from "@/lib/prisma";
// データベースを操作する道具

import { notFound } from "next/navigation";
// notFound() を呼ぶと Next.js の 404 ページを表示してくれる関数
// 「存在しないメモを編集しようとした」場合に使う

import { updateMemo } from "@/app/actions/memoActions";
// 先ほど作った「メモを更新する」Server Action を読み込む

import Link from "next/link";

// ============================================================
// 📐 型定義（TypeScript の説明書き）
// ============================================================

// URLパラメータの型定義
// /memos/3/edit にアクセスすると params.id が "3" になる
type Props = {
  params: Promise<{ id: string }>;
  //           ↑ URLの [id] 部分が文字列で入ってくる
};

// type Props = 「このページが受け取るデータの形」を定義している
// params     = URL のパラメータが入ってくる
// id: string = [id] フォルダの部分が文字列で入ってくる
//
// 例: /memos/3/edit にアクセスすると
//     params = { id: "3" }  ← 数字ではなく文字列の "3" ！
//
// なぜ string？ → URL はすべてテキストなので数値でも文字列として渡ってくる

// ============================================================
// 🏠 ページ本体
// ============================================================

export default async function EditPage({ params }: Props) {
  // { params }: Props = 受け取った props から params だけ取り出す
  //                     `: Props` は「params の型は Props で定義した通り」という意味

  // ----------------------------------------------------------
  // 🔢 文字列の id を数値に変換
  // ----------------------------------------------------------

  // 文字列 "3" を数値 3 に変換
  const { id: idString } = await params; // ← await を追加
  // parseInt() = 文字列を整数に変換する関数
  // "3"  → 3
  // "99" → 99
  // parseInt が必要な理由: Prisma の where: { id } は数値を期待しているから
  // 旧: params.id         → そのまま使える
  // 新: (await params).id → await してから使う

  const id = parseInt(idString);

  // 数値に変換できない場合（/memos/abc/edit など）は404
  if (isNaN(id)) {
    notFound();
  }
  // isNaN() = 「数値に変換できなかったか？」をチェックする関数
  // NaN = Not a Number（数値でない）
  //
  // parseInt("abc") → NaN（変換できない）
  // isNaN(NaN)      → true → notFound() が呼ばれて 404 ページへ
  //
  // parseInt("3")   → 3
  // isNaN(3)        → false → 404 にならず処理が続く

  // ----------------------------------------------------------
  // 🗄️ データベースから該当メモを1件取得
  // ----------------------------------------------------------

  // Prismaで該当するメモを1件取得
  const memo = await prisma.memo.findUnique({
    where: { id },
    //      ↑ findUnique = ID指定で1件だけ取得（Task 2.2のfindManyとの違い）
  });

  // findUnique = ID 指定で1件だけ取得する
  //   findMany  → 全件取得（一覧ページで使った）
  //   findUnique → 1件取得（編集ページで使う）
  //
  // where: { id } は where: { id: id } の省略形
  // 「id カラムが変数 id と一致するレコードを取得して」という意味
  //
  // 見つかった場合 → memo = { id: 3, title: "...", content: "...", ... }
  // 見つからない場合 → memo = null

  // メモが見つからなかったら404ページを表示
  if (!memo) {
    notFound();
  }
  // !memo = memo が null（見つからなかった）のとき true になる
  // 存在しない ID（例: /memos/9999/edit）にアクセスしたら 404 ページへ

  // ----------------------------------------------------------
  // 🔗 bind() で id を Server Action に結びつける
  // ----------------------------------------------------------

  // updateMemo は (id, formData) の2引数だが、
  // Server Action は formData しか受け取れないので bind() で id を束縛する
  const updateMemoWithId = updateMemo.bind(null, memo.id);
  //                                  ↑ memo.id を第1引数として固定する

  // ここが一番わかりにくいポイント！ 順を追って説明します
  //
  // updateMemo の定義:
  //   async function updateMemo(id: number, formData: FormData)
  //   引数が2つ（id と formData）
  //
  // でも form の action に渡せる Server Action は
  //   「formData だけを受け取る関数」でないといけない
  //
  // そこで bind() を使って id をあらかじめ固定する
  //
  // bind(null, memo.id) の意味:
  //   null    = this の値（今回は使わないので null）
  //   memo.id = 第1引数（id）として固定する値
  //
  // イメージ:
  //   updateMemo(id, formData)
  //       ↓ bind(null, 3) で id=3 を固定
  //   updateMemoWithId(formData)  ← formData だけ受け取る関数になる！
  //
  // form が送信されると Next.js が formData を渡してくれる

  // ----------------------------------------------------------
  // 🖼️ 画面に表示する内容（JSX）
  // ----------------------------------------------------------

  return (
    <div className="min-h-screen bg-zinc-900 font-sans">
      <main className="max-w-2xl mx-auto px-8 py-16">
        {/* タイトル部分 */}
        <div className="flex flex-col gap-4 mb-12 text-center">
          <p className="text-zinc-500 text-sm tracking-widest uppercase">
            edit note
          </p>
          <h1 className="text-5xl font-bold text-white tracking-tight">
            メモを編集
          </h1>
        </div>

        <div className="w-16 h-px bg-zinc-700 mx-auto mb-12" />

        {/* フォーム */}
        <form action={updateMemoWithId} className="flex flex-col gap-6">
          {/* action={updateMemoWithId} = フォームを送信したときに呼ぶ関数を指定 */}
          {/* HTML の action="/api/..." と違い、直接 Server Action の関数を渡せる */}
          {/* これが Next.js の Server Actions の書き方 */}

          <div className="flex flex-col gap-2">
            <label className="text-zinc-500 text-sm tracking-widest uppercase">
              タイトル
            </label>
            <input
              name="title"
              defaultValue={memo.title}
              // defaultValue = フォームの初期値
              // memo.title   = DB から取得した現在のタイトルを最初から入力欄に表示する
              // value= ではなく defaultValue= を使う理由:
              //   value=     → React が値を管理（useState が必要）
              //   defaultValue= → 最初の値だけ設定、あとはブラウザが管理（シンプル）
              required
              // required = 空のまま送信しようとするとブラウザが警告を出す
              className="bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-zinc-500 transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-zinc-500 text-sm tracking-widest uppercase">
              内容
            </label>
            <textarea
              name="content"
              defaultValue={memo.content}
              // ↑ DB から取得した現在の内容を初期表示
              required
              rows={6}
              className="bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-zinc-500 transition-colors duration-200 resize-none"
            />
          </div>

          <button
            type="submit"
            className="text-zinc-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200 py-3"
          >
            更新する
          </button>
          {/* type="submit" = このボタンを押すとフォームが送信される */}
          {/* 送信 → action={updateMemoWithId} が呼ばれる → DB が更新される */}
        </form>

        <div className="w-16 h-px bg-zinc-700 mx-auto my-8" />

        {/* キャンセル */}
        <div className="text-center">
          <Link
            href="/memos"
            className="text-zinc-500 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
          >
            ← キャンセル
            {/* 更新せずに一覧に戻りたいときのリンク */}
          </Link>
        </div>
      </main>
    </div>
  );
}

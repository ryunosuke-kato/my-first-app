// app/memos/page.tsx
// lib/prisma.ts から Prisma クライアントを読み込む
// ============================================================
// 📦 import（使う道具を読み込む）
// ============================================================
import { prisma } from "@/lib/prisma"; //@/ → プロジェクトのルートを指す省略記法
// Prisma = データベースを操作する道具
// @/ = プロジェクトの一番上のフォルダを指す省略記法
// つまり「プロジェクトルート/lib/prisma.ts を読み込んで」という意味
import MemoForm from "./MemoForm"; //./MemoForm → 同じフォルダ（app/memos/）にある MemoForm.tsx を読み込む
// ./ = 今いるフォルダ（app/memos/）を指す
// つまり「同じフォルダにある MemoForm.tsx を読み込んで」という意味
import Link from "next/link";
// Link = ページ移動のための Next.js の部品
// 普通の <a href="..."> と違い、ページ全体をリロードせず高速に移動できる
import DeleteButton from "@/app/components/DeleteButton";
// 削除ボタンは confirm()（ブラウザの確認ダイアログ）が必要なので
// Client Component として別ファイルに切り出してある

// ============================================================
// 🏠 ページ本体
// ============================================================

// export default       このファイルのメインの部品として外部に公開する
// async                非同期処理（DBアクセスなど待つ処理）を使う
// async          = 「データベースへのアクセスなど、時間がかかる処理を使います」という宣言
//                  async をつけると中で await が使えるようになる
// function MemosPage() MemosPage という名前の関数
export default async function MemosPage() {
  // DBから全メモを取得（新しい順）
  // prisma.ｍemo                テーブルを操作する
  // findMany()                     全件取得する
  // orderBy: { createdAt: "desc" } 作成日時の新しい順に並べる
  // await                          データが取得できるまで待つ
  // const memos                    取得したデータを memos に入れる

  // ----------------------------------------------------------
  // 🗄️ データベースからメモを全件取得
  // ----------------------------------------------------------

  const memos = await prisma.memo.findMany({
    orderBy: { createdAt: "desc" },
  });
  // prisma        = データベース操作の道具
  // .memo         = memo テーブルを操作する
  // .findMany()   = 全件取得する（find = 探す、Many = たくさん）
  // orderBy       = 並び順の指定
  // createdAt     = 作成日時のカラム
  // "desc"        = 降順（新しいものが上に来る。"asc" にすると古い順）
  // await         = データが取れるまでここで待つ
  // const memos   = 取得したデータを memos という変数に入れる
  //                 memos は配列 → [{ id:1, title:"..." }, { id:2, title:"..." },

  // ----------------------------------------------------------
  // 🖼️ 画面に表示する内容（JSX）
  // ----------------------------------------------------------

  // max-w-2xl → 最大幅を設定（広がりすぎない）
  // mx-auto → 左右中央寄せ
  // p-8 → 内側の余白
  // メモの繰り返し表示{memos.map((memo) => (<li key={memo.id}>
  // map() は配列の各要素を変換します
  // key={memo.id} はReactが「どの要素が変わったか」を識別するために必要
  // （メモが0件）→「メモがありません」を表示
  // それ以外 → メモ一覧を表示
  // 三項演算子（? :）を使っています：条件 ? 真のとき : 偽のとき
  // toLocaleString("ja-JP") は日時を日本語形式に変換
  // <MemoForm /> h1（タイトル）の下、メモ一覧の上にフォームを表示する
  return (
    <div className="min-h-screen bg-zinc-900 font-sans">
      <main className="max-w-2xl mx-auto px-8 py-16">
        {/* タイトル部分 */}
        <div className="flex flex-col gap-4 mb-12 text-center">
          <p className="text-zinc-500 text-sm tracking-widest uppercase">
            my notes
          </p>
          <h1 className="text-5xl font-bold text-white tracking-tight">
            メモ一覧
          </h1>
        </div>

        <div className="w-16 h-px bg-zinc-700 mx-auto mb-12" />

        {/* 追加フォーム */}
        <MemoForm />
        {/* 新規メモ追加フォームをここに表示 */}
        {/* h1 の下、メモ一覧の上に配置している */}
        <div className="w-16 h-px bg-zinc-700 mx-auto my-12" />

        {/* -------------------------------------------------------- */}
        {/* 📋 メモ一覧の表示（三項演算子で場合分け） */}
        {/* -------------------------------------------------------- */}

        {memos.length === 0 ? (
          // memos.length = メモの件数
          // === 0        = 0件のとき
          <p className="text-zinc-500 text-center tracking-widest">
            メモがありません
          </p>
        ) : (
          // ? の後 = 条件が true（0件）のときに表示するもの

          // : の後 = 条件が false（1件以上）のときに表示するもの
          <ul className="flex flex-col gap-4">
            {/* space-y-4 = リストの各項目の間に 16px の余白 */}
            {memos.map((memo) => (
              // map() = 配列の全要素に同じ処理をして新しい配列を作る
              // memos  = [メモA, メモB, メモC]
              // map()  = それぞれの memo に対して <li>...</li> を作る
              // 結果   = [<li>メモA</li>, <li>メモB</li>, <li>メモC</li>]
              <li
                key={memo.id}
                className="border border-zinc-700 rounded-lg p-6 hover:border-zinc-500 transition-colors duration-200"
              >
                {/* key={memo.id} = React が「どの要素が変わったか」を識別するための目印 */}
                {/*                 必ずリストの各要素に一意な値をつける必要がある */}
                {/* border        = 枠線をつける */}
                {/* rounded-lg    = 角を丸くする */}
                {/* p-4           = 内側の余白を 16px */}
                {/* shadow-sm     = 薄い影をつける */}
                <h2 className="text-white font-bold text-lg">{memo.title}</h2>
                {/* {memo.title} = データベースから取得したタイトルを表示 */}
                {/* { } の中は JavaScript の変数や式を書ける */}
                <p className="text-zinc-400 mt-2">{memo.content}</p>
                {/* memo.content = データベースから取得した本文を表示 */}
                <p className="text-zinc-600 text-sm mt-3">
                  {memo.createdAt.toLocaleString("ja-JP")}
                  {/* memo.createdAt        = 作成日時（Date型） */}
                  {/* .toLocaleString("ja-JP") = 日本語形式に変換 */}
                  {/*   例: 2025/1/15 14:30:00 */}
                </p>

                {/* ------------------------------------------------ */}
                {/* 🔘 編集・削除ボタン */}
                {/* ------------------------------------------------ */}

                <div className="flex gap-3 mt-4">
                  {/* flex  = 中の要素を横並びにする */}
                  {/* gap-2 = 要素間の隙間を 8px にする */}
                  {/* mt-3  = 上の余白を 12px */}
                  {/* 編集: Link で別ページに飛ぶだけ → Server Component のまま OK */}
                  <Link href={`/memos/${memo.id}/edit`}>
                    {/* Link        = ページ移動の部品 */}
                    {/* href        = 移動先のURL */}
                    {/* `/memos/${memo.id}/edit` = テンプレートリテラル */}
                    {/*   memo.id が 3 なら → /memos/3/edit */}
                    {/*   memo.id が 99 なら → /memos/99/edit */}
                    {/* バッククォート(`)で囲み ${} の中に変数を入れると文字列に埋め込める */}
                    {/* ↑ memo.id が 3 なら /memos/3/edit になる */}
                    <button className="text-zinc-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200">
                      編集
                    </button>
                  </Link>
                  <span className="text-zinc-700">|</span>
                  <DeleteButton memoId={memo.id} />
                  {/* ↑ 削除確認ダイアログは Client Component なので別ファイルに切り出している */}
                  {/* 削除: confirm() ダイアログが必要 → Client Component が必要 */}
                  {/* DeleteButton  = 別ファイルで作った削除ボタン部品 */}
                  {/* memoId={memo.id} = 「どのメモを削除するか」を DeleteButton に伝える */}
                  {/* DeleteButton の中で confirm() を使うため Client Component にしてある */}
                </div>
              </li>
            ))}
          </ul>
        )}
        {/* HOMEに戻るリンク */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="text-zinc-500 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}

// app/memos/page.tsx
// lib/prisma.ts から Prisma クライアントを読み込む
import { prisma } from "@/lib/prisma"; //@/ → プロジェクトのルートを指す省略記法
// export default       このファイルのメインの部品として外部に公開する
// async                非同期処理（DBアクセスなど待つ処理）を使う
// function MemosPage() MemosPage という名前の関数
export default async function MemosPage() {
  // DBから全メモを取得（新しい順）
  // prisma.memoMemo                テーブルを操作する
  // findMany()                     全件取得する
  // orderBy: { createdAt: "desc" } 作成日時の新しい順に並べる
  // await                          データが取得できるまで待つ
  // const memos                    取得したデータを memos に入れる
  const memos = await prisma.memo.findMany({
    orderBy: { createdAt: "desc" },
  });
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
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">メモ一覧</h1>
      {memos.length === 0 ? (
        <p className="text-gray-500">メモがありません</p>
      ) : (
        <ul className="space-y-4">
          {memos.map((memo) => (
            <li key={memo.id} className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold">{memo.title}</h2>
              <p className="text-gray-600 mt-1">{memo.content}</p>
              <p className="text-sm text-gray-400 mt-2">
                {memo.createdAt.toLocaleString("ja-JP")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

import Link from "next/link";
//「next/link というパッケージから Link を借りてくる」 という宣言
export default function Home() {
  //「このファイルのメインのページをここに書きます」という宣言。
  return (
    // 1行なら () 不要 return <div>Hello</div>
    // 複数行なら () で囲むreturn (<div> <p>Hello</p></div>)
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center font-sans">
      {/*min-h-screen 最低でも画面の高さいっぱいに広げる
         bg-zinc-900 背景色を濃いダークグレーにする
         flex 子要素を並べるレイアウトモードにする
         items-center 縦方向を中央揃え
         justify-center 横方向を中央揃え
         font-sans フォントをサンセリフ体にする*/}
      <main className="flex flex-col items-center text-center gap-12">
        {/*flex 子要素を並べるレイアウトモードにする
           flex-col 子要素を縦並びにする
           items-center 横方向を中央揃え
           text-center テキストを中央揃え
           gap-12 子要素どうしの間隔を開ける（48px）*/}
        {/* 名前・タイトル */}
        <div className="flex flex-col gap-4">
          <p className="text-zinc-500 text-sm tracking-widest uppercase">
            {/* tracking とは 文字と文字の**間隔（字間）**を調整するTailwindのクラス */}
            {/* uppercase とは 文字をすべて大文字に変換するクラス
                "私について"  → そのまま（日本語は変わらない）
                "portfolio"  → "PORTFOLIO"
                "about"      → "ABOUT" */}
            ここは私のサーバーです。
          </p>
          <h1 className="text-5xl font-bold text-white tracking-tight">K R</h1>
          <p className="text-zinc-400 text-lg">Developer</p>
        </div>

        {/* 3つが組み合わさって細い区切り線 w-16横幅 64pxh-px高さ 1px */}
        <div className="w-16 h-px bg-zinc-700" />

        {/* ナビゲーション */}
        <nav className="flex flex-col items-center gap-4">
          <Link
            href="/about"
            // importを書かないと…エラー！Linkが何かわからない
            className="text-zinc-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
          >
            私について
          </Link>
          <Link
            href="/contact"
            className="text-zinc-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
          >
            連絡先
          </Link>
          <Link
            href="/counter"
            className="text-zinc-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
          >
            クリックカウンター
          </Link>
          {/* ✅ 追加 */}
          <Link
            href="/memos"
            className="text-zinc-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
          >
            メモ
          </Link>
        </nav>
      </main>
    </div>
  );
}

import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center font-sans">
      <main className="flex flex-col gap-10 w-full max-w-sm">
        {/* タイトル */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 text-sm tracking-widest uppercase">
            Contact
          </p>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            連絡先
          </h1>
        </div>

        {/* 区切り線 */}
        <div className="w-16 h-px bg-zinc-700" />

        {/* 代表者 */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 text-xs tracking-widest uppercase">
            Representative
          </p>
          <p className="text-white text-lg">K R</p>
        </div>

        {/* 連絡先 */}
        <div className="flex flex-col gap-3">
          <p className="text-zinc-500 text-xs tracking-widest uppercase">
            Links
          </p>

          {/* メール */}
          <a
            href="mailto:ryu@example.com"
            className="text-zinc-300 hover:text-white transition-colors duration-200"
          >
            {/*mailto: をつけるとメールアプリが起動*/}
            ryu@example.com
          </a>

          {/* 電話番号 */}
          <p className="text-zinc-300">090-0000-0000</p>

          {/* X（Twitter） */}
          <a
            href="https://x.com/"
            target="_blank"
            //target="_blank" とは 外部サイトへのリンクは新しいタブで開く
            className="text-zinc-300 hover:text-white transition-colors duration-200"
          >
            X（Twitter）
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/"
            target="_blank"
            //target="_blank" とは 外部サイトへのリンクは新しいタブで開く
            className="text-zinc-300 hover:text-white transition-colors duration-200"
          >
            github
          </a>
        </div>

        {/* 区切り線 */}
        <div className="w-16 h-px bg-zinc-700" />

        {/* ナビゲーション */}
        <nav className="flex flex-col gap-3">
          <Link
            href="/about"
            className="text-zinc-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
          >
            私について
          </Link>
          <Link
            href="/"
            className="text-zinc-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
          >
            Home
          </Link>
        </nav>
      </main>
    </div>
  );
}

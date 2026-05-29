import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center font-sans">
      {/*justify-centerと一緒に使うクラスで、横方向を中央揃えにします。
         justify-start（デフォルト）
         justify-center 
         justify-end 
         ただし flex-col（縦並び）のときは縦方向が対象*/}
      <main className="flex flex-col gap-10 w-full max-w-sm">
        {/* タイトル */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 text-sm tracking-widest uppercase">
            About
          </p>
          <h1 className="text-4xl font-bold text-white tracking-tight">K R</h1>
          <p className="text-zinc-500 text-sm">ryu</p>
        </div>

        {/* 区切り線 */}
        <div className="w-16 h-px bg-zinc-700" />

        {/* 自己紹介 */}
        <div className="flex flex-col gap-3">
          <p className="text-zinc-500 text-xs tracking-widest uppercase">
            Profile
          </p>
          <p className="text-zinc-300 leading-relaxed">
            駆け出しSEで奮闘している。
            {/*<br /> を入れた場所で改行*/}
            <br />
            資格取得からAWS、AI活用からアプリ制作まで幅広く学習中。
          </p>
        </div>

        {/* 年齢 */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 text-xs tracking-widest uppercase">Age</p>
          <p className="text-white text-lg">21</p>
        </div>

        {/* 区切り線 */}
        <div className="w-16 h-px bg-zinc-700" />

        {/* ナビゲーション */}
        <nav className="flex flex-col gap-3">
          <Link
            href="/"
            className="text-zinc-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="text-zinc-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
          >
            Contact
          </Link>
        </nav>
      </main>
    </div>
  );
}

import Link from "next/link";

export default function About() {
  return (
    <main>
      <h1>Kato Ryunosuke</h1>
      <p>ニックネーム：ryu</p>

      <h2>自己紹介</h2>
      <p>
        駆け出しSEで奮闘している。資格取得からAWS、AI活用からアプリ制作まで幅広く学習中。
      </p>
      <p>年齢：26</p>

      <Link href="/">HOME/</Link>
      <Link href="/contact">連絡先はこちら</Link>
    </main>
  );
}

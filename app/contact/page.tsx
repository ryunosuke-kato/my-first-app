import Link from "next/link";

export default function Contact() {
  return (
    <main>
      <h1>Contact</h1>

      <h2>代表者</h2>
      <p>氏名：Kato Ryunosuke</p>

      <h2>連絡先</h2>
      <p>メール：ryu@example.com</p>
      <p>電話番号：090-0000-0000</p>
      <p>X（Twitter）：@ryu</p>
      <p>GitHub：github.com/</p>

      <Link href="/about">私について/</Link>
      <Link href="/">HOME</Link>
    </main>
  );
}

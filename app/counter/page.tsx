"use client";
//{/* */} はJSXの中でしか使えない
//Next.js に対する宣言。ボタンのクリックなどユーザー操作が必要な場合
import { useState } from "react";
//Reactから useStateという機能を借りてくる宣言。状態が変更されるとReactが自動的に再描画
//Counterというコンポーネントを作って外に公開
export default function Counter() {
  {
    /*count     → 現在の数値（最初は 0）
    setCount    → countを更新するための関数
    useState(0) → 初期値を0に設定*/
  }
  {
    /*0 以外にも何でも渡せる
　　　jsuseState(0)      数値
　　　useState("")       文字列
　　　useState(false)    真偽値
　　　useState([])       配列
　　　useState({})       オブジェクト*/
  }
  const [count, setCount] = useState(0);
  {
    /*useState は 配列を返す。1つ目count現在の値を読むためのもの。2つ目setCount値を更新するための関数*/
  }
  {
    /*return ( <main>...</main> )
     画面に表示するHTMLの構造。JSXという書き方で、JavaScriptの中にHTMLのような構文が書ける*/
  }
  {
    /* ↓Tailwind CSS。JSXでは className=。スペース区切りで複数のスタイルを指定。flex-col → 縦並びに変更*/
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      {/*text-3xl文字を大きくする（30px相当）font-bold 文字を太くする*/}
      <h1 className="text-3xl font-bold">クリックカウンター</h1>

      {/*任意のpxサイズを直接指定*/}
      <p style={{ fontSize: "200px" }} className="font-bold">
        {count}
      </p>
      {/*JSX（React）では class がJavaScriptの予約語と被るため、className と書く*/}
      {/*flex 子要素を横並びにする。gap-4 子要素どうしの間隔を開ける*/}
      <div className="flex gap-5">
        {/*ボタンをクリックしたときの動作。count + 1 した値を setCount でセット。→ 画面の数字が +1 される。*/}
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-xl text-xl hover:bg-blue-600"
          onClick={() => setCount(count + 1)}
        >
          {/*rounded-xl角を丸くするtext-xl文字を大きくする*/}
          {/*px-6左右の内側余白（24px）py-3上下の内側余白（12px）*/}
          {/*hover:bg-blue-600マウスを乗せたとき、背景色を少し濃い青にする.
          hover: は条件のプレフィックス「マウスが乗っているとき だけ このスタイルを適用する」*/}
          +1
        </button>
        {/*こちらは 0 をセットしているのでリセット。*/}
        <button
          className="bg-red-400 text-white px-6 py-3 rounded-xl text-xl hover:bg-red-500"
          onClick={() => setCount(0)}
        >
          リセット
        </button>
      </div>
    </main>
  );
}

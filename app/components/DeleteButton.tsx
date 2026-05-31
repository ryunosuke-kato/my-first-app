"use client";
//  ↑ これが重要！confirm() はブラウザの機能なので Client Component が必要

import { deleteMemo } from "@/app/actions/memoActions";

// このコンポーネントはメモのIDを受け取る
type Props = {
  memoId: number;
};

export default function DeleteButton({ memoId }: Props) {
  // ボタンクリック時の処理
  const handleDelete = async () => {
    // 確認ダイアログを表示
    const confirmed = window.confirm("このメモを削除しますか？");
    //                                ↑ ブラウザ標準の確認ダイアログ

    if (!confirmed) return; // 「キャンセル」を押したら何もしない

    // Server Action を呼び出して削除
    await deleteMemo(memoId);
  };

  return (
    <button
      onClick={handleDelete}
      className="text-zinc-400 hover:text-red-400 text-sm tracking-widest uppercase transition-colors duration-200"
    >
      削除
    </button>
  );
}

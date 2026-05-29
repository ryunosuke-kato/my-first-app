// lib/prisma.ts
//「Prisma クライアントをアプリ全体で1つだけ使い回すための設定」
// pnpm prisma generate で自動生成されたコードから PrismaClient を読み込む
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
// globalThis                        アプリ全体でどこからでもアクセスできる入れ物
// as unknown as {...}               TypeScriptに型を教えている
// prisma: PrismaClient | undefined  prismaはPrismaClientか未定義のどちらかと宣言
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaBetterSqlite3({
  url: "file:./prisma/dev.db",
});

// ?? はnull合体演算子
// globalForPrisma.prisma が存在する → それを使う（使い回す）
// 存在しない（undefined）        → new PrismaClient() で新しく作る
// 開発中はファイル保存のたびにサーバーが再起動
// → そのたびに new PrismaClient() すると接続が増えすぎる
// → エラーになる
// 開発環境だけ globalThis に保存
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// NODE_ENV !== "production"本番環境以外（＝開発環境）のとき
// 本番環境 → サーバーが再起動しないので globalThis に保存不要
// 開発環境 → 再起動するたびに新しく作られてしまうので保存が必要
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// 初回アクセス時
// → globalForPrisma.prisma が undefined
// → new PrismaClient() で新しく作る
// → globalThis に保存する

// 2回目以降
// → globalForPrisma.prisma が存在する
// → 使い回す（新しく作らない）

// 初回起動時 → prisma はまだ作られていない → undefined
// 2回目以降 → prisma はすでに作られている → PrismaClient

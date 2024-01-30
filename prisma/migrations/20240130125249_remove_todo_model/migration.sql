-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" INTEGER NOT NULL,
    "priority" TEXT NOT NULL,
    "department" INTEGER NOT NULL,
    "assignee" INTEGER NOT NULL
);

/*
  Warnings:

  - You are about to drop the column `pedidoId` on the `pedidos` table. All the data in the column will be lost.
  - Added the required column `usuarioId` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pedidos" DROP CONSTRAINT "pedidos_pedidoId_fkey";

-- AlterTable
ALTER TABLE "pedidos" DROP COLUMN "pedidoId",
ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to alter the column `quantidade` on the `itens_pedido` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,0)` to `DoublePrecision`.
  - You are about to alter the column `precoVenda` on the `itens_pedido` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `DoublePrecision`.
  - You are about to alter the column `valorTotal` on the `pedidos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `DoublePrecision`.
  - You are about to alter the column `valor` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `DoublePrecision`.
  - You are about to alter the column `quantidadeDisponivel` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,0)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "itens_pedido" ALTER COLUMN "quantidade" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "precoVenda" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "pedidos" ALTER COLUMN "valorTotal" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "produtos" ALTER COLUMN "valor" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "quantidadeDisponivel" SET DATA TYPE DOUBLE PRECISION;

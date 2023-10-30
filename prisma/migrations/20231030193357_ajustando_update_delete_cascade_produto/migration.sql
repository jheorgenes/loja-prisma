-- DropForeignKey
ALTER TABLE "produto_caracteristicas" DROP CONSTRAINT "produto_caracteristicas_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "produto_imagens" DROP CONSTRAINT "produto_imagens_produtoId_fkey";

-- AddForeignKey
ALTER TABLE "produto_caracteristicas" ADD CONSTRAINT "produto_caracteristicas_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_imagens" ADD CONSTRAINT "produto_imagens_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

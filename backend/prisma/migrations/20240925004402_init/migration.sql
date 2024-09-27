-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

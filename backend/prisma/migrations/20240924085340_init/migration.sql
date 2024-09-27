-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "order_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "part_options" (
    "id" SERIAL NOT NULL,
    "part_id" INTEGER NOT NULL,
    "option_name" TEXT NOT NULL,
    "is_available" BOOLEAN DEFAULT true,
    "price" DECIMAL(10,2),

    CONSTRAINT "part_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_conditions" (
    "id" SERIAL NOT NULL,
    "rule_id" INTEGER NOT NULL,
    "part_option_id" INTEGER NOT NULL,

    CONSTRAINT "conditional_pricing_conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_rules" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "additional_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "conditional_pricing_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_customizations" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "part_option_id" INTEGER NOT NULL,

    CONSTRAINT "product_customizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "type" TEXT NOT NULL,
    "stock_quantity" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restriction_conditions" (
    "id" SERIAL NOT NULL,
    "rule_id" INTEGER NOT NULL,
    "part_option_id" INTEGER NOT NULL,

    CONSTRAINT "prohibited_combinations_conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restriction_rules" (
    "id" SERIAL NOT NULL,
    "description" TEXT,

    CONSTRAINT "restriction_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_type_key" ON "products"("type");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "part_options" ADD CONSTRAINT "part_options_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pricing_conditions" ADD CONSTRAINT "conditional_pricing_conditions_part_option_id_fkey" FOREIGN KEY ("part_option_id") REFERENCES "part_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pricing_conditions" ADD CONSTRAINT "conditional_pricing_conditions_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "pricing_rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_customizations" ADD CONSTRAINT "product_customizations_part_option_id_fkey" FOREIGN KEY ("part_option_id") REFERENCES "part_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_customizations" ADD CONSTRAINT "product_customizations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restriction_conditions" ADD CONSTRAINT "prohibited_combinations_conditions_part_option_id_fkey" FOREIGN KEY ("part_option_id") REFERENCES "part_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restriction_conditions" ADD CONSTRAINT "prohibited_combinations_conditions_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "restriction_rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

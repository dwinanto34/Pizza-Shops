
CREATE TABLE IF NOT EXISTS products (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	name TEXT,
	price NUMERIC(10,2)
);

-- DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS ingredient (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	name TEXT NOT NULL,
	average_price_per_unit NUMERIC(10,2) NOT NULL,
	quantity INTEGER NOT NULL,
	unit TEXT NOT NULL
);

-- DROP TABLE IF EXISTS ingredient;

CREATE TABLE IF NOT EXISTS recipe (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	product_id UUID NOT NULL,
	ingredient_id UUID NOT NULL,
	quantity INTEGER NOT NULL,
	CONSTRAINT fk_products
		FOREIGN KEY (product_id)
		REFERENCES products (id),
	CONSTRAINT fk_ingredient
		FOREIGN KEY (ingredient_id)
		REFERENCES ingredient (id)
);

-- DROP TABLE IF EXISTS recipe;

CREATE TABLE IF NOT EXISTS orders (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	productId UUID NOT NULL,
	order_date TIMESTAMP NOT NULL,
	sold_price NUMERIC(10,2) NOT NULL,
	ingredient_cost NUMERIC(10,2) NOT NULL,
	quantity INTEGER NOT NULL,
	total_sold_price NUMERIC(10,2) NOT NULL,
	total_ingredient_cost NUMERIC(10,2) NOT NULL,
	total_profit NUMERIC(10,2) NOT NULL,
	CONSTRAINT fk_products
		FOREIGN KEY (productId)
		REFERENCES products (id)	
);

-- DROP TABLE IF EXISTS orders;

CREATE TABLE IF NOT EXISTS order_cost_detail (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	orderId UUID NOT NULL,
	ingredient_id UUID NOT NULL,
	indegredient_used INTEGER NOT NULL,
	unit TEXT NOT NULL,
	cost_price NUMERIC(10,2) NOT NULL,
	CONSTRAINT fk_orders
		FOREIGN KEY (orderId)
		REFERENCES orders (id),
	CONSTRAINT fk_ingredient
		FOREIGN KEY (ingredient_id)
		REFERENCES ingredient (id)
);

-- DROP TABLE IF EXISTS order_cost_detail;

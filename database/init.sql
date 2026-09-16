CREATE TABLE IF NOT EXISTS products (

  id SERIAL PRIMARY KEY,

  name VARCHAR(150) NOT NULL,

  description TEXT NOT NULL DEFAULT '',

  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),

  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),

  status VARCHAR(20) NOT NULL DEFAULT 'active'

    CHECK (status IN ('active', 'inactive')),

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);


INSERT INTO products (name, description, price, stock, status)

VALUES

  (

    'Mechanical Keyboard',

    'RGB mechanical keyboard',

    2490.00,

    15,

    'active'

  ),

  (

    'Wireless Mouse',

    'Ergonomic wireless mouse',

    890.00,

    30,

    'active'

  );
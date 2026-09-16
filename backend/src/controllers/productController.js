import pool from "../db/pool.js";


// GET /api/products

export async function getProducts(req, res, next) {

  try {

    const { search, status } = req.validated.query;


    let query = `

      SELECT *

      FROM products

      WHERE name ILIKE $1

    `;


    const values = [`%${search}%`];


    if (status) {

      values.push(status);

      query += ` AND status = $${values.length}`;

    }


    query += " ORDER BY id DESC";


    const result = await pool.query(query, values);


    res.json(result.rows);

  } catch (error) {

    next(error);

  }

}


// GET /api/products/:id

export async function getProductById(req, res, next) {

  try {

    const { id } = req.validated.params;


    const result = await pool.query(

      "SELECT * FROM products WHERE id = $1",

      [id]

    );


    if (result.rowCount === 0) {

      return res.status(404).json({

        message: "Product not found"

      });

    }


    res.json(result.rows[0]);

  } catch (error) {

    next(error);

  }

}


// POST /api/products

export async function createProduct(req, res, next) {

  try {

    const {

      name,

      description,

      price,

      stock,

      status

    } = req.validated.body;


    const result = await pool.query(

      `INSERT INTO products (name, description, price, stock, status)

       VALUES ($1, $2, $3, $4, $5)

       RETURNING *`,

      [name, description, price, stock, status]

    );


    res.status(201).json(result.rows[0]);

  } catch (error) {

    next(error);

  }

}


// PUT /api/products/:id

export async function updateProduct(req, res, next) {

  try {

    const { id } = req.validated.params;


    const {

      name,

      description,

      price,

      stock,

      status

    } = req.validated.body;


    const result = await pool.query(

      `UPDATE products

       SET

         name = $1,

         description = $2,

         price = $3,

         stock = $4,

         status = $5,

         updated_at = CURRENT_TIMESTAMP

       WHERE id = $6

       RETURNING *`,

      [name, description, price, stock, status, id]

    );


    if (result.rowCount === 0) {

      return res.status(404).json({

        message: "Product not found"

      });

    }


    res.json(result.rows[0]);

  } catch (error) {

    next(error);

  }

}


// DELETE /api/products/:id

export async function deleteProduct(req, res, next) {

  try {

    const { id } = req.validated.params;


    const result = await pool.query(

      "DELETE FROM products WHERE id = $1 RETURNING id",

      [id]

    );


    if (result.rowCount === 0) {

      return res.status(404).json({

        message: "Product not found"

      });

    }


    res.status(204).send();

  } catch (error) {

    next(error);

  }

}
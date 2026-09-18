import { useEffect, useState } from "react";


import {

  createProduct,

  deleteProduct,

  getProducts,

  updateProduct

} from "./api/productApi";

import ProductForm from "./components/ProductForm";

import "./App.css";


function App() {

  const [products, setProducts] = useState([]);

// for search and filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");


  const [loading, setLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [editingProduct, setEditingProduct] = useState(null);

  const [error, setError] = useState("");

/*
  async function loadProducts() {

    try {

      setError("");

      const data = await getProducts();

      setProducts(data);

    } catch (requestError) {

      console.error(requestError);

      setError("ไม่สามารถโหลดรายการสินค้าได้");

    } finally {

      setLoading(false);

    }

  }
*/

async function loadProducts(filters = {}) {

  try {

    setError("");

    const data = await getProducts(filters);

    setProducts(data);

  } catch (requestError) {

    console.error(requestError);

    setError("ไม่สามารถโหลดรายการสินค้าได้");

  } finally {

    setLoading(false);

  }

}
/*
  useEffect(() => {

    loadProducts();

  }, []);
*/

useEffect(() => {

  const timeoutId = setTimeout(() => {

    setLoading(true);

    loadProducts({

      search,

      status: statusFilter

    });

  }, 300);


  return () => clearTimeout(timeoutId);

}, [search, statusFilter]);




  async function handleSaveProduct(product) {

    setIsSubmitting(true);


    try {

      if (editingProduct) {

        const updatedProduct = await updateProduct(

          editingProduct.id,

          product

        );


        setProducts((currentProducts) =>

          currentProducts.map((currentProduct) =>

            currentProduct.id === updatedProduct.id

              ? updatedProduct

              : currentProduct

          )

        );


        setEditingProduct(null);

      } else {

        const createdProduct = await createProduct(product);


        setProducts((currentProducts) => [

          createdProduct,

          ...currentProducts

        ]);

      }

      
await loadProducts({

      search,

      status: statusFilter

    });


    } finally {

      setIsSubmitting(false);

    }

  }


  function handleEditProduct(product) {

    setEditingProduct(product);

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }


  function handleCancelEdit() {

    setEditingProduct(null);

  }


  async function handleDeleteProduct(product) {

    const confirmed = window.confirm(

      `ต้องการลบสินค้า "${product.name}" ใช่หรือไม่?`

    );


    if (!confirmed) {

      return;

    }


    setDeletingId(product.id);


    try {

      await deleteProduct(product.id);


      setProducts((currentProducts) =>

        currentProducts.filter(

          (currentProduct) => currentProduct.id !== product.id

        )

      );


      if (editingProduct?.id === product.id) {

        setEditingProduct(null);

      }

    } catch (requestError) {

      console.error(requestError);

      window.alert(

        requestError.response?.data?.message ||

          "ไม่สามารถลบสินค้าได้"

      );

    } finally {

      setDeletingId(null);

    }

  }


  return (

    <main className="app">

      <header className="app__header">

        <div>

          <p className="app__eyebrow">Product Management</p>

          <h1>รายการสินค้า</h1>

        </div>

        <span className="app__count">{products.length} รายการ</span>

      </header>







     <section className="product-filters" aria-label="ค้นหาและกรองสินค้า">

  <label>

    ค้นหาสินค้า

    <input

      type="search"

      value={search}

      onChange={(event) => setSearch(event.target.value)}

      placeholder="ค้นหาจากชื่อสินค้า"

    />

  </label>


  <label>

    สถานะ

    <select

      value={statusFilter}

      onChange={(event) => setStatusFilter(event.target.value)}

    >

      <option value="">ทุกสถานะ</option>

      <option value="active">Active</option>

      <option value="inactive">Inactive</option>

    </select>

  </label>

</section>






      <ProductForm

        onSubmit={handleSaveProduct}

        isSubmitting={isSubmitting}

        editingProduct={editingProduct}

        onCancelEdit={handleCancelEdit}

      />


      <section className="product-list">

        <h2>สินค้าทั้งหมด</h2>


        {loading && <p>กำลังโหลดสินค้า...</p>}


        {error && <p className="error">{error}</p>}


        {!loading && !error && products.length === 0 && (

          <p>ยังไม่มีสินค้าในระบบ</p>

        )}


        {!loading && !error && products.length > 0 && (

          <div className="product-grid">{Array.isArray(products) && products.length > 0 ? (

  products.map((product) => (

    <article className="product-card" key={product.id}>

      <div className="product-card__top">

        <h3>{product.name}</h3>

        <span className={`badge badge--${product.status}`}>

          {product.status}

        </span>

      </div>

      <p className="product-card__description">

        {product.description || "ไม่มีรายละเอียด"}

      </p>

      <div className="product-card__details">

        <span>

          ราคา: ฿{Number(product.price).toLocaleString()}

        </span>

        <span>คงเหลือ: {product.stock}</span>

      </div>

      <div className="product-card__actions">

        <button

          type="button"

          className="button button--secondary"

          onClick={() => handleEditProduct(product)}

          disabled={deletingId === product.id}

        >

          แก้ไข

        </button>

        <button

          type="button"

          className="button button--danger"

          onClick={() => handleDeleteProduct(product)}

          disabled={deletingId === product.id}

        >

          {deletingId === product.id ? "กำลังลบ..." : "ลบ"}

        </button>

      </div>

    </article>

  ))

) : (

  <p>ไม่มีรายการสินค้า หรือกำลังโหลดข้อมูล...</p>

)}

          </div>

        )}

      </section>

    </main>

  );

}


export default App;
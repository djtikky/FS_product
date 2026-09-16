import { useEffect, useState } from "react";


const initialForm = {

  name: "",

  description: "",

  price: "",

  stock: "",

  status: "active"

};


function ProductForm({

  onSubmit,

  isSubmitting,

  editingProduct,

  onCancelEdit

}) {

  const [form, setForm] = useState(initialForm);

  const [error, setError] = useState("");


  useEffect(() => {

    if (editingProduct) {

      setForm({

        name: editingProduct.name,

        description: editingProduct.description || "",

        price: String(editingProduct.price),

        stock: String(editingProduct.stock),

        status: editingProduct.status

      });

      setError("");

      return;

    }


    setForm(initialForm);

    setError("");

  }, [editingProduct]);


  function handleChange(event) {

    const { name, value } = event.target;


    setForm((currentForm) => ({

      ...currentForm,

      [name]: value

    }));

  }


  async function handleSubmit(event) {

    event.preventDefault();

    setError("");


    if (!form.name.trim()) {

      setError("กรุณาระบุชื่อสินค้า");

      return;

    }


    if (form.price === "" || Number(form.price) < 0) {

      setError("กรุณาระบุราคาที่เป็นศูนย์หรือมากกว่า");

      return;

    }


    if (

      form.stock === "" ||

      !Number.isInteger(Number(form.stock)) ||

      Number(form.stock) < 0

    ) {

      setError("กรุณาระบุจำนวนคงเหลือเป็นจำนวนเต็มที่เป็นศูนย์หรือมากกว่า");

      return;

    }


    try {

      await onSubmit({

        name: form.name.trim(),

        description: form.description.trim(),

        price: Number(form.price),

        stock: Number(form.stock),

        status: form.status

      });


      if (!editingProduct) {

        setForm(initialForm);

      }

    } catch (requestError) {

      setError(

        requestError.response?.data?.message ||

          "ไม่สามารถบันทึกสินค้าได้"

      );

    }

  }


  const isEditing = Boolean(editingProduct);


  return (

    <section className="product-form-section">

      <div className="section-heading">

        <h2>{isEditing ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}</h2>


        {isEditing && (

          <button

            type="button"

            className="button button--secondary"

            onClick={onCancelEdit}

            disabled={isSubmitting}

          >

            ยกเลิก

          </button>

        )}

      </div>


      <form className="product-form" onSubmit={handleSubmit}>

        <label>

          ชื่อสินค้า

          <input

            name="name"

            value={form.name}

            onChange={handleChange}

            placeholder="เช่น USB-C Hub"

            maxLength="150"

            disabled={isSubmitting}

          />

        </label>


        <label>

          รายละเอียด

          <textarea

            name="description"

            value={form.description}

            onChange={handleChange}

            placeholder="รายละเอียดสินค้า"

            rows="3"

            maxLength="2000"

            disabled={isSubmitting}

          />

        </label>


        <div className="product-form__row">

          <label>

            ราคา (บาท)

            <input

              name="price"

              type="number"

              min="0"

              step="0.01"

              value={form.price}

              onChange={handleChange}

              placeholder="0"

              disabled={isSubmitting}

            />

          </label>


          <label>

            จำนวนคงเหลือ

            <input

              name="stock"

              type="number"

              min="0"

              step="1"

              value={form.stock}

              onChange={handleChange}

              placeholder="0"

              disabled={isSubmitting}

            />

          </label>


          <label>

            สถานะ

            <select

              name="status"

              value={form.status}

              onChange={handleChange}

              disabled={isSubmitting}

            >

              <option value="active">Active</option>

              <option value="inactive">Inactive</option>

            </select>

          </label>

        </div>


        {error && <p className="form-error">{error}</p>}


        <div className="form-actions">

          <button

            type="submit"

            className="button button--primary"

            disabled={isSubmitting}

          >

            {isSubmitting

              ? "กำลังบันทึก..."

              : isEditing

                ? "บันทึกการแก้ไข"

                : "บันทึกสินค้า"}

          </button>


          {isEditing && (

            <button

              type="button"

              className="button button--secondary"

              onClick={onCancelEdit}

              disabled={isSubmitting}

            >

              ยกเลิก

            </button>

          )}

        </div>

      </form>

    </section>

  );

}


export default ProductForm;
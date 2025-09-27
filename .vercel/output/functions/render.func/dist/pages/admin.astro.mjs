/* empty css                                 */
import { c as createComponent, g as renderComponent, e as renderTemplate } from '../chunks/astro/server_5cKZDbdZ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_B8ZWhLiw.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Plus, Package, Eye, Edit, Trash2, Tag, Save, Lock, User, EyeOff, LogOut, BarChart3, Settings } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
export { renderers } from '../renderers.mjs';

const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  category: z.string().min(1, "La categoría es requerida"),
  price: z.number().min(0, "El precio debe ser mayor a 0"),
  stock: z.number().min(0, "El stock debe ser mayor o igual a 0"),
  image: z.string().optional(),
  images: z.array(z.string()).optional()
});
const ProductForm = ({
  product,
  onSubmit,
  onCancel,
  categories
}) => {
  const [imagePreview, setImagePreview] = useState(product?.image || "");
  const [additionalImages, setAdditionalImages] = useState(product?.images || []);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      category: product?.category || "",
      price: product?.price || 0,
      stock: product?.stock || 0,
      image: product?.image || "",
      images: product?.images || []
    }
  });
  const watchedImage = watch("image");
  React.useEffect(() => {
    if (watchedImage) {
      setImagePreview(watchedImage);
    }
  }, [watchedImage]);
  const handleFileUpload = async (files) => {
    if (files.length === 0) return;
    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const result = await response.json();
      if (response.ok) {
        const newImages = [...additionalImages, ...result.files];
        if (newImages.length > 4) {
          alert("Máximo 4 imágenes permitidas");
          return;
        }
        setAdditionalImages(newImages);
        setValue("images", newImages);
        if (!imagePreview && result.files.length > 0) {
          setImagePreview(result.files[0]);
          setValue("image", result.files[0]);
        }
      } else {
        alert(result.error || "Error al subir imágenes");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error al subir imágenes");
    } finally {
      setUploading(false);
    }
  };
  const removeImage = (index) => {
    const newImages = additionalImages.filter((_, i) => i !== index);
    setAdditionalImages(newImages);
    setValue("images", newImages);
  };
  const setMainImage = (imageUrl) => {
    setImagePreview(imageUrl);
    setValue("image", imageUrl);
  };
  const handleFormSubmit = (data) => {
    const submitData = {
      ...data,
      images: additionalImages
    };
    onSubmit(submitData);
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: product ? "Editar Producto" : "Nuevo Producto" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onCancel,
          className: "text-gray-400 hover:text-gray-600",
          children: /* @__PURE__ */ jsx(X, { size: 24 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(handleFormSubmit), className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Nombre del Producto *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ...register("name"),
              type: "text",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500",
              placeholder: "Ingresa el nombre del producto"
            }
          ),
          errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.name.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Categoría *" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              ...register("category"),
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona una categoría" }),
                categories.map((category) => /* @__PURE__ */ jsx("option", { value: category, children: category }, category))
              ]
            }
          ),
          errors.category && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.category.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Descripción *" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            ...register("description"),
            rows: 4,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500",
            placeholder: "Describe el producto"
          }
        ),
        errors.description && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.description.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Precio *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ...register("price", { valueAsNumber: true }),
              type: "number",
              step: "0.01",
              min: "0",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500",
              placeholder: "0.00"
            }
          ),
          errors.price && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.price.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Stock *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ...register("stock", { valueAsNumber: true }),
              type: "number",
              min: "0",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500",
              placeholder: "0"
            }
          ),
          errors.stock && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.stock.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Imágenes del Producto (máximo 4)" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              multiple: true,
              accept: "image/*",
              onChange: (e) => e.target.files && handleFileUpload(e.target.files),
              className: "hidden"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => fileInputRef.current?.click(),
              disabled: uploading || additionalImages.length >= 4,
              className: "flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
              children: [
                /* @__PURE__ */ jsx(Upload, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: uploading ? "Subiendo..." : "Subir Imágenes" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mt-1", children: [
            additionalImages.length,
            "/4 imágenes. Máximo 5MB por imagen."
          ] })
        ] }),
        imagePreview && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Imagen Principal" }),
          /* @__PURE__ */ jsxs("div", { className: "relative inline-block", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imagePreview,
                alt: "Imagen principal",
                className: "w-32 h-32 object-cover rounded-md border"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setImagePreview("");
                  setValue("image", "");
                },
                className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600",
                children: /* @__PURE__ */ jsx(X, { size: 12 })
              }
            )
          ] })
        ] }),
        additionalImages.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Imágenes Adicionales" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: additionalImages.map((image, index) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: image,
                alt: `Imagen ${index + 1}`,
                className: "w-full h-24 object-cover rounded-md border cursor-pointer hover:opacity-80",
                onClick: () => setMainImage(image)
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => removeImage(index),
                className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600",
                children: /* @__PURE__ */ jsx(X, { size: 12 })
              }
            ),
            image === imagePreview && /* @__PURE__ */ jsx("div", { className: "absolute bottom-1 left-1 bg-primary-600 text-white text-xs px-1 rounded", children: "Principal" })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "O URL de Imagen Externa" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ...register("image"),
              type: "url",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500",
              placeholder: "https://ejemplo.com/imagen.jpg"
            }
          ),
          errors.image && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.image.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-4 pt-6", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onCancel,
            className: "px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            className: "px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center space-x-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { size: 20 }),
              /* @__PURE__ */ jsxs("span", { children: [
                product ? "Actualizar" : "Crear",
                " Producto"
              ] })
            ]
          }
        )
      ] })
    ] })
  ] }) }) });
};

const ProductList = ({
  products,
  onEdit,
  onDelete,
  onView
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const handleDelete = (productId) => {
    if (deleteConfirm === productId) {
      onDelete(productId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(productId);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ jsxs("h3", { className: "text-lg font-medium text-gray-900", children: [
      "Productos (",
      products.length,
      ")"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Producto" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Categoría" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Precio" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Stock" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: products.map((product) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 h-12 w-12 relative", children: [
            product.image ? /* @__PURE__ */ jsx(
              "img",
              {
                className: "h-12 w-12 rounded-lg object-cover",
                src: product.image,
                alt: product.name
              }
            ) : /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center", children: /* @__PURE__ */ jsx(Package, { className: "h-6 w-6 text-gray-400" }) }),
            product.images && product.images.length > 0 && /* @__PURE__ */ jsxs("div", { className: "absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center", children: [
              "+",
              product.images.length
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: product.name }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 truncate max-w-xs", children: product.description })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800", children: product.category }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [
          "$",
          product.price.toFixed(2)
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock > 10 ? "bg-green-100 text-green-800" : product.stock > 0 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`, children: [
          product.stock,
          " unidades"
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onView(product),
              className: "text-primary-600 hover:text-primary-900",
              title: "Ver detalles",
              children: /* @__PURE__ */ jsx(Eye, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onEdit(product),
              className: "text-indigo-600 hover:text-indigo-900",
              title: "Editar",
              children: /* @__PURE__ */ jsx(Edit, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDelete(product.id),
              className: `${deleteConfirm === product.id ? "text-red-600 hover:text-red-900" : "text-red-400 hover:text-red-600"}`,
              title: deleteConfirm === product.id ? "Confirmar eliminación" : "Eliminar",
              children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
            }
          )
        ] }) })
      ] }, product.id)) })
    ] }) }),
    products.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx(Package, { className: "mx-auto h-12 w-12 text-gray-400" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-2 text-sm font-medium text-gray-900", children: "No hay productos" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Comienza agregando tu primer producto." })
    ] })
  ] });
};

const CategoryForm = ({ category, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: ""
  });
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug
      });
    } else {
      setFormData({
        name: "",
        slug: ""
      });
    }
  }, [category]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (name === "name") {
      const slug = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
      setFormData((prev) => ({
        ...prev,
        slug
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.slug.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }
    onSave(formData);
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-md mx-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold text-gray-900 flex items-center", children: [
        /* @__PURE__ */ jsx(Tag, { className: "h-5 w-5 mr-2" }),
        category ? "Editar Categoría" : "Nueva Categoría"
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "text-gray-400 hover:text-gray-600 transition-colors",
          children: /* @__PURE__ */ jsx(X, { size: 24 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre de la categoría" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "name",
            name: "name",
            value: formData.name,
            onChange: handleInputChange,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            placeholder: "Ej: Electrónicos",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "slug", className: "block text-sm font-medium text-gray-700 mb-1", children: "Slug (URL)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "slug",
            name: "slug",
            value: formData.slug,
            onChange: handleInputChange,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            placeholder: "ej: electronicos",
            required: true
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Se genera automáticamente basado en el nombre" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-3 pt-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            className: "flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2",
            children: [
              /* @__PURE__ */ jsx(Save, { size: 16 }),
              /* @__PURE__ */ jsx("span", { children: category ? "Actualizar" : "Crear" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
};

const CategoryList = ({ onEdit, onDelete, onCreate }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Error al cargar categorías");
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      return;
    }
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setCategories(categories.filter((cat) => cat.id !== id));
      } else {
        const error = await response.json();
        alert(`Error al eliminar categoría: ${error.error}`);
      }
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      alert("Error al eliminar la categoría");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-gray-900 flex items-center", children: [
          /* @__PURE__ */ jsx(Tag, { className: "h-5 w-5 mr-2" }),
          "Categorías"
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: onCreate,
            className: "bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center space-x-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { size: 16 }),
              /* @__PURE__ */ jsx("span", { children: "Nueva Categoría" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-600", children: "Cargando categorías..." })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-gray-900 flex items-center", children: [
        /* @__PURE__ */ jsx(Tag, { className: "h-5 w-5 mr-2" }),
        "Categorías (",
        categories.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onCreate,
          className: "bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center space-x-2",
          children: [
            /* @__PURE__ */ jsx(Plus, { size: 16 }),
            /* @__PURE__ */ jsx("span", { children: "Nueva Categoría" })
          ]
        }
      )
    ] }),
    categories.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
      /* @__PURE__ */ jsx(Tag, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No hay categorías" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4", children: "Crea tu primera categoría para organizar tus productos" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onCreate,
          className: "bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors",
          children: "Crear Categoría"
        }
      )
    ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Slug" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: categories.map((category) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: category.name }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: category.slug }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onEdit(category),
              className: "text-primary-600 hover:text-primary-900 transition-colors",
              title: "Editar categoría",
              children: /* @__PURE__ */ jsx(Edit, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDelete(category.id),
              className: "text-red-600 hover:text-red-900 transition-colors",
              title: "Eliminar categoría",
              children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
            }
          )
        ] }) })
      ] }, category.id)) })
    ] }) })
  ] }) });
};

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!username || !password) {
      setError("Por favor, completa todos los campos");
      setLoading(false);
      return;
    }
    try {
      const success = await onLogin(username, password);
      if (!success) {
        setError("Credenciales incorrectas");
      }
    } catch (error2) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100", children: /* @__PURE__ */ jsx(Lock, { className: "h-6 w-6 text-primary-600" }) }),
      /* @__PURE__ */ jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Panel de Administración" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-sm text-gray-600", children: "Ingresa tus credenciales para acceder" })
    ] }),
    /* @__PURE__ */ jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700", children: "Usuario" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1 relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(User, { className: "h-5 w-5 text-gray-400" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "username",
                name: "username",
                type: "text",
                required: true,
                value: username,
                onChange: (e) => setUsername(e.target.value),
                className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500",
                placeholder: "Ingresa tu usuario"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Contraseña" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1 relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(Lock, { className: "h-5 w-5 text-gray-400" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "password",
                name: "password",
                type: showPassword ? "text" : "password",
                required: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
                className: "block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500",
                placeholder: "Ingresa tu contraseña"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "absolute inset-y-0 right-0 pr-3 flex items-center",
                onClick: () => setShowPassword(!showPassword),
                children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-5 w-5 text-gray-400" }) : /* @__PURE__ */ jsx(Eye, { className: "h-5 w-5 text-gray-400" })
              }
            )
          ] })
        ] })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "bg-red-50 border border-red-200 rounded-md p-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed",
          children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }),
            "Iniciando sesión..."
          ] }) : "Iniciar Sesión"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Las credenciales se configuran en las variables de entorno" }) })
    ] })
  ] }) });
};

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadProducts();
      loadCategories();
    } else {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
      loadCategories();
    }
  }, [isAuthenticated]);
  const loadProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };
  const handleCreateProduct = async (productData) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      });
      if (response.ok) {
        await loadProducts();
        setShowProductForm(false);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Error al crear el producto");
    }
  };
  const handleUpdateProduct = async (productData) => {
    if (!editingProduct) return;
    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      });
      if (response.ok) {
        await loadProducts();
        setEditingProduct(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      alert("Error al actualizar el producto");
    }
  };
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE"
      });
      if (response.ok) {
        await loadProducts();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Error al eliminar el producto");
    }
  };
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };
  const handleViewProduct = (product) => {
    setViewingProduct(product);
  };
  const handleCloseForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };
  const handleCloseView = () => {
    setViewingProduct(null);
  };
  const handleCreateCategory = async (categoryData) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(categoryData)
      });
      if (response.ok) {
        await loadCategories();
        setShowCategoryForm(false);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error al crear categoría:", error);
      alert("Error al crear la categoría");
    }
  };
  const handleUpdateCategory = async (categoryData) => {
    if (!editingCategory) return;
    try {
      const response = await fetch(`/api/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(categoryData)
      });
      if (response.ok) {
        await loadCategories();
        setEditingCategory(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      alert("Error al actualizar la categoría");
    }
  };
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };
  const handleCloseCategoryForm = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
  };
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("admin_authenticated", "true");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al autenticar:", error);
      return false;
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
  };
  const stats = {
    totalProducts: products.length,
    totalCategories: categories.length,
    totalStock: products.reduce((sum, product) => sum + product.stock, 0),
    lowStock: products.filter((product) => product.stock < 10).length,
    totalValue: products.reduce((sum, product) => sum + product.price * product.stock, 0)
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600", children: "Cargando panel de administración..." })
    ] }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx(AdminLogin, { onLogin: handleLogin });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white shadow", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Panel de Administración" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Gestiona tu tienda online LC Imports" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        activeTab === "products" ? /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowProductForm(true),
            className: "bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center space-x-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { size: 20 }),
              /* @__PURE__ */ jsx("span", { children: "Nuevo Producto" })
            ]
          }
        ) : /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowCategoryForm(true),
            className: "bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center space-x-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { size: 20 }),
              /* @__PURE__ */ jsx("span", { children: "Nueva Categoría" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleLogout,
            className: "bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center space-x-2",
            children: [
              /* @__PURE__ */ jsx(LogOut, { size: 20 }),
              /* @__PURE__ */ jsx("span", { children: "Cerrar Sesión" })
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ jsxs("nav", { className: "-mb-px flex space-x-8", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("products"),
            className: `py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "products" ? "border-primary-500 text-primary-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,
            children: [
              /* @__PURE__ */ jsx(Package, { className: "h-5 w-5 inline mr-2" }),
              "Productos"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("categories"),
            className: `py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "categories" ? "border-primary-500 text-primary-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,
            children: [
              /* @__PURE__ */ jsx(Tag, { className: "h-5 w-5 inline mr-2" }),
              "Categorías"
            ]
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(Package, { className: "h-6 w-6 text-gray-400" }) }),
          /* @__PURE__ */ jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxs("dl", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500 truncate", children: "Productos" }),
            /* @__PURE__ */ jsx("dd", { className: "text-lg font-medium text-gray-900", children: stats.totalProducts })
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(Tag, { className: "h-6 w-6 text-gray-400" }) }),
          /* @__PURE__ */ jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxs("dl", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500 truncate", children: "Categorías" }),
            /* @__PURE__ */ jsx("dd", { className: "text-lg font-medium text-gray-900", children: stats.totalCategories })
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(BarChart3, { className: "h-6 w-6 text-gray-400" }) }),
          /* @__PURE__ */ jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxs("dl", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500 truncate", children: "Stock Total" }),
            /* @__PURE__ */ jsx("dd", { className: "text-lg font-medium text-gray-900", children: stats.totalStock })
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(Settings, { className: "h-6 w-6 text-gray-400" }) }),
          /* @__PURE__ */ jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxs("dl", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm font-medium text-gray-500 truncate", children: "Valor Total" }),
            /* @__PURE__ */ jsxs("dd", { className: "text-lg font-medium text-gray-900", children: [
              "$",
              stats.totalValue.toFixed(2)
            ] })
          ] }) })
        ] }) }) })
      ] }),
      activeTab === "products" ? /* @__PURE__ */ jsx(
        ProductList,
        {
          products,
          onEdit: handleEditProduct,
          onDelete: handleDeleteProduct,
          onView: handleViewProduct
        }
      ) : /* @__PURE__ */ jsx(
        CategoryList,
        {
          onEdit: handleEditCategory,
          onDelete: () => {
          },
          onCreate: () => setShowCategoryForm(true)
        }
      )
    ] }),
    showProductForm && /* @__PURE__ */ jsx(
      ProductForm,
      {
        product: editingProduct || void 0,
        onSubmit: editingProduct ? handleUpdateProduct : handleCreateProduct,
        onCancel: handleCloseForm,
        categories: categories.map((cat) => cat.name)
      }
    ),
    showCategoryForm && /* @__PURE__ */ jsx(
      CategoryForm,
      {
        category: editingCategory || void 0,
        onSave: editingCategory ? handleUpdateCategory : handleCreateCategory,
        onClose: handleCloseCategoryForm
      }
    ),
    viewingProduct && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-xl max-w-2xl w-full", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: viewingProduct.name }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCloseView,
            className: "text-gray-400 hover:text-gray-600",
            children: "✕"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          viewingProduct.image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: viewingProduct.image,
              alt: viewingProduct.name,
              className: "w-full h-64 object-cover rounded-lg"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Package, { className: "h-16 w-16 text-gray-400" }) }),
          viewingProduct.images && viewingProduct.images.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Imágenes Adicionales" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: viewingProduct.images.map((image, index) => /* @__PURE__ */ jsx(
              "img",
              {
                src: image,
                alt: `Imagen ${index + 1}`,
                className: "w-full h-20 object-cover rounded-md"
              },
              index
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Descripción" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: viewingProduct.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Categoría" }),
            /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800", children: viewingProduct.category })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Precio" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-primary-600", children: [
              "$",
              viewingProduct.price.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Stock" }),
            /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${viewingProduct.stock > 10 ? "bg-green-100 text-green-800" : viewingProduct.stock > 0 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`, children: [
              viewingProduct.stock,
              " unidades"
            ] })
          ] })
        ] })
      ] })
    ] }) }) }),
    false
  ] });
};

const $$Admin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Panel de Administrador - LC Imports" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminPanel", AdminPanel, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/nikom/Dev/ecommerce-lcimports/src/components/Admin/AdminPanel", "client:component-export": "AdminPanel" })} ` })}`;
}, "C:/Users/nikom/Dev/ecommerce-lcimports/src/pages/admin.astro", void 0);

const $$file = "C:/Users/nikom/Dev/ecommerce-lcimports/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

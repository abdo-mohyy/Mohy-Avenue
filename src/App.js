import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/website/home-page/HomePage.js";
import Register from "./pages/auth/AuthOperations/Register";
import Login from "./pages/auth/AuthOperations/Login.js";
import GoogleCallBack from "./pages/auth/AuthOperations/GoogleCallBack";
import RequireAuth from "./pages/auth/Protecting/RequireAuth";
import RequireBack from "./pages/auth/Protecting/RequireBack";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/dashboard/Users/Users.js";
import UpdateUser from "./pages/dashboard/Users/UpdateUser";
import AddUser from "./pages/dashboard/Users/AddUser.js";
import Categories from "./pages/dashboard/Categories/Categories.js";
import AddCategory from "./pages/dashboard/Categories/AddCategory.js";
import UpdateCategory from "./pages/dashboard/Categories/UpdateCategory.js";
import Products from "./pages/dashboard/Products/Products.js";
import AddProduct from "./pages/dashboard/Products/AddProduct.js";
import UpdateProduct from "./pages/dashboard/Products/UpdateProduct.js";
import Error404 from "./pages/auth/Errors/404";
import Website from "./pages/website/Website.js";
import SingleProduct from "./pages/website/single-product/SingleProduct.js";
import AllOnSale from "./pages/website/homepage-sections/AllOnSale.js";
import AllNewArrival from "./pages/website/homepage-sections/AllNewArrival.js";
import WebSiteCategories from "./pages/website/Categories/Categories.js";
import AllTopRated from "./pages/website/homepage-sections/AllTopRated.js";
import SingleCategory from "./pages/website/Categories/SingleCategory.js";
import ProductsInCart from "./pages/website/Cart/ProductsInCart.js";

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route element={<Website />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/on-sale" element={<AllOnSale />} />
          <Route path="/latest-products" element={<AllNewArrival />} />
          <Route path="/best-seller" element={<AllTopRated />} />
          <Route path="/categories" element={<WebSiteCategories />} />
          <Route path="/cart" element={<ProductsInCart />} />

          {/* All Categories Routes */}
          <Route path="/category/Abayat" element={<SingleCategory />} />
          <Route path="/category/Cardigans" element={<SingleCategory />} />
          <Route path="/category/Coats" element={<SingleCategory />} />
          <Route path="/category/Dresses" element={<SingleCategory />} />
          <Route path="/category/Jackets" element={<SingleCategory />} />
          <Route path="/category/Scarves" element={<SingleCategory />} />
          <Route path="/category/Sets" element={<SingleCategory />} />
          <Route path="/category/Skirts" element={<SingleCategory />} />
          {/* All Categories Routes */}
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>
        <Route element={<RequireBack />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Error404 />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1996"]} />}>
              {/* <Route path="writer" element={<Writer />} /> */}
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
              {/* Categories */}
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<UpdateCategory />} />
              <Route path="category/add" element={<AddCategory />} />
              {/* products */}
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<UpdateProduct />} />
              <Route path="product/add" element={<AddProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

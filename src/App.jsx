// import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/FakeAuthContext";
import { CitiesProvider, useCities } from "./contexts/CitiesContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Pagenotfound from "./pages/Pagenotfound";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
// const BASE_URL = "http://localhost:9000";

// const Homepage = lazy(() => import("./pages/Homepage"));
// const Pricing = lazy(() => import("./pages/Pricing"));
// const Product = lazy(() => import("./pages/Product"));
// const Login = lazy(() => import("./pages/Login "));
// const AppLayout = lazy(() => import("./pages/AppLayout"));
// const Pagenotfound = lazy(() => import("./pages/Pagenotfound"));

function App() {
  return (
    // <Homepage />
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          {/* <Suspense fallback={<SpinnerFullPage />}> */}
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />

            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          /> */}
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="contries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>

            <Route path="login" element={<Login />} />

            <Route path="*" element={<Pagenotfound />} />
          </Routes>
          {/* </Suspense> */}
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

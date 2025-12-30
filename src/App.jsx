import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/homePageLayout/HomePageLayout";
import LoginForm from "./components/loginLayout/LoginForm";

function LoginPage() {
  return (
    <main>
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomeLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

import LoginForm from "./components/loginLayout/LoginForm"

function App() {

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
  )
}

export default App

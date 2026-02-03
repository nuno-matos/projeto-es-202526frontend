import './LoginPage.css'
import LoginForm from '../loginLayout/LoginForm'

function LoginPage() {
  return (
    <>
      <main>
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <LoginForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default LoginPage
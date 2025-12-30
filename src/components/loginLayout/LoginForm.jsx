import './LoginForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginForm() {

    const baseURL = 'http://localhost:8080/'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                baseURL + 'authenticate/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            )
            console.log(response.data.token)

            // Navigate to /home on success
            navigate('/home')
        } catch (error) {
            console.error(error.response?.data || error.message)
        }
    }

    return <div class="card">
        <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img src="public/images/main-illustration.jpg" style={{ height: '80%', width: '105%', marginLeft: '5px', marginRight: '5px', marginTop: '55px' }} />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                        <div class="d-flex align-items-center mb-3 pb-1"><img src="src\assets\logo.svg" style={{ height: '25px', width: '25px' }} /><span class="h2 fw-bold mb-0 ms-3">Exercise Manager</span></div>
                        <h5 class="fw-bold mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                        <div class="input-wrapper form-outline mb-2">
                            <label class="form-label" for="email">Email</label>
                            <div class="input-content input-group flex-nowrap">
                                <input class="form-control" type="email" placeholder="johndoe@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <div class="icon input-group-text bg-info text-white">
                                    <span>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="input-wrapper form-outline mb-2">
                            <label class="form-label" for="password">Password</label>
                            <div class="input-content input-group flex-nowrap">
                                <input class="form-control" type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <div class="icon input-group-text bg-info text-white">
                                    <span>
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="pt-1 mb-4 d-grid gap-2">
                            <button type="submit" class="btn btn-dark btn-block">Login</button>
                            <button type="button" class="btn btn-danger btn-block">Sign Up</button>
                        </div>
                    </form>
                    <a href="#!" class="small text-muted">Forgot password?</a>
                    <p style={{ color: '#393f81' }}>Don't have an account? <a href="#!" style={{ color: '#393f81' }}>Register here</a></p>
                    <a href="#!" class="small text-muted">Terms of use.</a><a href="#!" class="small text-muted">Privacy policy</a>
                </div>
            </div>
        </div>
    </div>
}

export default LoginForm;
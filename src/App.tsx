import './App.css'
import { useState   } from 'react'
import { api } from './lib/api'

const navigation = [
  {label: 'Overview', icon: '◫'},
  {label: 'Accounts', icon: '▤'},
  {label: 'Journal entries', icon: '≡'},
  {label: 'Reports', icon: '▥'},
]

function LoginScreen({
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  authError,
  isRegistering,
  setIsRegistering,
  setAuthError,
  confirmPassword,
  setConfirmPassword,
} : { 
     email: string,
     setEmail: (value: string) => void
     password: string
     setPassword: (value: string) => void
     onLogin: () => void
     authError: string
     isRegistering: boolean
     setIsRegistering: (value: boolean) => void
     setAuthError: (value: string) => void
     confirmPassword: string
     setConfirmPassword: (value: string) => void
    }) {
  return (
    <main className='auth-page'>
      <section className='auth-form-panel'>
        <div className={`auth-form ${isRegistering ? 'is-registering' : 'islogin'}`}
            key={isRegistering ? 'register' : 'login'} >
          <span className='brand-mark'>C</span>
          <p className='eyebrow'>SumiLedger</p>
          <h1>{isRegistering ? 'Create Account' : 'Sign In'}</h1>
          <p className='auth-description'>
            HURRY UP! THE BOOKS ARE WAITING FOR YOU
          </p>
          {authError && (
            <p className='auth-error' role="alert">
              {authError}
            </p>
          )}
          <form
  className="auth-fields"
  onSubmit={(event) => {
    event.preventDefault()
    onLogin()
  }}
>
          <label htmlFor="email"> Ey MATE YOUR MAIL</label>
          <input
          id="email"
          type="email"
          autoComplete='email'
          placeholder='you@example.com'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          />
          <label htmlFor='password'>Password</label>
          <input
          id='password'
          type='password'
          autoComplete={isRegistering ? 'new-password' : 'current-password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)} 
          required
          /> 
           {isRegistering && (
           <>
           <label htmlFor='confrim-password'>Confirm password</label>
           <input
                id="confirm-passord"
                type="password"
                autoComplete='new-password'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                minLength={12}
               required
             />
           </>
         )}
          <button type="submit" className='auth-submit'>
           {isRegistering ? 'Creatr Account' : 'Sign In Brochacho'}
          </button>
          </form>
          <button 
          type='button'
          onClick={() =>  {
            setIsRegistering(!isRegistering)
            setAuthError('')
          }}>
            {isRegistering 
            ? 'Already have an account? Sign In'
            : 'New here? Create an account'}
          </button>
        </div>
      </section>
    </main>
  )
}
function App() {
  async function handleLogIn() {
    setAuthError('')

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setAuthError('The Passowrd is not sigma Man!')
          return
        }
      await api.register(email, password)
      setIsRegistering(false)
      setPassword('')
      setConfirmPassword('')
      setAuthError('Account created! Sign in with your new credentials.')
      return
    }
   
      await  api.login(email, password)
      setScreen('dashboard')
    } catch (error) {
     setAuthError(
      error instanceof Error ? error.message : 'something went wrong'
     )
    }
    
  }
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const [screen, setScreen] = useState<'login' | 'dashboard'>('login')

   const [isRegistering, setIsRegistering] = useState(false)
   const [confirmPassword, setConfirmPassword] = useState('')
   const [authError, setAuthError] = useState('')
  return screen === 'login' ? (
    <LoginScreen 
    email={email}
    setEmail={setEmail}
    password={password}
    setPassword={setPassword}
    onLogin={handleLogIn}
    authError={authError}
    isRegistering={isRegistering}
    setIsRegistering={setIsRegistering}
    setAuthError={setAuthError}
    confirmPassword={confirmPassword}
    setConfirmPassword={setConfirmPassword}/>

  ) :  (
    
    <div className='app-shell'>
      <aside className='sidebar'>
        <a className='brand' href="/">
        <span className='brand-mark'>C</span>
        <span>SumiLedger</span>
        </a>
        <div className='workspace-label'>WORKSPACE</div>
        <button className='workspace-switcher'>
          <span className='workspace-avatar'>C</span>
          <span className='workspace-name'>My Orgs</span>
          <span className='workspace-chevron'>⌄</span>
        </button>

        <nav className='navigation' aria-label='Main Navi'>
          {navigation.map((item, index) => (
            <a
              key={item.label}
              href="#"
              className={`nav-item ${index === 0 ? 'active' : ''}`}
              >
                <span className='nav-icon' aria-hidden="true">
                  {item.icon}

                </span>
                {item.label}
              </a>
            ))}

            <div className='sidebar-footer'>
              <span className='status-dot' />
              <span>Connected to workspace</span>
            </div>
        </nav>
      </aside>

      <main className='main-content'>
        <header className='topbar'>
          <span className='breadcrumb'> Workspace / Overview</span>
          <button className='avatar-button' aria-label="User account">
            Y
          </button>

        </header>
        <section className='page-content'>
          <div className='page-heading'>
            <div>
              <div className='eyebrow'> WORKSPACE OVERVIEW</div>
              <h1>Overview</h1>
              <p className='page-description'>
                All the finance activies, in one place!
              </p>
            </div>
            <span className='period-label'>All time</span>
          </div>

          <div className='welcome-panel'>
            <div>
              <div className='welcome-label'>SumiLedger</div>
              <h2>Your books, in bal bro!</h2>
              <p>
                Manage accounts, record journal entries, and review financial reports from one workspace.
              </p>
            </div>
            <div className='welcome-symbol' aria-hidden='true'>↗</div>
          </div>

          <div className='section-heading'>
           <h2>Get Started</h2>
           <span>Wrkspace setup</span>
          </div>
          <div className='setup-list'>
            <div className='setup-row'>
              <span className='setup-number'>01</span>
              <div className='setup-copy'>
                <strong>Review your chart of accounts</strong>
                <p>Organize the accounts used by your organization.</p>

              </div>
              <span className='setup-arrow'>↗</span>
            </div>
            <div className='setup-row'>
              <span className='setup-number'>03</span>
            <div className='setup-copy'>
              <strong> Review financial reports</strong>
              <p> Inspect profit and loss and balance sheet baby!</p>
            </div>
            <span className='setup-arrow'>↗</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
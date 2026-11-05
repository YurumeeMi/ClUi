
import './App.css'
import { useState, useEffect } from 'react'
import Accounts from './pages/Accounts'
import { api } from './lib/api'

const navigation = [
  { label: 'Overview', icon: 'space_dashboard' },
  { label: 'Accounts', icon: 'account_balance_wallet' },
  { label: 'Journal entries', icon: 'receipt_long' },
  { label: 'Reports', icon: 'monitoring' },
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
}: {
  email: string
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
    <main className="auth-page">
      <section className="auth-form-panel">
        <div
          className={`auth-form ${isRegistering ? 'is-registering' : 'islogin'}`}
          key={isRegistering ? 'register' : 'login'}
        >
          <span className="auth-brand">SumiLedger</span>

          <p className="auth-description">
            HURRY UP! THE BOOKS ARE WAITING FOR YOU
          </p>

          {authError && (
            <div className="auth-error" role="alert">
              <span aria-hidden="true">ⓘ</span>
              <span>{authError}</span>
            </div>
          )}

          <form
            className="auth-fields"
            onSubmit={(event) => {
              event.preventDefault()
              onLogin()
            }}
          >
            <md-outlined-text-field
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              required
              onInput={(event) => {
                const field = event.currentTarget as HTMLElement & {
                  value: string
                }
                setEmail(field.value)
              }}
            />

            <md-outlined-text-field
              label="Password"
              type="password"
              value={password}
              required
              onChange={(event) => {
                const field = event.currentTarget as HTMLElement & {
                  value: string
                }
                setPassword(field.value)
              }}
            />

            {isRegistering && (
              <md-outlined-text-field
                label="Confirm password"
                type="password"
                value={confirmPassword}
                minLength={12}
                required
                onChange={(event) => {
                  const field = event.currentTarget as HTMLElement & {
                    value: string
                  }
                  setConfirmPassword(field.value)
                }}
              />
            )}

            <md-filled-button type="submit" className="auth-submit">
              {isRegistering ? 'Create Account' : 'Let Me In Pliz'}
            </md-filled-button>
          </form>

          <md-text-button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering)
              setAuthError('')
            }}
          >
            {isRegistering
              ? 'Already have an account? Sign In'
              : 'New here? Create an account'}
          </md-text-button>
        </div>
      </section>
    </main>
  )
}

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [screen, setScreen] = useState<
    'loading' | 'login' | 'dashboard'
  >('loading')

  const [activePage, setActivePage] = useState('Overview')
  const [isRegistering, setIsRegistering] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [logoutError, setLogoutError] = useState('')
  const [authError, setAuthError] = useState('')
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  useEffect(() => {
    api.me()
      .then(() => setScreen('dashboard'))
      .catch(() => setScreen('login'))
  }, [])

  async function handleLogIn() {
    setAuthError('')

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setAuthError('Passwords do not match.')
          return
        }

        await api.register(email, password)

        setIsRegistering(false)
        setPassword('')
        setConfirmPassword('')
        setAuthError('Account created! Sign in with your new credentials.')
        return
      }

      await api.login(email, password)
      setScreen('dashboard')
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : 'Something went wrong.'
      )
    }
  }

  async function handleLogout() {
    setLogoutError('')

    try {
      await api.logout()
      setAccountMenuOpen(false)
      setPassword('')
      setScreen('login')
    } catch (error) {
      setLogoutError(
        error instanceof Error ? error.message : 'Unable to sign out.'
      )
    }
  }

  if (screen === 'loading') {
    return (
      <main className="auth-page">
        Sessions is getting ready...
      </main>
    )
  }

  if (screen === 'login') {
    return (
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
        setConfirmPassword={setConfirmPassword}
      />
    )
  }

  return (
    <div className="app-shell">
      <aside
        className={`sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}
      >
        <div className="sidebar-header">
          <a className="brand" href="/">
            <span className="brand-name">SumiLedger</span>
          </a>

          <button
            className="sidebar-toggle"
            type="button"
            onClick={() => setSidebarExpanded(value => !value)}
            aria-label={
              sidebarExpanded ? 'Collapse navigation' : 'Expand navigation'
            }
            aria-expanded={sidebarExpanded}
          >
            <span className="material-symbols-rounded">
              {sidebarExpanded ? 'menu_open' : 'menu'}
            </span>
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <button className="workspace-switcher" type="button">
          <span className="workspace-avatar">C</span>
          <span className="workspace-name">My Orgs</span>
          <span className="material-symbols-rounded workspace-chevron">
            expand_more
          </span>
        </button>

        <nav className="navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${
                activePage === item.label ? 'active' : ''
              }`}
              onClick={() => setActivePage(item.label)}
              type="button"
              aria-current={activePage === item.label ? 'page' : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot" />
          <span>Connected to workspace</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span className="breadcrumb">
            Workspace / {activePage}
          </span>

          <div className="account-menu">
            <button
              className="avatar-button"
              type="button"
              aria-label="User account"
              aria-expanded={accountMenuOpen}
              onClick={() => setAccountMenuOpen(value => !value)}
            >
              Y
            </button>

            {accountMenuOpen && (
              <div className="account-menu-dropdown" role="menu">
                {logoutError && (
                  <p role="alert">{logoutError}</p>
                )}

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        {activePage === 'Accounts' ? (
          <Accounts />
        ) : activePage === 'Overview' ? (
          <section className="page-content">
            <div className="page-heading">
              <div>
                <div className="eyebrow">WORKSPACE OVERVIEW</div>
                <h1>Overview</h1>
                <p className="page-description">
                  All the finance activities, in one place!
                </p>
              </div>

              <span className="period-label">All time</span>
            </div>

            <div className="welcome-panel">
              <div>
                <div className="welcome-label">SumiLedger</div>

                <h2>Your books, in bal bro!</h2>

                <p>
                  Manage accounts, record journal entries, and review
                  financial reports from one workspace.
                </p>
              </div>

              <div className="welcome-symbol" aria-hidden="true">
                <span className="material-symbols-rounded">
                  north_east
                </span>
              </div>
            </div>

            <div className="section-heading">
              <h2>Get Started</h2>
              <span>Workspace setup</span>
            </div>

            <div className="setup-list">
              <div className="setup-row">
                <span className="setup-number">01</span>

                <div className="setup-copy">
                  <strong>Review your chart of accounts</strong>
                  <p>
                    Organize the accounts used by your organization.
                  </p>
                </div>

                <span className="material-symbols-rounded setup-arrow">
                  north_east
                </span>
              </div>

              <div className="setup-row">
                <span className="setup-number">03</span>

                <div className="setup-copy">
                  <strong>Review financial reports</strong>
                  <p>
                    Inspect profit and loss and balance sheet reports.
                  </p>
                </div>

                <span className="material-symbols-rounded setup-arrow">
                  north_east
                </span>
              </div>
            </div>
          </section>
        ) : (
          <section className="page-content">
            <div className="page-heading">
              <div>
                <div className="eyebrow">WORKSPACE</div>
                <h1>{activePage}</h1>
                <p className="page-description">
                  This section is coming soon.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App

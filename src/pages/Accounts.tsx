
import './accounts.css'
export default function Accounts() {
    return (
        <main className="page-content accounts-page">
            <header className='page-header'>
                <div>
                    <h1>Accounts</h1>
                    <p>Manage the accounts</p>
                </div>

                <md-filled-button type="button">
                    <span slot='icon' className='material-symbols-rounded'>
                     add                        
                    </span>
                    Create account
                </md-filled-button>
            </header>

            <section className="accounts=section">
                <div className="accounts-section-handler">
                    <h2> Chart of accounts</h2>
                    <span>0 accounts</span>
                </div>

                <div className="accounts-empty-state">
                    <span className="material-symbols-rounded">
                        accounts
                    </span>
                    <h3> No accounts yet</h3>
                    <p>Make some accounts BRO</p>
                </div>
            </section>
        </main>
    )
}
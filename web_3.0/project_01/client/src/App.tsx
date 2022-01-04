import AppProvider from './hooks';
import { Footer, Navbar, Services, Transactions, Welcome } from './components';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
        </div>

        <Services />
        <Transactions />
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App

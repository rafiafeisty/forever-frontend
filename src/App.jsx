import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Main from './components/Main'
import Header from './components/Header'
import Header2 from './components/Header2'
import Footer from './components/Footer'
import Subscribe from './components/Subscribe'
import Collection from './components/Collection'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Cart from './components/Cart'
import Detail from './components/Detail'
import Adminlog from './components/Adminlog'
import Adminpan from './components/Adminpan'
import Add from './components/Add'
import Order from './components/Order'
import List from './components/List'
import Checkout from './components/Checkout'

function Layout() {
  const location = useLocation()
  const path = location.pathname

  // Conditions
  const isAdminLogin = path === "/admin"
  const isAdminPanel = ["/adminpan", "/order", "/list", "/add"].includes(path)

  return (
    <>
      {/* Show appropriate header */}
      {!isAdminLogin && !isAdminPanel && <Header />}
      {isAdminPanel && <Header2 />}

      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Main />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path='/delivery' element={<Checkout />} />

        {/* Admin routes */}
        <Route path='/admin' element={<Adminlog />} />
        <Route path='/adminpan' element={<Adminpan />} />
        <Route path='/add' element={<Add />} />
        <Route path='/list' element={<List />} />
        <Route path='/order' element={<Order />} />
      </Routes>

      {/* Show Subscribe + Footer only for normal pages */}
      {!isAdminLogin && !isAdminPanel && <Subscribe />}
      {!isAdminLogin && !isAdminPanel && <Footer />}
    </>
  )
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App

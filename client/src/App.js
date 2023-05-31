import './App.css';
import { Routes, Route } from "react-router-dom";
import UserTheme from "./Theme/UserTheme.jsx";
import Home from './Pages/Home/Home';
import ProductsPage from './Pages/Products/Products';
import ProductDetail from './Pages/Products/ProductDetail';
import AdminTheme from './Theme/AdminTheme';
import ProductsAdmin from './Pages/Admin/Products/Products';
import Signin from './Pages/Authorization/Signin';
import Signup from './Pages/Authorization/Signup';
import { UserContext } from './Context/UserContext';
import { useContext } from 'react';
import Loading from './Components/Loading/Loading';

function App() {
  const { isAuthorizing } = useContext(UserContext);

  if (isAuthorizing) return <Loading/>

  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<UserTheme/>}>
            <Route path='' element={<Home/>} />
            <Route path='/products' element={<ProductsPage/>} />
            <Route path='/products/:id' element={<ProductDetail/>} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>} />
          </Route>
          <Route path='/admin' element={<AdminTheme/>}>
            <Route path='products' element={<ProductsAdmin/>}/>
            <Route path='*' />
          </Route>
        </Routes>
    </div>
  );
}

export default App;

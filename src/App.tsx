import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Todo from './components/todo/todo';
import ApiFetching from './components/apiFetching/apiFetching';
import ShoppingCart from './components/shoppingCart';
import ChatBot from './components/chatBot';
import Cart from './components/shoppingCart/cart';

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Home page</div>} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/shopping-cart/cart" element={<Cart />} />
          <Route path="/api-fetching" element={<ApiFetching />} />
          <Route path="/chatbot" element={<ChatBot />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

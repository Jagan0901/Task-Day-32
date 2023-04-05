import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
import { Routes,Route,useNavigate } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Books } from './Pages/Books';
import { BookInfo } from './Pages/BookInfo';
import { BookEdit } from './Pages/BookEdit';
import { AddBook } from './Pages/AddBook';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={()=> navigate('/')}>Home</Button>
          <Button color="inherit" onClick={()=> navigate('/books')}>Books</Button>
          <Button color="inherit" onClick={()=> navigate('/book/add')}>Add Book</Button>
        </Toolbar>
      </AppBar>

      <Routes>
  <Route path="/" element={<Home />}/>
  <Route path="/books" element={<Books />} />
  <Route path="/book/add" element={<AddBook />} />
  <Route path="/book/:bookId" element={<BookInfo />} />
  <Route path="/book/edit/:bookId" element={<BookEdit/>} />
</Routes>
    </div>
  );
}

export default App;

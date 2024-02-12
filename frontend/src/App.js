import { Route } from 'react-router-dom';
import './App.css';
// import { Button } from '@chakra-ui/react'
import Chat from './Pages/Chat';
import Home from './Pages/Home';
function App() {
  return (
    <div className="App">
        <Route path = "/"component = {Home} exact/>
        <Route path = "/chats" component = {Chat}/>
        
    </div>
  );
}

export default App;

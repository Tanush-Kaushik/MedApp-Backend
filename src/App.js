import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import Table from './components/Table';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/signIn' element={<SignIn/>}/>
        <Route exact path='/signUp' element={<SignUp/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/table' element={<Table/>}/>
      </Routes>
    </Router>
  );
}

export default App;

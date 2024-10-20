import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home"
import CityWeather from "./components/CityWeather"
import Login from "./components/login"
import Signup from './components/signup'
import {AuthContextProvider} from './shared/authContext';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <Router>
      <RecoilRoot>
      <AuthContextProvider>
      <div className="m-0 p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:name" element={<CityWeather />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
      </AuthContextProvider>
      </RecoilRoot>
    </Router>
  );
}

export default App;
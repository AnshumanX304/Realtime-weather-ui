import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home"
import CityWeather from "./components/CityWeather"
import {AuthContextProvider} from './shared/authContext';

function App() {
  return (
    <Router>
      <AuthContextProvider>
      <div className="m-0 p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:name" element={<CityWeather />} />
        </Routes>
      </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
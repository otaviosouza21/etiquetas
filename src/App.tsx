import "./Global/App.css";
import "./Global/Reset.css";
import Etiquetas from "./Pages/Etiquetas/Etiquetas";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Impressao from "./Pages/Impressao/Impressao";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/etiquetas" element={<Etiquetas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

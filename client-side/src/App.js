import { HomePage } from "./components/HomePage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RepoList } from "./components/RepoList";


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/repo" element={<RepoList  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

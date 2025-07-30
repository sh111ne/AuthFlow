import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';
import Authorization from './pages/Authorization/Authorization';
import ConfirmEmail from './pages/ConfirmEmail/ConfirmEmail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/confirm/:token" element={<ConfirmEmail />} />
      </Routes>
    </>
  );
}

export default App;

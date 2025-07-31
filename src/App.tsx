import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';
import Authorization from './pages/Authorization/Authorization';
import ConfirmEmail from './pages/ConfirmEmail/ConfirmEmail';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route path="authorization" element={<Authorization />} />
          <Route path="confirm/:token" element={<ConfirmEmail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

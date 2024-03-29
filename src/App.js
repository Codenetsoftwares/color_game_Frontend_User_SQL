import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contextApi/context';
import Home from './screen/home/home';
import NotFound from './screen/common/notFound';
import GameView from './screen/gameView/gameView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import RulesPage from './screen/common/rulesPage';
import ForgotPassword from './screen/chnagePassword/ForgotPassword';

function App() {
  return (
    <AppProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/rulesPage" element={<RulesPage />} />
          <Route path="/gameView/:gameName/:id" element={<GameView />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/rulesPage" element={<RulesPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

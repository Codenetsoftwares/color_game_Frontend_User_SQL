import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contextApi/context";
import Home from "./screen/home/home";
import NotFound from "./screen/common/notFound";
import GameView from "./screen/gameView/gameView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import RulesPage from "./screen/common/rulesPage";
import ForgotPassword from "./screen/chnagePassword/forgotPassword";
import PrivateRoute from "./globlaCommon/privateRoute";
import ProfitAndLoss from "./screen/P&L/profitAndLoss";
import Loading from "./globlaCommon/loading";
import History from './screen/common/history';

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
      <Loading />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/gameView/:gameName/:id" element={<GameView />} />

          {/* private routes */}
          <Route
            path="/forgetPassword"
            element={
              <PrivateRoute>
                <ForgotPassword />
              </PrivateRoute>
            }
          />
          <Route
            path="/rulesPage"
            element={
              <PrivateRoute>
                <RulesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />

          <Route
            path="/profit&loss"
            element={
              <PrivateRoute>
                <ProfitAndLoss />
              </PrivateRoute>
            }
          />

          {/* not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

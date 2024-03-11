import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import LandingPage from './screen/landingpage/landingPage';
import PrivateRoute from './screen/common/privateRoute';
import NotFound from './screen/common/notFound';
import Games from './screen/games/Games';
import { AppProvider } from './contextApi/context';
import Layout from './screen/landingpage/components/layout/layout';
import { ToastContainer, toast } from 'react-toastify';
import IndividualGames from './screen/games/IndividualGames';

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
          {/* public routes */}
          <Route path="/" element={<Layout />}>
            <Route path="/inplay" element={<Games />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/game/:gamename/:id" element={<IndividualGames />} />
          </Route>
          {/* protected routes */}
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          />

          {/* Not found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

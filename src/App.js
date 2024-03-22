import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-bootstrap';
import { AppProvider } from './contextApi/context';
import NavBar from './screen/navBar/navBar';
import Home from './screen/home/home';

function App() {
	return (
		<AppProvider>
			<ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark' />
			<BrowserRouter>
				<NavBar />
				<Routes>
					{/* public routes */}
					<Route path={'/home'} element={<Home />} />
					<Route path={'/'} element={<Home />} />
					{/* <Route path="/inplay" element={<Games />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/game/:gamename/:id" element={<IndividualGames />} /> */}
					{/* </Route> */}
					{/* protected routes */}
					{/* <Route
            path="/private"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          /> */}

					{/* Not found route */}
					{/* <Route path="*" element={<NotFound />} /> */}
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
}

export default App;

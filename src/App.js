import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/navbar";
import { AuthProvider } from "./context/";
import { useRoutes } from "react-router-dom";
import HomePage from "./pages/home";
import MusicPage from "./components/music";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/music",
      element: <MusicPage />,
    },

  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div>{routesElement}</div>
    </AuthProvider>
  );
}

export default App;

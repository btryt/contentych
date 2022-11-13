import React from "react"
import { useRoutes } from "react-router-dom"
import AdminPage from "../components/AdminPage"
import Create from "../components/Create"
import Edit from "../components/Edit"
import Search from "../components/Search"
import { PrivateRoute } from "../HOC/PrivateRoute"
import Home from "../components/Home"
import Login from "../components/Login"
import NotFoundfrom from '../components/404'
import Topic from "../components/Topic"

const Routes: React.FC = () => {
  const routes = useRoutes([
    {
      element: (
        <PrivateRoute>
          <Create />
        </PrivateRoute>
      ),
      path: "create",
    },
    {
      element:(
        <PrivateRoute forAdmin>
          <AdminPage />
        </PrivateRoute>
      ),
      path:"admin"
    },
    {
      element: (
        <PrivateRoute>
          <Search />
        </PrivateRoute>
      ),
      path: "search",
    },
    {
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
      path: "home",
    },
    {
      path: "topic/:id",
      element: (
        <PrivateRoute>
          <Topic />
        </PrivateRoute>
      )
    },
    {
      element: (
        <PrivateRoute>
          <Edit />
        </PrivateRoute>
      ),
      path: "edit/:id",
    },
    {
      element: <Login />,
      path: "login",
    },
    {
      element: <NotFoundfrom/>,
      path: "*",
    },
  ])

  return routes
}

export default Routes

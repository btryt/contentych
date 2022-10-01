import React from "react"
import { useRoutes } from "react-router-dom"
import AdminPage from "../AdminPage"
import Create from "../Create"
import Edit from "../Edit"
import Find from "../Find"
import { PrivateRoute } from "../HOC/PrivateRoute"
import Home from "../Home"
import Login from "../Login"
import NotFoundfrom from '../404'
import Topic from "../Topic"

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
          <Find />
        </PrivateRoute>
      ),
      path: "find",
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

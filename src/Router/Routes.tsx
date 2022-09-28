import React from "react"
import { useRoutes } from "react-router-dom"
import Create from "../Create"
import Edit from "../Edit"
import Find from "../Find"
import { PrivateRoute } from "../HOC/PrivateRoute"
import Home from "../Home"
import Login from "../Login"
import Sections from "../Sections"
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
      element: <h1>404</h1>,
      path: "*",
    },
  ])

  return routes
}

export default Routes

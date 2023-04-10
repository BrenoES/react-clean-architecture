import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'

const Router = () => {
  return <RouterProvider router={createBrowserRouter(routes)} />
}

export default Router

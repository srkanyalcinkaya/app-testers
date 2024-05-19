import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import "@/assets/css/tailwind.css"
import routes from './routes'
import { ThemeProvider } from './components/theme-provider'
import store from './store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'



ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
            <RouterProvider router={routes} />
            <Toaster  position="bottom-right"/>
        </Provider>
    </ThemeProvider>
)

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/mainlayout';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />, // Layout
        children: [
            {
                index: true, // 這裡代表預設首頁內容
                element: <HomePage />
            },
            // 以後新增其他頁面只需在此添加
            // { path: "report/search", element: <ReportSearch /> }
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

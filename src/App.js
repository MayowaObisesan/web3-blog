import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import Campaign from "./pages/campaign";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import UserPosts from "./pages/UserPosts";
import Root from "./pages/Root.js";
import Profile from "./pages/Profile";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "/",
                    index: true,
                    element: <Home />,
                },
                {
                    path: "/campaign/:id",
                    element: <Campaign />,
                },
                {
                    path: "/create",
                    element: <CreatePost />,
                },
                {
                    path: "/post/:id",
                    element: <Post />,
                },
                {
                    path: "/me/profile",
                    element: <Profile />,
                },
                {
                    path: "/me/posts",
                    element: <UserPosts />,
                },
                {
                    path: "/me/posts/:id",
                    element: <Post />,
                },
            ]
        },
    ]);
    return (
        <div className="App">
            {/* <Header /> */}
            <main className="">
                <RouterProvider router={router} />
            </main>
            <ToastContainer />
            {/* <Outlet /> */}
        </div>
    );
}

export default App;

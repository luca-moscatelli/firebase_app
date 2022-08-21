import logo from "./logo.svg";
import "./App.css";
import CreateUser from "./pages/createUser";
import MainPage from "./pages/MainPage";
import GetUser from "./pages/GetUsers";
import LoginPage from "./pages/login/loginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/login/signUpPage";
import SchedulePage from "./pages/SchedulePage";
import GalleryPage from "./pages/galleryPage";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/addUser" element={<CreateUser />}></Route>
                    <Route path="/main" element={<MainPage/>}></Route>
                    <Route path="/getUser" element={<GetUser/>}></Route>
                    <Route path="/" element={<LoginPage/>}></Route>
                    <Route path="/SignUp" element={<SignUpPage/>}></Route>
                    <Route path="/Schedule" element={<SchedulePage/>}></Route>
                    <Route path="/gallery" element={<GalleryPage/>}></Route>



                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

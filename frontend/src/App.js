import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import MyNotes from "./screens/MyNotes/MyNotes";
import RegisterPage from './screens/RegisterPage/RegisterPage'
import LoginPage from './screens/LoginPage/LoginPage'
import CreateNotePage from  './screens/CreateNote/CreateNotePage'
import SingleNotePage from './screens/SingleNote/SingleNote'
import { useState } from "react";
import ProfileScreen from "./screens/ProfilePage/ProfileScreen";

const App = () => {
  const [search, setSearch] = useState("")

  return (
    <Router>
      <Header setSearch={setSearch}/>
      <Routes>
        <Route path= '/' exact element={<LandingPage/>} />
        <Route path= '/mynotes' element={<MyNotes  search={search}/>} />
        <Route path= '/login' element={<LoginPage />} />
        <Route path= '/register' element={<RegisterPage />} />
        <Route path= '/createnote' element={<CreateNotePage />} />
        <Route path= '/note/:id' element={<SingleNotePage />} />
        <Route path= '/profile' element={<ProfileScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

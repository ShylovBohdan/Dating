import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Chat from "./components/Chat";
import DialogList from "./components/DialogList";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Settings from "./components/Settings";
import SearchWithFilters from "./components/search/SearchWithFilter";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/dialogs" element={<DialogList />} />
          <Route path="/search" element={<SearchWithFilters />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/profile"
            element={
              <Profile
                isAI={false}
                user={{
                  avatar: "",
                  zodiac: "",
                  birthdate: "",
                  gender: "",
                  preferences: "",
                }}
              />
            }
          />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;

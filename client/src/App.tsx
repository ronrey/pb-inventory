import React from 'react';
import { AppRoutes } from "./components/routes";
import Drawer from './components/drawer'
// import { SideBar } from "./components/sidebar";
// import { TopBar } from "./components/topBar";
interface Props { }
export const App: React.FC<Props> = () => {
  return (
    <div>
      {/*   <TopBar />
      <SideBar /> */}

      <AppRoutes />
    </div>
  );
};



export default App;

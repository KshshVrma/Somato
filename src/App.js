import React from 'react';
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals';
function App() {
  return (
    <React.Fragment>
     <Header></Header>
     <main>
      <Meals></Meals>
     </main>
    </React.Fragment>
  );
}

export default App;

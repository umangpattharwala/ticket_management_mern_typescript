import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import EditTicket from './components/EditTicket'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return(
   
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/tickets/:id" element={<EditTicket />} />
        </Routes>
      </div>
    </BrowserRouter>
  )

}

export default App;
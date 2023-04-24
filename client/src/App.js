import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Index from './compenets/Index';
import Signreg from './compenets/Signreg';
import Dashboard from './compenets/admin/Dashboard';
import Profilephoto from './compenets/admin/Profilephoto';
import Edit from './compenets/admin/edit';
import Signin from './compenets/Signin';
import Alluser from './compenets/alluser';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/Signreg' element={<Signreg />}/>
      <Route path="/Dashboard" element={<Dashboard />}/>
      <Route path="/Profilephoto" element={<Profilephoto />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/alluser" element={<Alluser/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

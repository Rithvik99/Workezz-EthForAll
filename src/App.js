import './App.css';
import HomePage from './LandingPage/homepage';
import { BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Employee from './EmployeePage/Employee';
import Jobs from './Employeejob/jobs';
import Readmore from './Readmore/Readmore';
import Employer from './EmployerPage/Employer';
import Postjob from './Postjob/Postjob';
import Closepost from './ClosePost/Closepost';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/employee/jobs" element={<Jobs/>} />
          <Route path="/employee/jobs/readmore" element={<Readmore/>} />
          <Route path="/employer" element={<Employer/>} />
          <Route path="/employer/postjob" element={<Postjob/>} />
          <Route path="/employer/closepost" element={<Closepost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

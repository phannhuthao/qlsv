import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HouseDoor, Gear, FileText, Chat, Calendar2Check, PersonCircle, QuestionCircle } from 'react-bootstrap-icons'; 

const Sidebar = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="flex-column vh-100">
      <Navbar.Brand href="#home" className="text-primary mb-4">Sales.</Navbar.Brand>
      
      <div className="mb-4">
        <a href="#Dashboard" className="d-flex align-items-center mb-2 text-decoration-none">
          <HouseDoor className="me-2" />
          Dashboard
        </a>

        <a href="#LabTest" className="d-flex align-items-center mb-2 text-decoration-none text-dark">
          <FileText className="me-2" />
          Lab Test
        </a>

        <a href="#Appointment" className="d-flex align-items-center mb-2 text-decoration-none text-dark">
          <Calendar2Check className="me-2" />
          Appointment
        </a>

        <a href="#Message" className="d-flex align-items-center mb-2 text-decoration-none text-dark">
          <Chat className="me-2" />
          Message
        </a>

        <a href="#Payment" className="d-flex align-items-center mb-2 text-decoration-none text-dark">
          <PersonCircle className="me-2" />
          Payment
        </a>
        <a href="#Setting" className="d-flex align-items-center mb-2 text-decoration-none text-dark">
          <Gear className="me-2" />
          Setting
        </a>
      </div>

      <div className='mt-auto'>
        <a className="d-flex align-items-center mb-2 text-decoration-none text-dark cursor-pointer">
          <QuestionCircle className="me-2" />
          Help
        </a>
      </div>
    </Navbar>
  );
};

export default Sidebar;

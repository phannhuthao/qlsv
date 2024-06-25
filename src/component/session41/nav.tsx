import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaBell } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormExample() {
  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      <Form>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
          </Col>
          {/* <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col> */}
          <Col xs="auto">
            <div className="ml-left">
              <span className="input-group-text cursor-pointer">
                <FaBell />
              </span>
            </div>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default FormExample;

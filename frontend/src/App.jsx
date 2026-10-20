import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Badge, ListGroup, ListGroupItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [healthMessage, setHealthMessage] = useState('');
  const [infoData, setInfoData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/health')
      .then((res) => res.json())
      .then((data) => setHealthMessage(data.message))
      .catch((err) => console.error('Error al cargar health:', err));

    fetch('http://localhost:4000/api/info')
      .then((res) => res.json())
      .then((data) => setInfoData(data))
      .catch((err) => console.error('Error al cargar info:', err));
  }, []);

  return (
    <Container className="py-5">
      
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold" style={{color: '#C355E6'}}>Taller IV</h1>
      </header>

      <section className="health-section mb-5 p-4 rounded shadow-sm border">
        <div className="health-container">
          <h4 className="health-title" style={{color: '#8413A8'}}>Estado del Servidor</h4>
          <p className="health-text text-dark">
            {healthMessage ? healthMessage : 'Cargando estado del API...'}
          </p>
        </div>
      </section>

      <Row className="justify-content-center">
        <Col md="10">
          <Card className="shadow-sm border-0">
            <CardBody className="p-4">
              <CardTitle tag="h3" className="mb-4" style={{color: '#8413A8'}}>
                Información del Equipo y Proyectos
              </CardTitle>

              {infoData ? (
                <div>
                  <h5 className="mb-3">Integrantes:</h5>
                  <ListGroup className="mb-4">
                    {infoData.integrantes.map((member, index) => (
                      <ListGroupItem key={index} className="p-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="mb-0 fw-bold">{member.nombre}</h6>
                          <Badge color="info">Carnet: {member.carnet}</Badge>
                        </div>
                        <p className="mb-1 text-muted">
                          <strong>Carrera:</strong> {member.carrera}
                        </p>
                        <p className="mb-0 text-muted">
                          <strong>Ciudad de Origen:</strong> {member.ciudad}
                        </p>
                      </ListGroupItem>
                    ))}
                  </ListGroup>

                  <div className="p-3 bg-light rounded">
                    <strong>Cantidad de Proyectos Realizados: </strong>
                    <Badge color="primary" pill className="fs-6 ms-2">
                      {infoData.cantidadProyectos}
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-muted">Cargando información del API...</p>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
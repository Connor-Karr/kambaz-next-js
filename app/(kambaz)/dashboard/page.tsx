import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="rounded-3 overflow-hidden">
              <Link
                href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/reactjs.jpg"
                  style={{ height: 160 }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS1234 React JS
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title">
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="rounded-3 overflow-hidden">
              <Link
                href="/courses/3021/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/python.jpg"
                  style={{ height: 160 }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS3021 Python Programming
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title">
                    Introduction to Data Science
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="rounded-3 overflow-hidden">
              <Link
                href="/courses/2156/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/algorithms.jpg"
                  style={{ height: 160 }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS2156 Algorithms
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title">
                    Data Structures and Algorithm Design
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="rounded-3 overflow-hidden">
              <Link
                href="/courses/4782/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/database.jpg"
                  style={{ height: 160 }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS4782 Database Systems
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title">
                    SQL and NoSQL Fundamentals
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="rounded-3 overflow-hidden">
              <Link
                href="/courses/1893/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/ml.jpg"
                  style={{ height: 160 }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS1893 Machine Learning
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title">
                    AI and Neural Networks
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="rounded-3 overflow-hidden">
              <Link
                href="/courses/3456/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/cybersecurity.jpg"
                  style={{ height: 160 }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS3456 Cybersecurity
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title">
                    Network Security and Cryptography
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="rounded-3 overflow-hidden">
              <Link
                href="/courses/2670/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/mobile.jpg"
                  style={{ height: 160 }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS2670 Mobile Development
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title">
                    iOS and Android App Development
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="rounded-3 overflow-hidden">
              <Link
                href="/courses/4321/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/cloud.jpg"
                  style={{ height: 160 }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS4321 Cloud Computing
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title">
                    AWS and Azure Architecture
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="rounded-3 overflow-hidden">
              <Link
                href="/courses/1547/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/gamedev.jpg"
                  style={{ height: 160 }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS1547 Game Development
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title">
                    Unity and Unreal Engine
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="rounded-3 overflow-hidden">
              <Link
                href="/courses/3912/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/blockchain.jpg"
                  style={{ height: 160 }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS3912 Blockchain
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title">
                    Cryptocurrency and Smart Contracts
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="rounded-3 overflow-hidden">
              <Link
                href="/courses/2204/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/devops.jpg"
                  style={{ height: 160 }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS2204 DevOps
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title">
                    CI/CD and Container Orchestration
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="rounded-3 overflow-hidden">
              <Link
                href="/courses/4589/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/quantum.jpg"
                  style={{ height: 160 }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS4589 Quantum Computing
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title">
                    Quantum Algorithms and Applications
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

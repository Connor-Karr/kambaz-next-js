import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl id="wd-name" defaultValue="A1 - ENV + HTML" />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormControl
          as="textarea"
          id="wd-description"
          rows={10}
          defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
        />
      </FormGroup>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-points" className="text-end d-block">
            Points
          </FormLabel>
        </Col>
        <Col md={9}>
          <FormControl type="number" id="wd-points" defaultValue={100} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-group" className="text-end d-block">
            Assignment Group
          </FormLabel>
        </Col>
        <Col md={9}>
          <FormControl as="select" id="wd-group">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          </FormControl>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-display-grade-as" className="text-end d-block">
            Display Grade as
          </FormLabel>
        </Col>
        <Col md={9}>
          <FormControl as="select" id="wd-display-grade-as">
            <option value="Percentage">Percentage</option>
          </FormControl>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-submission-type" className="text-end d-block">
            Submission Type
          </FormLabel>
        </Col>
        <Col md={9}>
          <div className="border rounded p-3">
            <FormControl as="select" id="wd-submission-type" className="mb-3">
              <option value="Online">Online</option>
            </FormControl>

            <FormLabel className="fw-bold">Online Entry Options</FormLabel>

            <Form.Check
              type="checkbox"
              id="wd-text-entry"
              label="Text Entry"
              className="mb-2"
            />

            <Form.Check
              type="checkbox"
              id="wd-website-url"
              label="Website URL"
              className="mb-2"
              defaultChecked
            />

            <Form.Check
              type="checkbox"
              id="wd-media-recordings"
              label="Media Recordings"
              className="mb-2"
            />

            <Form.Check
              type="checkbox"
              id="wd-student-annotation"
              label="Student Annotation"
              className="mb-2"
            />

            <Form.Check
              type="checkbox"
              id="wd-file-upload"
              label="File Uploads"
            />
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-assign-to" className="text-end d-block">
            Assign
          </FormLabel>
        </Col>
        <Col md={9}>
          <div className="border rounded p-3">
            <FormLabel htmlFor="wd-assign-to" className="fw-bold">
              Assign to
            </FormLabel>
            <FormControl
              id="wd-assign-to"
              defaultValue="Everyone"
              className="mb-3"
            />

            <FormLabel htmlFor="wd-due-date" className="fw-bold">
              Due
            </FormLabel>
            <FormControl
              type="date"
              id="wd-due-date"
              defaultValue="2024-05-13"
              className="mb-3"
            />

            <Row>
              <Col md={6}>
                <FormLabel htmlFor="wd-available-from" className="fw-bold">
                  Available from
                </FormLabel>
                <FormControl
                  type="date"
                  id="wd-available-from"
                  defaultValue="2024-05-06"
                />
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="wd-available-until" className="fw-bold">
                  Until
                </FormLabel>
                <FormControl
                  type="date"
                  id="wd-available-until"
                  defaultValue="2024-05-20"
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />

      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2">
          Cancel
        </Button>
        <Button variant="danger">Save</Button>
      </div>
    </div>
  );
}

import Link from "next/link";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentsControls />
      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="wd-assignment-list-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <strong>ASSIGNMENTS</strong>
            <span className="ms-2">40% of Total</span>
            <div className="ms-auto">
              <BsPlus className="fs-4" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup className="rounded-0">
            <ListGroupItem
              className="wd-assignment-list-item p-3 ps-1 border border-0"
              style={{ borderLeft: "3px solid green" }}
            >
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href="/courses/1234/assignments/123"
                    className="wd-assignment-link fw-bold text-dark text-decoration-none"
                  >
                    A1 - ENV + HTML
                  </Link>
                  <div className="text-muted small">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> May 6 at 12:00am
                  </div>
                  <div className="text-muted small">
                    <strong>Due</strong> May 13 at 11:59pm | 100 pts
                  </div>
                </div>
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>

            <ListGroupItem
              className="wd-assignment-list-item p-3 ps-1 border border-0"
              style={{ borderLeft: "3px solid green" }}
            >
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href="/courses/1234/assignments/124"
                    className="wd-assignment-link fw-bold text-dark text-decoration-none"
                  >
                    A2 - CSS + BOOTSTRAP
                  </Link>
                  <div className="text-muted small">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> May 13 at 12:00am
                  </div>
                  <div className="text-muted small">
                    <strong>Due</strong> May 20 at 11:59pm | 100 pts
                  </div>
                </div>
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>

            <ListGroupItem
              className="wd-assignment-list-item p-3 ps-1 border border-0"
              style={{ borderLeft: "3px solid green" }}
            >
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href="/courses/1234/assignments/125"
                    className="wd-assignment-link fw-bold text-dark text-decoration-none"
                  >
                    A3 - JAVASCRIPT + REACT
                  </Link>
                  <div className="text-muted small">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> May 20 at 12:00am
                  </div>
                  <div className="text-muted small">
                    <strong>Due</strong> May 27 at 11:59pm | 100 pts
                  </div>
                </div>
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

"use client";
import Link from "next/link";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useParams } from "next/navigation";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import * as db from "../../../database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
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
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroupItem
                  key={assignment._id}
                  className="wd-assignment-list-item p-3 ps-1 border border-0"
                  style={{ borderLeft: "3px solid green" }}
                >
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <div className="flex-grow-1">
                      <Link
                        href={`/courses/${cid}/assignments/${assignment._id}`}
                        className="wd-assignment-link fw-bold text-dark text-decoration-none"
                      >
                        {assignment.title}
                      </Link>
                      <div className="text-muted small">
                        <span className="text-danger">Multiple Modules</span> |{" "}
                        <strong>Not available until</strong>{" "}
                        {assignment.availableFrom} at 12:00am
                      </div>
                      <div className="text-muted small">
                        <strong>Due</strong> {assignment.dueDate} at 11:59pm |{" "}
                        {assignment.points} pts
                      </div>
                    </div>
                    <AssignmentControlButtons />
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

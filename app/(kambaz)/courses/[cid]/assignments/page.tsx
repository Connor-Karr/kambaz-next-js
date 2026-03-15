"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup, ListGroupItem, Modal, Button } from "react-bootstrap";
import { PiNotePencil } from "react-icons/pi";
import { useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const dispatch = useDispatch();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  const handleDeleteClick = (assignment: any) => {
    setAssignmentToDelete(assignment);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete._id));
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments" className="p-3">
      <AssignmentsControls />
      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3" />
          ASSIGNMENTS
        </ListGroupItem>

        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <ListGroupItem
              key={assignment._id}
              className="wd-assignment-list-item p-3 ps-1 d-flex align-items-center"
            >
              <BsGripVertical className="me-2 fs-3" />
              <PiNotePencil className="me-3 fs-4 text-success" />
              <div className="flex-grow-1">
                <Link
                  className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  href={`/courses/${cid}/assignments/${assignment._id}`}
                >
                  {assignment.title}
                </Link>
                <br />
                <span className="text-muted">
                  Multiple Modules
                  {assignment.dueDate && ` | Due ${assignment.dueDate}`}
                  {assignment.points && ` | ${assignment.points} pts`}
                </span>
              </div>
              <AssignmentControlButtons
                assignmentId={assignment._id}
                deleteAssignment={(assignmentId) =>
                  handleDeleteClick(
                    assignments.find((a: any) => a._id === assignmentId)
                  )
                }
              />
            </ListGroupItem>
          ))}
      </ListGroup>

      <Modal show={showDeleteDialog} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove the assignment{" "}
          <strong>{assignmentToDelete?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

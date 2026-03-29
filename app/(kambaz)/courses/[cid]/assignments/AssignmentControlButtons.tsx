"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../modules/GreenCheckmark";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = (currentUser as any)?.role === "FACULTY";

  return (
    <div className="float-end">
      {isFaculty && (
        <FaTrash
          className="text-danger me-2 mb-1"
          onClick={(e) => {
            e.preventDefault();
            deleteAssignment(assignmentId);
          }}
        />
      )}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

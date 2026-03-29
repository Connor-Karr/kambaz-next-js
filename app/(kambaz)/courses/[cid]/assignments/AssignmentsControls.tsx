"use client";

import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export default function AssignmentsControls() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = (currentUser as any)?.role === "FACULTY";

  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      {isFaculty && (
        <>
          <Link href={`/courses/${cid}/assignments/new`}>
            <Button
              variant="danger"
              size="lg"
              className="me-1 float-end"
              id="wd-add-assignment"
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Assignment
            </Button>
          </Link>

          <Button
            variant="secondary"
            size="lg"
            className="me-1 float-end"
            id="wd-add-assignment-group"
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </Button>
        </>
      )}

      <div className="input-group" style={{ width: "300px" }}>
        <span className="input-group-text bg-white border-end-0">
          <CiSearch className="fs-5" />
        </span>
        <input
          id="wd-search-assignment"
          className="form-control border-start-0"
          placeholder="Search for Assignments"
        />
      </div>
    </div>
  );
}

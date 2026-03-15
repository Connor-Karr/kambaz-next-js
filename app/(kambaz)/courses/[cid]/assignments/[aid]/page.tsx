"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import { FormControl, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const isNew = aid === "new";
  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState<any>({
    title: "New Assignment",
    description: "New Assignment Description",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
  });

  useEffect(() => {
    if (!isNew && existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, []);

  const handleSave = () => {
    if (isNew) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <label htmlFor="wd-name">
        <b>Assignment Name</b>
      </label>
      <FormControl
        id="wd-name"
        className="mb-3"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      <label htmlFor="wd-description">
        <b>Description</b>
      </label>
      <FormControl
        as="textarea"
        id="wd-description"
        className="mb-3"
        rows={4}
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />

      <div className="row mb-3">
        <label htmlFor="wd-points" className="col-sm-2 col-form-label">
          Points
        </label>
        <div className="col-sm-10">
          <FormControl
            id="wd-points"
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                points: parseInt(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Assign</label>
        <div className="col-sm-10 border rounded p-3">
          <label htmlFor="wd-due-date">
            <b>Due</b>
          </label>
          <FormControl
            id="wd-due-date"
            type="date"
            className="mb-3"
            value={assignment.dueDate || ""}
            onChange={(e) =>
              setAssignment({ ...assignment, dueDate: e.target.value })
            }
          />

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="wd-available-from">
                <b>Available from</b>
              </label>
              <FormControl
                id="wd-available-from"
                type="date"
                value={assignment.availableFrom || ""}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    availableFrom: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="wd-available-until">
                <b>Until</b>
              </label>
              <FormControl
                id="wd-available-until"
                type="date"
                value={assignment.availableUntil || ""}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    availableUntil: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-end">
        <Button
          variant="secondary"
          className="me-2"
          onClick={handleCancel}
          id="wd-cancel"
        >
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave} id="wd-save">
          Save
        </Button>
      </div>
    </div>
  );
}

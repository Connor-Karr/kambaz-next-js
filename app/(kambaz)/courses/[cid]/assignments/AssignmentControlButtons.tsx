import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

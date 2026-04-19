"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes, deleteQuiz as deleteQuizAction, updateQuiz as updateQuizAction } from "./reducer";
import * as quizClient from "./client";
import { FaPlus, FaEllipsisV, FaCheckCircle, FaBan, FaRocket } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup, ListGroupItem, Button, Dropdown, Modal } from "react-bootstrap";
import Link from "next/link";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = (currentUser as any)?.role === "FACULTY";

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<any>(null);
  const [latestScores, setLatestScores] = useState<any>({});

  const fetchQuizzes = async () => {
    const data = await quizClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(data));
  };

  const fetchLatestScores = async (quizList: any[]) => {
    if (isFaculty) return;
    const scores: any = {};
    for (const quiz of quizList) {
      try {
        const attempt = await quizClient.findLatestAttempt(quiz._id);
        if (attempt) {
          scores[quiz._id] = attempt.score;
        }
      } catch (e) {
        // no attempt yet
      }
    }
    setLatestScores(scores);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (quizzes.length > 0 && !isFaculty) {
      fetchLatestScores(quizzes);
    }
  }, [quizzes, isFaculty]);

  const handleAddQuiz = async () => {
    const newQuiz = await quizClient.createQuiz(cid as string, {
      title: "Unnamed Quiz",
      course: cid,
      published: false,
    });
    dispatch(setQuizzes([...quizzes, newQuiz]));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/editor`);
  };

  const handleDeleteClick = (quiz: any) => {
    setQuizToDelete(quiz);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (quizToDelete) {
      await quizClient.deleteQuiz(quizToDelete._id);
      dispatch(deleteQuizAction(quizToDelete._id));
    }
    setShowDeleteDialog(false);
    setQuizToDelete(null);
  };

  const handlePublishToggle = async (quiz: any) => {
    if (quiz.published) {
      await quizClient.unpublishQuiz(quiz._id);
      dispatch(updateQuizAction({ ...quiz, published: false }));
    } else {
      await quizClient.publishQuiz(quiz._id);
      dispatch(updateQuizAction({ ...quiz, published: true }));
    }
  };

  const getAvailabilityText = (quiz: any) => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (until && now > until) {
      return "Closed";
    }
    if (available && until && now >= available && now <= until) {
      return "Available";
    }
    if (available && now < available) {
      return `Not available until ${new Date(quiz.availableDate).toLocaleDateString()}`;
    }
    return "Available";
  };

  // Sort by available date
  const sortedQuizzes = [...quizzes]
    .filter((q: any) => q.course === cid)
    .sort((a: any, b: any) => {
      const dateA = a.availableDate ? new Date(a.availableDate).getTime() : 0;
      const dateB = b.availableDate ? new Date(b.availableDate).getTime() : 0;
      return dateA - dateB;
    });

  return (
    <div id="wd-quizzes" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Quizzes</h3>
        {isFaculty && (
          <Button variant="danger" onClick={handleAddQuiz}>
            <FaPlus className="me-2" />
            Quiz
          </Button>
        )}
      </div>

      {sortedQuizzes.length === 0 ? (
        <div className="text-center text-muted p-5">
          <p className="fs-5">No quizzes yet.</p>
          {isFaculty && (
            <p>Click the <strong>+ Quiz</strong> button to create a new quiz.</p>
          )}
        </div>
      ) : (
        <ListGroup className="rounded-0">
          <ListGroupItem className="p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <strong>QUIZZES</strong>
          </ListGroupItem>
          {sortedQuizzes.map((quiz: any) => (
            <ListGroupItem
              key={quiz._id}
              className="p-3 ps-1 d-flex align-items-center"
            >
              <BsGripVertical className="me-2 fs-3" />
              <FaRocket className="me-3 fs-4 text-success" />
              <div className="flex-grow-1">
                <Link
                  href={`/courses/${cid}/quizzes/${quiz._id}`}
                  className="text-decoration-none fw-bold text-dark"
                >
                  {quiz.title}
                </Link>
                <div className="text-muted small">
                  <span className="me-3">
                    <strong>{getAvailabilityText(quiz)}</strong>
                  </span>
                  {quiz.dueDate && (
                    <span className="me-3">
                      <strong>Due</strong> {new Date(quiz.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  <span className="me-3">{quiz.points || 0} pts</span>
                  <span className="me-3">{quiz.numberOfQuestions || 0} Questions</span>
                  {!isFaculty && latestScores[quiz._id] !== undefined && (
                    <span className="me-3">
                      <strong>Score:</strong> {latestScores[quiz._id]}
                    </span>
                  )}
                </div>
              </div>
              <div className="d-flex align-items-center">
                {isFaculty && (
                  <>
                    <span
                      className="me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePublishToggle(quiz)}
                      title={quiz.published ? "Unpublish" : "Publish"}
                    >
                      {quiz.published ? (
                        <FaCheckCircle className="text-success fs-5" />
                      ) : (
                        <FaBan className="text-secondary fs-5" />
                      )}
                    </span>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        className="text-dark p-0"
                        id={`quiz-menu-${quiz._id}`}
                      >
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            router.push(`/courses/${cid}/quizzes/${quiz._id}/editor`)
                          }
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDeleteClick(quiz)}>
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handlePublishToggle(quiz)}>
                          {quiz.published ? "Unpublish" : "Publish"}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}

      <Modal show={showDeleteDialog} onHide={() => setShowDeleteDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{quizToDelete?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

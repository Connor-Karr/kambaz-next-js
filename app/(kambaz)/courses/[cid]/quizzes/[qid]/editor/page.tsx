"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { updateQuiz as updateQuizAction, addQuiz } from "../../reducer";
import * as quizClient from "../../client";
import { Button, FormControl, Form, Nav } from "react-bootstrap";
import QuestionEditor from "./QuestionEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = (currentUser as any)?.role === "FACULTY";

  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any>({
    title: "Unnamed Quiz",
    description: "",
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    published: false,
    course: cid,
  });

  const fetchQuiz = async () => {
    if (qid && qid !== "new") {
      const data = await quizClient.findQuizById(qid as string);
      if (data) setQuiz(data);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  // Re-fetch quiz when switching back to details tab (to pick up updated points/numberOfQuestions)
  useEffect(() => {
    if (activeTab === "details" && qid && qid !== "new") {
      fetchQuiz();
    }
  }, [activeTab]);

  const handleSave = async () => {
    if (qid === "new") {
      const created = await quizClient.createQuiz(cid as string, quiz);
      dispatch(addQuiz(created));
      router.push(`/courses/${cid}/quizzes/${created._id}`);
    } else {
      // Re-fetch the quiz from server to get latest points/numberOfQuestions
      const freshQuiz = await quizClient.findQuizById(qid as string);
      const quizToSave = {
        ...quiz,
        points: freshQuiz?.points ?? quiz.points,
        numberOfQuestions: freshQuiz?.numberOfQuestions ?? quiz.numberOfQuestions,
      };
      await quizClient.updateQuiz(quizToSave);
      dispatch(updateQuizAction(quizToSave));
      router.push(`/courses/${cid}/quizzes/${qid}`);
    }
  };

  const handleSaveAndPublish = async () => {
    if (qid === "new") {
      const updatedQuiz = { ...quiz, published: true };
      const created = await quizClient.createQuiz(cid as string, updatedQuiz);
      dispatch(addQuiz(created));
    } else {
      // Re-fetch the quiz from server to get latest points/numberOfQuestions
      const freshQuiz = await quizClient.findQuizById(qid as string);
      const updatedQuiz = {
        ...quiz,
        published: true,
        points: freshQuiz?.points ?? quiz.points,
        numberOfQuestions: freshQuiz?.numberOfQuestions ?? quiz.numberOfQuestions,
      };
      await quizClient.updateQuiz(updatedQuiz);
      dispatch(updateQuizAction(updatedQuiz));
    }
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  if (!isFaculty) {
    return <div className="p-3">Only faculty can edit quizzes.</div>;
  }

  return (
    <div id="wd-quiz-editor" className="p-3">
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === "questions"}
            onClick={() => setActiveTab("questions")}
            disabled={qid === "new"}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "details" && (
        <div>
          <div className="mb-3">
            <label className="form-label fw-bold">Title</label>
            <FormControl
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <Form.Control
              as="textarea"
              rows={4}
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Quiz Type</label>
            <Form.Select
              value={quiz.quizType}
              onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </Form.Select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Points</label>
            <FormControl
              type="number"
              value={quiz.points}
              disabled
            />
            <Form.Text className="text-muted">
              Points are automatically calculated from the total points of all questions.
            </Form.Text>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Assignment Group</label>
            <Form.Select
              value={quiz.assignmentGroup}
              onChange={(e) =>
                setQuiz({ ...quiz, assignmentGroup: e.target.value })
              }
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </Form.Select>
          </div>

          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers}
              onChange={(e) =>
                setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
              }
            />
          </div>

          <div className="mb-3 d-flex align-items-center">
            <Form.Check
              type="checkbox"
              label="Time Limit"
              checked={quiz.timeLimit > 0}
              onChange={(e) =>
                setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })
              }
              className="me-3"
            />
            {quiz.timeLimit > 0 && (
              <FormControl
                type="number"
                value={quiz.timeLimit}
                onChange={(e) =>
                  setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 0 })
                }
                style={{ width: "100px" }}
                className="me-2"
              />
            )}
            {quiz.timeLimit > 0 && <span>Minutes</span>}
          </div>

          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) =>
                setQuiz({ ...quiz, multipleAttempts: e.target.checked })
              }
            />
            {quiz.multipleAttempts && (
              <div className="ms-4 mt-2">
                <label className="form-label">How Many Attempts</label>
                <FormControl
                  type="number"
                  value={quiz.howManyAttempts}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      howManyAttempts: parseInt(e.target.value) || 1,
                    })
                  }
                  style={{ width: "100px" }}
                />
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Show Correct Answers</label>
            <FormControl
              value={quiz.showCorrectAnswers}
              onChange={(e) =>
                setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Access Code</label>
            <FormControl
              value={quiz.accessCode}
              onChange={(e) =>
                setQuiz({ ...quiz, accessCode: e.target.value })
              }
              placeholder="Leave blank for no access code"
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime}
              onChange={(e) =>
                setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
              }
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Webcam Required"
              checked={quiz.webcamRequired}
              onChange={(e) =>
                setQuiz({ ...quiz, webcamRequired: e.target.checked })
              }
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Lock Questions After Answering"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  lockQuestionsAfterAnswering: e.target.checked,
                })
              }
            />
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">Due Date</label>
              <FormControl
                type="date"
                value={quiz.dueDate}
                onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
              />
            </div>
            <div className="col">
              <label className="form-label fw-bold">Available Date</label>
              <FormControl
                type="date"
                value={quiz.availableDate}
                onChange={(e) =>
                  setQuiz({ ...quiz, availableDate: e.target.value })
                }
              />
            </div>
            <div className="col">
              <label className="form-label fw-bold">Until Date</label>
              <FormControl
                type="date"
                value={quiz.untilDate}
                onChange={(e) =>
                  setQuiz({ ...quiz, untilDate: e.target.value })
                }
              />
            </div>
          </div>

          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              className="me-2"
              onClick={handleSaveAndPublish}
            >
              Save & Publish
            </Button>
            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      )}

      {activeTab === "questions" && qid !== "new" && (
        <QuestionEditor
          quizId={qid as string}
          onSave={handleSave}
          onSaveAndPublish={handleSaveAndPublish}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

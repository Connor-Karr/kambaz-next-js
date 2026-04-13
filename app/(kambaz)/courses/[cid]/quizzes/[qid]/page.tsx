"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as quizClient from "../client";
import { Button } from "react-bootstrap";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = (currentUser as any)?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await quizClient.findQuizById(qid as string);
      setQuiz(data);
    };
    fetchQuiz();
  }, [qid]);

  useEffect(() => {
    const fetchAttemptInfo = async () => {
      if (!isFaculty && qid) {
        try {
          const latest = await quizClient.findLatestAttempt(qid as string);
          setLatestAttempt(latest);
          const attempts = await quizClient.findAttemptsForQuiz(qid as string);
          setAttemptCount(attempts.length);
        } catch (e) {
          // no attempts
        }
      }
    };
    fetchAttemptInfo();
  }, [qid, isFaculty]);

  const handlePublishToggle = async () => {
    if (!quiz) return;
    if (quiz.published) {
      await quizClient.unpublishQuiz(quiz._id);
      setQuiz({ ...quiz, published: false });
    } else {
      await quizClient.publishQuiz(quiz._id);
      setQuiz({ ...quiz, published: true });
    }
  };

  const canTakeQuiz = () => {
    if (!quiz) return false;
    if (quiz.multipleAttempts) {
      return attemptCount < (quiz.howManyAttempts || 1);
    }
    return attemptCount < 1;
  };

  if (!quiz) return <div className="p-3">Loading...</div>;

  return (
    <div id="wd-quiz-details" className="p-3">
      <div className="d-flex justify-content-end mb-3">
        {isFaculty && (
          <>
            <Button
              variant={quiz.published ? "secondary" : "success"}
              className="me-2"
              onClick={handlePublishToggle}
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}
            >
              Preview
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}
            >
              Edit
            </Button>
          </>
        )}
        {!isFaculty && (
          <>
            {canTakeQuiz() ? (
              <Button
                variant="danger"
                onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}
              >
                Start Quiz
              </Button>
            ) : (
              <span className="text-muted">No more attempts available</span>
            )}
          </>
        )}
      </div>

      <hr />
      <h2>{quiz.title}</h2>

      <div className="mt-3">
        <table className="table">
          <tbody>
            <tr>
              <td className="fw-bold text-end" style={{ width: "250px" }}>Quiz Type</td>
              <td>{quiz.quizType || "Graded Quiz"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end">Points</td>
              <td>{quiz.points || 0}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end">Assignment Group</td>
              <td>{quiz.assignmentGroup || "Quizzes"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end">Shuffle Answers</td>
              <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end">Time Limit</td>
              <td>{quiz.timeLimit || 20} Minutes</td>
            </tr>
            <tr>
              <td className="fw-bold text-end">Multiple Attempts</td>
              <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
            </tr>
            {quiz.multipleAttempts && (
              <tr>
                <td className="fw-bold text-end">How Many Attempts</td>
                <td>{quiz.howManyAttempts || 1}</td>
              </tr>
            )}
            <tr>
              <td className="fw-bold text-end">Show Correct Answers</td>
              <td>{quiz.showCorrectAnswers || "Immediately"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end">Access Code</td>
              <td>{quiz.accessCode || "None"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end">One Question at a Time</td>
              <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end">Webcam Required</td>
              <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end">Lock Questions After Answering</td>
              <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end">Due Date</td>
              <td>{quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "N/A"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end">Available Date</td>
              <td>{quiz.availableDate ? new Date(quiz.availableDate).toLocaleDateString() : "N/A"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-end">Until Date</td>
              <td>{quiz.untilDate ? new Date(quiz.untilDate).toLocaleDateString() : "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {!isFaculty && latestAttempt && (
        <div className="mt-4">
          <h4>Last Attempt</h4>
          <p>
            <strong>Score:</strong> {latestAttempt.score} / {quiz.points || 0}
          </p>
          <p>
            <strong>Submitted:</strong>{" "}
            {new Date(latestAttempt.submittedAt).toLocaleString()}
          </p>
          <p>
            <strong>Attempts used:</strong> {attemptCount} / {quiz.multipleAttempts ? quiz.howManyAttempts : 1}
          </p>
          <Button
            variant="outline-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview?review=true`)}
          >
            View Results
          </Button>
        </div>
      )}
    </div>
  );
}

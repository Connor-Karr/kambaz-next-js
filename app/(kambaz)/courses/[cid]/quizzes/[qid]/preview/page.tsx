"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as quizClient from "../../client";
import { Button, Card, Form, FormControl, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isReview = searchParams.get("review") === "true";

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = (currentUser as any)?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempt, setAttempt] = useState<any>(null);
  const [reviewAttempt, setReviewAttempt] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const quizData = await quizClient.findQuizById(qid as string);
      setQuiz(quizData);
      const questionData = await quizClient.findQuestionsForQuiz(qid as string);
      setQuestions(questionData);

      if (quizData.timeLimit && quizData.timeLimit > 0 && !isReview) {
        setTimeLeft(quizData.timeLimit * 60);
      }

      if (isReview && !isFaculty) {
        try {
          const latest = await quizClient.findLatestAttempt(qid as string);
          if (latest) {
            setReviewAttempt(latest);
            const answerMap: any = {};
            latest.answers.forEach((a: any) => {
              answerMap[a.question] = a.answer;
            });
            setAnswers(answerMap);
            setSubmitted(true);
          }
        } catch (e) {
          // no previous attempt
        }
      }
    };
    fetchData();
  }, [qid, isReview]);

  // Timer
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev !== null && prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev !== null ? prev - 1 : null;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    const answerArray = questions.map((q) => ({
      question: q._id,
      answer: answers[q._id] !== undefined ? answers[q._id] : null,
    }));

    if (isFaculty) {
      // Faculty preview - grade locally without saving
      let score = 0;
      const gradedAnswers = answerArray.map((sa) => {
        const question = questions.find((q) => q._id === sa.question);
        if (!question) return { ...sa, correct: false };
        let isCorrect = false;
        if (question.questionType === "Multiple Choice") {
          const correctChoice = question.choices.find((c: any) => c.isCorrect);
          isCorrect = correctChoice && sa.answer === correctChoice.text;
        } else if (question.questionType === "True False") {
          isCorrect = sa.answer === question.trueFalseAnswer;
        } else if (question.questionType === "Fill in the Blank") {
          const userAnswer = (sa.answer || "").toString().trim().toLowerCase();
          isCorrect = question.blanks.some(
            (b: string) => b.trim().toLowerCase() === userAnswer
          );
        }
        if (isCorrect) score += question.points || 0;
        return { ...sa, correct: isCorrect };
      });
      setAttempt({ answers: gradedAnswers, score });
      setSubmitted(true);
    } else {
      // Student - submit to server
      try {
        const result = await quizClient.submitAttempt(qid as string, answerArray);
        setAttempt(result);
        setSubmitted(true);
      } catch (e: any) {
        alert(e.response?.data?.message || "Error submitting quiz");
      }
    }
  };

  const getAnswerResult = (questionId: string) => {
    if (reviewAttempt) {
      const a = reviewAttempt.answers.find((a: any) => a.question === questionId);
      return a ? a.correct : null;
    }
    if (attempt) {
      const a = attempt.answers.find((a: any) => a.question === questionId);
      return a ? a.correct : null;
    }
    return null;
  };

  if (!quiz || questions.length === 0) {
    return (
      <div className="p-3">
        {quiz && questions.length === 0 ? (
          <div>
            <h3>{quiz.title}</h3>
            <p>This quiz has no questions.</p>
            <Button
              variant="secondary"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
            >
              Back to Quiz Details
            </Button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div id="wd-quiz-preview" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          {quiz.title}
          {isFaculty && !isReview && (
            <span className="text-muted fs-5 ms-2">(Preview)</span>
          )}
          {isReview && (
            <span className="text-muted fs-5 ms-2">(Review)</span>
          )}
        </h2>
        {timeLeft !== null && !submitted && (
          <div className="fs-5">
            <strong>Time Left: </strong>
            <span className={timeLeft < 60 ? "text-danger" : ""}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      {submitted && (
        <Alert variant={isFaculty ? "info" : "success"} className="mb-3">
          <strong>Score: </strong>
          {(attempt?.score ?? reviewAttempt?.score ?? 0)} / {totalPoints}
        </Alert>
      )}

      {isFaculty && !submitted && (
        <Alert variant="warning" className="mb-3">
          This is a preview of the published quiz. Answers are not saved.
        </Alert>
      )}

      {/* Question navigation sidebar */}
      <div className="d-flex">
        <div className="me-3" style={{ minWidth: "120px" }}>
          <h6>Questions</h6>
          {questions.map((q, i) => {
            const result = getAnswerResult(q._id);
            return (
              <div
                key={q._id}
                className={`p-2 mb-1 border rounded text-center ${
                  i === currentIndex ? "bg-danger text-white" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setCurrentIndex(i)}
              >
                Q{i + 1}
                {submitted && result !== null && (
                  <span className="ms-1">
                    {result ? (
                      <FaCheckCircle className="text-success" />
                    ) : (
                      <FaTimesCircle className="text-danger" />
                    )}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Current question */}
        <div className="flex-grow-1">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <span>
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span>{currentQuestion.points} pts</span>
            </Card.Header>
            <Card.Body>
              <h5>{currentQuestion.title}</h5>
              <p>{currentQuestion.question}</p>

              {/* Multiple Choice */}
              {currentQuestion.questionType === "Multiple Choice" && (
                <div>
                  {(currentQuestion.choices || []).map(
                    (choice: any, i: number) => {
                      const isSelected = answers[currentQuestion._id] === choice.text;
                      const result = getAnswerResult(currentQuestion._id);
                      let borderClass = "";
                      if (submitted) {
                        if (choice.isCorrect) borderClass = "border-success";
                        else if (isSelected && !choice.isCorrect)
                          borderClass = "border-danger";
                      }
                      return (
                        <div
                          key={i}
                          className={`p-2 mb-2 border rounded ${borderClass}`}
                        >
                          <Form.Check
                            type="radio"
                            name={`mc-${currentQuestion._id}`}
                            label={choice.text}
                            checked={isSelected}
                            onChange={() =>
                              handleAnswerChange(
                                currentQuestion._id,
                                choice.text
                              )
                            }
                            disabled={submitted}
                          />
                          {submitted && choice.isCorrect && (
                            <FaCheckCircle className="text-success ms-2" />
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              {/* True/False */}
              {currentQuestion.questionType === "True False" && (
                <div>
                  {[true, false].map((val) => {
                    const isSelected = answers[currentQuestion._id] === val;
                    let borderClass = "";
                    if (submitted) {
                      if (currentQuestion.trueFalseAnswer === val)
                        borderClass = "border-success";
                      else if (isSelected && currentQuestion.trueFalseAnswer !== val)
                        borderClass = "border-danger";
                    }
                    return (
                      <div
                        key={String(val)}
                        className={`p-2 mb-2 border rounded ${borderClass}`}
                      >
                        <Form.Check
                          type="radio"
                          name={`tf-${currentQuestion._id}`}
                          label={val ? "True" : "False"}
                          checked={isSelected}
                          onChange={() =>
                            handleAnswerChange(currentQuestion._id, val)
                          }
                          disabled={submitted}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Fill in the Blank */}
              {currentQuestion.questionType === "Fill in the Blank" && (
                <div>
                  <FormControl
                    value={answers[currentQuestion._id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(currentQuestion._id, e.target.value)
                    }
                    placeholder="Type your answer here"
                    disabled={submitted}
                  />
                  {submitted && (
                    <div className="mt-2 text-muted small">
                      Correct answers:{" "}
                      {(currentQuestion.blanks || []).join(", ")}
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Navigation buttons */}
          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="secondary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >
              Previous
            </Button>
            {currentIndex < questions.length - 1 ? (
              <Button
                variant="secondary"
                onClick={() => setCurrentIndex(currentIndex + 1)}
              >
                Next
              </Button>
            ) : !submitted ? (
              <Button variant="danger" onClick={handleSubmit}>
                Submit Quiz
              </Button>
            ) : (
              <div className="d-flex">
                {isFaculty && (
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() =>
                      router.push(
                        `/courses/${cid}/quizzes/${qid}/editor`
                      )
                    }
                  >
                    Edit Quiz
                  </Button>
                )}
                <Button
                  variant="secondary"
                  onClick={() =>
                    router.push(`/courses/${cid}/quizzes/${qid}`)
                  }
                >
                  Back to Quiz Details
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

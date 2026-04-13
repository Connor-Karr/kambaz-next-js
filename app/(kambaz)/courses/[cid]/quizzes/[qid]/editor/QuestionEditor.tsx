"use client";

import { useState, useEffect } from "react";
import * as quizClient from "../../client";
import {
  Button,
  FormControl,
  Form,
  ListGroup,
  ListGroupItem,
  Card,
} from "react-bootstrap";
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";

interface QuestionEditorProps {
  quizId: string;
  onSave: () => void;
  onSaveAndPublish: () => void;
  onCancel: () => void;
}

export default function QuestionEditor({
  quizId,
  onSave,
  onSaveAndPublish,
  onCancel,
}: QuestionEditorProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const fetchQuestions = async () => {
    const data = await quizClient.findQuestionsForQuiz(quizId);
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const handleAddQuestion = async () => {
    const newQuestion = {
      title: "New Question",
      questionType: "Multiple Choice",
      points: 10,
      question: "New Question",
      choices: [
        { text: "Option 1", isCorrect: true },
        { text: "Option 2", isCorrect: false },
        { text: "Option 3", isCorrect: false },
        { text: "Option 4", isCorrect: false },
      ],
      trueFalseAnswer: true,
      blanks: [""],
    };
    const created = await quizClient.createQuestion(quizId, newQuestion);
    setQuestions([...questions, created]);
    setEditingId(created._id);
    setEditingQuestion({ ...created });
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await quizClient.deleteQuestion(quizId, questionId);
    setQuestions(questions.filter((q) => q._id !== questionId));
    if (editingId === questionId) {
      setEditingId(null);
      setEditingQuestion(null);
    }
  };

  const handleEditClick = (question: any) => {
    setEditingId(question._id);
    setEditingQuestion({ ...question });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingQuestion(null);
  };

  const handleSaveQuestion = async () => {
    if (!editingQuestion) return;
    await quizClient.updateQuestion(quizId, editingQuestion);
    setQuestions(
      questions.map((q) =>
        q._id === editingQuestion._id ? editingQuestion : q
      )
    );
    setEditingId(null);
    setEditingQuestion(null);
  };

  // Choice helpers for Multiple Choice
  const addChoice = () => {
    if (!editingQuestion) return;
    setEditingQuestion({
      ...editingQuestion,
      choices: [
        ...editingQuestion.choices,
        { text: "", isCorrect: false },
      ],
    });
  };

  const removeChoice = (index: number) => {
    if (!editingQuestion) return;
    const newChoices = editingQuestion.choices.filter(
      (_: any, i: number) => i !== index
    );
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const updateChoiceText = (index: number, text: string) => {
    if (!editingQuestion) return;
    const newChoices = editingQuestion.choices.map((c: any, i: number) =>
      i === index ? { ...c, text } : c
    );
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const setCorrectChoice = (index: number) => {
    if (!editingQuestion) return;
    const newChoices = editingQuestion.choices.map((c: any, i: number) => ({
      ...c,
      isCorrect: i === index,
    }));
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  // Blank helpers for Fill in the Blank
  const addBlank = () => {
    if (!editingQuestion) return;
    setEditingQuestion({
      ...editingQuestion,
      blanks: [...(editingQuestion.blanks || []), ""],
    });
  };

  const removeBlank = (index: number) => {
    if (!editingQuestion) return;
    const newBlanks = editingQuestion.blanks.filter(
      (_: any, i: number) => i !== index
    );
    setEditingQuestion({ ...editingQuestion, blanks: newBlanks });
  };

  const updateBlank = (index: number, text: string) => {
    if (!editingQuestion) return;
    const newBlanks = editingQuestion.blanks.map((b: string, i: number) =>
      i === index ? text : b
    );
    setEditingQuestion({ ...editingQuestion, blanks: newBlanks });
  };

  const renderQuestionPreview = (question: any) => (
    <div>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <strong>{question.title}</strong>
          <span className="text-muted ms-2">({question.questionType})</span>
          <span className="ms-2 badge bg-secondary">{question.points} pts</span>
        </div>
        <div>
          <Button
            variant="link"
            size="sm"
            onClick={() => handleEditClick(question)}
          >
            <FaPencilAlt />
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-danger"
            onClick={() => handleDeleteQuestion(question._id)}
          >
            <FaTrash />
          </Button>
        </div>
      </div>
      <p className="text-muted mb-0 small mt-1">{question.question}</p>
    </div>
  );

  const renderQuestionEditForm = () => {
    if (!editingQuestion) return null;

    return (
      <Card className="mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex align-items-center flex-grow-1 me-3">
              <FormControl
                value={editingQuestion.title}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    title: e.target.value,
                  })
                }
                placeholder="Question Title"
                className="me-2"
              />
              <Form.Select
                value={editingQuestion.questionType}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    questionType: e.target.value,
                  })
                }
                style={{ width: "200px" }}
                className="me-2"
              >
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True False">True/False</option>
                <option value="Fill in the Blank">Fill in the Blank</option>
              </Form.Select>
            </div>
            <div className="d-flex align-items-center">
              <label className="me-2 fw-bold">pts:</label>
              <FormControl
                type="number"
                value={editingQuestion.points}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    points: parseInt(e.target.value) || 0,
                  })
                }
                style={{ width: "80px" }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Question</label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editingQuestion.question}
              onChange={(e) =>
                setEditingQuestion({
                  ...editingQuestion,
                  question: e.target.value,
                })
              }
            />
          </div>

          {/* Multiple Choice */}
          {editingQuestion.questionType === "Multiple Choice" && (
            <div className="mb-3">
              <label className="form-label fw-bold">Answers</label>
              {(editingQuestion.choices || []).map(
                (choice: any, index: number) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-2"
                  >
                    <Form.Check
                      type="radio"
                      name="correctChoice"
                      checked={choice.isCorrect}
                      onChange={() => setCorrectChoice(index)}
                      className="me-2"
                      label=""
                    />
                    <span
                      className={`me-2 small ${
                        choice.isCorrect ? "text-success fw-bold" : "text-muted"
                      }`}
                    >
                      {choice.isCorrect ? "Correct" : "Possible"} Answer
                    </span>
                    <FormControl
                      value={choice.text}
                      onChange={(e) =>
                        updateChoiceText(index, e.target.value)
                      }
                      className="me-2"
                    />
                    <Button
                      variant="link"
                      className="text-danger"
                      onClick={() => removeChoice(index)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                )
              )}
              <Button variant="link" onClick={addChoice}>
                <FaPlus className="me-1" /> Add Answer
              </Button>
            </div>
          )}

          {/* True/False */}
          {editingQuestion.questionType === "True False" && (
            <div className="mb-3">
              <label className="form-label fw-bold">Correct Answer</label>
              <div>
                <Form.Check
                  type="radio"
                  name="trueFalse"
                  label="True"
                  checked={editingQuestion.trueFalseAnswer === true}
                  onChange={() =>
                    setEditingQuestion({
                      ...editingQuestion,
                      trueFalseAnswer: true,
                    })
                  }
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  name="trueFalse"
                  label="False"
                  checked={editingQuestion.trueFalseAnswer === false}
                  onChange={() =>
                    setEditingQuestion({
                      ...editingQuestion,
                      trueFalseAnswer: false,
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* Fill in the Blank */}
          {editingQuestion.questionType === "Fill in the Blank" && (
            <div className="mb-3">
              <label className="form-label fw-bold">
                Possible Correct Answers
              </label>
              {(editingQuestion.blanks || []).map(
                (blank: string, index: number) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-2"
                  >
                    <span className="me-2 text-muted small">
                      Possible Answer {index + 1}
                    </span>
                    <FormControl
                      value={blank}
                      onChange={(e) => updateBlank(index, e.target.value)}
                      className="me-2"
                    />
                    <Button
                      variant="link"
                      className="text-danger"
                      onClick={() => removeBlank(index)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                )
              )}
              <Button variant="link" onClick={addBlank}>
                <FaPlus className="me-1" /> Add Possible Answer
              </Button>
            </div>
          )}

          <hr />
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSaveQuestion}>
              Update Question
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Points: {totalPoints}</h5>
        <Button variant="outline-danger" onClick={handleAddQuestion}>
          <FaPlus className="me-1" /> New Question
        </Button>
      </div>

      <ListGroup className="mb-3">
        {questions.map((question: any) => (
          <ListGroupItem key={question._id} className="p-3">
            {editingId === question._id
              ? renderQuestionEditForm()
              : renderQuestionPreview(question)}
          </ListGroupItem>
        ))}
      </ListGroup>

      {questions.length === 0 && (
        <div className="text-center text-muted p-5">
          <p>No questions yet. Click <strong>New Question</strong> to add one.</p>
        </div>
      )}

      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" className="me-2" onClick={onSaveAndPublish}>
          Save & Publish
        </Button>
        <Button variant="danger" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { RootState } from "../store";
import * as courseClient from "../courses/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const isFaculty = (currentUser as any)?.role === "FACULTY";

  // Enrollment toggle state
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  const fetchCourses = async () => {
    try {
      const myCourses = await courseClient.findMyCourses();
      dispatch(setCourses(myCourses));
      setEnrolledCourseIds(myCourses.map((c: any) => c._id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const all = await courseClient.fetchAllCourses();
      setAllCourses(all);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchAllCourses();
  }, [currentUser]);

  const onAddNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
    setEnrolledCourseIds([...enrolledCourseIds, newCourse._id]);
    // Also refresh allCourses so the new course shows in the list
    fetchAllCourses();
  };

  const onDeleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
    setEnrolledCourseIds(enrolledCourseIds.filter((id) => id !== courseId));
    fetchAllCourses();
  };

  const onUpdateCourse = async () => {
    await courseClient.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c: any) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      )
    );
    fetchAllCourses();
  };

  const handleEnroll = async (courseId: string) => {
    await courseClient.enrollInCourse(courseId);
    // Refresh enrolled courses from server
    const myCourses = await courseClient.findMyCourses();
    dispatch(setCourses(myCourses));
    setEnrolledCourseIds(myCourses.map((c: any) => c._id));
  };

  const handleUnenroll = async (courseId: string) => {
    await courseClient.unenrollFromCourse(courseId);
    // Refresh enrolled courses from server
    const myCourses = await courseClient.findMyCourses();
    dispatch(setCourses(myCourses));
    setEnrolledCourseIds(myCourses.map((c: any) => c._id));
  };

  const toggleEnrollments = () => {
    setShowAllCourses(!showAllCourses);
  };

  const displayedCourses = showAllCourses ? allCourses : courses;

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button
          className="btn btn-primary float-end"
          onClick={toggleEnrollments}
        >
          Enrollments
        </button>
      </h1>
      <hr />
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </>
      )}
      <hr />
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Published Courses"} ({displayedCourses.length})
      </h2>
      <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((c: any) => (
            <div
              key={c._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                href={`/courses/${c._id}/home`}
              >
                <div className="card rounded-3 overflow-hidden">
                  <img
                    src="/images/reactjs.jpg"
                    width="100%"
                    height={160}
                    alt="course"
                  />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {c.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {c.description}
                    </p>
                    <button className="btn btn-primary">Go</button>

                    {showAllCourses && (
                      enrolledCourseIds.includes(c._id) ? (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            handleUnenroll(c._id);
                          }}
                          className="btn btn-danger float-end"
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            handleEnroll(c._id);
                          }}
                          className="btn btn-success float-end"
                        >
                          Enroll
                        </button>
                      )
                    )}

                    {!showAllCourses && isFaculty && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(c._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(c);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

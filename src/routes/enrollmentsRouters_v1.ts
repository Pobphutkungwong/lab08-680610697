import { Router, type Request, type Response } from "express";
import {
  zCourseId,
  zCoursePostBody,
  zCoursePutBody,
  zStudentId,
} from "../libs/zodValidators.js";

import type { Student, Course } from "../libs/types.js";

// import database
import { courses, enrollments, students } from "../db/db.js";

const router = Router();
// /api/v1/enrollments/

router.get("/", (req: Request, res: Response) => {
  try {
    const courseId = req.query.courseId;
    const studentId = req.query.studentId;
    const pcourseId = zCourseId.safeParse(courseId);
    const pstudentId = zStudentId.safeParse(studentId);

    if (pcourseId.success && !pstudentId.success) {
      let studentRes: any[] = [];
      enrollments.filter((e) => e.courseId == String(courseId)).filter((e) => {
        students.filter((s) => e.studentId == s.studentId).forEach(v => {
          studentRes.push({
            studentId: v.studentId,
            firstName: v.firstName,
            lastName: v.lastName,
            program: v.program
          })
        })
      });

      return res.status(200).json({
        ok: true,
        students: studentRes,
      });

    } else if (pstudentId.success && !pcourseId.success) {
      const coursesfill = enrollments.filter((e) => e.studentId == studentId);

      const Courses: any[] = [];
      courses.filter((e) => coursesfill.find((c) => e.courseId == c.courseId)).forEach((v) => {
        Courses.push({
          courseNo: v.courseId,
          title: v.courseTitle
        })
      });

      return res.status(200).json({
        ok: true,
        Courses
      });
    } else {
      return res.status(400).json({
        ok: false,
        message: "Please provide either studentId or courseNo and not both!",
      });
    }
  } catch (e) {
    return res.status(500).json({
      ok: false,
      message: "Something is wrong, please try again",
    });

  }
}
);

router.post("/", async (req: Request, res: Response) => {
  return res.status(500).json({
    success: false,
    message: "POST /api/v2/courses has not been implemented yet",
  });
});

router.put("/", (req: Request, res: Response) => {
  return res.status(500).json({
    success: false,
    message: "PUT /api/v2/courses has not been implemented yet",
  });
});

// DELETE /api/v2/courses, body = {coursesId}
router.delete("/", (req: Request, res: Response) => {
  return res.status(500).json({
    success: false,
    message: "DELETE /api/v2/courses has not been implemented yet",
  });
});

export default router;
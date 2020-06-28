const baseUrl = "/api/courses";

export const CourseService = {
  // Get course list
  getCourses: async function(courseId = undefined) {
    let url = baseUrl;
    if (courseId !== undefined) {
      url += "?course_id=" + courseId;
    }
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("CourseService: Network response was not ok.");
    } else {
      return res.json();
    }
  }
};

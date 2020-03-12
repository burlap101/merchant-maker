const url = "api/courses/";

export class CourseService {
  // Get course list
  static async getCourses() {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("CourseService: Network response was not ok.");
    } else {
      let data = await res.json();
      return data.map(course => ({ ...course }));
    }
  }
}

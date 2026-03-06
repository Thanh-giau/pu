import pool from "../db.js";

export const getAllCourses = async () => {
  const [rows] = await pool.query("SELECT * FROM courses");
  return rows;
};

export const addCourse = async (course) => {
  const { title, description, mentor_name } = course;
  const [result] = await pool.query(
    "INSERT INTO courses (title, description, mentor_name) VALUES (?, ?, ?)",
    [title, description, mentor_name]
  );
  return { id: result.insertId, ...course };
};

export const updateCourse = async (id, course) => {
  const { title, description, mentor_name } = course;
  await pool.query(
    "UPDATE courses SET title=?, description=?, mentor_name=? WHERE id=?",
    [title, description, mentor_name, id]
  );
  return { id, ...course };
};

export const deleteCourse = async (id) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Xóa tiến độ học tập liên quan
    await connection.query("DELETE FROM progress WHERE course_id = ?", [id]);

    // 2. Xóa enrollment liên quan
    await connection.query("DELETE FROM enrollments WHERE course_id = ?", [id]);

    // 3. Xóa khóa học
    await connection.query("DELETE FROM courses WHERE id = ?", [id]);

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

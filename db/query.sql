SELECT * course_name.name, course_names.departments, department.name
FROM course_names
JOIN department ON course_names.department = department.id;

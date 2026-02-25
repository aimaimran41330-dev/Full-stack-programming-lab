class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }

    getDetails() {
        return `
        <div class="student-card">
            <strong>ID:</strong> ${this.id} <br>
            <strong>Name:</strong> ${this.name} <br>
            <strong>Semester:</strong> ${this.semester} <br>
            <strong>Courses:</strong> ${this.courses.join(", ")}
        </div>
        `;
    }
}

const students = [];

function addStudent() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const semester = document.getElementById("semester").value;
    const coursesInput = document.getElementById("courses").value;

    if (!id || !name || !semester || !coursesInput) {
        alert("Please fill all fields");
        return;
    }

    const courses = coursesInput.split(",");

    const newStudent = new Student(id, name, semester, courses);
    students.push(newStudent);

    displayStudents();
    clearForm();
}

function displayStudents() {
    let output = "";
    students.forEach(student => {
        output += student.getDetails();
    });

    document.getElementById("studentList").innerHTML = output;
}

function clearForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("semester").value = "";
    document.getElementById("courses").value = "";
}
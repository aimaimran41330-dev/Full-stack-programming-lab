class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        const today = new Date();
        this._id = id;
        this._name = name;
        this._semester = semester;
        this._courses = Array.isArray(courses) ? courses : courses.split(',').map(course => course.trim());
        this._createdAt = today.toLocaleDateString();
    }

    get id() { return this._id; }
    get name() { return this._name; }
    get semester() { return this._semester; }
    get courses() { return this._courses; }
    get createdAt() { return this._createdAt; }

    displayDetails() {
        return `
            <div class="student-card" data-id="${this.id}">
                <h3>🆔 ${this.name}</h3>
                <div class="student-info">
                    <div><strong>ID:</strong> ${this.id}</div>
                    <div><strong>Semester:</strong> ${this.semester}</div>
                    <div><strong>Enrolled:</strong> ${this.createdAt}</div>
                </div>
                <div class="courses-list">
                    <strong>📚 Courses (${this.courses.length}):</strong>
                    ${this.courses.map(course => `<span>${course}</span>`).join('')}
                </div>
            </div>
        `;
    }
}

const students = [];
const studentsList = document.getElementById('studentsList');
const studentForm = document.getElementById('studentForm');
const studentCount = document.getElementById('studentCount');

// Create 3 sample students
const sampleStudents = [
    new Student('STU001', 'Aima Imran', 'Fall 2026', ['Calculus III', 'Data Structures', 'Web Development']),
    new Student('STU002', 'Ahmed Khan', 'Spring 2026', ['Algorithms', 'Database Systems', 'Mobile Apps']),
    new Student('STU003', 'Sara Malik', 'Fall 2026', ['AI Fundamentals', 'Software Engineering', 'Cloud Computing'])
];

// Initialize with sample students
function initializeStudents() {
    sampleStudents.forEach((student, index) => {
        students.push(student);
        setTimeout(() => {
            displayStudent(student);
            animateStudentCard(index);
        }, index * 200);
    });
    updateStudentCount();
}

// Form submission
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('studentId').value;
    const name = document.getElementById('studentName').value;
    const semester = document.getElementById('studentSemester').value;
    const courses = document.getElementById('studentCourses').value;

    const newStudent = new Student(id, name, semester, courses);
    students.push(newStudent);
    
    displayStudent(newStudent);
    animateStudentCard(students.length - 1);
    updateStudentCount();
    
    studentForm.reset();
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
});

// Display single student
function displayStudent(student) {
    studentsList.insertAdjacentHTML('beforeend', student.displayDetails());
}

// Animate student card entrance
function animateStudentCard(index) {
    const cards = document.querySelectorAll('.student-card');
    const card = cards[cards.length - 1];
    setTimeout(() => {
        card.classList.add('show');
    }, 100);
}

// Update student count
function updateStudentCount() {
    studentCount.textContent = students.length;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Animate form entrance
    setTimeout(() => {
        document.querySelector('.form-section').classList.add('slide-in');
    }, 500);
    
    initializeStudents();
});

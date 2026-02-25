// SET for unique courses
const registeredCourses = new Set();

let courseCounter = 0;
let totalAttempts = 0;

// Add course to Set (Core functionality)
function registerCourse(courseId, courseTitle) {
    totalAttempts++;
    const courseKey = courseId.toUpperCase().trim();
    
    logSetOperation(`🔄 Attempting to add: ${courseId} - ${courseTitle}`);
    
    if (registeredCourses.has(courseKey)) {
        // DUPLICATE - Set prevents it automatically
        logSetOperation(`❌ DUPLICATE DETECTED: ${courseId} already exists (.has())`, 'duplicate');
        showCourseStatus(courseId, courseTitle, 'duplicate');
        return false;
    } else {
        // NEW COURSE - Add to Set
        registeredCourses.add(courseKey);
        courseCounter++;
        logSetOperation(`✅ ADDED (${registeredCourses.size}): ${courseId} (.add())`, 'success');
        showCourseStatus(courseId, courseTitle, 'added');
        displayAllCourses();
        updateStats();
        return true;
    }
}

// Display single course with status
function showCourseStatus(courseId, courseTitle, status) {
    const coursesGrid = document.getElementById('coursesList');
    const courseCard = document.createElement('div');
    courseCard.className = `course-card ${status}`;
    
    courseCard.innerHTML = `
        <h3>📖 ${courseId}</h3>
        <div class="course-status status-${status}">
            ${status === 'added' ? '✅ Successfully Added' : '⚠️ Already Registered'}
        </div>
        <div style="color: #666; font-size: 1rem; margin-top: 10px;">
            ${courseTitle}
        </div>
    `;
    
    coursesGrid.insertAdjacentElement('afterbegin', courseCard);
    
    // Animate entrance
    setTimeout(() => courseCard.classList.add('show'), 100);
    
    // Auto remove status cards after 4 seconds
    if (status === 'added' || status === 'duplicate') {
        setTimeout(() => {
            courseCard.style.transition = 'all 0.5s ease';
            courseCard.style.opacity = '0';
            courseCard.style.transform = 'translateY(-20px)';
            setTimeout(() => courseCard.remove(), 500);
        }, status === 'duplicate' ? 4000 : 2000);
    }
}

// Display ALL courses from Set (for...of loop)
function displayAllCourses() {
    const coursesGrid = document.getElementById('coursesList');
    coursesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #666; padding: 40px;">📚 No courses to display (temporary)</div>';
    
    setTimeout(() => {
        coursesGrid.innerHTML = '';
        let index = 0;
        
        for (const courseId of registeredCourses) { // for...of REQUIRED
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <h3>📖 ${courseId}</h3>
                <div style="color: #4facfe; font-weight: bold; font-size: 1.1rem;">
                    ${courseNames[courseId] || 'Advanced Course'}
                </div>
                <div style="color: #666; margin-top: 10px; font-size: 0.95rem;">
                    Registered: ${new Date().toLocaleDateString()}
                </div>
            `;
            coursesGrid.appendChild(courseCard);
            
            setTimeout(() => courseCard.classList.add('show'), index * 100);
            index++;
        }
    }, 500);
}

// Course names mapping for display
const courseNames = {
    'CS-401': 'Web Development',
    'CS-402': 'Data Structures',
    'CS-403': 'Algorithms',
    'CS-404': 'Database Systems',
    'CS-405': 'Software Engineering'
};

// Update statistics (.size property)
function updateStats() {
    document.getElementById('totalCourses').textContent = registeredCourses.size;
    document.getElementById('uniqueCount').textContent = registeredCourses.size;
}

// Set operation logging
function logSetOperation(message, type = 'success') {
    const logContainer = document.getElementById('setLog');
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = `
        <strong>[${timestamp}]</strong> 
        <span style="color: ${type === 'duplicate' ? '#ff6b6b' : '#4facfe'}">[Set.size: ${registeredCourses.size}]</span>
        ${message}
    `;
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Form submission
document.getElementById('courseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const courseId = document.getElementById('courseName').value;
    const courseTitle = document.getElementById('courseTitle').value;
    registerCourse(courseId, courseTitle);
    document.getElementById('courseForm').reset();
});

// Quick add buttons
document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const [courseId, courseTitle] = btn.dataset.course.split(',');
        registerCourse(courseId, courseTitle);
    });
});

// Clear all courses
document.getElementById('clearCourses').addEventListener('click', () => {
    registeredCourses.clear();
    courseCounter = 0;
    totalAttempts = 0;
    document.getElementById('coursesList').innerHTML = '';
    document.getElementById('setLog').innerHTML = '';
    updateStats();
    logSetOperation('🗑️ All courses cleared (.clear())');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.add-courses-section').classList.add('slide-in');
    }, 600);
    
    updateStats();
    
    // Demo: Add initial course
    setTimeout(() => {
        registerCourse('CS-101', 'Introduction to Programming');
    }, 1000);
});

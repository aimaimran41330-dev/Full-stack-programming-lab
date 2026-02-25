// Sample users data
const usersData = [
    { id: 1, name: 'Aima Imran', email: 'aima@univ.edu.pk', role: 'Student', dept: 'Computer Science' },
    { id: 2, name: 'Ahmed Khan', email: 'ahmed@univ.edu.pk', role: 'Lecturer', dept: 'Software Engineering' },
    { id: 3, name: 'Sara Malik', email: 'sara@univ.edu.pk', role: 'Student', dept: 'Data Science' },
    { id: 4, name: 'Ali Raza', email: 'ali@univ.edu.pk', role: 'Admin', dept: 'IT Services' },
    { id: 5, name: 'Fatima Noor', email: 'fatima@univ.edu.pk', role: 'Student', dept: 'Cyber Security' }
];

let currentUsers = [];

// PROMISE FUNCTION - Simulate 3 second server delay
function fetchUsers(shouldFail = false) {
    console.log('🌐 Promise created - Fetching users...');
    
    return new Promise((resolve, reject) => {
        const loadingSection = document.getElementById('loadingSection');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const loadingText = document.getElementById('loadingText');
        
        // Show loading
        loadingSection.classList.add('loading');
        loadingSpinner.style.display = 'block';
        loadingText.textContent = '⏳ Loading users from server... (3 seconds)';
        
        logPromise('Promise: Loading started...');
        
        setTimeout(() => {
            if (shouldFail) {
                // REJECT case
                logPromise('Promise: REJECTED - Server error!', 'error');
                reject(new Error('🚫 Server Error: Failed to fetch users data'));
            } else {
                // RESOLVE case
                logPromise('Promise: RESOLVED - Data loaded successfully!');
                resolve(usersData);
            }
            
            // Hide loading
            loadingSection.classList.remove('loading');
            loadingSpinner.style.display = 'none';
            loadingText.textContent = shouldFail ? '❌ Load failed!' : '✅ Ready!';
        }, 3000); // 3 seconds delay
    });
}

// .then() & .catch() chain
function handleFetchSuccess() {
    document.getElementById('statusIndicator').textContent = '🟡 Loading...';
    document.getElementById('statusIndicator').className = 'status';
    
    fetchUsers(false)
        .then(users => {
            console.log('✅ .then() - Success:', users);
            logPromise('.then(): Users received successfully');
            
            currentUsers = users;
            displayUsers(users);
            updateStats();
            
            document.getElementById('statusIndicator').textContent = '🟢 Success';
            document.getElementById('statusIndicator').className = 'status success';
        })
        .catch(error => {
            console.error('❌ .catch() - Error:', error);
            logPromise('.catch(): ' + error.message, 'error');
            
            showError(error.message);
            document.getElementById('statusIndicator').textContent = '🔴 Error';
            document.getElementById('statusIndicator').className = 'status error';
        });
}

function handleFetchFail() {
    document.getElementById('statusIndicator').textContent = '🟡 Loading...';
    fetchUsers(true)
        .then(users => {
            // This won't execute
        })
        .catch(error => {
            console.error('❌ Intentional fail:', error);
            showError(error.message);
            document.getElementById('statusIndicator').textContent = '🔴 Failed (Expected)';
            document.getElementById('statusIndicator').className = 'status error';
        });
}

// Display users
function displayUsers(users) {
    const usersGrid = document.getElementById('usersList');
    usersGrid.innerHTML = '';
    
    users.forEach((user, index) => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <div class="user-info">
                <div>🆔 ID: ${user.id}</div>
                <div>📧 ${user.email}</div>
                <div>👤 Role: ${user.role}</div>
                <div>🏢 ${user.dept}</div>
            </div>
        `;
        usersGrid.appendChild(userCard);
        
        // Staggered animation
        setTimeout(() => userCard.classList.add('show'), index * 150);
    });
}

// Show error
function showError(message) {
    const usersGrid = document.getElementById('usersList');
    usersGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px; font-size: 1.3rem; color: #ff6b6b;">
            <div style="font-size: 4rem; margin-bottom: 20px;">❌</div>
            <h3>Error Loading Users</h3>
            <p>${message}</p>
        </div>
    `;
}

// Update stats
function updateStats() {
    document.getElementById('usersCount').textContent = currentUsers.length;
}

// Promise logging
function logPromise(message, type = 'success') {
    const logContainer = document.getElementById('promiseLog');
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;
    logContainer.appendChild(logEntry);
    
    // Auto scroll
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Reset
function resetData() {
    currentUsers = [];
    document.getElementById('usersList').innerHTML = '';
    document.getElementById('promiseLog').innerHTML = '';
    document.getElementById('statusIndicator').textContent = '🟢 Ready';
    document.getElementById('statusIndicator').className = 'status';
    document.getElementById('loadingText').textContent = 'Ready to fetch data...';
    updateStats();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Animate entrance
    setTimeout(() => {
        document.querySelector('.controls-section').classList.add('slide-in');
    }, 600);
    
    // Button events
    document.getElementById('fetchSuccess').addEventListener('click', handleFetchSuccess);
    document.getElementById('fetchFail').addEventListener('click', handleFetchFail);
    document.getElementById('resetData').addEventListener('click', resetData);
    
    updateStats();
});

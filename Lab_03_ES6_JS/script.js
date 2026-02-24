// =========================
// Task 1 - Student Management System
// =========================
class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }
}

const s1 = new Student(1, "Ali", 5, ["JS", "HTML"]);
const s2 = new Student(2, "Sara", 6, ["CSS", "React"]);
const s3 = new Student(3, "Ahmed", 7, ["Node", "DB"]);

const students = [s1, s2, s3];

document.getElementById("students").innerHTML =
students.map(s =>
`ID: ${s.id}, Name: ${s.name}, Semester: ${s.semester}, Courses: ${s.courses.join(", ")}`
).join("<br>");


// =========================
// Task 2 - Shopping Cart
// =========================
function addToCart(...items) {
    return items;
}

const cart = addToCart("Laptop", "Mouse", "Keyboard");

const clonedCart = [...cart];

const [firstItem, ...remaining] = clonedCart;

document.getElementById("cart").innerHTML =
`Total Items: ${cart.length}<br>
First Item: ${firstItem}<br>
Cart: ${remaining.join(", ")}`;



// =========================
// Task 3 - Async Loader
// =========================
function fetchUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if(success) {
                resolve([
                    {name:"Ali"},
                    {name:"Sara"},
                    {name:"Ahmed"}
                ]);
            } else {
                reject("Failed to load users");
            }
        },3000);
    });
}

fetchUsers()
.then(users=>{
    document.getElementById("users").innerHTML =
    users.map(u=>u.name).join(", ");
})
.catch(error=>{
    document.getElementById("users").innerHTML = error;
});


// =========================
// Task 4 - Set
// =========================
const courseSet = new Set();
courseSet.add("AI");
courseSet.add("Web");
courseSet.add("AI");

let courseList = "";
for(let course of courseSet){
    courseList += course + " ";
}

document.getElementById("courses").innerHTML =
`Courses: ${courseList}<br>Total Unique: ${courseSet.size}`;



// =========================
// Task 5 - Map
// =========================
const productMap = new Map();

productMap.set(1,{name:"Laptop"});
productMap.set(2,{name:"Phone"});
productMap.set(3,{name:"Tablet"});
productMap.set(4,{name:"Watch"});
productMap.set(5,{name:"Camera"});

productMap.delete(5);

document.getElementById("products").innerHTML =
`Total Products: ${productMap.size}<br>
Search ID 2: ${productMap.get(2).name}`;



// =========================
// Task 6 - Mini Portal
// =========================
const studentMap = new Map();
studentMap.set(s1.id, s1);

const courseRegister = new Set(["AI","ML"]);

function saveData(){
    return new Promise(resolve=>{
        setTimeout(()=>resolve("Data Saved Successfully"),2000);
    });
}

saveData().then(msg=>{
    document.getElementById("portal").innerHTML =
    `Students: ${studentMap.size}<br>
Courses: ${courseRegister.size}<br>
${msg}`;
});



// =========================
// Task 7 - JSON
// =========================
const studentData = [
    {name:"Ali", age:21, semester:5, courses:["JS","HTML"]},
    {name:"Sara", age:22, semester:6, courses:["CSS","React"]},
    {name:"Ahmed", age:23, semester:7, courses:["Node","DB"]}
];

const jsonString = JSON.stringify(studentData);
const parsedData = JSON.parse(jsonString);

document.getElementById("jsonData").innerHTML =
parsedData.map(s=>{
    const {name, age, semester, courses} = s;
    return `Name: ${name}, Age: ${age}, Semester: ${semester}, Courses: ${courses.join(", ")}`;
}).join("<br>");
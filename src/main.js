import "./styles.css";

class infotask{
    constructor(title,detail,dueday, priority){
        this.title = title.trim();
        this.detail = detail?.trim?.() || '';
        this.dueday = dueday || '';
        this.priority = priority;
    }

}

class Project{
    constructor(title){
        this.title = title;
        this.data = [];
    }
    add(title, detail = '', dueday = '', priority){
        const task = new infotask(title,detail,dueday,priority);
        this.data.push(task);
    }
    remove(task){
        this.data = this.data.filter(project => project.title !== task);
    }
}

class main_storage{
    constructor(){
        this.storage = [];
    }
    add(title){
        const newproject = new Project(title);
        this.storage.push(newproject);
    }

    findbytitle(title){
        return this.storage.find(project => project.title === title);
    }
}

const main_Data = new main_storage();

// Add sample projects
main_Data.add("Web App");
main_Data.add("Study Plan");
main_Data.add("Grocery List");

// Add tasks to "Web App" project
const webApp = main_Data.findbytitle("Web App");
webApp.add("Setup backend", "Create server and database schema", "2025-07-25", "High");
webApp.add("Build frontend", "Design UI components", "2025-07-27", "Medium");

// Add tasks to "Study Plan"
const studyPlan = main_Data.findbytitle("Study Plan");
studyPlan.add("Review JS", "Closures, Promises, DOM", "2025-07-22", "High");
studyPlan.add("Practice DSA", "Leetcode & mock interviews", "2025-07-21", "High");

// Add tasks to "Grocery List"
const grocery = main_Data.findbytitle("Grocery List");
grocery.add("Buy milk", "Almond milk if available", "", "Low");
grocery.add("Buy veggies", "Carrots, spinach, and broccoli", "", "Medium");


display_project(main_Data);

let currentproject = null;

function display_project(dataset){
    const user = document.getElementById('user');
    console.log(document);
    while (user.firstChild) {
        user.removeChild(user.firstChild);
    }
    dataset.storage.forEach(project => {
        const buttonforproject = document.createElement('button');
        buttonforproject.textContent = project.title;
        buttonforproject.addEventListener('click', function(){
            currentproject = project;
            clearscreen();
            displaymain(project.title);
        });
        
        user.appendChild(buttonforproject);
    });
}

document.getElementById('submit').addEventListener('click', ()=>{
    if(!currentproject){
        alert("Please select a project first.");
        return;
    }

    const usertitle = document.getElementById('title').value.trim();
    const userdetail = document.getElementById('detail').value.trim();
    const userdueday = document.getElementById('dueday').value;
    const userstatus = document.getElementById('status').value;

    if(!usertitle){
        alert("Title is required");
        return;
    }

    currentproject.add(usertitle,userdetail,userdueday,userstatus);
    
    user_input.style.display = "none";
    document.getElementById('title').value = '';
    document.getElementById('detail').value = '';
    document.getElementById('dueday').value = '';
    document.getElementById('status').value= 'Low';

    clearscreen();
    displaymain(currentproject.title);
})



function displaymain(title){
    const output = document.getElementById('maindata');
    main_Data.findbytitle(title).data.forEach(task => {
        const maindiv = document.createElement('div');
        maindiv.id = `Maindiv${task.title}`;

        const div1 = document.createElement('div');
        const h = document.createElement("h3");
        h.textContent = task.title;
        const p = document.createElement("p");
        p.textContent = task.detail;

        const removedata = document.createElement('button');
        removedata.textContent="Delete Tasks";
        removedata.addEventListener('click' ,function(){
            main_Data.findbytitle(title).remove(task.title);
            output.removeChild(document.getElementById(`Maindiv${task.title}`));
        })

        div1.appendChild(h);
        div1.appendChild(p);
        div1.appendChild(removedata);
        maindiv.appendChild(div1);

        const div2 = document.createElement('div');
        const p1 = document.createElement("p");
        p1.textContent = task.dueday;
        const p2 = document.createElement("p");
        p2.textContent = task.priority;
        div2.appendChild(p1);
        div2.appendChild(p2);
        maindiv.appendChild(div2);
        output.appendChild(maindiv);
    })
    
}

function clearscreen(){
    const element = document.getElementById('maindata');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
}
}


const allinone = document.getElementById('all');
allinone.addEventListener("click", function(){
    clearscreen();
    main_Data.storage.forEach(project => {
        displaymain(project.title);
    })
})

const today = document.getElementById('today');
today.addEventListener('click', function(){
    clearscreen();
    const now = new Date();
    const todayindetail = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const output = document.getElementById('maindata');
    main_Data.storage.forEach(project => {
        const projectdata = main_Data.findbytitle(project.title).data;
        projectdata.forEach(task =>{
            const userdate = new Date(task.dueday + 'T00:00:00');
            if(userdate.getDate() === todayindetail.getDate()){
                const maindiv = document.createElement('div');
        maindiv.id = `Maindiv${task.title}`;

        const div1 = document.createElement('div');
        const h = document.createElement("h3");
        h.textContent = task.title;
        const p = document.createElement("p");
        p.textContent = task.detail;

        const removedata = document.createElement('button');
        removedata.textContent="Delete Tasks";
        removedata.addEventListener('click' ,function(){
            main_Data.findbytitle(task).remove(task.title);
            output.removeChild(document.getElementById(`Maindiv${task.title}`));
        })

        div1.appendChild(h);
        div1.appendChild(p);
        div1.appendChild(removedata);
        maindiv.appendChild(div1);

        const div2 = document.createElement('div');
        const p1 = document.createElement("p");
        p1.textContent = task.dueday;
        const p2 = document.createElement("p");
        p2.textContent = task.priority;
        div2.appendChild(p1);
        div2.appendChild(p2);
        maindiv.appendChild(div2);
        output.appendChild(maindiv);
            }
        })
    })
} )

const user_input = document.getElementById('userinput');
const add_task = document.getElementById('Add_task');
add_task.addEventListener('click', function(){
    if(user_input.style.display === "none"){
        user_input.style.display = 'flex';
    } else{
        user_input.style.display = "none";
    } 
});


const createproject = document.getElementById('newproject');
createproject.addEventListener('click' , ()=>{
    const element = document.getElementById('projectinput');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    const userproject = document.createElement('div');
    userproject.style.display = 'flex';
    const userinput = document.getElementById('projectinput');
    const projectlabel = document.createElement('label');
    const projectinput = document.createElement('input');
    const projectsubmit = document.createElement('button');
    projectsubmit.type = 'submit';
    projectsubmit.textContent = 'Submit';

    projectinput.type = "text";
    projectinput.name = "createproject";
    projectinput.id = "createproject";
    projectinput.required = true;
    userproject.appendChild(projectlabel);
    userproject.appendChild(projectinput);
    userproject.appendChild(projectsubmit);
    userinput.appendChild(userproject);

    projectsubmit.addEventListener('click', ()=>{
        const text = projectinput.value;
        main_Data.add(text);
        projectinput.value='';
        userproject.style.display = 'none';

        display_project(main_Data);


    })

}) 
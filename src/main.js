//import ".styles.css";

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
studyPlan.add("Practice DSA", "Leetcode & mock interviews", "2025-07-24", "High");

// Add tasks to "Grocery List"
const grocery = main_Data.findbytitle("Grocery List");
grocery.add("Buy milk", "Almond milk if available", "", "Low");
grocery.add("Buy veggies", "Carrots, spinach, and broccoli", "", "Medium");


display_project(main_Data);


function display_project(dataset){
    const user = document.getElementById('user');
    dataset.storage.forEach(project => {
        const buttonforproject = document.createElement('button');
        buttonforproject.textContent = project.title;
        buttonforproject.addEventListener('click', function(){
            clearscreen();
            displaymain(project.title);
        }); 
        user.appendChild(buttonforproject);
    });
}

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
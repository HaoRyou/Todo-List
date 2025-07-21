import ".styles.css";

let storage = [];

class infotask{
    constructor(title,detail,startday,enday){
        this.title = title.trim();
        this.detail = detail?.trim?.() || '';
        this.startday = startday || '';
        this.enday = enday || '';
    }

}

class Project{
    constructor(title){
        this.title = title;
        this.data = [];
    }
    add(title, detail = '', startday = '', enday =''){
        const task = new infotask(title,detail,startday,enday);
        this.data.push(task);
    }
}

class main_storage{
    constructor(){
        this.storage = [];
    }
    add(title){
        const newproject = new Project(title);
        storage.push(project);
    }

    findbytitle(title){
        return this.storage.find(project => project.title === title);
    }
}

const main_Data = new main_storage();


function display_project(dataset){
    const project = document.getElementById('user');
    dataset.forEach(element => {
        const buttonforproject = document.createElement('button');
        buttonforproject.textContent = element.title;
        buttonforproject.addEventListener('click', function(){
            displaymain(element.title);
        }); 
        project.appendChild(buttonforproject);
    });
}

function displaymain(title){
    clearscreen();
    const output = document.getElementById('maindata');
    main_Data.findbytitle(title).forEach(element => {
        const maindiv = document.createElement('div');
        maindiv.classList = "Maindiv";

        const div1 = document.createElement('div');
        const h = document.createElement("h3");
        h.textContent = element.title;
        const p = document.createElement("p");
        p.textContent = element.detail;
        const removedata = document.createElement('button');
        removedata.addEventListener('click' ,function(){
            removecurrentdata(element);
        })

        div1.appendChild(h);
        div1.appendChild(p);
        div.appendChild(removedata);
        maindiv.appendChild(div);

        const div2 = document.createElement('div');
        const p1 = document.createElement("p");
        p1.textContent = element.startday;
        const p2 = document.createElement("p");
        p2.textContent = element.enday;
        div2.appendChild(p1);
        div2.appendChild(p2);
        maindiv.appendChild(div2);
        
    })

}


function clearscreen(){
    const maindata = document.getElementById(maindata);
    while(main_Data.firstChild){
        main_Data.removeChild (main_Data.firstChild);
    }
}

function removecurrentdata(element){

}
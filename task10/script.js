let btn = document.getElementById("btn1");
let confirm = document.getElementById("confirm");
let input = document.getElementById("input");
let cancel = document.getElementById("cancel");
let submit = document.getElementById("submit");
let tasks = document.getElementById("tasks");
let word = document.getElementById("word");

let tasks_data = [];


function addTask() {
    confirm.style.display = "block";
}


function canceltask() {
    confirm.style.display = "none";
}


function createtask() {
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleDateString();
    let formattedTime = currentDate.toLocaleTimeString();

    let newpro = {
        input: input.value,
        completed: false, 
        date: formattedDate,
        time: formattedTime
    };
    
    if (input.value.length > 0) {
        tasks_data.push(newpro);
        showtask();
        clear();
    } else {
        alert("Please enter task name");
    }
}


function showtask() {
    let task2 = "";
    let type = word.innerText;

    for (let i = 0; i < tasks_data.length; i++) {
        let isChecked = tasks_data[i].completed ? 'checked' : '';
        
        if (type === "All") {
            // Show all tasks
            task2 += `  
          <div>
                        <div class="task-content">
                            <label for="${i}">${tasks_data[i].input}</label>
                            <input type="checkbox" id="${i}" ${isChecked} onchange="toggleCompletion(${i})">
                        </div>
                        <span class="timestamp">${tasks_data[i].time}, ${tasks_data[i].date}</span>
            </div>


            `;
        } else if (type === "TO-DO") {
            // Show only unchecked tasks
            if (!tasks_data[i].completed) {
                task2 += `  
            <div>
                        <div class="task-content">
                            <label for="${i}">${tasks_data[i].input}</label>
                            <input type="checkbox" id="${i}" ${isChecked} onchange="toggleCompletion(${i})">
                        </div>
                        <span class="timestamp">${tasks_data[i].time}, ${tasks_data[i].date}</span>
            </div>
                `;
            }
        } else if (type === "Completed") {
            // Show only checked tasks
            if (tasks_data[i].completed) {
                task2 += `  
                   <div>
                        <div class="task-content">
                            <label for="${i}">${tasks_data[i].input}</label>
                            <input type="checkbox" id="${i}" ${isChecked} onchange="toggleCompletion(${i})">
                        </div>
                        <span class="timestamp">${tasks_data[i].time}, ${tasks_data[i].date}</span>
                    </div>
                `;
            }
        }
    }
    tasks.innerHTML = task2;
}


function toggleCompletion(index) {
    tasks_data[index].completed = !tasks_data[index].completed;
    showtask();
}


function handleFilterClick(value) {
    confirm.style.display = "none";
    if (value === "TO-DO") {
        word.innerText = "TO-DO";
        btn.style.display = "inline";
      
        confirm.style.display = "none";
    } else if (value === "All") {
        word.innerText = "All";
        btn.style.display = "inline";
        confirm.style.display = "none";
    } else if (value === "Completed") {
        word.innerText = "Completed";
        btn.style.display = "none";
    }
    showtask();
}


function clear() {
    input.value = "";
}

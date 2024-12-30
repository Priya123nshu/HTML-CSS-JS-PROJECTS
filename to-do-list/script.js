document.addEventListener("DOMContentLoaded",()=>
{
const text = document.getElementById("input-text");
const clk = document.getElementById("addtask");
const dda = document.getElementById("task-list");

let task = JSON.parse(localStorage.getItem("tasks")) || [];

task.forEach(task => rendertask(task));




clk.addEventListener("click", function(){
    const a = text.value.trim()
    if(a==="")
    {
        return;
    }
    const newtask = {
        id: Date.now(),
        text: a,
        completed: false
    }
    savetask()
    rendertask(newtask)
    task.push(newtask)
    text.value = ""
    console.log(task);
    
})
function rendertask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.style.display = 'flex'; // Use Flexbox for layout
    li.style.justifyContent = 'space-between'; // Space between text and button
    li.style.alignItems = 'center'; // Align items vertically
    li.style.padding = '10px'; // Optional: Add padding
    li.style.border = '1px solid #ccc'; // Optional: Add border for styling
    li.style.marginBottom = '5px'; // Optional: Add space between tasks

    // Create span
    const span = document.createElement('span');
    span.textContent = task.text;

    // Create button
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.style.backgroundColor = 'red';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '5px 10px';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '5px';
    if(task.completed) li.classList.add("completed")

    li.addEventListener("click",(e)=>{
        if(e.target.tagName==="BUTTON") return;
        task.completed = !task.completed
        li.classList.toggle("completed")
        savetask()
    })
    button.addEventListener("click",(e)=>
    {
        e.stopPropagation() //prevent toggle fron firing
        tasks = tasks.filter((t) => t.id!==task.id)
        li.remove()
        savetask()
    })


    // Append span and button to li
    li.appendChild(span);
    li.appendChild(button);

    dda.appendChild(li);

}


function savetask()
{
    localStorage.setItem("tasks",JSON.stringify(task));
}

})
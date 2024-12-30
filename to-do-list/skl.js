document.addEventListener("DOMContentLoaded", () => {
    const text = document.getElementById("input-text");
    const clk = document.getElementById("addtask");
    const dda = document.getElementById("task-list");

    // Load tasks from localStorage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render existing tasks on page load
    tasks.forEach((t) => rendertask(t));

    // Add task button click handler
    clk.addEventListener("click", function () {
        const a = text.value.trim(); // Get the input value
        if (a === "") {
            return; // Do nothing if the input is empty
        }

        // Create a new task object
        const newTask = {
            id: Date.now(),
            text: a,
            completed: false,
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Save the updated task array to localStorage
        savetask();

        // Render the new task
        rendertask(newTask);

        // Clear the input field
        text.value = "";
    });

    // Function to render a task
    function rendertask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        li.style.display = "flex"; // Use Flexbox for layout
        li.style.justifyContent = "space-between"; // Space between text and button
        li.style.alignItems = "center"; // Align items vertically
        li.style.padding = "10px"; // Optional: Add padding
        li.style.border = "1px solid #ccc"; // Optional: Add border for styling
        li.style.marginBottom = "5px"; // Optional: Add space between tasks
    
        // Add a "completed" class if the task is marked as completed
        if (task.completed) li.classList.add("completed");
    
        // Create a span for the task text
        const span = document.createElement("span");
        span.textContent = task.text;
    
        // Create a delete button
        const button = document.createElement("button");
        button.textContent = "Delete";
        button.style.backgroundColor = "red";
        button.style.color = "white";
        button.style.border = "none";
        button.style.padding = "5px 10px";
        button.style.cursor = "pointer";
        button.style.borderRadius = "5px";
    
        // Toggle task completion on list item click
        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return; // Ignore button clicks
            task.completed = !task.completed; // Toggle completed status
            li.classList.toggle("completed"); // Toggle the "completed" class
            savetask(); // Save updated tasks to localStorage
        });
    
        // Delete task on button click
        button.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent the parent click event
    
            // Update the tasks array
            tasks = tasks.filter((t) => t.id !== task.id);
    
            li.remove(); // Remove the task from the DOM
            savetask(); // Save updated tasks to localStorage
        });
    
        // Append the span and button to the list item
        li.appendChild(span);
        li.appendChild(button);
    
        // Append the list item to the task list container
        dda.appendChild(li);
    }
    
    // Function to save tasks to localStorage
    function savetask() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});

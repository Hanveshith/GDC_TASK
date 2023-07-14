const fs = require('fs');
const TaskFile = "task.txt";
const CompletedFile = "completed.txt";

const AvailableTasks = () =>{
    const data = fs.readFileSync(TaskFile,"utf8");
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    return lines.map((line) => {
        const [priority,...task] = line.split(' ');
        return {
            priority: parseInt(priority),
            task: task.join(' '),
        };
    });
} 

const CompletedTasks = () => {
    const data = fs.readFileSync(CompletedFile,"utf8");
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    return lines;
}

const WriteCompletedtasks = (task) => {
    const data = task.join('\n');
    fs.writeFileSync(CompletedFile,data,"utf8");
}

const WriteTasks = (tasks) => {
  const lines = tasks.map((task) => `${task.priority} ${task.task}`);
  const data = lines.join('\n');
  fs.writeFileSync(TaskFile,data,"utf8");
}


const AddTask = (priority,task) => {
    const tasks = AvailableTasks();
    tasks.push({ priority, task });
    WriteTasks(tasks);
    console.log(`Added task: "${task}" with priority ${priority}`);
} 

const DeleteTask = (index) => {
    const tasks = AvailableTasks();
    const updatedTasks = tasks.filter((_, i) => i !== index - 1);
    WriteTasks(updatedTasks);
    console.log(`Deleted task #${index}`);
}

const CompleteTask = (index) => {
    const tasks = AvailableTasks();
    const completedtasks = CompletedTasks();
    // const completedtask = tasks[index-1];
    const updatedTasks = tasks.filter((task, i) => i !== index - 1);
    completedtasks.push(updatedTasks.task);
    WriteTasks(updatedTasks);
    WriteCompletedtasks(completedtasks);
    console.log('Marked item as done.');
}


CompleteTask(1);
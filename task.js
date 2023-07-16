const fs = require('fs');
const TaskFile = "task.txt";
const CompletedFile = "completed.txt";

const AvailableTasks = () => {
  const data = fs.readFileSync(TaskFile, "utf8");
  const lines = data.split('\n').filter((line) => line.trim() !== '');

  return lines.map((line) => {
    const [priority, ...task] = line.split(' ');
    return {
      priority: parseInt(priority),
      task: task.join(' '),
    };
  });
}

const WriteTasks = (tasks) => {
  const lines = tasks.map((task) => `${task.priority} ${task.task}`);
  const data = lines.join('\n');
  fs.writeFileSync(TaskFile, data, "utf8");
}

const CompletedTasks = () => {
  const data = fs.readFileSync(CompletedFile, "utf8");
  const lines = data.split('\n').filter((line) => line.trim() !== '');
  return lines;
}

const WriteCompletedtasks = (task) => {
  const data = task.join('\n');
  fs.writeFileSync(CompletedFile, data, "utf8");
}


const AddTask = (priority, task) => {
  if (!fs.existsSync(TaskFile)) {
    fs.writeFileSync(TaskFile, '', 'utf8');
  }
  //for task is empty

  if (!task || task.trim() === "") {
    console.log("Error: Missing tasks string. Nothing added!");

  }
  const tasks = AvailableTasks();
  tasks.push({ priority, task });
  WriteTasks(tasks);
  console.log(`Added task: "${task}" with priority ${priority}`);
}

const DeleteTask = (index) => {
  if (!fs.existsSync(TaskFile)) {
    fs.writeFileSync(TaskFile, '', 'utf8');
  }
 
  
  const tasks = AvailableTasks();
  if (index < 1 || index > tasks.length) {
    console.log(`Error: task with index #${index} does not exist. Nothing deleted.`);
    return;
  }
  if(!index){
    console.log("Error: Missing NUMBER for deleting tasks.");
    return
  }
  const updatedTasks = tasks.filter((_, i) => i !== index - 1);
  WriteTasks(updatedTasks);
  console.log(`Deleted task #${index}`);
}

const CompleteTask = (index) => {
  if (!fs.existsSync(CompletedFile)) {
    fs.writeFileSync(CompletedFile, '', 'utf8');
  }
  const tasks = AvailableTasks();
  const completedtasks = CompletedTasks();
  // const completedtask = tasks[index-1];
  if (index < 1 || index > tasks.length) {
    console.log(`Error: no incomplete item with index #0 exists.`);
    return;
  }
  const updatedTasks = tasks.filter((task, i) => i !== index - 1);
  completedtasks.push(updatedTasks.task);
  WriteTasks(updatedTasks);
  WriteCompletedtasks(completedtasks);
  console.log('Marked item as done.');
}

const Listtasks = () => {
  if (!fs.existsSync(TaskFile)) {
    fs.writeFileSync(TaskFile, '', 'utf8');
  }
  const tasks = AvailableTasks();
  if (tasks.length === 0) {
    console.log("There are no pending tasks!");
    return;
  }
  const sortedTasks = tasks.sort((a, b) => a.priority - b.priority);
  sortedTasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.task} [${task.priority}]`);
  });
}


const args = process.argv.slice(2);
const command = args[0];

if (command === 'add') {
  const priority = parseInt(args[1]);
  const task = args.slice(2).join(' ');
  AddTask(priority, task);
} else if (command === 'ls') {
  Listtasks();
} else if (command === 'del') {
  const index = parseInt(args[1]);
  DeleteTask(index);
} else if (command === 'done') {
  const index = parseInt(args[1]);
  CompleteTask(index);
} else if (command === 'report') {
  generateReport();
} else {
  console.log(`Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`);
}
let icon = document.getElementById('icon');
let secondDiv = document.getElementById('secondDiv');
let Tasks = document.getElementById('tasks');
let Close = document.getElementById('closeICon')
let form = document.getElementById('form');
let input = document.getElementById('input')
let Empty = document.getElementById('empty');

const open = () => {
  secondDiv.style.display = 'block';
}
icon.onclick = () => open();

const close = () => {
  secondDiv.style.display = 'none';
}

Close.onclick = () => close();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation()
  close()
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  fetch('https://jsonplaceholder.typicode.com/users/1/posts',{
  method: 'POST',
  headers:{
  'Content-Type': 'application/json',
  body: data,
  }
  })
  .then(res => res.json())
  .then(data => console.log(data)
  )
})

const formValidation = () => {
  if (input.value === '') {
    Empty.innerHTML = 'form can not be empty';
  } else {
    alert('successful')
    acceptData()
    Empty.innerHTML = '';
  }
}

let data = [];

let acceptData = () => {
  data.push({ 'text': input.value })
  localStorage.setItem('data', JSON.stringify(data))
  console.log(data);
  createTasks()
  resetForm()
}

let createTasks = () => {
  Tasks.innerHTML = ""; // clear first
  data.forEach((item) => {
    Tasks.innerHTML += `<div class='textcon'>
    <div id="task">
    <h3>${item.text}</h3><br>
     <div class='divicon'>
     <i onclick='EditTask(this)'  class="fa fa-pen" aria-hidden="true"></i>
     <i  class="fa fa-trash" onclick='deleteTask(this)' aria-hidden="true"></i>
     </div>
    </div>
    </div>`;

  });
  resetForm()
};

let deleteTask =(e)=>{
 e.parentElement.parentElement.remove()
 data.splice(e.parentElement.parentElement.id, 1)
  localStorage.setItem("data",JSON.stringify(data));
 console.log(e.parentElement.parentElement.id);
}
let EditTask =(e)=>{
 let selected = e.parentElement.parentElement;
 input.value = selected.children[0].innerHTML;
 deleteTask(e)
 open()
}

const resetForm = () => {
  input.value = '';
}

(() => {
  data = JSON.parse(localStorage.getItem('data')) || []
  console.log(data);
  createTasks()
})()
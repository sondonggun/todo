const toDoForm1 = document.querySelector(".js-toDoForm1"),
      toDoInput1 = toDoForm1.querySelector("input"),
      toDoList1 =  document.querySelector(".js-toDoList1");

const TODOS_LS = "toDos1";

let toDos1 = [];

function deleteToDo(event1){
    // console.dir(event.target) // 이 방법으로 event.target의 부모 노드를 확인할 수 있음.
    // event.target.parentNode // event.target.parentNode는 여러 개의 버튼 중 어느 버튼이 클릭됐는지 알려준다. 정확히는, 클릭된 버튼 태드의 부모 태그를 불러온다.
    const btn = event1.target; // 클릭된 버튼을 할당.
    const li = btn.parentNode; // 그리고 그 부모 태그(li)를 할당.
    toDoList1.removeChild(li); // 해당 태그를 지움.
    // filter 함수는 array의 모든 요소들에 함수를 실행하고, 값이 true인 것들만 가지고 새로운 array를 만들어 반환함.
    const cleanToDos1 = toDos1.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos1 = cleanToDos1;
    saveToDos1();
}

// to-do-list를 local storage에 저장하는 함수
function saveToDos1(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos1)); // JSON.stringify 함수를 사용해 자바스크립트 objectfmf string으로 바꿔준다.
}

function paintToDo(text1){
    const li = document.createElement("li"); // li 태그를 만들어서 변수에 할당
    const delBtn = document.createElement("button"); // button 태그를 만들어서 변수에 할당
    const span1 = document.createElement("span1"); // span 태그를 만들어서 변수에 할당
    const newId = toDos1.length + 1 
    delBtn.innerText = "X"; // 버튼의 텍스트는 "X"로 설정
    delBtn.addEventListener("click", deleteToDo);
    span1.innerText = text1; // 사용자가 입력한 텍스트가 span태그의 텍스트가 되도록 설정
    li.appendChild(delBtn); // li 태그의 자식 태그로 버튼을 삽입
    li.appendChild(span1); // li 태그의 자식 태그로 span 태그 삽입
    li.id = newId; // li태그의 id 속성을 object의 id와 같게 함.
    toDoList1.appendChild(li); // 위에서 설정한 li 태그들을 최종적으로 toDoList에 삽입.
    const toDoObj1 = {
        text1 : text1,
        id : newId
    };
    toDos1.push(toDoObj1); // toDos라는 Array 안에 toDoObj 객체를 넣음.
    saveToDos1();
}

function handleSubmit(event1){
    event1.preventDefault();
    const currentValue = toDoInput1.value;
    paintToDo(currentValue);
    toDoInput1.value = ""; // 텍스트를 입력하고 엔터를 치면 사라지게 하기
}

function loadToDos(){
    const  loadedToDos1 = localStorage.getItem(TODOS_LS); // 로컬스토리지에서 키가 TODOS_LS인 값을 가져오기
    if (loadedToDos1 !== null){
        const parsedToDos1 = JSON.parse(loadedToDos1); // JSON을 자바스크립트가 이해할 수 있는 object 데이터 형식으로 변형
        parsedToDos1.forEach(function(toDo){
            paintToDo(toDo.text1);
        })
    }
}

function init(){
    loadToDos();
    toDoForm1.addEventListener("submit", handleSubmit);
}

init();


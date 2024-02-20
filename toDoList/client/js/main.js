import {
  clearContents,
  getNode as $,
  insertLast,
  setStorage,
  getStorage,
} from "../lib/index.js";

// [phase-1]
// [✅] 1. form 태그 submit 이벤트 바인딩 (form.addEventListener('submit))
// [✅] 2. input 값 가져오기 (input.value)
// [✅] 3. li 태그 생성하기 (create)
// [✅] 4. ul(.toDoList) 안에 렌더링하기 (insertLast)
// [✅] 5. 함수 분리 (createItem, renderItem)

// [phase-2]
// [✅] 1. 데이터 저장할 수 있는 빈배열 만들기
// [✅] 2. 생성된 데이터(value)와 id를 객체 형태로 todoArray 추가하기 (push)
// [✅] 3. 함수 분리 (addItemArray)
// [✅] 4. input값 비우기 (clearContents)
// [✅] 5. 로컬스토리지에 todoArray 데이터 저장하기 (setStorage)

// [phase-3]
// [✅] 1. list 클릭 이벤트 위임 바인딩 (handleRemove)
// [✅] 2. target 설정 및 id값 가져오기 (target, dataset.id)
// [✅] 3. 해당 id 값을 가진 li 제거하기 (remove)
// [✅] 4. todoArray 아이템 제거하기 (filter)
// [✅] 5. storage 업데이트 (setStorage)
// [✅] 6. 함수 분리

const form = $(".form");
const input = $(".form__input");
const list = $(".toDoList");

let todoArray = [];

const createItem = (value, id) => {
  return `
    <li data-id="${id}">${value}</li>
  `;
};

const renderItem = ({ target, todoItem, id }) => {
  insertLast(target, createItem(todoItem, id));
};

const addItemArray = (id, todoItem) => {
  todoArray.push({ id, todoItem });
  console.log(todoArray);
};

const removeItem = (id) => {
  const li = $(`[data-id="${id}"]`);
  li.remove();
};

const removeItemArray = (id) => {
  todoArray = todoArray.filter((item) => item.id !== +id);
  console.log(todoArray);
};

const handleSubmit = (e) => {
  e.preventDefault();

  const todoItem = input.value;
  const id = Date.now();

  renderItem({ target: list, todoItem, id });
  addItemArray(id, todoItem);
  clearContents(input);
  setStorage("todo", todoArray);
};

const handleRemove = (e) => {
  const target = e.target;
  const id = target.dataset.id;

  if (!id) return;

  removeItem(id);
  removeItemArray(id);
  setStorage("todo", todoArray);
};

form.addEventListener("submit", handleSubmit);
list.addEventListener("click", handleRemove);

// [phase-4]
// 1. IIFE 만들기
// 2. 스토리지 데이터 가져오기 (getStorage)
//    - Promise<Object>

// 3. 비동기 처리로 데이터 받기 (then | await)
//    - async

// 4. 렌더링하기 (renderItem)
//    - array.forEach ....

// 5. 데이터가 없을 경우 에러처리

// IIAFE

(async () => {
  const initList = await getStorage("todo");

  if (!initList) return;

  initList.forEach(({ todoItem, id }) =>
    renderItem({ target: list, todoItem, id })
  );
})();

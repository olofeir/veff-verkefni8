const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    for(let item of items.querySelectorAll('.item')){
        const checkbox = item.querySelector('.item__checkbox');
        checkbox.addEventListener('click', finish);
        const text = item.querySelector('.item__text');
        text.addEventListener('click', edit);
        const button = item.querySelector('.item__button');
        button.addEventListener('click', deleteItem);
      }
      console.log(_items);
  }

  function formHandler(e) {
    e.preventDefault();
    const input = e.target.querySelector('.form__input');
    if(input.value.trim().length > 0){
      add(input.value);
      input.value = '';
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const {target} = e;
    const {textContent, parentNode} = target;

    parentNode.removeChild(target);

    const input = el('input', 'item__edit');
    input.setAttribute('type', 'text');
    input.value = textContent;
    console.log(input.value);
    input.addEventListener('keyup',commit);
    const button = parentNode.querySelector('.item__button');
    parentNode.insertBefore(input, button);
    input.focus();

  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if(event.keyCode === 13){
      console.log(e.target);
      const text = e.target.value, parentNode = e.target.parentNode;
      parentNode.removeChild(e.target);

      textElement = el('span', 'item__text', edit);
      textElement.appendChild(document.createTextNode(text));
      const button = parentNode.querySelector('.item__button');
      parentNode.insertBefore(textElement, button);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const item = el('li', 'item'), checkbox = el('input', 'item__checkbox', finish);
    checkbox.setAttribute('type', 'checkbox');

    const text = el('span', 'item__text', edit);
    text.appendChild(document.createTextNode(value));

    const button = el('button', 'item__button', deleteItem);
    button.appendChild(document.createTextNode('Eyða'));
    items.appendChild(item);
    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(button);
  }

  // event handler til að eyða færslu
    function deleteItem(e) {
      const {target} = e;
      const {textContent, parentNode} = target;
      parentNode.remove(target);
    }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    var element = document.createElement(type);
    if(className) {
      element.classList.add(className);
    } if(clickHandler) {
      element.addEventListener('click', clickHandler);}
    return element;
  }

  return {
    init: init
  }
})();

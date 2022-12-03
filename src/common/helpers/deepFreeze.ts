// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// Чтобы сделать объект obj полностью неизменяемым, замораживаем каждый объект в объекте obj.
// Для этого воспользуемся этой функцией.
export function deepFreeze<T>(obj: T): Readonly<T> {
  if (!obj) {
    return obj;
  }

  // Замораживаем свойства для заморозки самого объекта
  // eslint-disable-next-line guard-for-in
  for (const name in obj) {
    // noinspection JSUnfilteredForInLoop
    const prop = obj[name];

    // Заморозка свойства prop, если оно объект
    if (typeof prop === "object" && prop !== null) {
      deepFreeze(prop);
    }
  }

  // Заморозить сам объект obj (ничего не произойдёт, если он уже заморожен)
  return Object.freeze(obj);
}

export default class LocalStorageUtils {
  static save(key, object) {
    const stringified = JSON.stringify(object);
    window.localStorage.setItem(key, stringified);
  }

  static get(key) {
    const serialized = window.localStorage.getItem(key);
    return JSON.parse(serialized);
  }
}

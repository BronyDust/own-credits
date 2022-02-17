type Listener<T> = (data: T) => void;

abstract class Observable<T> {
  listeners = new Set<Listener<T>>();

  constructor(private dataReference: T) {}

  notifyListeners() {
    for (const listener of this.listeners) {
      listener(this.dataReference);
    }
  }

  /** Returns cleanup function */
  addListener(listener: Listener<T>) {
    this.listeners.add(listener);
    return () => this.removeListener(listener);
  }

  removeListener(listener: Listener<T>) {
    this.listeners.delete(listener);
  }
}

export default Observable;

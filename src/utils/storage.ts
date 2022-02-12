import { v4 as uuid4 } from "uuid";
import Credit from "./credit.class";

export type CreditsMap = Map<string, Credit>;
export type CreditsStorageListener = (data: CreditsMap) => void;

class Storage {
  private _credits: CreditsMap = new Map();
  private listeners = new Set<CreditsStorageListener>();

  private notifyListeners() {
    for (const listener of this.listeners) {
      listener(this._credits);
    }
  }

  get credits() {
    return this._credits;
  }

  addCredit(name: string, cost: number, additionalInfo: any = {}) {
    const uuid = uuid4();
    this.credits.set(uuid, new Credit(name, cost, additionalInfo));

    this.notifyListeners();
  }

  /** Returns cleanup function */
  addListener(listener: CreditsStorageListener) {
    this.listeners.add(listener);
    return () => this.removeListener(listener);
  }

  removeListener(listener: CreditsStorageListener) {
    this.listeners.delete(listener);
  }
}

/**
 * Entity that provides CRUD for credits objects and
 * serialize them all
 */
const storage = new Storage();

export default storage;

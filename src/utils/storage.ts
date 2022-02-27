import { v4 as uuid4 } from 'uuid';
import Credit from './credit.class';
import Observable from './observable.abstract';

export type CreditsMap = Map<string, Credit>;

class Storage extends Observable<CreditsMap> {
  private _credits: CreditsMap;

  constructor() {
    const credits: CreditsMap = new Map();

    super(credits);

    this._credits = credits;
  }

  get credits() {
    return this._credits;
  }

  addCredit(name: string, cost: number, additionalInfo: any = {}) {
    const uuid = uuid4();
    this.credits.set(uuid, new Credit(name, cost, additionalInfo));

    this.notifyListeners();
  }

  removeCredit(uid: string) {
    this.credits.delete(uid);

    this.notifyListeners();
  }
}

/**
 * Entity that provides CRUD for credits objects and
 * serialize them all
 */
const storage = new Storage();
storage.addCredit('first', 1000, { startDate: new Date().toString() });
storage.addCredit('second', 2000, { startDate: new Date().toString() });
storage.addCredit('third', 3000, { startDate: new Date().toString() });

export default storage;

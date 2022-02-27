import { v4 as uuid4 } from 'uuid';
import Observable from './observable.abstract';

type Payment = {
  cost: number;
  date: string;
  description: string;
};

export type PaymentsMap = Map<string, Payment>;

class Credit extends Observable<PaymentsMap> {
  private name: string;
  private cost: number;
  private additionalInfo: any;

  constructor(name: string, cost: number, additionalInfo: any = {}) {
    const payments: PaymentsMap = new Map();

    super(payments);

    this.payments = payments;
    this.name = name;
    this.cost = cost;
    this.additionalInfo = additionalInfo;
  }

  private payments: PaymentsMap;

  addPayment(cost: number, date: string, description: string) {
    const uuid = uuid4();
    this.payments.set(uuid, { cost, date, description });

    this.notifyListeners();
  }

  updatePayment(uuid: string, newData: Partial<Payment>) {
    const prevState = this.payments.get(uuid);
    if (!prevState) return;

    this.payments.set(uuid, { ...prevState, ...newData });
    this.notifyListeners();
  }

  deletePayment(uuid: string) {
    this.payments.delete(uuid);
    this.notifyListeners();
  }

  get debt() {
    let debt = this.cost;

    for (const payment of this.payments.values()) {
      debt -= payment.cost;
    }

    return debt;
  }

  get metaData() {
    return {
      name: this.name,
      cost: this.cost,
      additionalInfo: this.additionalInfo,
    };
  }

  get paymentsCount() {
    return this.payments.size;
  }
}

export default Credit;

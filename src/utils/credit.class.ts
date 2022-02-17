import { v4 as uuid4 } from 'uuid';

type Payment = {
  cost: number;
  date: string;
  description: string;
};

class Credit {
  constructor(
    private name: string,
    private cost: number,
    private additionalInfo: any = {},
  ) {}

  private payments = new Map<string, Payment>();

  addPayment(cost: number, date: string, description: string) {
    const uuid = uuid4();
    this.payments.set(uuid, { cost, date, description });
  }
}

export default Credit;

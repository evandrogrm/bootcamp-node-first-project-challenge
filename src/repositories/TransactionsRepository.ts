import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.getTotalIncome();
    const outcome = this.getTotalOutcome();
    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }

  private getTotalIncome(): number {
    return this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        total += transaction.value;
      }
      return total;
    }, 0);
  }

  private getTotalOutcome(): number {
    return this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome') {
        total += transaction.value;
      }
      return total;
    }, 0);
  }
}

export default TransactionsRepository;

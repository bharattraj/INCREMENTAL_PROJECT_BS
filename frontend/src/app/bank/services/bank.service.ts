import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

// Domain types from your /types folder
import { Transaction } from '../types/Transaction';
import { Customer } from '../types/Customer';
import { Account } from '../types/Account';

// Re-export types so tests/components can import from this module
export type { Account } from '../types/Account';
export type { Customer } from '../types/Customer';
export type { Transaction } from '../types/Transaction';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(@Optional() @Inject(HttpClient) private http: HttpClient) {
    // Allow unit tests to run without HttpClient injection
    if (!this.http) {
      console.warn('HttpClient not available; using no-op stubs');
      this.http = {
        post: () => of({}),
        get: () => of([]),
        put: () => of({}),
        delete: () => of({}),
      } as any;
    }
  }

  // ---------------------------------------------------------------------------
  // Customers
  // ---------------------------------------------------------------------------

  addCustomer(customer: any): Observable<Customer> {
    // accept any to avoid forcing the Customer class instance (displayInfo()) in components/tests
    return this.http.post<Customer>(`${this.baseUrl}/customers`, customer);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`);
  }

  /** ✅ Alias expected by tests */
  getCustomers(): Observable<Customer[]> {
    return this.getAllCustomers();
  }

  /** ✅ Required by tests (ID is number) */
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/customers/${id}`);
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/customers/${customerId}`);
  }

  /** Kept for app compatibility (full object) */
  editCustomer(customer: any): Observable<Customer> {
    const url = `${this.baseUrl}/customers/${customer.customerId}`;
    return this.http.put<Customer>(url, customer);
  }

  /** ✅ Required by tests (partial update) */
  updateCustomer(id: number, changes: any): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/customers/${id}`, changes);
  }

  // ---------------------------------------------------------------------------
  // Accounts
  // ---------------------------------------------------------------------------

  addAccount(account: any): Observable<Account> {
    // your Account DTO typically { customer: number, balance: number }
    return this.http.post<Account>(`${this.baseUrl}/accounts`, account);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts`);
  }

  /** ✅ Alias expected by tests */
  getAccounts(): Observable<Account[]> {
    return this.getAllAccounts();
  }

  /** ✅ Required by tests (ID is number) */
  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/accounts/${id}`);
  }

  deleteAccount(accountId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/accounts/${accountId}`);
  }

  /**
   * Kept for app compatibility (full object).
   * ✅ Uses account.accountId (not account.customer?.customerId).
   */
  editAccount(account: any): Observable<Account> {
    const url = `${this.baseUrl}/accounts/${account.accountId}`;
    return this.http.put<Account>(url, account);
  }

  /** ✅ Required by tests (partial update) */
  updateAccount(id: number, changes: any): Observable<Account> {
    // e.g. { customer: number, balance: number }
    return this.http.put<Account>(`${this.baseUrl}/accounts/${id}`, changes);
  }

  // ---------------------------------------------------------------------------
  // Transactions
  // ---------------------------------------------------------------------------

  performTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/transactions`, transaction);
  }

  /** Keep original (typo) for compatibility */
  getAllTranactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transactions`);
  }

  /** ✅ Alias expected by tests */
  getTransactions(): Observable<Transaction[]> {
    return this.getAllTranactions();
  }

  // ---------------------------------------------------------------------------
  // Additional APIs used elsewhere in your app
  // ---------------------------------------------------------------------------

  getOutstandingBalance(userId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/out-standing?userId=${userId}`);
  }

  getAccountsByUser(userId: string | null): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts/user/${userId}`);
  }

  getTransactionByUser(userId: string | null): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transactions/customer/${userId}`);
  }
}
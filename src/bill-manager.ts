import { Bill } from "./bill";

export class BillManager {
    private _bills: Bill[];

    constructor() {
        this._bills = new Bill[0];

        for( let i = 0; i < 10; i++ ) {
            let bill = new Bill();
            bill.billId = i;
            bill.description = 'This is my ' + i + ' bill';
            bill.amount = i * 2.37;
            bill.pdfLink = 'http://foobar.local/0' + i + '.pdf';
            bill.pdf = null;

            this._bills.push(bill);
        }
    }

    getBill( billId: number ): Bill {
        let foundBill = this._bills.find( b => b.billId === billId);
        if( foundBill )
        {
            return foundBill;
        }

        // TODO: ask database for bill with id
        return new Bill();
    }

    getBills(): Bill[] {
        return this._bills;
    }

    createBill( bill: Bill): boolean {
        let newBillId = this._bills.length;
        bill.billId = newBillId;

        this._bills.push( bill );

        return true;
    }

    updateBill( billId: number, values: Bill): boolean {
        let billToUpdate = this.getBill( billId );
        if( billToUpdate ) {
            billToUpdate.description = values.description;
            billToUpdate.keywords = values.keywords;
            billToUpdate.amount = values.amount;
            billToUpdate.pdf = values.pdf;
            billToUpdate.pdfLink = values.pdfLink;

            return true;
        }

        return false;
    }

    removeBill( billId: number ): boolean {
        let deleteIndex = this._bills.findIndex( b => b.billId === billId );
        if( deleteIndex != -1 ) {
            this._bills = this._bills.splice(deleteIndex, 1);
            return true;
        }
        return false;
    }
}
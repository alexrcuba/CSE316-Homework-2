import jsTPS_Transaction from './jsTPS_Transaction.js';
export default class todoList_Transaction extends jsTPS_Transaction {
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initNum
     * @param initAmountToAdd 
     */
    constructor(initList) {
        // KEEP THESE FOR LATER
        super();
        this.list = initList;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction = function() {
        return this.list;
    };

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction = function() {
        return this.list;
    }
}
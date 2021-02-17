const Memory = require("./memory");
const memory = new Memory();
class Array {
    constructor() {
        // Initialize array with length, capacity and ptr address
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    push(value) {
        // Increase amount of memory for new item
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        // Add the new value at the created block
        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        // Store old pointer address
        const oldPtr = this.ptr;
        // Allocate new memory for the size given
        this.ptr = memory.allocate(size);
        if (this.ptr === null){
            throw new Error('Out of memory');
        }
        // copy values stored at old address
        memory.copy(this.ptr, oldPtr, this.length);
        // free the used memory
        memory.free(oldPtr);
        // adjust the capacity property to the new size
        this._capacity = size;
    }

    get(index) {
        // throw error if index is less than 0 or more than length
        if (index < 0 || index >= this.length) {
            throw new Error('Index error')
        }
        // return value
        return memory.get(this.ptr + index);
    }

    pop() {
        // throw error if array is empty
        if (this.length == 0) {
            throw new Error('Index error')
        }
        // get last value in array
        const popped = memory.get(this.ptr + this.length - 1);
        // shrink array
        this.length--;
        // return popped value
        return popped;
    }

    insert(index, value) {
        // throw error if index is less than zero or more than length
        if (index < 0 || index >= length) {
            throw new Error('Index error')
        }
        // resize if length is equal or more than capacity
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO)
        }
        // copy elements from index where value will be inserted til length
        // to the box after index and forward
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        // set value in index to given value
        memory.set(this.ptr + index, value)
        // add one to length
        this.length++;
    }

    remove(index) {
        // Throw error if index is less than 0 or more than length
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        // copy all elements from after the index til length
        // to the index
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        // remove one from length
        this.lenght--;
    }
}

Array.SIZE_RATIO = 3;

module.exports = Array;
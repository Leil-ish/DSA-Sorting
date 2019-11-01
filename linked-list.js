class _Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
}
  
class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head)
    }

    insertAt(ptr, item) {
        if (this.head === null) {
          this.insertFirst(item);
        }
        let currNode = this.head;
        let prevNode = this.head;
        let i = 0;
    
        while (i !== ptr) {
          if (!currNode.next) {
            console.log('This index does not exist. Use insertLast to add to the end of the list.');
            return;
          }
          prevNode = currNode;
          currNode = currNode.next;
          i++;
        }
    
        let pushedItem = prevNode;
        let newItem = new _Node(item, prevNode.next);
        pushedItem.next = newItem;
      }

    insertLast(item) {
        if (this.head === null) {
            this.insertFirst(item);
        }
        else {
            let tempNode = this.head;
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
        }
    }

    insertBefore(item1, item2) {
        if(this.head === null) {
            this.insertFirst(item1);
        } else {
            let currNode = this.head;
            let prevNode = this.head;
            while ((currNode !== null) && (currNode.value !== item2)) {
                prevNode = currNode;
                currNode = currNode.next;
            }
            if(currNode === null) {
                return;
            }
            prevNode.next = new _Node(item1, currNode);
        }
    }

    insertAfter(item, ptr) {
        if(this.head === null) {
            this.insertFirst(item);
        } else {
            let currNode = this.head;
            let nextNode = this.head;
            while ((currNode !== null) && (currNode.value !== ptr)) {
                currNode = currNode.next;
                nextNode = currNode.next;
            }
            currNode.next = new _Node(item, nextNode);
        }
    }

    find(item) {
        let currNode = this.head;
        if (!this.head) {
            return null;
        }
        while (currNode.value !== item) {
            if (currNode.next ===null) {
                return null;
            }
            else {
                currNode = currNode.next;
            }
        }
        return currNode;
    }

    remove(item) {
        if (!this.head) {
            return null;
        }
        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }
        let currNode = this.head;
        let previousNode = this.head;

        while ((currNode !== null) && (currNode.value !== item)) {
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        previousNode.next = currNode.next;
    }

    cut(item) {
        let tempList = new LinkedList()
        tempList.head = { ...this.head }
        if (!tempList.head) {
          return
        }
    
        if (tempList.head.value === item) {
          tempList.head = tempList.head.next
        }
        let currNode = tempList.head
        let previousNode = tempList.head
        while (currNode !== null && currNode.value !== item) {
          previousNode = currNode
          currNode = currNode.next
        }
        if (currNode === null) {
    
          return tempList
        }
        previousNode.next = null
        return tempList
      }
}

function size(list) {
    let length = 1
    let currNode = list.head
    if (!list.head) {
      return null
    }
    while (currNode.next !== null) {
      currNode = currNode.next
      length++
    }
    return length
  }
  
  function getMid(list) {
    if (!list) {
      return ''
    } else {
      let currNode = list.head
      let i = 0
      let count = Math.floor(size(list) / 2)
      while (i < count) {
        currNode = currNode.next
        i++
      }
      return currNode
    }
  }
  
  function mergeSort(list) {
    if (list.head.next === null) {
      return list
    }
    let resList = new LinkedList()
    let tempList = new LinkedList()
    const middle = getMid(list)
    tempList.head = { ...middle }
    let left = list.cut(middle.value)
    let right = tempList

    left = mergeSort(left)
    right = mergeSort(right)
  
    return merge(left, right, resList)
  }
  
  function merge(left, right, list) {
    let lNode = left.head
    let rNode = right.head
  
    while (lNode !== null && rNode !== null) {
      if (lNode.value < rNode.value) {
        list.insertLast(lNode.value)
        lNode = lNode.next
      } else {
        list.insertLast(rNode.value)
        rNode = rNode.next
      }
    }
    while (lNode !== null) {
      list.insertLast(lNode.value)
      lNode = lNode.next
    }
    while (rNode !== null) {
      list.insertLast(rNode.value)
      rNode = rNode.next
    }
  
    return list
  }
  
  function main() {
    let SLL = new LinkedList()
    SLL.insertFirst('Apollo')
    SLL.insertLast('Husker')
    SLL.insertLast('Starbuck')
    SLL.insertLast('Boomer')
    SLL.insertLast('Helo')
    SLL.insertLast('Tauhida')
  }
  
  main()

module.exports = LinkedList;

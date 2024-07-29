class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BST:
    def __init__(self, root: Node):
        self.root = root


    def is_empty(self):
        return self.root == None
    
    def add_data(self, data):
        head = self.root
        cur = head
        
        while cur is not None:
            if data < cur.data:
                if cur.left == None:
                    cur.left = Node(data)
                    return True
                cur = cur.left
            else:
                if cur.right is None:
                    cur.right = Node(data)
                    return True
                cur = cur.right
    def print(self):
        def recurse(cur):
            if cur is None:
                return
            recurse(cur.left)
            print(cur.data)
            recurse(cur.right)
        recurse(self.root)


        
        

node = Node(10)
node.left = Node(9)
node.right = Node(11)

bst = BST(node)
bst.add_data(7)
bst.add_data(8)
bst.add_data(14)
bst.print()



        

        



lst = [{'data': i, 'd': i+70} for i in range(1,20)]

def recurse_bs(arr, t):
    middle = (len(arr)-1) // 2
    mid = arr[(len(arr)-1)//2]
    if t < mid['data']:
        return recurse_bs(arr[:middle], t)
    elif t > mid['data']:
        return recurse_bs(arr[middle+1:], t)
    else:
        return mid
# print(recurse_bs(lst, 5))
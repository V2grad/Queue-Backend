class Queue():
    def __init__(self,name):
        self.data = list()
        self.name = name

    def add(self,index,value):
        self.data.insert(index,value)
        return (0,"Succcess")

    def remove(self,index):
        if 0<index or index >= len(self.data):
            return (1,"Index out of range")
        else:
            del(self.data[index])
        return (0,"Success")

    def changeName(self,newName):
        if newName == "":
            return (1,"Name can't be empty")
        self.name = newName
        return (0,"Success")

    def removeMult(self,l):
        for index in l:
            if 0 < index or index >= len(self.data):
                return (1, "Index out of range, No action has been done.")

        for index in l:
            del(self.data[index])

        return (0,"Success")

    def switch(self,index1,index2):
        if 0<index1 or index1 >= len(self.data):
            return (1,"Index1 out of range")

        if 0<index2 or index2 >= len(self.data):
            return (1,"Index2 out of range")


        tmp = self.data[index1]
        self.data[index1] = self.data[index2]
        self.data[index2] = tmp

        return (0,"Success")






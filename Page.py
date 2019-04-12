from Queue import Queue
import hashlib

def md5(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()

class Page():
    def __init__(self,name,password):
        self.queues = list()
        self.password = md5(password)

        self.queues.append(Queue("Check"))
        self.queues.append(Queue("Help"))

        self.name = name


    def checkPassword(self,passwd):
        return md5(passwd) == self.password

    def changePassword(self,passwd):
        self.password = md5(passwd)
        return (0,"Success")

    def addQueue(self,queueName):
        self.queues.append(Queue(queueName))
        return (len(self.queues)-1)

    def delQueue(self,queueID):
        if(queueID >= len(self.queues) or queueID < 0):
            return (1,"QueueID out of range")

        del(self.queues[queueID])
        return (0,"Success")

    def changeQueueName(self,queueID,newName):
        if (queueID >= len(self.queues) or queueID < 0):
            return (1, "QueueID out of range")

        return self.queues[queueID].changeName(newName)

    def addRecord(self,queueID,QueueIndex,content):
        if (queueID >= len(self.queues) or queueID < 0):
            return (1, "QueueID out of range")

        result = self.queues[queueID].add(QueueIndex,content)

        return result

    def delRecord(self,queueID,QueueIndex):
        if (queueID >= len(self.queues) or queueID < 0):
            return (1, "QueueID out of range")

        result = self.queues[queueID].remove(QueueIndex)

        return result

    def changeName(self,name):
        self.name = name

    def data(self):
        D = dict()
        D["name"] = self.name
        D["queues"] = dict()
        for queueID in range(len(self.queues)):
            queueInfo = self.queues[queueID].DATA()
            D["queues"][queueID]=queueInfo

        return D





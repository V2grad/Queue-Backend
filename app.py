import json
from flask import Flask,request
from Page import *
import uuid

app = Flask(__name__)
Database=dict()


@app.route('/newPage',methods=['GET', 'POST'])
def newPage():
    items = request.args.to_dict()
    if "pageName" not in items.keys() or "password" not in items.keys():
        return json.dumps({"status":1,"message": "Invalid parameters"})

    newPageID = str(uuid.uuid4())[:8]
    while(newPageID in Database.keys()):
        newPageID = str(uuid.uuid4())[:8]

    Database[newPageID] = Page(items["pageName"], items["password"])

    result = Database[newPageID].data()
    result["status"] = 0
    result["ID"] = newPageID
    return json.dumps(result)

@app.route('/addQueue',methods=['GET', 'POST'])
def addQueue():
    items = request.args.to_dict()
    if "pageName" not in items.keys() or "password" not in items.keys() or "queueName" not in items.keys():
        return json.dumps({"status":1,"message": "Invalid parameters"})

    if Database[items["pageName"]].checkPassword():
        result = Database[items["pageName"]].addQueue(items["queueName"])
        return json.dumps({"status":0,"queueID":result})
    else:
        return json.dumps({"status":1,"message": "Invalid password"})




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9091)
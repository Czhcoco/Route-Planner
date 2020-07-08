# Route-Planner

This is the project source code of our [$afe Route Planner](https://route-planner-fire-chicken.df.r.appspot.com/) website. 
The following steps will show how to run, build and deploy the project.


## 0. Requirements

[Node.js](https://nodejs.org/) is required for building the frontend. 

We build a flask project for our backend, and the python libraries required are listed in [server/requirements.txt](./server/requirements.txt).

We use [Google Cloud App Engine](https://cloud.google.com/appengine) to deploy our web app, where [Google Cloud SDK](https://cloud.google.com/sdk) is needed.


## 1. Clone the project

```
git clone https://github.com/Czhcoco/Route-Planner.git
cd Route-Planner
```


## 2. Build the frontend user interface

We use [React](https://reactjs.org/) to build the user interface.
If you would like to explore more about the frontend, you can refer to [README.md](./frontend/README.md) in the [frontend](./frontend) folder.

The following steps will only show how to build the frontend:

First, you need to install [Node.js](https://nodejs.org/) ( by whatever method you like;) ) as said in [Requirements](#0-requirements).

Then run the following code to build the frontend:
```
cd frontend
npm install
npm run build
cd ..
```
After the command ```npm run build```, the built files will be automatically moved to the server folder and properly packed in the flask project.


## 3. Run the project on local device

You can now run the flask project in the [server](./server) folder. folder on your local device, details are shown in [server/README.md](./server)
```
cd server
```

If you have not install the required pythons libraries, please run
```
pip install -r requirments.txt
```

Then run the flask project by
```
python server.py
```

Now you can open [127.0.0.1:5000](http://127.0.0.1:5000) in your browser to try the app.


## 4. Deploy the project using [Google Cloud App Engine](https://cloud.google.com/appengine)

Create a new project in [Google Cloud](https://cloud.google.com/), 
properly install [Google Cloud SDK](https://cloud.google.com/sdk) 
and run ```gcloud init``` following the instructions by Google.

Run ```gcloud app deploy``` and the App Engine will automatically deploy the web app using configurations specified in [app.yaml](./server/app.yaml)

Details can be found in the [documentation](https://cloud.google.com/appengine/docs/standard/python3) of App Engine for python3.



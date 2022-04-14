# CPSC 4660 - Database Management Systems Final Project

## Requirements

- [Docker](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)

## Instructions
1. ```zsh
    npm install ./api
   ```
1. ```zsh
    npm install ./web
   ```
2. ```zsh
    docker-compose up --build -d
   ```
   - Make sure that everything is running well, and all of the containers' indicators are green
3. Go to your browser, type **http://localhost:3000**
   - Test out these endpoints with:
     - ```/api/:collection``` (browse all the items in the collection)
       - Example ```/api/collection```
     - ```/api/:collection/id/:id``` (read item by specific the collections)
       - Example ```/api/collection/1```
     - ```/api/:collection/update/id/:id``` (update item by id within the specific collection) **However, this needs some additional parameters, so it wouldn't work as it is**
       - Example ```/api/collection/update/1```
        ```json
        {
            "name": "Computers" 
        }
        ```
     - ```/api/:collection/id/add``` (create item to the collection) **However, this needs some additional parameters, so it wouldn't work as it is**
       - Example ```/api/collection/add```
        ```json
        {
            "id": 5 [Autoincremented]
            "name": "Computers" 
        }
        ```

     - ```/api/:collection/delete/id/:id``` (delete item by id within the specific collection)
       - Example ```/api/collection/delete/1```

# HERO API

Uma API feita sem utilização de frameworks

## Install
    npm install

## Run the app

    npm run start
    npm run dev

## Run the tests

    sh script.sh

# Hero API

API relacioanda com o CRUD de super herois

## Get list of Heroes

### Request

`GET /heroes`

    curl localhost:3000/heroes

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    {
        "success":true,
        "statusCode":200,
        "message":"",
        "data": [
            {
                "id":1,
                "name":"flash",
                "age":"100",
                "power":"speed"
            }
        ]
    }

## Create a new Hero

### Request

`POST /heroes/`

    curl --silent -X POST \
        --data-binary '{"name": "Chapolin", "age": "100", "power": "Strength"}' \
        localhost:3000/heroes

### Response

    HTTP/1.1 201 Created
    Status: 201 Created
    Content-Type: application/json

    {
        "success":true,
        "statusCode":201,
        "message":"Hero Created with success",
        "data": {
            "id":1622225932802
        }
    }

## Get a specific Hero

### Request

`GET /heroes/id`

    curl localhost:3000/heroes/1

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    {
        "success":true,
        "statusCode":200,
        "message":"",
        "data": {
            "id":1,
            "name":"flash",
            "age":"100",
            "power":"speed"
        }
    }

## Get a non-existent Hero

### Request

`GET /heroes/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/9999

### Response

    HTTP/1.1 404 Not Found
    Status: 404 Not Found
    Content-Type: application/json

    {
        "success":false,
        "statusCode":404,
        "message":"Hero not found",
        "data": {
            "message":"Hero not found"
        }
    }

## Change a Hero

### Request

`PUT /heores/:id`

    curl --silent -X PUT \
        --data-binary '{"age": "150"}' \
        localhost:3000/heroes/$ID

### Response

    HTTP/1.1 204 OK
    Status: 204 OK
    Content-Type: application/json

## Change a Hero when not exists

### Request

`PUT /heores/:id`

    curl --silent -X PUT \
        --data-binary '{"age": "150"}' \
        localhost:3000/heroes/$ID

### Response

    HTTP/1.1 404 Not Found
    Status: 404 Not Found
    Content-Type: application/json

    {
        "success":false,
        "statusCode":404,
        "message":"Hero not found",
        "data": {
            "message":"Hero not found"
        }
    }

## Delete a Hero

### Request

`DELETE /heroes/id`

    curl --silent -X DELETE \
        localhost:3000/heroes/1

### Response

    HTTP/1.1 204 OK
    Status: 204 OK
    Content-Type: application/json

## Delete a Hero when not exists

### Request

`DELETE /heroes/id`

    curl --silent -X DELETE \
        localhost:3000/heroes/1

### Response

    HTTP/1.1 404 Not Found
    Status: 404 Not Found
    Content-Type: application/json

    {
        "success":false,
        "statusCode":404,
        "message":"Hero not found",
        "data": {
            "message":"Hero not found"
        }
    }

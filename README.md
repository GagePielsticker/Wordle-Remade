 [![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/JamesPielstickerPortfolio/Wordle-Remade/blob/master/LICENSE.md)
# Wordle Remade

A re-creation of wordle designed to be as scalable and future proof as possible for a fun side project :)

## Preface
> I created this as a platform to refresh my fullstack skills in regards to web development. I figured a wordle recreation would be a good oppurtunity to do so. I designed this with a frontend service that delivers the to the client and an api service which stays hidden from public view. In each respective folder there is a settings.json file which points the frontend to the api and the api to mongodb etc. To run each respectively run the "NPM START" script in each package.

<img src="https://i.imgur.com/WCTo9I7.gif" width="600"/>

## Infrastructure Used
- NodeJS
- Express
- MongoDB
- EJS

- Bootstrap
- Animate.css
- Canvas-Confetti
- simple-keyboard

## Interaction Flow

## Frontend Endpoint Reference

#### Index

```http
  GET /
```

#### Check Word

```http
  POST /check
```

| Body Form Data | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `attempt` | `string` | **Required**. A string to check against the daily word. |

Contacts the api's check endpoint with the word supplied by the user then responds to our client. This is to keep communication to our api unavailable to the public.


## Backend Endpoint Reference

#### Index

```http
  GET /
```

#### Healthcheck

```http
  GET /healthcheck
```
Returns status `200` on successful request

#### Generate

```http
  GET /generate
```
Returns JSON of generated word

#### Check Word

```http
  POST /check
```

| Body Form Data | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `attempt` | `string` | **Required**. A string to check against the daily word. |

Returns JSON of word letter statuses.

E.G. Submitting `test` results in `{ [ 1, 2, 0, 2] }` if daily word is `rent`

Codes are as follows
```
0 - Letter is not in word
1 - Letter is in word, not in that position
2 - Letter is in word, and is in that position
```

## Backend Routines
Daily there is a cronjob which generates a new random word and stores it to the database.


## Authors

- [@Gage Pielsticker](https://github.com/GagePielsticker)


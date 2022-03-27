 [![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/JamesPielstickerPortfolio/Wordle-Remade/blob/master/LICENSE.md)
# Wordle Remade

A recreatione of wordle using NodeJS, MongoDB, Express, and many more modern technologies.

## Preface
> I created this as a platform to refresh my fullstack skills in regards to web development. I figured a wordle recreation would be a good oppurtunity to do so.



## Infrastructure
- Express
- MongoDB
## Backend API Reference

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
Returns JSON of word letter statuses.

E.G. Submitting `test` results in `{ [ 1, 2, 0, 2] }` if daily word is `rent`

Codes are as follows
```
0 - Letter is not in word
1 - Letter is in word, not in that position
2 - Letter is in word, and is in that position
```

| Body Form Key | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `attempt` | `string` | **Required**. A string to check against the daily word. |

## Authors

- [@Gage Pielsticker](https://github.com/GagePielsticker)


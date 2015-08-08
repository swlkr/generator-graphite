# Graphite

Graphite is a [yeoman](http://yeoman.io) generator for io.js graphql apps.

### How's it look?

```bash
<your project name>
|-- .env
|-- .gitignore
|-- .eslintrc
|-- app.js
|-- config.js
|-- README.md
|-- package.json
|-- routes.js
|-- controllers
    |-- graphql-controller.js
|-- schema
    |-- root.js
```

### Getting Started

```bash
$ npm install -g yo generator-graphite
$ yo graphite
$ ...Answer some questions
$ cd <your project name>
$ npm run dev
$ curl -H "Content-Type: application/json" -d '{ "query": "{ hello }" }' localhost:3000/query
```

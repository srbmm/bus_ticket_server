const md5 = require("md5");

class App {
    constructor(app) {
        this.app = app;
        this.routes = [];
        this.app.get('/', (req, res) => {res.status(200).send(this.routes.map(item => `<a href="${item}" style="font-size: 1.5em">${item}</a>`).join("<br />"))})
    }
    all(route, table, {get = () => [], edit = () => [], remove = () => []}) {
        this.app.route(route)
            // post
            .post((req, res) => {
                if (req.body) {
                    table.add((err, resOfQuery) => {
                        if (resOfQuery) res.status(200).send(true)
                        else res.status(203).send(false)
                    }, req.body)
                } else res.status(203).send(false)
            })
            // get
            .get((req, res) => {
                table.get((err, query) => {
                    if (!err) res.status(200).send(query)
                    else res.status(404).send("err")
                }, get(req.query).join(" AND "))
            })
            // edit
            .put((req, res) => {
                table.get((err, query) => {
                    if (!err) res.status(200).send(query)
                    else res.status(404).send("err")
                }, edit.join(" AND "))
            })
            // delete
            .delete((req, res) => {
                table.get((err, query) => {
                    if (!err) res.status(200).send(query)
                    else res.status(404).send("err")
                }, remove.join(" AND "))
            })
    }
    one(route, table, id_name) {
        this.app.route(route)
            .get((req, res) => {
                table.get((err, query) => {
                    if (!err) res.status(200).send(query)
                    else res.status(404).send("err")
                }, `${id_name}="${req.params.id}}"`)
            })
            // edit
            .put((req, res) => {
                if (req.body) {
                    table.edit((err, query) => {
                        if (query) res.status(200).send('edited')
                        else res.status(404).send("err")
                    }, req.body, `${id_name}="${req.params.id}"`)

                } else {
                    res.status(401).send("bad request")
                }
            })
            // delete
            .delete((req, res) => {
                if (req.body) {
                    table.remove((err, query) => {
                        if (query) res.status(200).send('deleted')
                        else res.status(404).send("err")
                    }, `${id_name}="${req.params.id}"`)
                } else {
                    res.status(401).send("bad request")
                }
            })
    }
    login(route, table, username_col) {
        this.app.post(route, (req, res) => {
            if (req.body.username && req.body.password) {
                table.get((err, rows) => {
                    if (!err) {
                        if (md5(req.body.password) === rows[0].password) res.status(200).send(true)
                        else res.status(201).send(false)
                    } else res.status(201).send(false)
                }, `${username_col}='${req.body.username}'`)
            } else res.status(201).send(false)
        })
    }

    config(route, table,{conditions = {get: () => [], edit: () => [], remove: () => []}, id_name = "", username_col = ""}) {
        if (!this.routes.includes(route)) {
            this.routes.push(route)
            route = "/" + route
            this.all(route, table, conditions)
            if (id_name){
                this.one(`${route}/:id`, table, id_name)
            }
            if (username_col){
                this.login(`${route}/login`, table, username_col)
            }
        } else throw new Error("Route added before")
    }
}

module.exports = App
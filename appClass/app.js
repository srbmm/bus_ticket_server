const md5 = require("md5");
const {TABLE} = require("./../constants/database");
class App {
    constructor(app) {
        this.app = app;
        this.routes = [];
        this.app.get('/', (req, res) => {
            res.status(200).send(this.routes.map(item => `<a href="${item}" style="font-size: 1.5em">${item}</a>`).join("<br />"))
        })
    }

    all(route, table, {get = () => [], edit = () => [], remove = () => []}, choices) {
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
                const anotherTables = []
                Object.keys(req.query).forEach(key => {
                    if (req.query[key] === "true" && TABLE[key]) {
                        anotherTables.push(TABLE[key])
                    }
                })
                table.get((err, query, countAll) => {
                    if (countAll) {
                        if (!err) res.status(200).send({countAll, query})
                        else res.status(404).send("err")
                    } else {
                        if (!err) res.status(200).send(query)
                        else res.status(404).send("err")
                    }

                    try {
                        req.query.page = Number(req.query.page)
                        req.query.count = Number(req.query.count)
                    } catch (e) {
                        console.log(e)
                    }
                    if (!req.query.order_by) req.query.order_by = ""
                    if (!req.query.reverse) req.query.limit = "ASC"

                }, get(req.query), choices, req.query.page, req.query.count, req.query.order_by, req.query.reverse, anotherTables)
            })
            // edit
            .put((req, res) => {
                table.edit((err, query) => {
                    if (query) res.status(200).send('edited')
                    else res.status(404).send("err")
                }, req.body, edit(req.query))
            })
            // delete
            .delete((req, res) => {
                table.remove((err, query) => {
                    if (!err) res.status(200).send(query)
                    else res.status(404).send("err")
                }, remove(req.query))
            })
    }

    one(route, table, id_name, choices) {
        this.app.route(route)
            .get((req, res) => {
                table.get((err, query) => {
                    if (!err) res.status(200).send(query)
                    else res.status(404).send("err")
                }, `${id_name}="${req.params.id}"`, choices)
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
                    if (!err && rows.length) {
                        if (md5(req.body.password) === rows[0].password) res.status(200).send(true)
                        else res.status(201).send(false)
                    } else res.status(201).send(false)
                }, `${username_col}='${req.body.username}'`)
            } else res.status(201).send(false)
        })
    }

    config(route, table, {
        conditions = {get: () => [], edit: () => [], remove: () => []},
        id_name = "",
        username_col = "",
        choices = []
    }) {
        if (choices.length) choices = choices.join(",")
        else choices = "*"
        if (!this.routes.includes(route)) {
            this.routes.push(route)
            route = "/" + route
            this.all(route, table, conditions, choices)
            if (id_name) {
                this.one(`${route}/:id`, table, id_name, choices)
            }
            if (username_col) {
                this.login(`${route}/login`, table, username_col)
            }
        } else throw new Error("Route added before")
    }
}

module.exports = App
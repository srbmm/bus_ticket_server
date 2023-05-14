const express = require('express')
const App = require('./appClass/app')
const cors = require('cors')
const database = require('./database/connection')
const {TABLE, CHOICES, TABLE_TO_PRIMARY_KEY} = require('./constants/database');
const port = 3001
const app = express()
app.use(express.json())
app.use(cors())
const myApp = new App(app)

// Admin
myApp.config("admin", database.admin, {id_name: "admin_id", username_col: "username", choices: CHOICES.admin} )

// Student
myApp.config("student", database.std, {
    choices: CHOICES.student,
    id_name: "std_id", username_col: "std_id", conditions: {
        get(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.std}.std_id=${query.id}`)
            if (query.like_number) temp.push(`${TABLE.std}.std_id LIKE "%${query.like_number}%"`)
            if (query.minbalacne) temp.push(`${TABLE.std}.balance>=${query.minbalacne}`)
            if (query.maxbalance) temp.push(`${TABLE.std}.balance<=${query.maxbalance}`)
            return temp
        },
        remove(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.std}.std_id=${query.id}`)
            if (query.like_number) temp.push(`${TABLE.std}.std_id LIKE "%${query.like_number}%"`)
            if (query.minbalacne) temp.push(`${TABLE.std}.balance>=${query.minbalacne}`)
            if (query.maxbalance) temp.push(`${TABLE.std}.balance<=${query.maxbalance}`)
            return temp
        },
        edit(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.std}.std_id=${query.id}`)
            if (query.like_number) temp.push(`${TABLE.std}.std_id LIKE "%${query.like_number}%"`)
            if (query.minbalacne) temp.push(`${TABLE.std}.balance>=${query.minbalacne}`)
            if (query.maxbalance) temp.push(`${TABLE.std}.balance<=${query.maxbalance}`)
            return temp
        }
    }
})

// Bus
myApp.config("bus", database.bus, {
    id_name: "bus_id", conditions: {
        get(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.bus}.bus_id=${query.id}`)
            if (query.name) temp.push(`${TABLE.bus}.bus_name='${query.name}'`)
            if (query.like_name) temp.push(`${TABLE.bus}.bus_name LIKE "%${query.like_name}%"`)
            if (query.is_active) temp.push(`${TABLE.bus}.is_active=${query.is_active}`)
            return temp
        },
        remove(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.bus}.bus_id=${query.id}`)
            if (query.name) temp.push(`${TABLE.bus}.bus_name='${query.name}'`)
            if (query.like_name) temp.push(`${TABLE.bus}.bus_name LIKE "%${query.like_name}%"`)
            if (query.is_active) temp.push(`${TABLE.bus}.is_active=${query.is_active}`)
            return temp
        },
        edit(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.bus}.bus_id=${query.id}`)
            if (query.name) temp.push(`${TABLE.bus}.bus_name='${query.name}'`)
            if (query.like_name) temp.push(`${TABLE.bus}.bus_name LIKE "%${query.like_name}%"`)
            if (query.is_active) temp.push(`${TABLE.bus}.is_active=${query.is_active}`)
            return temp
        }
    }
})

// Card Reader
myApp.config("card_reader", database.card_reader, {
    id_name: "card_reader_id", conditions: {
        get(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.card_reader}.card_reader_id=${query.id}`)
            if (query.bus_id && query.bus_id !== "true") temp.push(`${TABLE.card_reader}.bus_id='${query.bus_id}'`)
            return temp
        },
        remove(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.card_reader}.card_reader_id=${query.id}`)
            if (query.bus_id && query.bus_id !== "true") temp.push(`${TABLE.card_reader}.bus_id='${query.bus_id}'`)
            return temp
        },
        edit(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.card_reader}.card_reader_id=${query.id}`)
            if (query.bus_id) temp.push(`${TABLE.card_reader}.bus_id='${query.bus_id}'`)
            return temp
        }
    }
})

// Station
myApp.config("station", database.station, {
    id_name: "station_id", conditions: {
        get(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.station}.station_id=${query.id}`)
            if (query.like_name) temp.push(`${TABLE.station}.station_name LIKE "%${query.like_name}%"`)
            if (query.like_near) temp.push(`${TABLE.station}.nearby_places LIKE "%${query.like_near}%"`)
            return temp
        },
        remove(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.station}.station_id=${query.id}`)
            if (query.like_name) temp.push(`${TABLE.station}.station_name LIKE "%${query.like_name}%"`)
            if (query.like_near) temp.push(`${TABLE.station}.nearby_places LIKE "%${query.like_near}%"`)
            return temp
        },
        edit(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.station}.station_id=${query.id}`)
            if (query.like_name) temp.push(`${TABLE.station}.station_name LIKE "%${query.like_name}%"`)
            if (query.like_near) temp.push(`${TABLE.station}.nearby_places LIKE "%${query.like_near}%"`)
            return temp
        }
    }
})

// station to bus
myApp.config("station_to_bus", database.station_to_bus, {
    id_name: "stations_to_buses", conditions: {
        get(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.station_to_bus}.stations_to_buses=${query.id}`)
            if (query.bus_id) temp.push(`${TABLE.station_to_bus}.bus_id='${query.bus_id}'`)
            if (query.station_id) temp.push(`${TABLE.station_to_bus}.station_id='${query.station_id}'`)
            if (query.like_station_name) temp.push(`${TABLE.station}.station_name LIKE "%${query.like_station_name}%"`)
            if (query.like_nearby) temp.push(`${TABLE.station}.nearby_places LIKE "%${query.like_nearby}%"`)
            return temp
        },
        remove(query) {
            const temp = []
            if (query.id) temp.push(`stations_to_buses=${query.id}`)
            if (query.bus_id && query.bus_id !== "true") temp.push(`bus_id='${query.bus_id}'`)
            if (query.station_id) temp.push(`station_id='${query.station_id}'`)
            if (query.like_station_name) temp.push(`${TABLE.station}.station_name LIKE "%${query.like_station_name}%"`)
            if (query.like_nearby) temp.push(`${TABLE.station}.nearby_places LIKE "%${query.like_nearby}%"`)
            return temp
        },
        edit(query) {
            const temp = []
            if (query.id) temp.push(`stations_to_buses=${query.id}`)
            if (query.bus_id && query.bus_id !== "true") temp.push(`bus_id='${query.bus_id}'`)
            if (query.station_id) temp.push(`station_id='${query.station_id}'`)
            if (query.like_station_name) temp.push(`${TABLE.station}.station_name LIKE "%${query.like_station_name}%"`)
            if (query.like_nearby) temp.push(`${TABLE.station}.nearby_places LIKE "%${query.like_nearby}%"`)
            return temp
        }
    }
})

// Ticket
myApp.config("ticket", database.ticket, {
    id_name: "ticket_id", conditions: {
        get(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.ticket}.ticket_id=${query.id}`)
            if (query.bus_id && query.bus_id) temp.push(`${TABLE.ticket}.bus_id=${query.bus_id}`)
            if (query.std_id && query.std_id) temp.push(`${TABLE.ticket}.std_id=${query.std_id}`)
            if (query.start_time) temp.push(`${TABLE.ticket}.created_time>=${query.start_time}`)
            if (query.end_time) temp.push(`${TABLE.ticket}.created_time<=${query.end_time}`)
            return temp
        },
        remove(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.ticket}.ticket_id=${query.id}`)
            if (query.bus_id && query.bus_id) temp.push(`${TABLE.ticket}.bus_id=${query.bus_id}`)
            if (query.std_id && query.std_id) temp.push(`${TABLE.ticket}.std_id=${query.std_id}`)
            if (query.start_time) temp.push(`${TABLE.ticket}.created_time>=${query.start_time}`)
            if (query.end_time) temp.push(`${TABLE.ticket}.created_time<=${query.end_time}`)
            return temp
        },
        edit(query) {
            const temp = []
            if (query.id) temp.push(`${TABLE.ticket}.ticket_id=${query.id}`)
            if (query.bus_id && query.bus_id) temp.push(`${TABLE.ticket}.bus_id=${query.bus_id}`)
            if (query.std_id && query.std_id) temp.push(`${TABLE.ticket}.std_id=${query.std_id}`)
            if (query.start_time) temp.push(`${TABLE.ticket}.created_time>=${query.start_time}`)
            if (query.end_time) temp.push(`${TABLE.ticket}.created_time<=${query.end_time}`)
            return temp
        }
    }
})


// for ticket adding board
app.post("/board", (req, res) => {
    if (req.body.std_id && req.body.card_reader_id) {
        database.card_reader.get((err, rows) => {
            if (rows === undefined) rows = [];
            if (rows.length) {
                if (rows[0].isActive) {
                    database.std.get((err, stdRow) => {
                        if(stdRow.length) {
                            if(stdRow[0].balance >= rows[0].ticket_price) {
                                try {
                                    database.std.edit((err, resEdit) => {
                                        if (resEdit) {
                                            database.ticket.add((err, resAdd) => {
                                                if (resAdd) res.status(200).send(true)
                                                else res.status(400).send("error")
                                            }, {
                                                bus_id: rows[0].bus_id,
                                                std_id: stdRow[0].std_id,
                                                price: rows[0].ticket_price,
                                                created_time: `${Math.round(+new Date())}`
                                            })
                                        } else res.status(400).send("error")
                                    }, {balance: stdRow[0].balance - rows[0].ticket_price}, `std_id=${stdRow[0].std_id}`)
                                }catch (e){
                                    res.status(400).send("error")
                                }
                            }else res.status(400).send("error")
                        }
                        else res.status(400).send("error")
                    }, `std_id="${req.body.std_id}"`)
                }else res.status(400).send("error")
            } else res.status(400).send("error")
        } ,[`${TABLE_TO_PRIMARY_KEY.card_readers}=${req.body.card_reader_id}`] ,"*" ,0 , 10,  "", "ASC", [TABLE.bus])
    } else {
        res.status(400).send("error")
    }
})

app.listen(port, () => {
    console.log(`Bus API listening on port ${port}`)
})

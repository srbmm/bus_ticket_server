const express = require('express')
const app = express()
const App = require('./appClass/app')
const cors = require('cors')
const port = 3000
const database = require('./database/connection')
app.use(express.json())
app.use(cors())
const myApp = new App(app)

// Admin
myApp.config("admin", database.admin, {id_name: "admin_id", username_col: "username"})

// Student
myApp.config("student", database.std, {
    id_name: "std_id", username_col: "std_number", conditions: {
        get(query) {
            const temp = []
            if(query.id) temp.push(`std_id=${query.id}`)
            if(query.like_number) temp.push(`std_number LIKE "%${query.like_number}%"`)
            if(query.std_number) temp.push(`std_number='${query.std_number}'`)
            if(query.minbalance) temp.push(`balance>=${query.minbalance}`)
            if(query.maxbalance) temp.push(`balance<=${query.maxbalance}`)
            return temp
        },
        remove(query) {
            const temp = []
            if(query.id) temp.push(`std_id=${query.id}`)
            if(query.like_number) temp.push(`std_number LIKE "%${query.like_number}%"`)
            if(query.std_number) temp.push(`std_number='${query.std_number}'`)
            if(query.minbalance) temp.push(`balance>=${query.minbalance}`)
            if(query.maxbalance) temp.push(`balance<=${query.maxbalance}`)
            return temp
        },
        edit(query) {
            const temp = []
            if(query.id) temp.push(`std_id=${query.id}`)
            if(query.like_number) temp.push(`std_number LIKE "%${query.like_number}%"`)
            if(query.std_number) temp.push(`std_number='${query.std_number}'`)
            if(query.minbalance) temp.push(`balance>=${query.minbalance}`)
            if(query.maxbalance) temp.push(`balance<=${query.maxbalance}`)
            return temp
        }
    }
})

// Driver
myApp.config("driver", database.driver, {
    id_name: "driver_id", username_col: "username", conditions: {
        get(query) {
            const temp = []
            if(query.id) temp.push(`driver_id=${query.id}`)
            if(query.like_name) temp.push(`name LIKE "%${query.like_name}%"`)
            if(query.username) temp.push(`username='${query.username}'`)
            if(query.minbalance) temp.push(`balance>=${query.minbalance}`)
            if(query.maxbalance) temp.push(`balance<=${query.maxbalance}`)
            return temp
        },
        remove(query) {
            const temp = []
            if(query.id) temp.push(`driver_id=${query.id}`)
            if(query.like_name) temp.push(`name LIKE "%${query.like_name}%"`)
            if(query.username) temp.push(`username='${query.username}'`)
            if(query.minbalance) temp.push(`balance>=${query.minbalance}`)
            if(query.maxbalance) temp.push(`balance<=${query.maxbalance}`)
            return temp
        },
        edit(query) {
            const temp = []
            if(query.id) temp.push(`driver_id=${query.id}`)
            if(query.like_name) temp.push(`name LIKE "%${query.like_name}%"`)
            if(query.username) temp.push(`username='${query.username}'`)
            if(query.minbalance) temp.push(`balance>=${query.minbalance}`)
            if(query.maxbalance) temp.push(`balance<=${query.maxbalance}`)
            return temp
        }
    }
})

// Bus
myApp.config("bus", database.bus, {
    id_name: "bus_id", conditions: {
        get(query) {
            const temp = []
            if(query.id) temp.push(`bus_id=${query.id}`)
            if(query.name) temp.push(`name='${query.name}'`)
            if(query.like_name) temp.push(`name LIKE "%${query.like_name}%"`)
            if(query.is_active) temp.push(`is_active=${query.is_active}`)
            return temp
        },
        remove(query) {
            const temp = []
            if(query.id) temp.push(`bus_id=${query.id}`)
            if(query.name) temp.push(`name='${query.name}'`)
            if(query.like_name) temp.push(`name LIKE "%${query.like_name}%"`)
            if(query.is_active) temp.push(`is_active=${query.is_active}`)
            return temp
        },
        edit(query) {
            const temp = []
            if(query.id) temp.push(`bus_id=${query.id}`)
            if(query.name) temp.push(`name='${query.name}'`)
            if(query.like_name) temp.push(`name LIKE "%${query.like_name}%"`)
            if(query.is_active) temp.push(`is_active=${query.is_active}`)
            return temp
        }
    }
})

// Card Reader
myApp.config("card_reader", database.card_reader, {
    id_name: "card_reader_id", conditions: {
        get(query) {
            const temp = []
            if(query.id) temp.push(`card_reader_id=${query.id}`)
            if(query.driver_id) temp.push(`driver_id='${query.driver_id}'`)
            return temp
        },
        remove(query) {
            const temp = []
            if(query.id) temp.push(`card_reader_id=${query.id}`)
            if(query.driver_id) temp.push(`driver_id='${query.driver_id}'`)
            return temp
        },
        edit(query) {
            const temp = []
            if(query.id) temp.push(`card_reader_id=${query.id}`)
            if(query.driver_id) temp.push(`driver_id='${query.driver_id}'`)
            return temp
        }
    }
})

// Station
myApp.config("station", database.station, {
    id_name: "station_id", conditions: {
        get(query) {
            const temp = []
            if(query.id) temp.push(`station_id=${query.id}`)
            if(query.like_name) temp.push(`name LIKE "%${query.like_name}%"`)
            if(query.like_near) temp.push(`nearby_places LIKE "%${query.like_near}%"`)
            if(query.bus_id) temp.push(`bus_id='${query.bus_id}'`)
            return temp
        },
        remove(query) {
            const temp = []
            if(query.id) temp.push(`station_id=${query.id}`)
            if(query.like_name) temp.push(`name LIKE "%${query.like_name}%"`)
            if(query.like_near) temp.push(`nearby_places LIKE "%${query.like_near}%"`)
            if(query.bus_id) temp.push(`bus_id='${query.bus_id}'`)
            return temp
        },
        edit(query) {
            const temp = []
            if(query.id) temp.push(`station_id=${query.id}`)
            if(query.like_near) temp.push(`nearby_places LIKE "%${query.like_near}%"`)
            if(query.bus_id) temp.push(`bdriverus_id='${query.bus_id}'`)
            return temp
        }
    }
})

// station to bus
myApp.config("station_to_bus", database.station_to_bus, {
    id_name: "station_to_bus_id", conditions: {
        get(query) {
            const temp = []
            if(query.id) temp.push(`station_to_bus_id=${query.id}`)
            if(query.bus_id) temp.push(`bus_id='${query.bus_id}'`)
            if(query.station_id) temp.push(`station_id='${query.station_id}'`)
            return temp
        },
        remove(query) {
            const temp = []
            if(query.id) temp.push(`station_id=${query.id}`)
            if(query.bus_id) temp.push(`bus_id='${query.bus_id}'`)
            if(query.station_id) temp.push(`station_id='${query.station_id}'`)
            return temp
        },
        edit(query) {
            const temp = []
            if(query.id) temp.push(`station_id=${query.id}`)
            if(query.bus_id) temp.push(`bus_id='${query.bus_id}'`)
            if(query.station_id) temp.push(`station_id='${query.station_id}'`)
            return temp
        }
    }
})

// Ticket
myApp.config("ticket", database.ticket, {
    id_name: "ticket_id", conditions: {
        get(query) {
            const temp = []
            if(query.id) temp.push(`ticket_id=${query.id}`)
            if(query.driver_id) temp.push(`driver_id=${query.driver_id}`)
            if(query.bus_id) temp.push(`bus_id=${query.bus_id}`)
            if(query.std_id) temp.push(`std_id=${query.std_id}`)
            if(query.start_time) temp.push(`created_time>=${query.start_time}`)
            if(query.end_time) temp.push(`created_time<=${query.end_time}`)
            return temp
        },
        remove(query) {
            const temp = []
            if(query.id) temp.push(`ticket_id=${query.id}`)
            if(query.driver_id) temp.push(`driver_id=${query.driver_id}`)
            if(query.bus_id) temp.push(`bus_id=${query.bus_id}`)
            if(query.std_id) temp.push(`std_id=${query.std_id}`)
            if(query.start_time) temp.push(`created_time>=${query.start_time}`)
            if(query.end_time) temp.push(`created_time<=${query.end_time}`)
            return temp
        },
        edit(query) {
            const temp = []
            if(query.id) temp.push(`ticket_id=${query.id}`)
            if(query.driver_id) temp.push(`driver_id=${query.driver_id}`)
            if(query.bus_id) temp.push(`bus_id=${query.bus_id}`)
            if(query.std_id) temp.push(`std_id=${query.std_id}`)
            if(query.start_time) temp.push(`created_time>=${query.start_time}`)
            if(query.end_time) temp.push(`created_time<=${query.end_time}`)
            return temp
        }
    }
})


// for ticket adding board
app.post("/board", (req, res) => {
    if(req.body.std_number && req.body.card_reader_id){
        database.card_reader.get((rowCardReader)=>{
            if(rowCardReader.length){
                database.std.get((row) => {
                    if (row.length){
                        if(+row[0].balance > rowCardReader[0].price){
                            database.bus.get((rowBus)=>{
                                if(rowBus.length){
                                    database.std.edit((res) => {
                                        if(res){
                                            database.ticket.add((res)=>{
                                                if (res) res.status(200).send(true)
                                                else res.status(404).send("error")
                                            },{
                                                created_time: Math.round(+new Date()),
                                                bus_id: rowCardReader[0].bus_id,
                                                driver_id: rowBus[0].driver_id,
                                                std_id: row[0].std_id,
                                                price: rowCardReader[0].price
                                            })
                                        }
                                        else res.status(404).send("error")
                                    }, {balance: +row[0].balance - req.body.price}, `std_id=${row[0].std_id}`)
                                }else res.status(404).send("error")
                            }, `bus_id=${rowCardReader[0].bus_id}`)
                        }else {
                            res.status(404).send("error")
                        }
                    }
                    else res.status(404).send("error")
                }, `std_number=${req.body.std_number}`)
        }else res.status(404).send("error")
        }, `card_reader_id=${req.body.card_reader_id}`)
    }else{
        res.status(404).send("error")
    }
})

app.listen(port, () => {
    console.log(`Bus API listening on port ${port}`)
})

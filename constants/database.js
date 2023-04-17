const ADDRESS = 'localhost';
const USERNAME = 'root';
const PASSWORD = '';
const DATABASE = 'bus';
const TABLE = {
    std: "students",
    driver: "drivers",
    bus: "buses",
    station: "stations",
    station_to_bus: "stations_to_buses",
    ticket: "tickets",
    card_reader: "card_readers",
    admin: "admins"
}
module.exports = {ADDRESS, USERNAME, PASSWORD, DATABASE, TABLE};
const HOST = 'localhost';
const USERNAME = 'root';
const PASSWORD = '';
const DATABASE = 'bus';
const TABLE = {
    std: "students",
    bus: "buses",
    station: "stations",
    station_to_bus: "stations_to_buses",
    ticket: "tickets",
    card_reader: "card_readers",
    admin: "admins"
}
const PRIMARY_KEY_TO_TABLE = {
    std_id: "students",
    bus_id: "buses",
    station_id: "stations",
    stations_to_buses: "stations_to_buses",
    ticket_id: "tickets",
    card_reader_id: "card_readers",
    admin_id: "admins"
}
const CHOICES = {
    admin: ["admin_id", "name", "username"],
    student: ["std_id", "first_name", "last_name", "balance"]
}
module.exports = {HOST, USERNAME, PASSWORD, DATABASE, TABLE, PRIMARY_KEY_TO_TABLE, CHOICES};
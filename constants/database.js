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
const TABLE_TO_PRIMARY_KEY = {
    students: "std_id",
    buses: "bus_id",
    stations: "station_id",
    stations_to_buses: "stations_to_buses",
    tickets: "ticket_id",
    card_readers: "card_reader_id",
    admins: "admin_id"
}
const CHOICES = {
    admin: ["admin_id", "name", "username"],
    student: ["std_id", "first_name", "last_name", "balance"]
}
module.exports = {HOST, USERNAME, PASSWORD, DATABASE, TABLE, CHOICES, TABLE_TO_PRIMARY_KEY};
const connection = require("./connection");
const {TABLE} = require("./../constants/database")
function login(table_name, username, password) {
    switch (table_name) {
        case TABLE.std: {

            break;
        }
        case TABLE.driver: {

            break;
        }
        case TABLE.admin: {

            break;
        }
        default: {
            throw new Error("Wrong Table Name.")
        }
    }
}

function signUp(table_name, data) {
    switch (table_name) {
        case TABLE.std: {

            break;
        }
        case TABLE.driver: {

            break;
        }
        case TABLE.admin: {

            break;
        }
        default: {
            throw new Error("Wrong Table Name.")
        }
    }
}
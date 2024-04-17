import * as db from 'expo-sqlite';

const database = db.openDatabase('NimbusSense.db');


const createDatabase = () => {
    database.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS location (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, latitude TEXT, longitude TEXT)',
            [],
            (tx, results) => {
                console.log('Location table created');
            },
            (tx, error) => {
                console.error(error);
            }
        )
    }
    )
}

const insertLocation = (name, latitude, longitude) => {
    database.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO location (name, latitude, longitude) VALUES (?, ?, ?)',
            [name, latitude, longitude],
            (tx, results) => {
                if (results.rowsAffected > 0) {
                    return true;
                } else {
                    console.error('Failed to insert location');
                }
            },
            (tx, error) => {
                console.error(error);
            }
        )
    })
}

const fetchLocation = () => {

    database.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM location',
            [],
            (tx, results) => {
                const location = results.rows.length;
                const locationArray = [];

                for (let i = 0; i < location; i++) {
                    locationArray.push(results.rows.item(i));
                }
                console.log(locationArray);
                return locationArray;
            },
            (error) => {
                console.error(error);
            }
        );
});
}

const deleteLocation = (id) => {
    database.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM LOCATION WHERE id = ?',
            [id],
            (tx, results) => {
                if (results.rowsAffected > 0) {
                    console.log('Location deleted successfully');
                } else {
                    console.error('Failed to delete location');
                }
            },
            (tx, error) => {
                console.error(error);
            }
        );
    });
}

export { createDatabase, insertLocation, fetchLocation, deleteLocation };
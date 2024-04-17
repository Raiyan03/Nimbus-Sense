import * as db from 'expo-sqlite';

const database = db.openDatabase('NimbusSense.db');
const createDatabase = () => {
    return new Promise((resolve, reject) => {
        
        database.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS location (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, latitude TEXT, longitude TEXT)',
                [],
                (tx, results) => {
                    console.log('Location table created');
                    resolve();
                },
                (tx, error) => {
                    console.error(error);
                    reject(error);
                }
            );
        });
    });
};

const insertLocation = (name, latitude, longitude) => {
    return new Promise((resolve, reject) => {
        console.log('Inserting location:', name, latitude, longitude);
        database.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO location (name, latitude, longitude) VALUES (?, ?, ?)',
                [name, latitude, longitude],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log('Location inserted successfully');
                        resolve(true);
                    } else {
                        console.error('Failed to insert location');
                        resolve(false);
                    }
                },
                (tx, error) => {
                    console.error('Error inserting location:', error);
                    reject(error);
                }
            );
        },
        (error) => {
            console.error('Transaction error:', error);
            reject(error);
        },
        () => {
            console.log('Transaction completed');
        });
    });
};



const fetchLocation = () => {
    return new Promise((resolve, reject) => {
        
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
                    console.log('Locations fetched:', locationArray);
                    resolve(locationArray);
                },
                (tx, error) => {
                    console.error('Error executing SQL query:', error);
                    reject(error);
                }
            );
        });
    });
};

const deleteLocation = (id) => {
    return new Promise((resolve, reject) => {
        
        database.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM LOCATION WHERE id = ?',
                [id],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log('Location deleted successfully');
                        resolve(true);
                    } else {
                        console.error('Failed to delete location');
                        resolve(false);
                    }
                },
                (tx, error) => {
                    console.error(error);
                    reject(error);
                }
            );
        });
    });
};

const dropTables = () => {
    return new Promise((resolve, reject) => {
        
        database.transaction((tx) => {
            tx.executeSql(
                'SELECT name FROM sqlite_master WHERE type="table"',
                [],
                (tx, results) => {
                    const tableNames = results.rows.raw().map((row) => row.name);
                    tableNames.forEach((tableName) => {
                        tx.executeSql(
                            `DROP TABLE IF EXISTS ${tableName}`,
                            [],
                            () => {
                                console.log(`Table ${tableName} dropped successfully`);
                            },
                            (tx, error) => {
                                console.error(`Error dropping table ${tableName}:`, error);
                            }
                        );
                    });
                    resolve(true);
                },
                (tx, error) => {
                    console.error('Error fetching table names:', error);
                    reject(error);
                }
            );
        });
    });
};

export { createDatabase, dropTables, insertLocation, fetchLocation, deleteLocation };
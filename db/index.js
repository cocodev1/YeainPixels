import * as SQLite from 'expo-sqlite';
import * as helper from './helperDb'
import moment from 'moment'

var db = SQLite.openDatabase('db')

var createTablesString = [
    "CREATE TABLE IF NOT EXISTS days(day DATE PRIMARY KEY, emotion INT, note TEXT);",
    "CREATE TABLE IF NOT EXISTS tracker_rules(id INTEGER PRIMARY KEY AUTOINCREMENT, begining DATE, name TEXT, icon TEXT, type INTEGER, active INTEGER DEFAULT 1);",
    "CREATE TABLE IF NOT EXISTS trackers(id INTEGER PRIMARY KEY AUTOINCREMENT, tracker_rules_id INTEGER, name TEXT, icon TEXT, value INT, type INTEGER, day DATE);",
    //"CREATE TABLE IF NOT EXISTS habits(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, status INTEGER, day DATE, option TEXT, active INTEGER DEFAULT 1);",
    "CREATE TABLE IF NOT EXISTS habit_rules(id INTEGER PRIMARY KEY AUTOINCREMENT, begining DATE, name TEXT, option TEXT);",
    "CREATE TABLE IF NOT EXISTS habits(id INTEGER PRIMARY KEY AUTOINCREMENT, day DATE, name TEXT, status TEXT, habit_rules_id INTEGER, UNIQUE(habit_rules_id, day));",
    "CREATE TABLE IF NOT EXISTS types (name TEXT PRIMARY KEY);",
    "CREATE TABLE IF NOT EXISTS status(name TEXT UNIQUE, icon TEXT);",
    "CREATE TABLE IF NOT EXISTS pics(id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT, day DATE);",
    "CREATE TABLE IF NOT EXISTS display_type(id INTEGER, type TEXT DEFAULT mouth);",
    "INSERT INTO display_type(id, type) SELECT 1, 'mouth' WHERE NOT EXISTS(SELECT 1 FROM display_type WHERE display_type.id = 1);"
]

var dropTablesString = [
    "DROP TABLE days;",
    "DROP TABLE trackers;",
    "DROP TABLE tracker_rules",
    "DROP TABLE habit_rules",
    "DROP TABLE habits;",
    "DROP TABLE types;",
    "DROP TABLE status;",
    "DROP TABLE pics;",
    "DROP TABLE display_type;"
]

var createTables = function() {
    createTablesString.forEach(string => {
        db.transaction(tx => {
            tx.executeSql(string, [], (trans, res) => {
            }, (trans, err) => {console.log(err)});
        })
    })
}

var dropTables = function() {
    dropTablesString.forEach(string => {
        db.transaction(tx => {
            tx.executeSql(string, [] , (trans, res) => {}, (trans, err) => console.log(err))
        })
    })
    console.log('droped')
}

var addDay = function(date, emotion, note) {
    db.transaction(tx => {
        tx.executeSql("INSERT INTO days (day, emotion, note) VALUES (?, ?, ?);", [date, emotion, note], (trans, res) => {}, (trans, err) => {
            console.log(err)
            return err
        })
    })
}


var getDaysByYear = function(year) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM days;", [], (trans, res) => {
                var days = []
                for(var i = 0; i < res.rows.length; i++) {
                    days.push(res.rows.item(i))
                } 
                resolve(days)
            }, (trans, err) => {
                console.log(err)
                return err
            })
        })
    })
}

var getDayByDate = function(date) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * from days WHERE days.day = ?", [date], (trans, res) => {
                if(res.rows.length <= 1) {
                    resolve(res.rows.item(0))
                }else {
                    resolve(null)
                }
            })
        }, (trans, err) => {
            reject(err)
        })
    })
}

var getTrackersByDate = function(date) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM trackers;", [], (trans, res) => {
                var trackers = []
                for(var i = 0; i < res.rows.length; i++) {
                    if(moment(date, 'YYYY-MM-DD').isSame(moment(res.rows.item(i).day))) {
                        trackers.push(res.rows.item(i))
                    }
                }
                resolve(trackers)
            })
        })
    })
}

var getTrackerRulesByDate = function(date) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM tracker_rules", [], (trans, res) => {
                var trackerRules = []
                for(var i = 0; i < res.rows.length; i++) {
                    if(moment(res.rows.item(i).begining, 'YYYY-MM-DD').isSameOrBefore(moment(date, 'YYYY-MM-DD'))) {
                        trackerRules.push(res.rows.item(i))
                    }
                }
                resolve(trackerRules)
            }, (trans, err) => {
                console.log(err)
                reject(err)
            })
        })
    })
}

var getRelativeTrackersByDate = async function(date) {
    var relativeTrackers = []
    var trackers = await getTrackersByDate(date)
    var trackerRules = await getTrackerRulesByDate(date)
    var trackerRule
    for (trackerRule of trackerRules) {
        if(trackers.filter(tracker => tracker.tracker_rules_id == trackerRule.id).length >= 1) {
            var newTracker = trackers.filter(tracker => tracker.tracker_rules_id == trackerRule.id)[0]
            relativeTrackers.push({...newTracker, generated: false, active: trackerRule.active})
        }else {
            if(trackerRule.active == 1) {
                relativeTrackers.push({...trackerRule, generated: true})
            }
        }
    }
    return relativeTrackers
    
}

var addTracker = function(name, icon, value, type, date, tracker_rules_id) {
    db.transaction(tx => {
        tx.executeSql("INSERT INTO trackers (name, icon, value, type, day, tracker_rules_id) VALUES (?, ?, ?, ?, ?, ?);", [name, icon, value, type, date, tracker_rules_id], (trans, res) => {console.log('done')}, (trans, err) => {
            console.log(err)
            return err
        })
    })
}

var addTrackerRule = function(name, icon, type, date) {
    db.transaction(tx => {
        tx.executeSql("INSERT INTO tracker_rules (name, icon, type, begining) VALUES (?, ?, ?, ?);", [name, icon, type, date], (trans, res) => {}, (trans, err) => {
            console.log(err)
            return err
        })
    })
}

var changeActiveTracker = function(tracker_rules_id, active) {
    db.transaction(tx => {
        tx.executeSql("UPDATE tracker_rules SET active = ? WHERE id = ?", [active, tracker_rules_id], (trans, res) => {}, (trans, err) => {
            console.log(err)
            return err
        })
    })
} 

var addHabitRule = function(name, date, option) {
    db.transaction(tx => {
        tx.executeSql("INSERT INTO habit_rules (begining, name, option) VALUES (?, ?, ?);", [date, name, option], (trans, res) => {}, (trans, err) => {
            console.log(err)
            return(err)
        }) 
    })
}

var deleteHabitRule = function(id) {
    db.transaction(tx => {
        tx.executeSql("DELETE FROM habit_rules WHERE id = ?", [id], (trans, res) => {}, (trans, err) =>  {
            console.log(err)
            return err
        })
    })
}

var updateTracker = function(id, updated, value) {
    db.transaction(tx => {
        if(value) {
            tx.executeSql("UPDATE trackers SET value = ?, updated = ? WHERE id = ?;", [value, updated, id], (trans, res) => {}, (trans, err) => {
                console.log(err)
                return err
            })
        } else {
            tx.executeSql("UPDATE trackers SET updated = ? WHERE id = ?;", [updated, id], (trans, res) => {}, (trans, err) => {
                console.log(err)
                return err
            })
        }
    })
}



var getHabits = function() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * from habits', [], (trans, res) => {
                var habits = []
                for(var i = 0; i < res.rows.length; i++) {
                    habits.push(res.rows.item(i))
                }
                resolve(habits)
            })
        })
    })
}

var getHabitRules = function() {
    return new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
            tx.executeSql('SELECT * FROM habit_rules', [], (trans, res) => {
                var habit_rules = [];
                for (var i = 0; i < res.rows.length; i++) {
                    habit_rules.push(res.rows.item(i))
                }
                resolve(habit_rules)
            }, (trans, err) =>  reject(err))
        })
    })
}

var getAllHabitsByDate = async function(date) {

    var habit_rules = await getHabitRules()
    var habits = await getHabits()
    var allHabits = helper.getAllHabits(habit_rules, habits, date)
    return allHabits
}


var incrementNumberOfTimesHabitRule = function(habit_rules_id) {

    db.transaction(tx => {
        tx.executeSql("SELECT * FROM habit_rules WHERE habit_rules.id = ?", [habit_rules_id], (trans, res) => {
            const habit_rule = res.rows.item(0)
            const option = JSON.parse(habit_rule.option)
            if(option.objective.type == "numberOfTimes") {
                option.objective.actualTimes = parseInt(option.objective.actualTimes)+1
                tx.executeSql("UPDATE habit_rules SET option = ? WHERE habit_rules.id = ?", [JSON.stringify(option), habit_rules_id], (trans, res) => {
                }, (trans, err) => {
                    console.log(err)
                    return err
                })
            }
        })
    })
}

var addHabit = async function(date, habit_rules_id, name, status) {
    db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO habits (day, name, status, habit_rules_id) VALUES (?, ?, ?, ?);", [date, name, status, habit_rules_id], async (trans, res) => {
            return res
        }, (trans, err) => {
            console.log(err)
            return err
        })
    })
}

var getTypes = function() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM types", [], (trans, res) => {
                var types = []
                for(var i = 0; i < res.rows.length; i++) {
                    types.push(res.rows.item(i).name)
                }
                resolve(types)
            }, (trans, err) => {
                console.log(err)
                reject(err)
            })
        })
    })
}

var addType = function(name) {
    db.transaction(tx => {
        tx.executeSql("INSERT INTO types (name) VALUES (?);", [name], (trans, res) => {}, (trans, err) => {
            console.log(err)
            return err
        })
    })
}

var getDisplayType = function() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM display_type', [], (trans, res) => {
                resolve(res.rows.item(0).type)
            }, (trans, err) => {
                console.log(err)
                reject(err)
            })
        })
    })
}

var changeDisplayType = function(type) {
    db.transaction(tx => {
        tx.executeSql("UPDATE display_type SET type = ? WHERE id = 1", [type], (trans, res) => {}, (trans, err) => {
            console.log(err)
            return err
        })
    })
}

var addPic = function(date, uri) {
    console.log(date, uri)
    db.transaction(tx => {
        tx.executeSql("INSERT INTO pics (day, path) VALUES (?, ?)", [date, uri], (trans, res) => {}, (trans, err) => {
            console.log(err)
            return err
        })
    })
}

var getPic = function(date) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM pics WHERE day = ?", [date], (trans, res) => {
                if(res.rows.length == 0) {
                    resolve(null)
                }else {
                    resolve(res.rows.item(res.rows.length-1).path)
                }
            }, (trans, err) => {
                console.log(err)
                reject(err)
            })
        })
    })
}

var getDb = function() {
    return db
}

export {
    createTables, 
    dropTables, 
    getDayByDate, 
    addDay,
    getDaysByYear,
    getTrackersByDate, 
    getRelativeTrackersByDate,
    addTracker,
    addTrackerRule,
    updateTracker,
    getAllHabitsByDate,
    addHabit,
    incrementNumberOfTimesHabitRule,
    addHabitRule,
    deleteHabitRule,
    getTypes,
    addType,
    getDisplayType,
    changeDisplayType,
    changeActiveTracker,
    addPic,
    getPic,
    getDb
}
import {getDb, createTables, dropTables} from './index'
import {} from './helperDb'

async function aa() {
    const option = {
        day: {
            type: 'week',
            days: ["monday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        },
        objective: {
            type: 'date',
            maxDate: '2020-07-30'
        }
    }
    getDb().transaction(tx => {
        tx.executeSql("INSERT INTO habit_rules(begining, name, option) VALUES (?,?,?);", ['2020-07-28', 'CCea', JSON.stringify(option)], (trans, res) => {
            console.log(res, trans)
            console.log('ALO')
        }, (trans, err) => {console.log(err)})
    })
    return 'cc'

}

export default aa
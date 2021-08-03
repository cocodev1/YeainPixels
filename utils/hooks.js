import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react/cjs/react.production.min';

const db = SQLite.openDatabase('db')

export function useDB(select, change, filter) {
    const [data, setData] = useState([])

    useEffect(() => {    
        function run() {
            db.transaction(tx => {
                tx.executeSql(select, [], (trans, res) => {

                    const items = []
                    for(var i = 0; i < res.rows.length; i++) {
                        items.push(res.rows.item(i))
                    }
                    setData(items.filter(filter))
                })
            })
        }

        run()
    }, [])

    function updateDB(args, toInsert) {
        db.transaction(tx => {
            tx.executeSql(change, args,() => {}, (trans, err) => {
                if (err) throw err
                toInsert && setData(...data, toInsert)
            })
        })
    }

    return [data, updateDB]
}
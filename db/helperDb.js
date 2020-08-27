import moment from 'moment'

function getEveryHabits(habits, date) {
    var filteredHabits = []
    habits.foreach(habit => {
        if(habit.active == 1) {
            const interval = JSON.parse(habit.option)
            if(interval.day.type == "every") {
                if(interval.objective.type == "date") {
                    if(moment(interval.objective.maxDate, 'YYYY-MM-DD').isAfter(moment(date, 'YYYY-MM-DD'))) {
                        filteredHabits.push(habit)
                    }
                }else if(interval.objective.type == "numberOfTimes") {
                    if(interval.objective.actualTimes < interval.objective.maxTimes) {
                        filteredHabits.push(habit)
                    }
                }else if(interval.objective.type == "never") {
                    filteredHabits.push(habit)
                }
            }
        }
    })
    return filteredHabits
}

function getOnlyHabits(habits, date) {
    var filteredHabits = []
    habits.foreach(habit => {
        if(habit.active == 1) {
            const interval = JSON.parse(habit.option)
            if(interval.day.type == "only") {
                if(moment(date, 'YYYY-MM-DD').isSame(moment(habit.day, 'YYYY-MM-DD'))) {
                    filteredHabits.push(habit)
                }
            }
        }
    })
    return filteredHabits
}

function getWeekHabits(habits, date) {
    var filteredHabits = []
    habits.foreach(habit => {
        if(habit.active == 1) {
            const interval = JSON.parse(habit.option)
            if(interval.day.type == "week") {
                interval.day.days.foreach(day => {
                    if(day == moment(date, 'YYYY-MM-DD').format('dddd').toLowerCase()) {
                        if(interval.objective.type == "date") {
                            if(moment(interval.objective.maxDate, 'YYYY-MM-DD').isAfter(moment(date, 'YYYY-MM-DD'))) {
                                filteredHabits.push(habit)
                            }
                        }else if(interval.objective.type == "numberOfTimes") {
                            if(interval.objective.actualTimes < interval.objective.maxTimes) {
                                filteredHabits.push(habit)
                            }
                        }else if(interval.objective.type == "never") {
                            filteredHabits.push(habit)
                        }
                    }
                })
            }
        }
    })
    return habits
}


function getMouthHabits(habits, date) {
    var filteredHabits = []
    habits.foreach(habit => {
        if(habit.active == 1) {
            const interval = JSON.parse(habit.option)
            if(interval.day.type == "mouth") {
                if(interval.day.days.includes(moment(date, 'YYYY-MM-DD').format('DD'))) {
                    if(interval.objective.type == "date") {
                        if(moment(interval.objective.maxDate, 'YYYY-MM-DD').isAfter(moment(date, 'YYYY-MM-DD'))) {
                            filteredHabits.push(habit)
                        }
                    }else if(interval.objective.type == "numberOfTimes") {
                        if(interval.objective.actualTimes < interval.objective.maxTimes) {
                            filteredHabits.push(habit)
                        }
                    }else if(interval.objective.type == "never") {
                        filteredHabits.push(habit)
                    }
                }
            }
        }
    })
    return filteredHabits
}


function getRepeatingHabits(habits, date) {
    var filteredHabits = []
    habits.foreach(habit => {
        if(habit.active == 1) {
            const interval = JSON.parse(habit.option) 
            if(interval.day.type == "repeating") {
                var current = moment(habit.day, 'YYYY-MM-DD')
                while(current.isBefore(moment(date, 'YYYY-MM-DD')) || current.isSame(moment(date, 'YYYY-MM-DD'))) {
                    var current = current.add(parseInt(interval.day.interval, 10), 'd')
                    if(current.isSame(moment(date, 'YYYY-MM-DD'))) {
                        if(interval.objective.type == "date") {
                            if(moment(interval.objective.maxDate, 'YYYY-MM-DD').isAfter(moment(date, 'YYYY-MM-DD'))) {
                                filteredHabits.push(habit)
                            }
                        }else if(interval.objective.type == "numberOfTimes") {
                            if(interval.objective.actualTimes < interval.objective.maxTimes) {
                                filteredHabits.push(habit)
                            }
                        }else if(interval.objective.type == "never") {
                            filteredHabits.push(habit)
                        }
                    }
                }
            }
        }
    })
    return filteredHabits
}

function getSavedHabits(habits, date) {
    var filteredHabits = []
    habits.foreach(habit => {
        if(habit.active == 1) {
            if(moment(habit.day, 'YYYY-MM-DD').isSame(moment(date, 'YYYY-MM-DD')) && habit.option.day == null) {
                filteredHabits.push(habit)
            }
        }
    })
}

function incrementHabitOption(habit, date) {
    const interval = JSON.parse(habit.option)
    var option = {
        objective: {
        ...interval.objective,
        actualTimes: interval.objective.actualTimes+1
        }
    }
    return option
}

function getHabitByHabitsRule(habit_rule, habits, date) {

    for(habit of habits) {
        if(habit.habit_rules_id == habit_rule.id && moment(habit.day, 'YYYY-MM-DD').isSame(moment(date, 'YYYY-MM-DD'))) {
            return {...habit, generated: false}
        }
    }
    return null
}

function getEveryHabitByHabitRule(habit_rule, date) {
    return {
        day: date,
        habit_rules_id: habit_rule.id,
        name: habit_rule.name,
        status: null,
        generated: true
    }
}

function getOnlyHabitByHabitRuleOption(option, habit_rule, date) {
    if(moment(habit_rule.begining, 'YYYY-MM-DD').isSame(moment(date, 'YYYY-MM-DD'))) {
        return {
            day: date,
            habit_rules_id: habit_rule.id,
            name: habit_rule.name,
            status: null,
            generated: true
        }
    }
}

function getWeekHabitByRuleOption(option, habit_rule, date) {
    var dayOfWeek = [...option.day.days]
    if(dayOfWeek.includes(moment(date, 'YYYY-MM-DD').format('dddd').toLowerCase())) {
        return {
            day: date,
            habit_rules_id: habit_rule.id,
            name: habit_rule.name,
            status: null ,
            generated: true
        }
    }
}

function getMouthHabitByRuleOption(option, habit_rule, date) {
    var dayOfMouth = [...option.day.days]
    var day = moment(date, 'YYYY-MM-DD').format('DD')
    if(dayOfMouth.includes(parseInt(day))) {
        return {
            day: date,
            habit_rules_id: habit_rule.id,
            name: habit_rule.name,
            status: null,
            generated: true
        }
    }
}

function getRepeatingHabitByRuleOption(option, habit_rule, date) {
    var actual = moment(option.day.begining, 'YYYY-MM-DD')
    while(actual.isSameOrBefore(moment(date, 'YYYY-MM-DD'))) {
        if(actual.isSame(moment(date, 'YYYY-MM-DD'))) {
            return {
                day: date,
                habit_rules_id: habit_rule.id,
                name: habit_rule.name,
                status: null,
                generated: true
            }
        }else {
            actual.add(parseInt(option.day.interval), 'd')
        }
    }
    

}

function isInObjective(habit_rule_option, date) {
    if(habit_rule_option.objective.type == "never" || habit_rule_option.objective.type == undefined) return true
    else if(habit_rule_option.objective.type == "numberOfTimes") {
        if(habit_rule_option.objective.actualTimes < habit_rule_option.objective.maxTimes) {
            return true
        }else return false
    }else if(habit_rule_option.objective.type == "date") {
        if(moment(date, 'YYYY-MM-DD').isSameOrBefore(moment(habit_rule_option.objective.maxDate, 'YYYY-MM-DD'))) return true
        else return false
    }
}

//CREATE TABLE IF NOT EXISTS habit_rules(id INTEGER PRIMARY KEY AUTOINCREMENT, begining DATE, name TEXT, option TEXT)
//CREATE TABLE IF NOT EXISTS habits(id INTEGER PRIMARY KEY AUTOINCREMENT, day DATE, name TEXT, status TEXT, actual_value INTEGER, max_value INTEGER, habit_rules_id INTEGER)
function getAllHabits(habit_rules, habits, date) {
    
    var allHabits = []
    var habit_rule
    allHabits = habits.filter(habit => moment(habit.day, 'YYYY-MM-DD').isSame(moment(date, 'YYYY-MM-DD')))
    for(habit_rule of habit_rules) {
        const option = JSON.parse(habit_rule.option)
        if(moment(habit_rule.begining, 'YYYY-MM-DD').isSameOrBefore(moment(date, 'YYYY-MM-DD'))) {
            if(getHabitByHabitsRule(habit_rule, habits, date)) {
                var habitByHabitRule = getHabitByHabitsRule(habit_rule, habits, date)
                if(!allHabits.includes(habitByHabitRule)) {
                    allHabits.push(getHabitByHabitsRule(habit_rule, habits, date))
                }
            }else {
                if(isInObjective(option, date)) {
                    if(option.day.type == "every") {
                        var habit = getEveryHabitByHabitRule(habit_rule, date)
                        allHabits.push({...habit, habit_rules_id: habit_rule.id})
                    }else if(option.day.type == "only") {
                        var habit = getOnlyHabitByHabitRuleOption(option, habit_rule, date)
                        allHabits.push({...habit, habit_rules_id: habit_rule.id})
                    }else if(option.day.type == "week") {
                        var habit = getWeekHabitByRuleOption(option, habit_rule, date)
                        allHabits.push({...habit, habit_rules_id: habit_rule.id})
                    }else if(option.day.type == "mouth") {
                        var habit = getMouthHabitByRuleOption(option, habit_rule, date)
                        allHabits.push({...habit, habit_rules_id: habit_rule.id})
                    }else if(option.day.type == "repeating") {
                        var habit = getRepeatingHabitByRuleOption(option, habit_rule, date)
                        allHabits.push({...habit, habit_rules_id: habit_rule.id})
                    }
                }
            }
        }
    }
    return allHabits
}



export {
    getEveryHabits,
    getOnlyHabits,
    getWeekHabits,
    getMouthHabits,
    getRepeatingHabits,
    getSavedHabits,
    incrementHabitOption,
    getAllHabits
}
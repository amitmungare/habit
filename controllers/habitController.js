
const mongoose = require('mongoose');
const User = require('../models/user');
const Habit = require('../models/habit');

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

module.exports.createHabit = async function(req,res){
    try{
        let user =await User.findById(req.user.id);

        if(user){
            let today = new Date();
            let date = today.getDate();

            let habit = await Habit.create({
                habitName:req.body.habitName,
                habitDis: req.body.habitDis,
                dateCreation:date,
                days: ['None', 'None', 'None', 'None', 'None', 'None', 'None'],
                user : user.id,
                completed:0,
                streak:0
            })
            req.flash('success', 'Habit created');
            user.habits.push(habit.id);
            user.save();
            return res.redirect('back');
        }
    }catch(error){
        console.log(error)
        return;
    }
}

module.exports.habitList = async function(req,res){
    try{
        if(req.isAuthenticated()){
            let user =await User.findById(req.user.id).populate('habits')
            let habits = user.habits;

            req.flash('success', 'Welcome')
            return res.render('habitList',{
                title:'Habits',
                habits:habits,
                user:user
            })
        }
    }catch(error){
        console.log(error);
        return res.render('login',{
            title:'Login'
        });
    }
}

module.exports.habitListWeekly = async function(req, res){
    try{

        if(req.isAuthenticated()){
            let date = new Date();
            let days =[];

            for(let i=0; i<7; i++){
                let day = date.getDate()+' '+month[date.getMonth]+' '+date.getFullYear();
                date.setDate(date.getDate()-1);
                days.push(day);
            }
            days.reverse();

            let user = await User.findById(req.user.id).populate('habits');
            let habits = user.habits;

            updateData(habits);

            req.flash('success', 'status updated')
            return res.render('habitListWeekly', {
                title:'Weekly Habit',
                habits:habits,
                days
            })
        }
    }catch(error){
        console.log(error)
        return;
    }
}

let updateData = function(habits){
    let today = new Date().getDate();

    for(let habit of habits){
        let id = habit.id;
        let diff = today - habit.dateCreation;

        if(diff >0 && diff <=7){
            for(let i=diff, j=0; i<habit.days.length; i++,j++){
                habit.days[j]=habit.days[i];
            }

            let rem = habit.days.length-diff;
            for(let i=rem; i<habit.days.length; i++){
                habit.days[i]='None';
            }
            habit.dateCreation = today;
            updateStreak(habit);
            habit.save();

        }else if(diff>7){
            for(let i=0; i<7; i++){
                habit.days[i]='None';
                habit.dateCreation = today;
                updateStreak(habit);
                habit.save();
            }
        }
    }
}

let updateStreak = async function(habit){
    try{

        let currectCompleted=0;
        let maxStreak=0;
        currentStreak=0;

        for(let i=0; i<habit.days.length; i++){
            if(habit.days[i]=='Done'){
                currectCompleted++;
                currentStreak++;
            }else{
                if(currentStreak>maxStreak){
                    maxStreak=currentStreak;
                    currentStreak=0;
                }else{
                    streak=0;
                }
            }
        }

        if(currentStreak>maxStreak){
            maxStreak=currentStreak;
        }

        await Habit.findByIdAndUpdate(habit.id, {
            streak:maxStreak,
            completed:currectCompleted
        })

    }catch(error){
        console.log(error)
        return
    }
}


module.exports.update = function(req, res){
    let id = req.params.id;
    let day = req.params.day;
    let status = req.params.status;

    Habit.findById(id, function(error, habit){
        if(error){
            console.log('Could not find the habit', error);
            return res.redirect('back')
        }
        habit.days[day] = status;
        habit.save();
        updateStreak(habit);
        req.flash('success', 'Habit Updated');
        return res.redirect('/habit/habitlistWeekly');
    })
}

module.exports.deleteHabit = async function(req, res){
    try {
        let id = req.params.id;
        let habit = await Habit.findById(id);
        if(habit){
            let uid = habit.user;
            habit.remove();
            await User.findByIdAndUpdate(uid, {$pull:{habits:id}})
            req.flash('success', 'habit deleted')
            return res.redirect('/habit/habitList')
        }

    } catch (error) {
        req.flash('error', 'Could not Delete Habit')
        return res.redirect('./habit/habitList')
    }
}
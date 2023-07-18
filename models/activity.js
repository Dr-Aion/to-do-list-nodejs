const mongoose = require('mongoose')

const activitySchema = mongoose.Schema(
    {
        label: {
            type: String,
            required: [true, 'Please, enter the activity']
        },
        status: {
            type: String,
            required: true
        }
    }
    // ,
    // {
    //     timestamps: true
    // }   
)

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity;
const mongoose =  require('mongoose');
const { Schema } = mongoose;


const contractorSchema = new Schema({
   contractor_name: {
        type: String,
        required:true
    },
    contractor_budget:{
        type: Number,
        required: true
    },
    Labours:[{
        type: Schema.Types.ObjectId,
        ref: 'Labours'
    }],
    imageUrl:{
        type: String
    }
});


module.exports = mongoose.model('Contractor', contractorSchema);
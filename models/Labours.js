const mongoose =  require('mongoose');
const { Schema } = mongoose;

const labourSchema = new Schema({
    Labour_name: {
        type: String,
        required:true
    },
    Labour_wages:{
        type: Number,
        required: true
    },
    Labour_profession: {
        type: String,
        default: false
    },
    imageUrl:{
        type: String
    },
    labourId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    contractorId:{
        type:Schema.Types.ObjectId,
        ref:'Contractor',
        default:null
    }
});

module.exports = mongoose.model('Labours',labourSchema);
const Contractor=require('../../models/contractor')

const getContractors=async(req,res)=>{
    let contractors=await Contractor.findOne({})
res.render('contractor/contractor',{
   contractors
})
}

module.exports={getContractors}
const Labour=require('../../models/Labours')

const getContractorPanel=(req,res)=>{
res.render('contractor/contractor'),{
    isAdmin: req.user.isAdmin,
    isContractor:req.user.isContractor
}
}

const addlabourpage=async(req,res)=>{
    let labours= await Labour.find({})
    console.log(labours);
    res.render('contractor/addlabour',{
        labours
    })
}

module.exports={getContractorPanel,addlabourpage}
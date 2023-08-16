const getdashboard=(req,res)=>{
res.render('dashboard/dashboard',{
    isAdmin: req.user.isAdmin,
    isContractor:req.user.isContractor
})
}

module.exports={getdashboard}

module.exports.home = function(req, res){
    if(req.isAuthenticated()){
        return res.render('home', {
            title: 'habit | home '
        });
    }
    return res.render('home',{
        title:"habit | home"
    });
}

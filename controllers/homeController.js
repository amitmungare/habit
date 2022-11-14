
module.exports.home = function(req, res){
    if(req.isAuthenticated()){
        return res.render('home', {
            title: 'habit | home '
        });
    }
    req.flash('success', 'Welcome');
    return res.render('home',{
        title:"habit | home"
    });
}
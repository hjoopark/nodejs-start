exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {   // 로그인 여부  //req.login, req.logout
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};
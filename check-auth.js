const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>
{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);

        jwt.verify(token,"secret_this_should_be_longer_than_it_is", (err, decodedToken) => {
            if (err) return res.sendStatus(403);
            req.user = decodedToken;
            console.log(decodedToken);
            next();
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(401).json({
            message: "Invalid token"
        }); 
    }
};
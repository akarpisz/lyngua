const jwt = require('jsonwebtoken');

function generateToken(id) {
    return jwt.sign(id, process.env.SECRET, {expiresIn: "2h"});
}

function validateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
      
        jwt.verify(token, process.env.SECRET, (err, user) => {
        
          console.log(err)
          if (err) {
              return res.sendStatus(403)
            }
          req.user = user
          next();
        })
}



module.exports = {
generateToken: generateToken,
validateToken: validateToken
}
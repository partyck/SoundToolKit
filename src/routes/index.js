const express = require('express');
const router = express.Router();

var visitCounter = 1;

router.get('/settings', (req, res, next) => {
  res.render('settings');
});

router.get('/', (req, res, next) => {
  if(!req.session.visitCount){
    req.session.visitCount = visitCounter;
    visitCounter++;
    console.log('session: ', req.session.visitCount);
    res.render('mobile', {session: req.session.visitCount});
  }else{
    console.log('session: ', req.session.visitCount);
    res.render('mobile', {session: req.session.visitCount});
  }
});

module.exports = router;
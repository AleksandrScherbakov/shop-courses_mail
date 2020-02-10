const {Router} = require("express");
const Course = require('../models/course.js');
const auth = require('../middleware/auth');
const {validationResult} = require("express-validator");
const {courseValidators} = require("../utils/validator");
const router = Router();

router.get("/", auth, (req, res)=>{
    res.render("add",{
        title: "Добавить курс",
        isAdd: true,
    });
});

router.post("/", auth, courseValidators, async (req, res)=>{
    const errors = validationResult(req);
    const {title, price, url} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).render('add', {
            title: "Добваить курс",
            isAdd: true,
            error: errors.array()[0].msg,
            data: {
                title,
                price,
                url
            }
        })
    }
    const course = new Course({
        title,
        price,
        url,
        userId: req.user
    });
    try{
        await course.save();
        res.redirect("/courses");
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
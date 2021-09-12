const router = require('express').Router();
const user = require('../model/user');
router.post('/register', async (req, res, next) => {
    const body = req.body;
    const model = new user(
        {
            name: body.name,
            phone: body.phone,
            password: body.password,
            pincode: body.pincode
        }
    );
    console.log(req.body);
    // model.save();
    model.save(function (err, result) {
        if (err) {
            res.status(401).send(err);
        }
        else {
            console.log(result);
            res.status(201).send(result);
        }
    });
    next();
});
const authMiddleware = (req, res, next) => {
    next();
}
router.patch('/assessment', authMiddleware, (req, res, next) => {
    if (!req.body.user_id) {
        res.status(401).json({ message: "INVALID OR USER ID REQUIRED !!" });
    }
    const model = new user();
    const { user_id, ...details } = req.body;
    console.log(details);
    model.findByIdAndUpdate(user_id,
        details,
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log(docs);
            }
        });
    next();
});

//localhost:3001/user/risk-calculation/613d9d5882dfb4f171d2dee6
router.get('/risk-calculation/:id', authMiddleware, async (req, res, next) => {
    if (!req.params.id) {
        res.status(401).json({ message: "INVALID OR USER ID REQUIRED !!" });
    }
    const model = new user();
    const data = await model.findById(req.params.id).exec();
    if (data && data.id) {
        const len = data.symptoms.length;
        if (len == 0 && data.last_travel_days < 15 && data.contact_with_infected == 0) {
            res.status(200).json({
                "risk-factor": "5%"
            });
        } else if (len > 0 || data.last_travel_days > 15 || data.contact_with_infected == 1) {
            res.status(200).json({
                "risk-factor": "50%"
            });
        } else if (len > 0 && data.last_travel_days > 15 || len > 0 && data.contact_with_infected == 1 || data.last_travel_days > 15 && data.contact_with_infected == 1) {
            res.status(200).json({
                "risk-factor": "75%"
            });
        } else {
            res.status(200).json({
                "risk-factor": "95%"
            });
        }
    } else {
        res.status(401).json({
            "message": "Invalid User Id"
        });
    }
});
module.exports = router;
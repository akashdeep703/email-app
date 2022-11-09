const express = require('express');
const res = require('express/lib/response');
const router = express.router();
const Mails = require('../../modal/Email');

// add a schedule email data
// @routes POST api/mails
router.post('/', (req, res) => {

    const { from_email, subject, email_body, sent_status, status_code } = req.body;

    //validation
    if (!from_email || !subject || !email_body || !sent_status, status_code) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    } else {
        const newData = new Mails({
            send_id, from_email, subject, email_body, sent_status, status_code
        });
        newData.save().then(data => {
            console.log("🚀 ~ file: email.js ~ line 19 ~ router.post ~ data", data)
            return res.json({ data })
        })
    }

})
// fetch a single email data
// @routes Get api/mails

router.get('/email/:id', (req, res) => {
    Mails.findById(req.param.id).then(data => {
        console.log("🚀 ~ file: email.js ~ line 30 ~ Mails.findById ~ data", data)
        res.json(data);
    })
})
// @routes POST api/mails update

router.post('/:id', (req, res) => {
    Mails.findById(req.param.id).then(data => {

        const { from_email, subject, email_body, sent_status, status_code } = req.body;

        //validation
        if (!from_email || !subject || !email_body || !sent_status, status_code) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        } else {
            const newvalues = { $set: { from_email: from_email, subject: subject, email_body: email_body, sent_status: sent_status, status_code: status_code } }
            Mails.updateOne(newvalues).then(data => {
                res.json({ data }).catch(err => {
                    res.status(400).json('Error--' + err)
                    console.log("🚀 ~ file: email.js ~ line 48 ~ res.json ~ err", err)
                })
            }).catch(err => {
                res.status(400).json("Error--" + err)
                console.log("🚀 ~ file: email.js ~ line 51 ~ Mails.updateOne ~ err", err)
            })
        }
        res.json(data);
    });
});

// @routes DELETE api/mails 

router.delete('/:id', (req, res) => {
    Mails.findById(req.param.id).then(data => {
        data.remove().then(() => res.json({ success: true }))
            .catch(err => res.status(400).json({ success: false }))
    }).catch(err => res.status(400).json({ success: false }))
});

module.exports = router;
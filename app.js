const express = require('express');
const logger = require('morgan');
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const date = new Date();
const index = date.getDay();

const current_day = days[index];

// const utc = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
// const utc_time = utc.toISOString().split('.')[0] + 'Z';

const github_file_url = "https://github.com/Gbotemi-ojo/hng-task1-backend/blob/main/app.js";
const github_repo_url = "https://github.com/Gbotemi-ojo/hng-task1-backend"
app.get('/api', (req, res) => {
    const slack_name = req.query.slack_name;
    const track = req.query.track
    const utc = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
    const utc_time = utc.toISOString().split('.')[0] + 'Z';
    res.status(200).json({
        slack_name,
        current_day,
        utc_time,
        track,
        github_file_url,
        github_repo_url,
        status_code: res.statusCode
    });
});
app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});

const express = require('express');
const logger = require('morgan');
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = 5000;

app.listen(port, ()=>{
    console.log(`app is listening at port ${port}`);
});

const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
const date = new Date();
const index = date.getDay();

const current_day = days[index];
const utc = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
const utc_time = utc.toISOString()
app.get('/api',(req,res)=>{
    const slack_name = req.query.slack_name;
    const track = req.query.track
    res.status(200).json({
        slack_name: slack_name,
        current_day: current_day,
        utc_time : utc_time,
        track: track,
        github_file_url: "https://github.com/username/repo/blob/main/file_name.ext",
        github_repo_url: "https://github.com/username/repo",
        status_code : res.statusCode
    });
});

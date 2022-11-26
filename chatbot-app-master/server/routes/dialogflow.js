const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');
const dialogflow = require('dialogflow');
const uuid = require('uuid');

const config = require('../config/keys');

const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode


// 새로운 세션 생성
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);


router.post('/textQuery', async (req, res) => {
    // 클라이언트 에서 받은 정보를 dialogflow에 보내 주기

    //채팅 보내기 요청
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // dialogflow agent 보내줄 텍스트, bodyParser가 있기때문에 req.body.text로 사용가능
                text: req.body.text, 
                // 언어타입
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    //프론트에 보내기
    res.send(result)
})



//Event Query Route




module.exports = router;

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// 启用 CORS
app.use(cors());
app.use(express.json());

// 静态文件服务
app.use(express.static('.'));

// 代理 API 请求
app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.x.ai/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROK_API_KEY || 'xai-UcQlOD5E6vdvn2UiKJYxcKtAarsTTZA6zPTB6q7qVRs4A881dvoLCTEOKyttgfuIf4wpXQuII4lFSoJP'}`
            },
            data: req.body,
            timeout: 30000 // 30秒超时
        });
        res.json(response.data);
    } catch (error) {
        console.error('Proxy Error:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message,
            details: error.response?.data
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

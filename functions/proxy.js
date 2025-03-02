const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const { prompt } = JSON.parse(event.body);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.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}`
      },
      body: JSON.stringify({
        model: "g-67aadf09ceb88191b906bdd695bf90f6-zappscribe",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" })
    };
  }
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 如果是 API 请求
    if (url.pathname === '/api/chat') {
      if (request.method !== 'POST') {
        return new Response('Only POST requests are allowed', { status: 405 });
      }

      const grokUrl = 'https://api.x.ai/v1/chat/completions';
      const apiKey = env.GROK_API_KEY;

      try {
        const response = await fetch(grokUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: request.body
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    // 对于其他请求，返回静态文件
    return env.ASSETS.fetch(request);
  }
}

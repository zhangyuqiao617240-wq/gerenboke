export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    message: 'API Serverless Function Works!',
    timestamp: new Date().toISOString()
  });
}

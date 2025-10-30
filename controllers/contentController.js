import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function uploadContent(req, res) {
  try {
    const { base64Data, filename } = req.body;

    if (!base64Data || !filename) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    const buffer = Buffer.from(base64Data, 'base64');
    const formData = new FormData();
    formData.append('file', buffer, filename);

    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: Infinity,
      headers: {
        ...formData.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET,
      },
    });

    const cid = response.data.IpfsHash;

    return res.status(200).json({
      message: 'File uploaded to Pinata via REST API',
      cid,
      url: `https://gateway.pinata.cloud/ipfs/${cid}`,
    });
  } catch (error) {
    console.error('Pinata REST upload error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Content upload error' });
  }
}





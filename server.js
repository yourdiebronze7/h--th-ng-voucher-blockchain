const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// Kết nối tới MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/voucherDB';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Định nghĩa schema và model cho voucher
const voucherSchema = new mongoose.Schema({
  code: String,
  expirationDate: Date,
  issuedBy: String,
  isValid: Boolean
});
const Voucher = mongoose.model('Voucher', voucherSchema);

// API endpoint để phát hành voucher
app.post('/api/vouchers', async (req, res) => {
  const voucher = new Voucher(req.body);
  await voucher.save();
  res.status(201).send(voucher);
});

// Bắt đầu server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
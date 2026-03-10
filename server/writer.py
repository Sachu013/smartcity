import os

content = """const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (req, res) => {
  res.send('Smart City API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
"""

env_content = """PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartcity
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
"""

with open('server.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open('.env', 'w', encoding='utf-8') as f:
    f.write(env_content)

print("Files written successfully in UTF-8")

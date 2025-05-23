const express = require('express');
const authRoutes = require('./routes/auth');
const multieRoutes = require('./routes/multie');
const tenantResolver = require('./middleware/tenantResolver');
const path = require('path');
const app = express();

app.use(express.json());
app.use(tenantResolver);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRoutes);

app.use('/multie', multieRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
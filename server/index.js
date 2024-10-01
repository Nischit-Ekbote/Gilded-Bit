require('dotenv').config();
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const { createUsersTable, insertUser, checkUser } = require('./sqlCommands/UserQueries');
const { createBoughtTable, buyGold, showGoldTable, deleteGoldTupple } = require('./sqlCommands/BoughtQueries');
const { goldTableCreate, insertGoldData, checkGold, updateDailyGoldRate, getGoldData } = require('./sqlCommands/GoldQueries');
const { json } = require('body-parser');

const stripe = require('./routes/stripe')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/stripe', stripe);

const PORT = process.env.PORT || 4000;

app.post('/api/v1/addgoldData', async (req, res) => {
    try {
        const { k18, k20, k22, k24 } = req.body;

        const updatedData = await updateDailyGoldRate({ k18, k20, k22, k24 });
        
        return res.status(200).json({
            message: 'Gold data updated successfully',
            data: updatedData
        });

    } catch (error) {
        console.error('Error updating gold data:', error);
        return res.status(500).json({ message: 'Error updating gold data', error: error.message });
    }
});

app.get('/api/v1/gold/getData' , async (req, res) => {
    try {
        const result = await getGoldData();
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:'Error getting Gold Data', error: error.message })
    }

})



app.get('/api/v1/gold/current', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'goldRate.json');
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading gold rate:', error);
        res.status(500).json({ message: 'Error reading the gold rate' });
    }
});

app.post('/api/v1/users', async (req, res) => {
    try {
        const alreadyUser = await checkUser({ id: req.body.id });
        if (!alreadyUser) {
            const newUser = await insertUser(req.body);
            res.status(201).json(newUser);
        } else {
            res.status(409).json({ message: 'User already exists' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

app.post('/api/v1/sell/goldData', async (req, res) => {

    const goldTable = await showGoldTable({id: req.body.id})
    res.json(goldTable)
    
})

app.post('/api/v1/sell/gold', async (req, res) => {

    try {
        await deleteGoldTupple({id : req.body.id})
        res.status(201).json({message : 'Sold Successfully'})

    } catch (error) {
        console.error('Error selling Gold')
        res.status(500).json({ message: 'Error selling Gold' });
    }
    
})

app.post('/api/v1/buy/gold', async (req, res) => {
    try {
        const alreadyUser = await checkUser({ id: req.body.id });
        if (alreadyUser) {
            const result = await buyGold( req.body );
            res.status(201).json(result);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error buying gold:', error);
        res.status(500).json({ message: 'Error processing gold purchase' });
    }
});

const initializeDb = async () => {
    try {
        await createUsersTable();
        await createBoughtTable();
        await goldTableCreate();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
};

(async () => {
    await initializeDb();
    app.listen(PORT, () => {
        console.log(`Server running on Port ${PORT}`);
    });
})();
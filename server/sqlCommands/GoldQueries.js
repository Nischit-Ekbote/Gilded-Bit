const sql = require('../lib/db');

const goldTableCreate = async () => {
    await sql`
        CREATE TABLE IF NOT EXISTS gold (
            id SERIAL PRIMARY KEY,
            "18k" INT,
            "20k" INT,
            "22k" INT,
            "24k" INT,
            date DATE UNIQUE
        )
    `;
};

const insertGoldData = async ({ data }) => {
    const { k18, k20, k22, k24, date } = data;
    return await sql`
        INSERT INTO gold ("18k", "20k", "22k", "24k", date)
        VALUES (${k18}, ${k20}, ${k22}, ${k24}, ${date})
        ON CONFLICT (date) DO UPDATE
        SET "18k" = ${k18}, "20k" = ${k20}, "22k" = ${k22}, "24k" = ${k24}
        RETURNING *
    `;
};

const checkGold = async ({ date }) => {
    const result = await sql`
        SELECT * FROM gold
        WHERE date = ${date}::date
    `;
    return result[0];
};

const updateDailyGoldRate = async (goldData) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const { k18, k20, k22, k24 } = goldData;


        const existingData = await checkGold({ date: today });

        if (existingData) {

            const updatedData = await sql`
                UPDATE gold
                SET "18k" = ${k18}, "20k" = ${k20}, "22k" = ${k22}, "24k" = ${k24}
                WHERE date = ${today}::date
                RETURNING *
            `;
            console.log('Gold data updated for today:');
            return updatedData;
        } else {

            const newData = await insertGoldData({ data: { k18, k20, k22, k24, date: today } });
            console.log('New gold data inserted for today:');
            return newData;
        }
    } catch (error) {
        console.error('Error updating/inserting daily gold rate:', error);
        throw error;
    }
};

const getGoldData = async () => {
    try {
        const res = await sql `select * from gold`
        return res
    } catch (error) {
        console.error('Error getting Gold Data')
    }
}

module.exports = {
    goldTableCreate,
    insertGoldData,
    checkGold,
    updateDailyGoldRate,
    getGoldData
};
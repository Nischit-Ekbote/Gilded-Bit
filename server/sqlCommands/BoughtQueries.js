const sql = require('../lib/db');

const createBoughtTable = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS bought (
                id SERIAL PRIMARY KEY,
                uid TEXT,
                element TEXT,
                type TEXT,
                grams decimal,
                spotPrice decimal,
                totalDigitalPrice decimal,
                date DATE NOT NULL DEFAULT CURRENT_DATE,
                FOREIGN KEY(uid) REFERENCES users(uid)
            )
        `;
        console.log('Bought table created or already exists');
    } catch (error) {
        console.error('Error creating bought table:', error);
        throw error;
    }
};

const buyGold = async ( body ) => {

    const { id, element, type, grams, spotPrice} = body
    const totalDigitalPrice = spotPrice*grams*(1.45)
    try {
        const result = await sql`
            INSERT INTO bought (uid, element, grams,  type, spotPrice, totalDigitalPrice)
            VALUES (${id}, ${element}, ${grams},  ${type}, ${spotPrice}, ${totalDigitalPrice})
            RETURNING *
        `;
        console.log('Gold purchase recorded');
        return result; 
    } catch (error) {
        console.error('Error recording gold purchase:', error);
        throw error;
    }

};

const showGoldTable = async ({id}) => {
    try {

        const result = await sql`select * from bought where uid = ${id}`;
        return result;

    } catch (error) {
        console.error('Error showing gold purchase:', error);
        throw error;
    }
}

const deleteGoldTupple = async ({id}) => {
    try {

        const result = await sql`DELETE FROM BOUGHT WHERE id = ${id}`;
        return result;

    } catch (error) {
        console.error('Error deleting Gold Tupple:', error);
        throw error;
    }
}

module.exports = {
    createBoughtTable,
    buyGold,
    showGoldTable,
    deleteGoldTupple,
};
const sql = require('../lib/db');

const createUsersTable = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                uid TEXT PRIMARY KEY,
                firstName TEXT,
                lastName TEXT,
                email TEXT UNIQUE
            )
        `;
        console.log('Users table created or already exists');
    } catch (error) {
        if (error.code !== '42P07') {
            console.error('Error creating users table:', error);
            throw error;
        }
    }
};


const insertUser = async (user) => {
    try {
        const { id, firstName, lastName, email } = user;
        const result = await sql`
            INSERT INTO users (uid, firstName, lastName, email)
            VALUES (${id}, ${firstName}, ${lastName}, ${email})
            RETURNING *
        `;
        console.log('User inserted successfully');
        return result[0];
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
};

const checkUser = async ({id}) => {
    try {
        const result = await sql`SELECT * FROM users where uid = ${id}`;
        return result[0]; // Return the first (and should be only) result
    } catch (error) {
        console.error('Error checking user:', error);
        throw error;
    }
};

module.exports = {
    createUsersTable,
    insertUser,
    checkUser,
};
import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hapi-server',
    password: 'abc123',
    database: 'buy-and-sell'
});

export const db = {
    connect: () => connection.connect(),
    query: (queryString, escapedValues) =>
        new Promise((resolve, reject) => {
            connection.query(queryString, escapedValues, (error, result, fields) =>{
                if(error){
                    reject(error);
                }
                else{
                    resolve({result, fields});
                }
            })
        }),
        end: () => connection.end(),    
};
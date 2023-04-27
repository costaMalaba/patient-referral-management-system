import con from "../db/database.js"

export const getDoctor = (req, res) => {
    const q = "SELECT * FROM patient";
    con.query(q, (err, data) => {
        if(err)
        {
            return res.json(err)
        }
        else
        {
            return res.status(200).json(data);
        }
    });
}
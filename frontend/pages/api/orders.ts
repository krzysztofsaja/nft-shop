import {NextApiRequest, NextApiResponse} from "next";
import {getOrders, saveOrder} from "../../services/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log('Save body to DB', req.body);
        try {
            await saveOrder(req.body);
            res.status(201).json({message: 'OK'});
        } catch (e) {
            console.error('Saving to DB Failed', e);
            res.status(500).json({message: 'Saving to DB Failed'});
        }
    } else if (req.method === 'GET') {
        const orders = await getOrders();
        res.status(200).json(orders);
    } else {
        res.status(400).json({message: 'Unsupported'});
        // Handle any other HTTP method
    }
}

export default handler;

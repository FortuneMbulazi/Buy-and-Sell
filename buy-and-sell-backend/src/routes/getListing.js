import { Boom } from "@hapi/boom";
import {db} from '../database';

export const getListingRoute = {
    method: 'GET',
    path: '/api/listing/{id}',
    handler: async (req, h) =>{
        const id = req.params.id;
        const {result} = await db.query(
            'SELECT * FROM listings WHERE id=?',
            [id],
        );
        const listing = result[0];
        if(!listing) throw Boom.notFound(`Listing does not exists with id ${id}`);
        return listing;
    }
}
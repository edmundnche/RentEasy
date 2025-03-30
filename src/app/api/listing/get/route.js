import Listing from '../../../../lib/models/listing.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';

export const GET = async (req) => {
    await connect();
    const headers = req.headers;

    try {
        const url = new URL(req.url, `http://${headers.get('host')}`);
        const userId = url.searchParams.get("user");

        if (!userId) {
            return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
        }

        const listings = await Listing.find({ userId }, 'title imageUrls price description');
        const updatedListings = listings.map(listing => ({
            ...listing.toObject(),
            imageUrl: listing.imageUrls?.[0] || null
        }));

        return new Response(JSON.stringify(updatedListings), { status: 200 });
    } catch (error) {
        console.error('Error fetching listings:', error);
        return new Response(JSON.stringify([]), { status: 500 });
    }
};

export const POST = async (req) => {
    await connect();
    try {
        const body = await req.json();

        const {
            searchTerm,
            type,
            parking,
            furnished,
            offer,
            sort = 'created_at',
            order = 'desc',
        } = body;

        const query = {};

        if (searchTerm) {
            query.title = { $regex: searchTerm, $options: 'i' };
        }
        if (type && type !== 'all') query.type = type;
        if (parking) query.parking = true;
        if (furnished) query.furnished = true;
        if (offer) query.offer = true;

        const sortQuery = { [sort]: order === 'asc' ? 1 : -1 };

        const listings = await Listing.find(query).sort(sortQuery).limit(9);
        return new Response(JSON.stringify(listings), { status: 200 });
    } catch (error) {
        console.error("POST /api/listing/get error:", error);
        return new Response(JSON.stringify([]), { status: 500 });
    }
};

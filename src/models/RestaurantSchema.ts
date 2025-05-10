import mongoose, {Model} from "mongoose";

export interface IRestaurant extends Document {
    restaurantId?: string;
    // restaurantId?: string;
    title: string;
    imageUrl: string;
    foods: [];
    time: string;
    pickup: boolean;
    delivery: boolean;
    isOpen: boolean;
    logoUrl: string;
    rating: number;
    ratingCount: string;
    code: string;
    coords: object;
    createdAt: Date;
    updatedAt: Date;
}

interface IRestaurantModel extends Model<IRestaurant> {
}

const restaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Restaurant title is required'],
        trim: true,
    },
    imageUrl: {
        type: String,
    },
    foods: {
        type: Array,
    },
    time: {
        type: String,
    },
    pickup: {
        type: Boolean,
        default: true,
    },
    delivery: {
        type: Boolean,
        default: true,
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    logoUrl: {
        type: String,
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5,
    },
    ratingCount: {
        type: String,
    },
    code: {
        type: String,
    },
    coords: {
        id: {
            type: String,
        },
        latitude: {
            type: Number,
        },
        latitudeDelta: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        longitudeDelta: {
            type: Number,
        },
        address: {
            type: String,
        },
        title: {
            type: String,
        },
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.restaurantId = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
});

const RestaurantModel: IRestaurantModel = mongoose.model<IRestaurant, IRestaurantModel>('Restaurant', restaurantSchema);

export default RestaurantModel;

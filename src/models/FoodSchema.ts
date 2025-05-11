import mongoose, {Model} from "mongoose";

export interface IFood extends Document {
    foodId?: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    tags: string;
    category: string;
    code: string;
    isAvailable: boolean;
    restaurant: string;
    rating: number;
    ratingCount: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IFoodModel extends Model<IFood> {
}

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Food title is required'],
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Food description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Food price is required'],
    },
    imageUrl: {
        type: String,
        default: 'https://basicneeds.berkeley.edu/sites/default/files/styles/openberkeley_brand_widgets_thumbnail/public/23.png',
    },
    tags: {
        type: String,
    },
    category: {
        type: String,
    },
    code: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Restaurant is required'],
        ref: 'Restaurant',
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5,
    },
    ratingCount: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.foodId = ret._id;
            delete ret._id;
            delete ret.__v;

            return {
                foodId: ret.foodId,
                ...ret,
            } as IFood;
        },
    },
});

const FoodModel: IFoodModel = mongoose.model<IFood, IFoodModel>('Food', foodSchema);

export default FoodModel;

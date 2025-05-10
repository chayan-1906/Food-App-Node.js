import mongoose, {Model} from "mongoose";

export interface ICategory extends Document {
    categoryId?: string;
    title: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ICategoryModel extends Model<ICategory> {
}

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Category title is required'],
        trim: true,
        unique: true,
    },
    imageUrl: {
        type: String,
        default: 'https://assets.zenn.com/strapi_assets/large_food_logo_5fbb88038c.png',
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.categoryId = ret._id;
            delete ret._id;
            delete ret.__v;

            return {
                categoryId: ret.categoryId,
                title: ret.title,
                imageUrl: ret.imageUrl,
                createdAt: ret.createdAt,
                updatedAt: ret.updatedAt,
            };
        },
    },
});

const CategoryModel: ICategoryModel = mongoose.model<ICategory, ICategoryModel>('Category', categorySchema);

export default CategoryModel;

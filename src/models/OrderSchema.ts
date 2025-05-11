import mongoose, {Model} from "mongoose";

export const paymentTypes = ['COD', 'CARD', 'UPI'] as const;

export interface IOrder extends Document {
    orderId?: string;
    foods: string[];
    payment: any;
    buyer: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IOrderModel extends Model<IOrder> {
}

const orderSchema = new mongoose.Schema({
    foods: [{
        _id: false,
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    }],
    payment: {
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        method: {
            type: String,
            enum: paymentTypes,
            required: true,
        },
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['preparing', 'prepared', 'delivered'],
        default: 'preparing',
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.orderId = ret._id;
            delete ret._id;
            delete ret.__v;

            return {
                orderId: ret.orderId,
                ...ret,
            } as IOrder;
        },
    },
});

const OrderModel: IOrderModel = mongoose.model<IOrder, IOrderModel>('Order', orderSchema);

export default OrderModel;

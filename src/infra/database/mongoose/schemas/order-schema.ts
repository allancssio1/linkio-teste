import mongoose, { Schema, Document, Types } from 'mongoose'

export type OrderState = 'CREATED' | 'ANALYSIS' | 'COMPLETED'
export type OrderStatus = 'ACTIVE' | 'DELETED'

export interface IService {
  name: string
  value: number
  status: 'PENDING' | 'DONE'
}

export interface IOrder extends Document {
  _id: Types.ObjectId
  lab: string
  patient: string
  customer: string
  state: OrderState
  status: OrderStatus
  services: IService[]
  userId: Types.ObjectId
  createdAt: Date
}

const serviceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'DONE'],
      required: true,
    },
  },
  { _id: false },
)

const orderSchema = new Schema<IOrder>({
  lab: { type: String, required: true },
  patient: { type: String, required: true },
  customer: { type: String, required: true },
  state: {
    type: String,
    enum: ['CREATED', 'ANALYSIS', 'COMPLETED'],
    default: 'CREATED',
    required: true,
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'DELETED'],
    default: 'ACTIVE',
    required: true,
  },
  services: {
    type: [serviceSchema],
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

orderSchema.index({ userId: 1, state: 1 })

export const OrderModel = mongoose.model<IOrder>('Order', orderSchema)

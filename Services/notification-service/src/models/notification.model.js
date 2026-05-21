import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: [
      'PURCHASE_CONFIRMATION', 'PAYMENT_RECEIPT', 'PROMOTION', 'RECEIPT',
      'PRICE_CHANGE', 'ALERT', 'LOW_FUEL', 'FAILED_TRANSACTION', 'LOW_STOCK',
      'INVENTORY_DROP', 'ABNORMAL_CONSUMPTION', 'PAYMENT_PENDING'
    ],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  is_read: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Notification", notificationSchema);

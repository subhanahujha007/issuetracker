import mongoose, { Document, Schema, Model } from 'mongoose';

interface IIssue extends Document {
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
}

// Variable to store the count
let count = 10;

const issueSchema = new Schema<IIssue>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 191,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['OPEN', 'IN_PROGRESS', 'CLOSED'],
      default: 'OPEN',
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    updatedAt: {
      type: Date,
      default: () => new Date(),
    },
   
  },
  {
    timestamps: true, // This option adds `createdAt` and `updatedAt` fields and manages them automatically
  }
);

const Issue: Model<IIssue> = mongoose.models.Issue || mongoose.model<IIssue>('Issue', issueSchema);

export default Issue;

import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    issuer: { type: String, default: '' },
    dateIssued: { type: String, default: '' },
    fileUrl: { type: String, default: '' },
    fileType: { type: String, enum: ['image', 'pdf'], default: 'image' },
    thumbnailUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);

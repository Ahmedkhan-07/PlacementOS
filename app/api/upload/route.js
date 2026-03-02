import { auth } from '@clerk/nextjs';
import cloudinary from '@/lib/cloudinary';

export async function POST(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('file');
    const type = formData.get('type') || 'profile';

    if (!file) return Response.json({ error: 'No file provided' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const folder = `placementos/${type}s/${userId}`;

    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder, resource_type: 'auto', pages: true },
                (err, res) => (err ? reject(err) : resolve(res))
            );
            stream.end(buffer);
        });

        return Response.json({
            url: result.secure_url,
            publicId: result.public_id,
            thumbnailUrl: result.pages > 1
                ? cloudinary.url(result.public_id, { page: 1, format: 'jpg', width: 400 })
                : result.secure_url,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return Response.json({ error: 'Upload failed' }, { status: 500 });
    }
}

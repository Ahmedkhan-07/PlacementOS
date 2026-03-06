import { auth } from '@clerk/nextjs';

export async function POST(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('file');
    const type = formData.get('type') || 'profile';

    if (!file) return Response.json({ error: 'No file provided' }, { status: 400 });

    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = buffer.toString('base64');
        const dataUri = `data:${file.type};base64,${base64}`;

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;
        const folder = `placementos/${type}s/${userId}`;

        const timestamp = Math.floor(Date.now() / 1000);

        const crypto = await import('crypto');
        const signature = crypto
            .createHash('sha1')
            .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
            .digest('hex');

        const uploadData = new FormData();
        uploadData.append('file', dataUri);
        uploadData.append('api_key', apiKey);
        uploadData.append('timestamp', timestamp);
        uploadData.append('signature', signature);
        uploadData.append('folder', folder);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
            { method: 'POST', body: uploadData }
        );

        const result = await res.json();

        if (result.error) {
            console.error('Cloudinary error:', result.error);
            return Response.json({ error: 'Upload failed', message: result.error.message }, { status: 500 });
        }

        return Response.json({
            url: result.secure_url,
            publicId: result.public_id,
            thumbnailUrl: result.secure_url,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return Response.json({ error: 'Upload failed', message: error.message }, { status: 500 });
    }
}

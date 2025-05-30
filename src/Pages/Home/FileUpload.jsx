import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Clean up preview URL to avoid memory leaks
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Validate file type (optional)
        if (!selectedFile.type.startsWith('image/')) {
            setError('Please select an image file (JPEG, PNG, etc.)');
            return;
        }

        setFile(selectedFile);
        setError(null);
        setSuccess(null);
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('User_file', file); // Must match Multer's field name

        try {
            setLoading(true);
            setError(null);

            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSuccess('File uploaded successfully!');
            console.log('Server response:', res.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to upload file');
            console.error('Upload error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Upload an Image</h2>
            
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
                style={{ marginBottom: '10px' }}
            />
            
            <button 
                onClick={handleUpload} 
                disabled={loading || !file}
                style={{ 
                    padding: '8px 16px',
                    background: loading ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                }}
            >
                {loading ? 'Uploading...' : 'Upload'}
            </button>

            {error && (
                <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
            )}

            {success && (
                <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>
            )}

            {previewUrl && (
                <div style={{ marginTop: '20px' }}>
                    <h4>Preview:</h4>
                    <img 
                        src={previewUrl} 
                        alt="Preview" 
                        style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd' }} 
                    />
                </div>
            )}
        </div>
    );
}

export default FileUpload;
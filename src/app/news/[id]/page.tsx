"use client"

import NewsForm from '@/components/NewsForm';
import { useNews } from '@/hooks/useNews';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditNewsPage: React.FC = () => {
    const router = useParams();
    const { id } = router;


    const { fetchNewsById, } = useNews();
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        if (id) {
            fetchNewsById(Number(id)).then(setNewsItem);
        }
    }, []);

    return (
        <div className="min-h-screen bg-light-gray">
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-4xl font-extrabold text-dark-gray mb-6">Edit News Article</h1>
                {newsItem ? <NewsForm newsItem={newsItem} /> : <p className="text-center text-gray-500">Loading...</p>}
            </div>
        </div>
    );
};

export default EditNewsPage;

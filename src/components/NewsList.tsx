"use client"

import React, { useEffect } from 'react';
import { useNews } from '../hooks/useNews';
import { Button } from './ui/button';
import Link from 'next/link';
import { toast } from 'react-toastify';


const NewsList: React.FC = () => {
    const { news, loading, error, fetchNews, deleteNews } = useNews();

    useEffect(() => {
        fetchNews();
    }, []);


    const handleDelete = async (id: number) => {
        await deleteNews(id);
        toast.warning(`News with id ${id} deleted`)
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center">

                <h2 className="text-3xl font-bold text-dark-gray mb-6">All News Articles</h2>

                <Link
                    href={`/news`}
                    className="bg-blue-500 text-white hover:text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    Create New News
                </Link>
            </div>
            {loading && <p className="text-center text-primary">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="space-y-4">
                {news.map((item) => (
                    <div key={item.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-dark-gray">{item.title}</h3>
                        <p className="mt-2 text-gray-600">{item.content}</p>
                        <div className="flex space-x-4 mt-4">
                            <Link
                                href={`/news/${item.id}`}
                                className="bg-secondary text-black hover:text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >Edit
                            </Link>
                            <Button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsList;
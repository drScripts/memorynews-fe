"use client"

import React, { useState, } from 'react';
import { useNews } from '../hooks/useNews';
import { News } from '@/entities/news';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'react-toastify';

interface NewsFormProps {
    newsItem?: News;
    onSuccess?: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ newsItem, onSuccess }) => {
    const { createNews, updateNews } = useNews();
    const [title, setTitle] = useState(newsItem?.title || '');
    const [content, setContent] = useState(newsItem?.content || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newsItem) {
            await updateNews(newsItem.id, { title, content });
            toast.success('News updated successfully!');
        } else {
            await createNews({ title, content });
            toast.success('News created successfully!');
        }

        if (onSuccess) {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold text-center text-dark-gray">
                {newsItem ? 'Edit News' : 'Create News'}
            </h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-dark-gray">Title</label>
                    <Input
                        type="text"
                        id="title"
                        placeholder="Enter the title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="content" className="block text-sm font-medium text-dark-gray">Content</label>
                    <Textarea
                        id="content"
                        placeholder="Enter the content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <Button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                    {newsItem ? 'Update' : 'Create'} News
                </Button>
            </div>
        </form>
    );
};

export default NewsForm;
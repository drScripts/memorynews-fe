"use client"

import React from 'react';
import NewsForm from '@/components/NewsForm';

const CreateNewsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-light-gray">
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-4xl font-extrabold text-dark-gray mb-6">Create News Article</h1>
                <NewsForm />
            </div>
        </div>
    );
};

export default CreateNewsPage;

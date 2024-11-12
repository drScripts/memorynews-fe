import { CreateNews } from '@/dtos/news-create.dto';
import { UpdateNews } from '@/dtos/news-update.dto copy';
import { News } from '@/entities/news';
import axios from 'axios';
import { useState } from 'react';

const API_URL = 'http://localhost:3003/news';

export const useNews = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setNews(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch news articles');
        } finally {
            setLoading(false);
        }
    };

    const fetchNewsById = async (id: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (err) {
            setError('Failed to fetch the news article');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const createNews = async (newNews: CreateNews) => {
        try {
            await axios.post(API_URL, newNews);
            fetchNews();
        } catch (err) {
            setError('Failed to create the news article');
        }
    };

    const updateNews = async (id: number, updatedNews: UpdateNews) => {
        try {
            await axios.patch(`${API_URL}/${id}`, updatedNews);
            fetchNews();
        } catch (err) {
            setError('Failed to update the news article');
        }
    };

    const deleteNews = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchNews();
        } catch (err) {
            setError('Failed to delete the news article');
        }
    };

    return {
        news,
        loading,
        error,
        fetchNews,
        fetchNewsById,
        createNews,
        updateNews,
        deleteNews,
    };
};
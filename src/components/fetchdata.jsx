"use client"
import { useState, useEffect } from 'react';
import React from 'react';

const apiUrl = 'https://newsapi.org/v2/everything?q=tesla&from=2024-05-14&sortBy=publishedAt&apiKey=4ec344d0f125425aa6594ecf83a3211a';

const fetchData = async (page) => {
  const response = await fetch(`${apiUrl}&page=${page}`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.articles;
};

const Fetchdata = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const batchData = await fetchData(currentPage);
        setData(batchData);
        setDisplayData([]);
        setDataIndex(0);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    loadData();
  }, [currentPage]);

  useEffect(() => {
    if (data.length === 0) return;
    const interval = setInterval(() => {
      setDisplayData((prev) => [
        ...prev,
        ...data.slice(dataIndex, dataIndex + 10),
      ]);
      setDataIndex((prev) => prev + 10);
    }, 5000);

    return () => clearInterval(interval);
  }, [data, dataIndex]);

  useEffect(() => {
    if (dataIndex >= data.length && data.length > 0) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [dataIndex, data]);

  return (
    <div>
      <h1>News Data Fetch</h1>
      <div id="data-container">
        {displayData.map((item, index) => (
          <div key={index}>
            <h2 className=' mt-3'>Title: {item.title}</h2>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fetchdata;


import axios from 'axios';

const apiUri = `http://localhost:8001`;

export const getAllSessions = async () => {
    const result = await axios.get(`${apiUri}/session`); 
    return result.data; 
};

export const getStatistics = async (begin: string, end: string) => {
    const result = await axios.get(`${apiUri}/statistics/${begin}/${end}`); 
    return result.data; 
};


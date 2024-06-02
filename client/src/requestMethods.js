import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2ZjMzg2YjJlM2FjNTJjNjg2ZDk3MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNTcxMzYyNiwiZXhwIjoxNzE1OTcyODI2fQ.-NgglndOCf9B6lBxBK2CN2-UaZ4GX4XCMNwDHjbBlEU";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}`},
});
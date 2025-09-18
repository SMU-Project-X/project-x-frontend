import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export const useVote = () => {

    const [votes, setVotes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=> {
        axios.get("http://localhost:8080/api/Vote")
        .then(res => setVotes(res.data))
        .catch(error => setError(error));
    }, []);

    return {votes, error};
}
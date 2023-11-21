import React, { useMemo, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'


const FetchComponent = () => {
    const [quizData, setQuizData] = useState([]);
    const fetchData = async () => {
        try {
          const response = await fetch(
            'https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=10&category=culture_generale&difficulty=facile'
          );
          const data = await response.json();
          setQuizData((prevData) => [...prevData, data]);
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
    
    useEffect(() => {
    const fetchAllData = async () => {
        for (let i = 0; i < 2; i++) {
            await fetchData();
        }
    };

    fetchAllData();
    }, []);

    // Vous avez maintenant quizData qui contient les résultats de cinq appels API
    console.log(quizData);

    // Vous pouvez retourner quelque chose ici si nécessaire
    return null;
}

const MemoizedFetch = () => {
    return useMemo(() => <FetchComponent />, []); // Le tableau de dépendances est vide, donc le composant est memoïzé et ne sera pas recréé
};

export default MemoizedFetch
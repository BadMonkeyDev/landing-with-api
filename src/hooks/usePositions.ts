import {useState, useEffect} from "react";
import axios from 'axios';

export interface IPosition {
    id: number;
    name: string;
}

interface UsePositionsResult {
    positions: IPosition[];
    isLoading: boolean;
    error: string;
}

const usePositions = ():UsePositionsResult => {
    const [positions, setPositions] = useState<IPosition[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPositions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<{ positions: IPosition[] }>(
                    "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
                );

                setPositions(response.data.positions);
            } catch (err: any) {
                setError(err.response.data.message);
            }

            setIsLoading(false)
        };

        fetchPositions();
    }, []);

    return {positions, isLoading, error};
};

export default usePositions;
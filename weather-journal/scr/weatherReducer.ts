export const initialState = {
    loading: true,
    error: null as string | null,
    weatherData: null as any[] | null,
};

type WeatherAction =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: any[] }
    | { type: 'FETCH_ERROR'; payload: string };

export function weatherReducer(state: typeof initialState, action: WeatherAction) {
    switch (action.type) {
        case 'FETCH_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                weatherData: action.payload,
                error: null
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
                weatherData: null
            };
        default:
            return state;
    }
}
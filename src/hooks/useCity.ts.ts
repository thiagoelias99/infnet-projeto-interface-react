import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'

interface CitiesResponse {
    id: number
    nome: string
}

const useBrazilState = (state: string) => {
    const query = useQuery<CitiesResponse[], AxiosError>([`state_${state}`, state], async () => {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`)
        return response.data
    }, {
        enabled: !!state,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000 * 24
    })

    return query
}

export default useBrazilState
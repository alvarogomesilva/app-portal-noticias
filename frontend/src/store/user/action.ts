import { Dispatch } from 'redux';
import { setToken, clearToken, setIsAutenticated, setUser } from './reducer';
import { api } from '../../api';
import { TLogin } from '../../types';


export const login = (inputs: TLogin) => async (dispatch: Dispatch) => {
  try {
    const request = await api.post('/login', inputs)
    const { token } = request.data
    if (token !== undefined) {
      localStorage.setItem('@u', token);
      dispatch(setUser(request.data))
      dispatch(setToken(token));
    }
    
  } catch (error) {
    console.error('Erro de autenticação:', error);
  }
};

export const logout = () => (dispatch: Dispatch) => {
  dispatch(clearToken());
  localStorage.removeItem('@u')
}


export const fetchUser = () => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem('@u');
    const response = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setIsAutenticated())
    dispatch(setUser(response.data))
  } catch (error) {
    
    console.error('Erro ao buscar usuário:', error);

  }
};

export const updateUser = (formData: FormData) => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem('@u'); // Obtenha o token do localStorage
    const response = await api.put('/user', formData, { // Assuma que você está usando uma rota PUT '/user' para atualizar os dados do usuário no servidor
      headers: {
        Authorization: `Bearer ${token}`, // Inclua o token de autorização nos cabeçalhos da solicitação
        'Content-Type': 'multipart/form-data' // Defina o tipo de conteúdo como 'multipart/form-data'
      },
    });
    // Após uma atualização bem-sucedida no servidor, atualize os dados do usuário no estado Redux
    dispatch(setUser(response.data)); 
    console.log(response.data)
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
};

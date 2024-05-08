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


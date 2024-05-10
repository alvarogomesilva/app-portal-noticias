import { Dispatch } from 'redux';
import { setToken, clearToken, setIsAutenticated, setUser } from './reducer';
import { api } from '../../api';
import { TLogin } from '../../types';
import { getToken } from '../../utils';

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
    const response = await api.get('/me', {
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
    const token = getToken()
    const response = await api.put('/user', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });

    dispatch(setUser(response.data));
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
};


export const createUser = (inputs, roleId) => async (dispatch: Dispatch) => {
  const { name, lastname, email, password, phone } = inputs

  try {
    const response = await api.post('/user', { name, lastname, email, phone, password, roleId })
  } catch (error) {
    console.log(error)
  }
}

export const updateUsers = (inputs, roleId) => async (dispatch: Dispatch) => {
  const { idUser, name, lastname, email, password, phone } = inputs

  try {
    const token = getToken()
    const response = await api.put('/user', { idUser, name, lastname, email, phone, password, roleId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('Deu certo!')
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = (userId) => async () => {
  try {
    const token = getToken()
    const response = await api.delete(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.log(error)
  }
}
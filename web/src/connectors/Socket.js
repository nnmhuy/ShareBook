import openSocket from 'socket.io-client';
import { baseURL } from '../constants/constants'

const socket = openSocket('ws://localhost:3001');
export default socket
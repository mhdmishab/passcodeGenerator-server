import express from 'express';
import { fetchSavedData, loginUser, registerUser, savedPassword } from '../controllers/userController';
import verifyUserToken from '../middlewares/authorisation';

const router= express.Router();

router.post('/sign-up',registerUser);
router.post('/login',loginUser);

router.post('/saved-password',verifyUserToken,savedPassword)

router.get('/fetchSavedData',verifyUserToken,fetchSavedData)


export default router;
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createResume, getUserResume } from '../controllers/resumeContoller.js';
import { uploadResumeImages } from '../controllers/uploadImages.js';

const resumeRouter = express.Router();
resumeRouter.post('/', protect, createResume);
resumeRouter.get('/', protect, getUserResume);
resumeRouter.get('/:id', protect, getUserResume);

resumeRouter.put('/:id', protect, getUserResume);
resumeRouter.put('/:id/upload-images', protect, uploadResumeImages);

export default resumeRouter;
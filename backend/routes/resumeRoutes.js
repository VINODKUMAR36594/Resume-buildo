import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
    createResume, 
    getUserResume, 
    getResumeById, 
    updateResume, 
    deleteResume 
} from '../controllers/resumeContoller.js';
import { uploadResumeImages } from '../controllers/uploadImages.js';

const resumeRouter = express.Router();

// Resume routes
resumeRouter.post('/', protect, createResume);
resumeRouter.get('/', protect, getUserResume);
resumeRouter.get('/:id', protect, getResumeById);
resumeRouter.put('/:id', protect, updateResume);
resumeRouter.delete('/:id', protect, deleteResume);

// Image upload route
resumeRouter.put('/:id/upload-images', protect, uploadResumeImages);

export default resumeRouter;

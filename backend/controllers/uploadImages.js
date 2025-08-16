import fs from 'fs'
import path from 'path'
import Resume from '../models/resumeModel.js'
import upload from '../middleware/uploadMiddleware.js'

export const uploadResumeImages = async (req, res) => {
    try {
        // Use multer middleware to handle file uploads
        upload.fields([
            { name: "thumbnail", maxCount: 1 },
            { name: "profileImage", maxCount: 1 }
        ])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            }

            try {
                const resumeId = req.params.id;
                const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id })
                
                if (!resume) {
                    return res.status(404).json({ message: "Resume not found" })
                }

                const uploadFolder = path.join(process.cwd(), "uploads")
                const baseUrl = `${req.protocol}://${req.get("host")}`

                const newThumbnail = req.files.thumbnail?.[0];
                const newProfileImage = req.files.profileImage?.[0];

                // Handle thumbnail upload
                if (newThumbnail) {
                    if (resume.thumbnailsLink) {
                        const oldThumbnail = path.join(uploadFolder, path.basename(resume.thumbnailsLink))
                        if (fs.existsSync(oldThumbnail)) {
                            fs.unlinkSync(oldThumbnail)
                        }
                    }
                    resume.thumbnailsLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
                }

                // Handle profile image upload
                if (newProfileImage) {
                    if (resume.profileInfo?.profilePreviewUrl) {
                        const oldProfileImage = path.join(uploadFolder, path.basename(resume.profileInfo.profilePreviewUrl))
                        if (fs.existsSync(oldProfileImage)) {
                            fs.unlinkSync(oldProfileImage)
                        }
                    }
                    
                    // Initialize profileInfo if it doesn't exist
                    if (!resume.profileInfo) {
                        resume.profileInfo = {};
                    }
                    resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
                }

                // Save the updated resume
                await resume.save();

                return res.status(200).json({
                    message: "Images uploaded successfully",
                    resume: {
                        thumbnailsLink: resume.thumbnailsLink,
                        profilePreviewUrl: resume.profileInfo.profilePreviewUrl
                    }
                });

            } catch (dbError) {
                return res.status(500).json({ message: "Database error: " + dbError.message })
            }
        })
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ message: "Server error: " + error.message })
    }
}

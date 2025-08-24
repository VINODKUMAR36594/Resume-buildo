import React, { useState, useEffect } from "react";
import DashBoardLayouts from "../components/DashBoardLayout";
import { dashboardStyles as styles } from "../assets/dummystyle";
import { useNavigate } from "react-router-dom";
import { LucideFilePlus } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";
import { ResumeSummaryCard } from "../components/cards";
//import { toast } from "react-toastify";
import toast from 'react-hot-toast'
import moment from "moment";
import { Zap, Award, TrendingUp, Edit, Trash2, Clock } from "lucide-react";
import Modal from "../components/Modal";
import CreateResumeForm from "../components/CreateResumeForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [OpenCreateModal,setOpenCreateModal]=useState(false);
  //const [showDeleteConfirm,setShowDeleteConfrim]
  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    // Work Experience
    resume.workExperience?.forEach((exp) => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    resume.education?.forEach((edu) => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    // Skills
    resume.skills?.forEach((skill) => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    // Projects
    resume.projects?.forEach((project) => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications
    resume.certifications?.forEach((cert) => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    // Languages
    resume.languages?.forEach((lang) => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    // Interests
    totalFields += resume.interests?.length || 0;
    completedFields += resume.interests?.filter((i) => i?.trim() !== "").length || 0;

    return Math.round((completedFields / totalFields) * 100);
  };

  const fetchAllResumes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);

      const resumeWithCompletion = response.data.map((resume) => ({
        ...resume,
        completion: calculateCompletion(resume),
      }));

      setAllResumes(resumeWithCompletion);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const handleDeleteResume = async (resumeId) => {
    try {
      await axiosInstance.delete(`${API_PATHS.RESUME.DELETE}/${resumeId}`);
      toast.success("Resume deleted successfully!");
      fetchAllResumes();
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume. Please try again.");
    }
    finally{
      setResumeToDelete(null);
      showDeleteConfirm(false);
    }
  };
  const handleDeleteClick=(id)=>{
    setResumeToDelete(id);
    setShowDeleteConfirm(true);
  }

  return (
    <DashBoardLayouts>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div>
            <h1 className={styles.headerTitle}>My Resume</h1>
            <p className={styles.headerSubtitle}>
              {allResumes.length > 0
                ? `You have ${allResumes.length} resume${
                    allResumes.length !== 1 ? "s" : ""
                  }.`
                : "Start creating your first resume now!"}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className={styles.createButton}
              onClick={() => navigate('/create-resume')}
            >
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Now
                <LucideFilePlus
                  className="group-hover:translate-x-1 transition-transform ml-2"
                  size={18}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && allResumes.length === 0 && (
          <div className={styles.emptyStateWrapper}>
            <div className={styles.emptyIconWrapper}>
              <LucideFilePlus size={32} className="text-violet-600" />
            </div>
            <h3 className={styles.emptyTitle}>No Resume Yet</h3>
            <p className={styles.emptyText}>
              You haven't created any resume yet. Start building your
              professional resume to land your dream job.
            </p>
            <button
              className={styles.createButton}
              onClick={() => navigate('/create-resume')}
            >
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Your First Resume
                <LucideFilePlus size={20} className="text-violet-600" />
              </span>
            </button>
          </div>
        )}
        
        {/* grid view */}
        {!loading && allResumes.length > 0 && (
          <div className={styles.Grid}>
            <div className={styles.newResumeCard} onClick={() => navigate('/create-resume')}>
              <div className={styles.newResumeIcon}>
                <LucideFilePlus size={32} className="text-white" />
              </div>
              <h3 className={styles.newResumeTitle}>Create New Resume</h3>
              <p className={styles.newResumeText}>Start Building your career</p>
            </div>
            {allResumes.map((resume) => (
              <ResumeSummaryCard 
                key={resume._id} 
                imgUrl={resume.thumbnailLink} 
                title={resume.title} 
                createdAt={resume.createdAt} 
                updatedAt={resume.updatedAt} 
                onSelect={() => navigate(`/resume/${resume._id}`)} 
                onDelete={() => handleDeleteResume(resume._id)} 
                completion={resume.completion || 0}
                isPremium={resume.isPremium}
                isNew={moment().diff(moment(resume.createdAt),'days')<7}
              />
            ))}
          </div>
        )}
      </div>
      {/* Create Modal */}
      <Modal isOpen={OpenCreateModal} onClose={()=>setOpenCreateModal(false)}
      hideHeader maxWidth="max-w-2xl">
        <div className="p-6">
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Create New resume</h3>
            <button onclick={()=>setOpenCreateModal(false)} className={styles.modalCloseButton}>X</button>
          </div>
          <CreateResumeForm onSucess={()=>{
            setOpenCreateModal(false);
            fetchAllResumes();

          }}/>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={showDeleteConfirm} onClose={()=>setShowDeleteConfirm(false)} title='confrim Deletion' showActionBtn actionBtnText='Delete' actionBtnClassName='bg-red-600 hover:bg-red-700' onActionClick={handleDeleteResume}>
        <div className="p-4">
          <div className="flex flex-col items-center text-center">
            <div className={styles.deleteIconWrapper} >
              <LucideTrash2 size={24} className="text-orange-600 "/>
            </div>
            <h3 className={styles.deleteTitle}>Delete Resumes</h3>
            <p className={styles.deleteText}>
              Are You sure you want to delte this resume? this action cannot be undone.
            </p>
          </div>
        </div>
      </Modal>
    </DashBoardLayouts>
  );
};

export default Dashboard;

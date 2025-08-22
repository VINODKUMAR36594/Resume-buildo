import React from 'react'
import TemplateOne from './TemplateOne'

const RenderResume = ({
     templateId,
    resumeData,
    containerWidth,
   
}) => {
    switch(templateId){
        case "01":
            return (
                <TemplateOne resumeData={resumeData} conatinerWidth={containerWidth}/>
            )
        case "02":
            return (
                <TemplateTwo resumeData={resumeData} conatinerWidth={containerWidth}/>
            )
        case "03":
            return (
                <TemplateThree resumeData={resumeData} conatinerWidth={containerWidth}/>
            )
        default:
             return (
                <TemplateThree resumeData={resumeData} conatinerWidth={containerWidth}/>
            )

    }
    
  
}

export default RenderResume

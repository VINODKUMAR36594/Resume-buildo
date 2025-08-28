import React from 'react'
import TemplateOne from './TemplateOne'
import TemplateTwo from './TemplateTwo'
import TemplateThree from './TemplateThree'

const RenderResume = (
    {
        templateId,
        resumeData,
        containerWidth,
    }
) => {
  switch(templateId){
    case "01":
        return (
            <TemplateOne resumeData={resumeData}  containerWidth={containerWidth}/>
        )
     case "02":
        return (
            <TemplateTwo resumeData={resumeData}  containerWidth={containerWidth}/>
        )
     case "03":
        return (
            <TemplateThree resumeData={resumeData}  containerWidth={containerWidth}/>
        )
    default:
        return (
            <TemplateThree resumeData={resumeData}  containerWidth={containerWidth}/>
        )
        
  }
}

export default RenderResume

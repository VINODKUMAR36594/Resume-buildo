import React from 'react'
import { useState,useRef } from 'react'
import { DUMMY_RESUME_DATA, resumeTemplates } from '../utils/data'
import { TemplateCard } from './cards'
import RenderResume from './RenderResume'
const TAB_DATA=[{label:'Templates'}]
const ThemeSelector = (selectedTheme,setSelectedTheme,resumeData,onClose) => {
    const resumeRef=useRef(null)
    const [basewidth,setBaseWdith]=useState(800);
    //seldecting theme by id
    const intitialIndex=resumeTemplates.findIndex(t=>t.id===selectedTheme)
    const [selectedTemplate,setSelectedTemplate]=useState({
      theme:selectedTheme || resumeTemplates[0]?.id || "",
      index: intitialIndex>=0?intitialIndex:0
})
const [tabValue,setTabValue]=useState('Templates')
const handleThemeSelection=()=>{
  setSelectedTheme(selectedTemplate.theme)
  onClose()
}
const updatBaseWidth=()=>{
  if(resumeRef.current){
    setBaseWdith(resumeRef.current.offsetWidth)
  }
}


  return (
    <div className='max-w-7xl mx-auto px-4'> 
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap--4 mb-8 p-4 sm:p-6 bg-gradient-to-r from-white to violte-50 rounded-2xl border border-violet-100'>
      <Tabs tabs={TABS_DATA} activeTab={tabValue} setActivetab={setActivetab}/>
      <button className='w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-lg hover:shadow-xl' onClick={handleThemeSelection}>
        <Check size={18}/>Apply Changes.
      </button>
    </div>
    <div className='grid grid-cols-1lg:griid-cols-5 gap-6 lg:gap-8 '>
      <div className='lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-4 sm:p-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-{60vh} lg:max-h-{70vh} overflow-auto p-2'>
          {resumeTemplates.map((template,index)=>(
            <TemplateCard key={`templates_${index}`}
            thumbnailImg={template.thumbnailImg}
            isSelected={selectedTemplate.index===index}
            onSelect={()=>setSelectedTemplate({
              theme:template.id,
              index
            })}
/>
))}
        </div>
      </div>
      {/* Right Area */}
      <div className='lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-4 sm:p-6' ref={resumeRef}>
        <RenderResume templateId={selectedTemplate?.theme || ""}
        resumedata={resumeData || DUMMY_RESUME_DATA}
        containerWidth={baseWidth}/>
      </div>
    </div>
      
    </div>
  )
}

export default ThemeSelector

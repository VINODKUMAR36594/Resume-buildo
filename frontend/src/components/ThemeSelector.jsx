import React, { useRef, useState } from 'react'
import { resumeTemplates } from '../utils/data'
const TAB_DATA=[{label:'Templates'}]const handleThemeSelection=()=>{
    setSelectedTheme(selectedTheme.)
}
const ThemeSelector = ({selectedTheme,setSelectedTheme,resumeData,onClose}) => {
    const resumeRef=useRef(null)
    const [baseWidth,setBaseWidth] =useState(800)
    //Selected Theme Tempkkate
    const intialIndex=resumeTemplates.findIndex(t =>t.id ===selectedTheme)
    const [selectedTemplate ,setSelectedTemplate] =useState({
        theme: selectedTheme || resumeTemplates[0]?.id || "",
        index:intialIndex >=0?intialIndex:0
    })
    const [tabValue,seTabValue] =useState('Templates')
    const handleThemeSelection=()=>{
    setSelectedTheme(selectedTemplate.theme)
    onClose()

}
const updateBaseWidth=()=>{
    if(resumeRef.current){
        setBaseWidth(resumeRef.current.offsetWidth)
    }
}
  return (
    <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col sm:flex-row items-start sm:items-cneter justify-between gap-4 mb-8 p-4 sm:p-6 bg-gradient-to-r from-white to-violet-50 rounded-2xl border border-violet-100 '>
      <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setActiveTab}/>
      <button className='w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 font-black rounded-2xl hover:scale-105
      transition-all shadow-lg hover:shadow-xl' onClick={handleThemeSelection}>
        <Check size={18}/> Apply Changes
      </button>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8'>
        <div className='lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-4 sm:p-6'>
            <div className='grid grid-col-1 sm:grid-cols-2 gap-4 max-h-{60vh} lg:max-h-{70vh} overflow-auto p-2'>
                {resumeTemplates.map((templates,index)=>(
                //    <Te 
                ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeSelector

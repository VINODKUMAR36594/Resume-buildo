import mongoose from 'mongoose'
const ResumeSchema =new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    thumbnailsLink:{
        type:String,
        
    },
    template:{
        theme:String,
        colorPalette:[String]
    },
    profileInfo:{
        profilePreviewUrl: String,
        fullName:String,
        designation:String,
        summary:String
    },
    contactInfo:{
        email:String,
        phone:String,
        location:String,
        Linkedin:String,
        gitHubLink:String,
        webisteLink:String,
    },
    //Work EXp
    WorkExperience:[
        {
            company:String,
            role:String,
            startDate:String,
            endDate:String,
            description:String,
        },
    ],
    education :[
        {
            degree:String,
            institution:String,
            startDate:String,
            endDate:String,
        },
    ],
    skills:[
        {
            name:String,
            progress:Number,

        },
    ],
    projects:[
        {
            title:String,
            description:String,
            github:String,
            liveDemo:String,
        },
    ],
    certifications:[
        {
            title:String,
            issuer:String,
            year:String,
        },
    ],
    languages:[
        {
            name:String,
            progress:Number,
        },
    ],

    intersets:[String],
    
},{
    timestamps:{createdAt:"createAt",updatedAt:"updateAt"}
}
)
export default mongoose.model("Resume",ResumeSchema)
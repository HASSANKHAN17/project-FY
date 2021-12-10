import React from 'react'
import "./SectionCard.scss"
const SectionCard = ({name,imgSource,value,history}) => {
    console.log(name);
    let imageLoc = ""
    if(name==="Nursury & KG"){
        imageLoc="Images/crayons.png"
    }else if(name==="Class I"){
        imageLoc="Images/class1.png"
    }else if(name==="Class II"){
        imageLoc="Images/class2.png"
    }else if(name==="Class III"){
        imageLoc= "Images/class3.png"
    }else if(name==="Class IV "){
        imageLoc= "Images/class4.png"
    }else if(name==="Class V"){
        imageLoc= "Images/class5.png"
    }else if(name==="Class VI "){
        imageLoc= "Images/class6.png"
    }else if(name==="Class7"){
        imageLoc= "Images/class7.png"
    }else if(name==="Class8"){
        imageLoc= "Images/class8.png"
    }else if(name==="Class9"){
        imageLoc= "Images/class9.png"
    }else if(name==="Class10"){
        imageLoc= "Images/class10.png"
    }else if(name==="Class 11"){
        imageLoc= "Images/class11.png"
    }else if(name==="Class 11 Science"){
        imageLoc= "Images/class11science.png"
    }else if(name==="Class 11th Arts Marathi Medium"){
        //imageLoc= "Images/"
    }else if(name==="Class 11th commerce english medium"){
        //imageLoc= "Images/"
    }else if(name==="Class 12th"){
        imageLoc= "Images/class12science.png"
    }else if(name==="Class 12th science"){
        //imageLoc= "Images/"
    }
    //stationery section starts from here........................
    else if(name==="Pen"){
        imageLoc="Images/pen.png"
    }else if(name==="Pencil"){
        imageLoc="Images/pencil.png"
    }else if(name==="Eraser"){
        imageLoc="Images/eraser.png"
    }else if(name==="Sharpener"){
        imageLoc="Images/pencil-sharpener.png"
    }else if(name==="Scale"){
        imageLoc="Images/ruler.png"
    }else if(name==="Geometry"){
        imageLoc="Images/geometry.png"
    }else if(name==="Kits and Packs"){
        imageLoc="Images/kitsandpacks.png"
    }else if(name==="Chalk"){
        imageLoc="Images/chalks.png"
    }else if(name==="Cutters"){
        imageLoc="Images/cutter.png"
    }else if(name==="Camlin Notebook"){
        imageLoc="Images/CamlinLogo.png"
    }else if(name==="Navneet NoteBooks"){
        imageLoc="Images/navneetlogo.png"
    }else if(name==="Classmate Notebook"){
        imageLoc="Images/classmatelogo.png"
    }else if(name==="Exam Pad"){
        imageLoc="Images/clipboard.png"
    }else if(name==="Answer Sheet"){
        imageLoc="Images/test.png"
    }else if(name==="Other Notebooks"){
        imageLoc="Images/notebook.png"
    }else if(name==="Graphbook"){
        imageLoc="Images/bargraph.png"
    }
    return ( 
     <div onClick={()=>history.push("/sectiondetail",{value,name})} className="shadow-lg col-xs-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
    <img src={imageLoc} alt="" />
     <h3 key={name}>{name}</h3>
    </div>  
    );
}

export default SectionCard;
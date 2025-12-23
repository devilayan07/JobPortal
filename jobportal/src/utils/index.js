export function getDateMonthYear(date){
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    if(date===null){
        return "present"
    }else{
         const year=new Date(date).getFullYear();
    const month=months[new Date(date).getMonth()]
    const days=new Date(date).getDay()

    return (`${days} ${month} ${year}`)

    }



}

export function formatDateForInput(date) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export const formatDateForApi=(date)=>{
  if(!date) return "";
  return new Date(date).toISOString()
  
}
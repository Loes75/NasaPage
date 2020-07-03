
 //variables
 const actualDate= moment().format("YYYY-MM-DD")
 const img = document.querySelector(".img");
 const titleImg = document.querySelector(".title");
 const infoImg = document.querySelector(".info");
 const msgTag = document.querySelector(".msg");
 const video = document.querySelector(".video");
 const imgDiv = document.querySelector(".img-container");
 const requestedDate = document.querySelector("#date");
 const dateInfo = document.querySelector(".dateInfo"); 
 //listeners
 requestedDate.addEventListener("change", function (){
    if(validate(requestedDate.value)){
        msgTag.textContent="";
        showImg(requestedDate.value);
    } else{
        //let msg = "<h2>Date format not valid , remember YYYY-MM-DD </h2>";
        msgTag.textContent = "Date format not valid , remember YYYY-MM-DD and must be after 1995-06-16";

    }
     
 });

function validate(date){
    let validFormat  = moment(date, 'YYYY-MM-DD', true).isValid();
    let validDate = moment(date).isAfter("1995-06-16");
    //Must be after 1995-06-16
    return (validFormat & validDate);

}


function showImg(date){
    fetch(`https://api.nasa.gov/planetary/apod?api_key=RtjGZU95iHxKbxPLro3a6eRpdMR2J0lQYqxqzfjo&date=${date}`)
    .then(response => {
        if (!response.ok) {
            throw Error(`error : ${response.statusText}`);
        }else{ return response}
    }).then(response => response.json())
    .then(data =>{
        if (data.media_type == "image"){
            (img.classList.contains("hide")) ? img.classList.remove("hide") : img;
            (!video.classList.contains("hide")) ? video.classList.add("hide") : video;
            img.src= `${data.url}`;
            
        }else{
            img.classList.add("hide");
            video.classList.remove("hide");
            console.log(data.url);
            video.src=data.url;   
                
        }
        titleImg.textContent = data.title;
        infoImg.textContent = data.explanation;
        dateInfo.textContent = data.date;
       

    })
    .catch( error => console.log(error));
    

};

function main(){
    AOS.init({
        duration: 600
    });
    //call functions
    showImg(actualDate);

}


main()
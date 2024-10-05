
// Adding an event listener to the search form for submission
document.querySelector(".search-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get the search query from the input field
  const query = document.querySelector("#search-input").value;

  // Define the API URL for fetching video data based on the search query

  const url = `` // add your API URL for fetching video data based on the search query
;
  
  // Set up the options for the fetch request, including headers for authentication

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "" // add your api key,
      "x-rapidapi-host": "" // add your api key host,
    },
  };

   // Fetch the video data from the API
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result.data);
    displayVideosToDom(result.data);
  } catch (error) {
    console.error("error fetching search queryy", error);
  }
});

// Function to display videos in the DOM
const displayVideosToDom = (videos) => {
  const videoList = document.querySelector("#video-list");
//   console.log(videoList);

  videoList.innerHTML = "";
  videos.forEach((video) => {
    const videoItem = document.createElement("div");
    videoItem.className = "video-item";
    videoItem.innerHTML = `
            <div class="video-thumbnail" style="background-image:url(${video.thumbnail[0].url});"></div>
            <div class="video-info">
            <div class="video-title">${video.title}</div>
            <div class="video-channel">${video.channelTitle}</div>
            </div>
        `;
     // Add a click event to open the modal for the selected video

    videoItem.addEventListener("click", () => openModel(video.videoId));

    videoList.appendChild(videoItem);
  });
};

// Function to open the modal for viewing or downloading the video
const openModel = (videoId) => {
  const model = document.querySelector("#video-model");

  const videoPlayer = document.querySelector("#video-player");

 // Set the video player source to the selected video's embed URL

  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  videoPlayer.src = videoUrl;
  model.style.display = "block";

   // Set up the download button click event

  const downloadBtn = document.querySelector("#download-mp3");

  downloadBtn.addEventListener("click" , () =>{
    downloadVideoToMp3(videoId);
  });

 // Set up the close button click event

  document.querySelector(".close-model").addEventListener("click", () =>{
    closeModel(model,videoPlayer);
  });
};

//closing the model  in two way 

// Function to close the modal and reset the video player
const closeModel = (model,videoPlayer) =>{
    model.style.display = "none";
    videoPlayer.src = ""
}

// Event listener for closing the modal when clicking outside of it
window.onclick = (event) =>{
    const model = document.querySelector("#video-model");

    const videoPlayer = document.querySelector("#video-player");

      // Check if the click target is the modal itself

    if(event.target == model){
      closeModel(model,videoPlayer)
        
    }else{
        return
    }
}

// Function to download the video as an MP3 file

const downloadVideoToMp3 = async (videoId) => {
    
     // Define the API URL for downloading the audio

    const url = ``; // add your API URL  for downloading the audio

      // Set up the options for the fetch request

    const options = {
        method: 'GET',
	headers: {
		'x-rapidapi-key': '', // add your api key 
		'x-rapidapi-host': '' // add your api host
	}
    };

      // Fetch the MP3 download link from the API
    try {
        const response = await fetch(url,options);
        const result = await response.json();
        
         // Check the result status and redirect to the download link if successful

        if(result.status === "ok"){
            window.location.href = result.link;
        }else{
            console.error("error downloading mp3"); // Download the MP3 file
        }
        

    } catch (error) {
        console.error("error",error)
    }
}


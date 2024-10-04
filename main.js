document.querySelector(".search-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = document.querySelector("#search-input").value;
    
    const url = `https://youtube-v3-alternative.p.rapidapi.com/search?query=${query}&type=video&lang=en`;

    const options = {
        method:"GET",
        headers: {
            'x-rapidapi-key': '33928d43a1mshfc0bcb94acfafbdp1081e7jsn9010971be2cd',
            'x-rapidapi-host': 'youtube-v3-alternative.p.rapidapi.com'
        }
       
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data);
        displayVideos(result.data)
        
    } catch (error) {
        console.error("error fetching search queryy",error);
    }

});

function displayVideos(videos){
    const videoList  = document.querySelector("#video-list");
    console.log(videoList);
    
    videoList.innerHTML = "";
    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = "video-item";
        videoItem.innerHTML  = `
            <div class="video-thumbnail" style="background-image:url(${video.thumbnail[0].url}); width:320px; height: 200px;"></div>
            <div class="video-info">
            <div class="video-title">${video.title}</div>
            <div class="video-channel">${video.channelTitle}</div>
            </div>
        `
    
        
        videoList.appendChild(videoItem);
    });

}
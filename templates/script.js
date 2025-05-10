window.onload = function() {
    startTooltipTimer("Welcome to the Output page");
};
function updateAudioSource() {
    var languageSelect = document.getElementById('lang');
    var audioPlayer = document.getElementById('audioPlayer');
    var videoPlayer = document.getElementById('videoPlayer');
    var captionElement = document.getElementById('caption');
    var caption = document.getElementById('caption');
    var selectedLanguage = languageSelect.value;

    if (selectedLanguage !== "") {
        // Assuming filenames are sequentially numbered starting from 0.wav
        var audioFileName = selectedLanguage + ".wav";
        var audioFilePath = "/static/" + audioFileName;
        audioPlayer.src = audioFilePath;
        audioPlayer.play();
        videoPlayer.play();
        if (selectedLanguage==0){
            captionElement.textContent = '{{ caption_eng }}';
        }
        else if (selectedLanguage==1){
            captionElement.textContent = '{{ caption_tam }}';
        }
        else if (selectedLanguage==2){
            captionElement.textContent = '{{ caption_hin }}';
        }
        else if (selectedLanguage==3){
            captionElement.textContent = '{{ caption_fren }}';
        }
        else if (selectedLanguage==4){
            captionElement.textContent = '{{ caption_ger }}';
        }
        else if (selectedLanguage==5){
            captionElement.textContent = '{{ caption_chi }}';
        }
        else if (selectedLanguage==6){
            captionElement.textContent = '{{ caption_jap }}';
        }
        else{
            
            captionElement.textContent = 'None';
        }

    }
}

document.getElementById('lang').addEventListener('change', updateAudioSource);
localStorage.setItem('currentPage', 'output');
const last_page = localStorage.getItem('currentPage');
var videoPlayer = document.getElementById('videoPlayer');
var audioPlayer = document.getElementById('audioPlayer');
var audio_flag = true;

  $(document).ready(function() {
    // Periodically check for the last recognized command
    setInterval(function() {
        $.ajax({
            type: "GET",
            url: "/get_last_command",
            success: function(response) {
                var lastCommand = response.last_command;
                if (lastCommand) {
                    if (lastCommand.includes("about") && last_page != "about") {
                    
                        window.location.href = "/aboutus";  // Redirect to the about us page
                    } else if (lastCommand.includes("certificate") && last_page != "certificate") {
                        
                        window.location.href = "/certificate";  // Redirect to the certificate page
                    }
                    else if (lastCommand.includes("contact") && last_page != "contact") {
                        // last_page = "contact"
                        window.location.href = "/contactus";  // Redirect to the contact page
                    }
                    
                    if (lastCommand.includes("english")){
                        var audioPlayer = document.getElementById('audioPlayer');
                        var captionElement = document.getElementById('caption');
                        var audioFileName = "0.wav";
                        var audioFilePath = "/static/" + audioFileName;
                        audioPlayer.src = audioFilePath;
                        captionElement.textContent = '{{ caption_eng }}';
                        
                        videoPlayer.play();
                        
                        audioPlayer.play();
                        // flag_eng = false;
                        // flag_tam = true;
                        // flag_chi = true;
                        // flag_fre = true;
                        // flag_ger = true;
                        // flag_hin = true;
                        // flag_jap = true;
                    }
                    if (lastCommand.includes("tamil")){
                        var audioPlayer = document.getElementById('audioPlayer');
                        var captionElement = document.getElementById('caption');
                        var audioFileName = "1.wav";
                        var audioFilePath = "/static/" + audioFileName;
                        audioPlayer.src = audioFilePath;
                        captionElement.textContent = '{{ caption_tam }}';
                        // var videoPlayer = document.getElementById('videoPlayer');
                        videoPlayer.play();
                        // var audioPlayer = document.getElementById('audioPlayer');
                        audioPlayer.play();
                        // flag_tam = false;
                        // flag_eng = true;
                        // flag_chi = true;
                        // flag_fre = true;
                        // flag_ger = true;
                        // flag_hin = true;
                        // flag_jap = true;
                    }
                    if (lastCommand.includes("hindi")){
                        var audioPlayer = document.getElementById('audioPlayer');
                        var captionElement = document.getElementById('caption');
                        var audioFileName = "2.wav";
                        var audioFilePath = "/static/" + audioFileName;
                        audioPlayer.src = audioFilePath;
                        captionElement.textContent = '{{ caption_hin }}';
                        // var videoPlayer = document.getElementById('videoPlayer');
                        videoPlayer.play();
                        // var audioPlayer = document.getElementById('audioPlayer');
                        audioPlayer.play();
                        // flag_hin = false;
                        // flag_eng = true;
                        // flag_tam = true;
                        // flag_chi = true;
                        // flag_fre = true;
                        // flag_ger = true;
                        // flag_jap = true;
                    }
                    if (lastCommand.includes("french")){
                        var audioPlayer = document.getElementById('audioPlayer');
                        var captionElement = document.getElementById('caption');
                        var audioFileName = "3.wav";
                        var audioFilePath = "/static/" + audioFileName;
                        audioPlayer.src = audioFilePath;
                        captionElement.textContent = '{{ caption_fren }}';
                        // var videoPlayer = document.getElementById('videoPlayer');
                        videoPlayer.play();
                        // var audioPlayer = document.getElementById('audioPlayer');
                        audioPlayer.play();
                        // flag_fre = false;
                        // flag_eng = true;
                        // flag_tam = true;
                        // flag_chi = true;
                        // flag_ger = true;
                        // flag_hin = true;
                        // flag_jap = true;
                    }
                    if (lastCommand.includes("german")){
                        var audioPlayer = document.getElementById('audioPlayer');
                        var captionElement = document.getElementById('caption');
                        var audioFileName = "4.wav";
                        var audioFilePath = "/static/" + audioFileName;
                        audioPlayer.src = audioFilePath;
                        captionElement.textContent = '{{ caption_ger }}';
                        // var videoPlayer = document.getElementById('videoPlayer');
                        videoPlayer.play();
                        // var audioPlayer = document.getElementById('audioPlayer');
                        audioPlayer.play();
                        // flag_ger = false;
                        // flag_eng = true;
                        // flag_tam = true;
                        // flag_chi = true;
                        // flag_fre = true;
                        // flag_hin = true;
                        // flag_jap = true;
                    }
                    if (lastCommand.includes("chinese")){
                        var audioPlayer = document.getElementById('audioPlayer');
                        var captionElement = document.getElementById('caption');
                        var audioFileName = "5.wav";
                        var audioFilePath = "/static/" + audioFileName;
                        audioPlayer.src = audioFilePath;
                        captionElement.textContent = '{{ caption_chi }}';
                        // var videoPlayer = document.getElementById('videoPlayer');
                        videoPlayer.play();
                        // var audioPlayer = document.getElementById('audioPlayer');
                        audioPlayer.play();
                        // flag_chi = false;
                        // flag_eng = true;
                        // flag_tam = true;
                        // flag_fre = true;
                        // flag_ger = true;
                        // flag_hin = true;
                        // flag_jap = true;
                    }
                    if (lastCommand.includes("japanese")){
                        var audioPlayer = document.getElementById('audioPlayer');
                        var captionElement = document.getElementById('caption');
                        var audioFileName = "6.wav";
                        var audioFilePath = "/static/" + audioFileName;
                        audioPlayer.src = audioFilePath;
                        captionElement.textContent = '{{ caption_jap }}';
                        // var videoPlayer = document.getElementById('videoPlayer');
                        videoPlayer.play();
                        // var audioPlayer = document.getElementById('audioPlayer');
                        audioPlayer.play();
                        // flag_jap = false;
                        // flag_eng = true;
                        // flag_tam = true;
                        // flag_chi = true;
                        // flag_fre = true;
                        // flag_ger = true;
                        // flag_hin = true;
                    }
                }
            },
            error: function(error) {
                console.log("Error:", error);
            }
        });
    }, 1000);  // Adjust the interval based on your needs
});

    var tooltipTimer;

    function startTooltipTimer(text) {
        tooltipTimer = setTimeout(function () {
            speakTooltip(text);
        }, 1000); // Set the duration in milliseconds (e.g., 2000 ms = 2 seconds)
    }

    function clearTooltipTimer() {
        clearTimeout(tooltipTimer);
    }

    function speakTooltip(text) {
        var utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

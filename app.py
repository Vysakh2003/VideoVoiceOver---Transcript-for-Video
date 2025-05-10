from flask import Flask, redirect, url_for, render_template, request, session, flash,jsonify
from flask_mail import *
# from werkzeug.utils import secure_filename
from datetime import timedelta
from datetime import datetime
from pretrained import *
import pytz
import speech_recognition
import pyttsx3
import threading
import imageio
from pytube import YouTube
import requests
app = Flask(__name__)
app.secret_key = "satya"
app.permanent_session_lifetime = timedelta(minutes=5)
app.config['DEBUG'] = False
app.config['TESTING'] = False
 
app.config['MAIL_SERVER']='smtp.gmail.com'  
app.config['MAIL_PORT']=465  
app.config['MAIL_USERNAME'] = 'videovoiceover2023@gmail.com'  
app.config['MAIL_PASSWORD'] = 'wvtc derc cuyr cdpq'  
app.config['MAIL_USE_TLS'] = False  
app.config['MAIL_USE_SSL'] = True  
mails = Mail(app)  

last_command = None
command_lock = threading.Lock()
recognizer = speech_recognition.Recognizer()
# Background thread for continuous speech recognition
def speech_recognition_thread():
    global last_command
    recognizer = speech_recognition.Recognizer()

    while True:
        try:
            with speech_recognition.Microphone() as mic:

                recognizer.adjust_for_ambient_noise(mic, duration=0.5)
                audio = recognizer.listen(mic)

                text = recognizer.recognize_google(audio)
                text = text.lower()
                home_text = 1 if "home" in text else 0
                about_text = 1 if "about" in text else 0
                contact_text = 1 if "contact" in text else 0
                certificate_text = 1 if "certificate" in text else 0
                play_audio_test = 1 if "play audio" in text else 0
                eng_text = 1 if "english" in text else 0
                tam_text = 1 if "tamil" in text else 0
                hin_text = 1 if "hindi" in text else 0
                fre_text = 1 if "french" in text else 0
                ger_text = 1 if "german" in text else 0
                chi_text = 1 if "chinese" in text else 0
                jap_text = 1 if "japanese" in text else 0
                if home_text+about_text+contact_text+certificate_text+play_audio_test+eng_text+tam_text+hin_text+fre_text+ger_text+chi_text+jap_text<=1:
                    print("Recognized:", text)
                # Update the last recognized command
                    with command_lock:
                        last_command = text
                        

        except speech_recognition.UnknownValueError:
            pass
        except speech_recognition.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")

# Start the background thread
speech_thread = threading.Thread(target=speech_recognition_thread)
speech_thread.daemon = True
speech_thread.start()


def convert_avi_to_mp4(input_file, output_file):
    reader = imageio.get_reader(input_file)
    writer = imageio.get_writer(output_file, fps=reader.get_meta_data()['fps'])

    for frame in reader:
        writer.append_data(frame)

    writer.close()
    print(f"Conversion successful. Output file: {output_file}")
    return output_file

@app.route("/")
def home():
    
    return render_template("file.html")

@app.route("/load", methods=["POST", "GET"])
def load():
    
    if request.method == "POST":
        
        lin = request.form["lin"]
        file_upload = request.files["file-upload"]
        print(file_upload , lin)
            
        if lin:
            if not file_upload:
                if 'youtube.com' in lin:
                    try:
                        output_filename = "output.mp4"
                        # Create a YouTube object
                        yt = YouTube(lin)
                        
                        # Get the highest resolution stream
                        video_stream = yt.streams.get_highest_resolution()
                        # Download the video
                        video_stream.download(output_path= 'static/',filename=output_filename)
                        
                        print(f"Downloaded: {yt.title}")
                        result = videovoiceover_path(output_filename)
                    except Exception as e:
                        print(f"Error: {e}")
                        flash("Paste valid link or upload video")
                        return redirect(url_for("home"))
                else:
                    try:
                        # Send a GET request to the URL
                        response = requests.get(lin)
                        
                        # Check if the request was successful (status code 200)
                        if response.status_code == 200:
                            # Save the content to a file with the filename "output.mp4" in the "static/" folder
                            with open('static/output.mp4', 'wb') as file:
                                file.write(response.content)
                                
                            print("Downloaded successfully")
                            result = videovoiceover_path("output.mp4")
                        else:
                            print(f"Error: {response.status_code}")
                            flash("Paste valid link or upload video")
                            return redirect(url_for("home"))
                    except Exception as e:
                        print(f"Error: {e}")
                        flash("Paste valid link or upload video")
                        return redirect(url_for("home"))

                caption_eng = result[0][0]
                caption_tam = result[0][1]
                caption_hin = result[0][2]
                caption_fren = result[0][3]
                caption_ger = result[0][4]
                caption_chi = result[0][5]
                caption_jap = result[0][6]
            else:
                flash("Paste link or upload video")
                return redirect(url_for("home"))
        else:
            if not file_upload:
                flash("Paste link or upload video")
                return redirect(url_for("home"))
            
            elif file_upload:
                #result = ml_processing(file_upload)
                print(file_upload)
                if file_upload.filename.endswith(".avi"):
                    file_upload.save(file_upload.filename)
                    file_upload = convert_avi_to_mp4(file_upload.filename,"static/output.mp4")
                    result = videovoiceover("output.mp4")
                
                elif file_upload.filename.endswith(".mp4"):
                    file_upload.save('static/output.mp4')
                    result = videovoiceover("output.mp4")

                print('File uploaded successfully.')

                
                # if result==-1:
                #     flash("No video in path or Selected other extensions")
                #     return redirect(url_for("home"))
                # print(result)
                caption_eng = result[0][0]
                caption_tam = result[0][1]
                caption_hin = result[0][2]
                caption_fren = result[0][3]
                caption_ger = result[0][4]
                caption_chi = result[0][5]
                caption_jap = result[0][6]

    return render_template("output.html",result=result,caption_eng=caption_eng,caption_tam=caption_tam,caption_hin=caption_hin,caption_fren=caption_fren,caption_ger=caption_ger,caption_chi=caption_chi,caption_jap=caption_jap)

@app.route("/aboutus")
def aboutus():
    return render_template("aboutus.html")

@app.route("/certificate")
def certificate():
    return render_template("certificate.html")

@app.route("/contactus", methods=["POST", "GET"])
def contactus():
    if request.method == "POST":
        name = request.form["name"]
        mail = request.form["email"]
        contact = request.form["contact"]
        message = request.form["message"]
        # email = ["20cs39@cit.edu.in","20cs22@cit.edu.in","20cs26@cit.edu.in","20cs47@cit.edu.in","20cs50@cit.edu.in","71762105207@cit.edu.in"]
        email = ["vysakhs2003@gmail.com","allenbennymathewm@gmail.com"]
        msg = Message('Video VoiceOver - Contact Form Submission', sender = app.config['MAIL_USERNAME'], recipients=email)  
        msg.html = render_template('contactformsubmission.html',name=name,mail=mail,message=message,contact=contact)
        mails.send(msg)
        flash("Thank You for contacting Us.")
        return render_template("contactus.html")
        
    return render_template("contactus.html")

@app.route("/get_last_command", methods=["GET"])
def get_last_command():
    # l = []
    global last_command
    with command_lock:
        a = last_command
        last_command = ""
        return jsonify({"last_command": a})

if __name__ == "__main__":
    app.run(debug=True)

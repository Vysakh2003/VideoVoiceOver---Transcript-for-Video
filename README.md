# VideoVoiceOver1 - Transcript for Video #

**Video Voice Over for Visually Impaired**, is designed to make video content more accessible to individuals with visual impairments. The system extracts key frames from a video, generates detailed image captions using a Vision Transformer (ViT) and Transformer-based decoder, summarizes those captions for brevity, and finally converts the summaries into natural-sounding speech in multiple languages.

The core objective is to provide an automatic and intelligent voice narration of videos, making digital media more inclusive. By integrating computer vision, natural language processing, and speech synthesis, this system ensures that visually impaired users can understand and engage with visual content without needing sight.

### 📦Key Modules
1. Frame Extraction: Extracts key frames from input video files at regular intervals.

2. Image Captioning (ViT + Transformer): Uses a pretrained Vision Transformer (ViT) as an encoder and a Transformer decoder to generate natural language descriptions of each frame.

3. Text Summarization: Condenses the full captions into shorter summaries to make audio narration more concise and meaningful.

4. Multilingual Text-to-Speech (TTS): Converts the summarized text into audio using Google TTS in multiple languages.

### 🛠️ Technologies Used
1. Deep Learning Framework: PyTorch

2. Transformer Models: Vision Transformer (ViT), Transformer Decoder

3. NLP Tools: HuggingFace Transformers, BART for summarization

4. Speech: gTTS (Google Text-to-Speech)

5. Video Processing: OpenCV

### 🎓 Purpose
Designed to support visually impaired individuals by narrating video content in natural language.

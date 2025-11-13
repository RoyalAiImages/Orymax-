import { GoogleGenAI } from "@google/genai";

// Per guidelines, initialize with a named apiKey parameter from process.env.
// This instance can be used by services that don't require special key handling.
const sharedAi = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Generates an image based on a text prompt using the Imagen model.
 * @param prompt The text prompt describing the image to generate.
 * @param aspectRatio The desired aspect ratio for the image.
 * @returns A promise that resolves to a data URL (base64) of the generated image.
 */
export const generateImage = async (prompt: string, aspectRatio: string): Promise<string> => {
  try {
    const response = await sharedAi.models.generateImages({
        model: 'imagen-4.0-generate-001', // High-quality image generation model
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
};

// FIX: Add missing generateThumbnail function for ThumbnailGenerator component.
/**
 * Generates a thumbnail image based on a text prompt.
 * @param prompt The text prompt describing the thumbnail.
 * @param aspectRatio The desired aspect ratio for the thumbnail.
 * @returns A promise that resolves to a data URL (base64) of the generated image.
 */
export const generateThumbnail = async (prompt: string, aspectRatio: string): Promise<string> => {
  try {
    const response = await sharedAi.models.generateImages({
        model: 'imagen-4.0-generate-001', // High-quality image generation model for thumbnails
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio, // Standard thumbnail aspect ratio
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No thumbnail was generated.");
    }
  } catch (error) {
    console.error("Error generating thumbnail:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate thumbnail: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the thumbnail.");
  }
};

// FIX: Add missing animateImage function for AnimateImageModal component.
/**
 * Animates a static image to create a short video using the Veo model.
 * @param imageBase64 The base64 encoded string of the image.
 * @param mimeType The MIME type of the image.
 * @returns A promise that resolves to an object URL (blob URL) of the generated video.
 */
export const animateImage = async (imageBase64: string, mimeType: string): Promise<string> => {
  // Per guidelines, a new instance is created for Veo to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      image: {
        imageBytes: imageBase64,
        mimeType: mimeType,
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
      }
    });

    while (!operation.done) {
      // Poll every 10 seconds as recommended.
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
        throw new Error("Video generation completed, but no download link was found.");
    }

    // The download link requires the API key.
    const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY!}`);
    if (!videoResponse.ok) {
        const errorText = await videoResponse.text();
        // The error from Veo can be informative.
        if (errorText.includes("NOT_FOUND") || errorText.includes("Requested entity was not found")) {
             throw new Error("NOT_FOUND: The requested entity was not found. Your API key might not have access to the Veo model.");
        }
        throw new Error(`Failed to download video file: ${videoResponse.statusText}. Details: ${errorText}`);
    }

    const videoBlob = await videoResponse.blob();
    return URL.createObjectURL(videoBlob);

  } catch (error) {
    console.error("Error animating image:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to animate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while animating the image.");
  }
};

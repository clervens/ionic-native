import { Cordova, CordovaProperty, Plugin } from './plugin';
import { Observable } from 'rxjs/Rx';


declare var navigator: any;

/**
 * @name Media Capture
 * @description
 * @usage
 * ```typescript
 * import {MediaCapture} from 'ionic-native';
 *
 * ...
 *
 * let options: CaptureImageOptions = { limit: 3 };
 * MediaCapture.captureImage(options)
 *   .then(
 *     (data: MediaFile[]) => console.log(data),
 *     (err: CaptureError) => console.error(err)
 *   );
 *
 * ```
 */
@Plugin({
  plugin: 'cordova-plugin-media-capture',
  pluginRef: 'navigator.device.capture',
  repo: 'https://github.com/apache/cordova-plugin-media-capture'
})
export class MediaCapture {
  /**
   * The audio recording formats supported by the device.
   * @returns {ConfigurationData[]}
   */
  @CordovaProperty
  static get supportedImageModes(): ConfigurationData[] {
    return <ConfigurationData[]>navigator.device.capture.supportedImageModes;
  }

  /**
   * The recording image sizes and formats supported by the device.
   * @returns {ConfigurationData[]}
   */
  @CordovaProperty
  static get supportedAudioModes(): ConfigurationData[] {
    return <ConfigurationData[]>navigator.device.capture.supportedAudioModes;
  }

  /**
   * The recording video resolutions and formats supported by the device.
   * @returns {ConfigurationData[]}
   */
  @CordovaProperty
  static get supportedVideoModes(): ConfigurationData[] {
    return <ConfigurationData[]>navigator.device.capture.supportedVideoModes;
  }

  /**
   * Start the audio recorder application and return information about captured audio clip files.
   * @param options
   */
  @Cordova({
    callbackOrder: 'reverse'
  })
  static captureAudio(options?: CaptureAudioOptions): Promise<MediaFile[] | CaptureError> { return; }

  /**
   * Start the camera application and return information about captured image files.
   * @param options
   */
  @Cordova({
    callbackOrder: 'reverse'
  })
  static captureImage(options?: CaptureImageOptions): Promise<MediaFile[] | CaptureError> { return; }

  /**
   * Start the video recorder application and return information about captured video clip files.
   * @param options
   */
  @Cordova({
    callbackOrder: 'reverse'
  })
  static captureVideo(options?: CaptureVideoOptions): Promise<MediaFile[] | CaptureError> { return; }

  /**
   * is fired if the capture call is successful
   */
  @Cordova({
    eventObservable: true,
    event: 'pendingcaptureresult'
  })
  static onPendingCaptureResult(): Observable<MediaFile[]> { return; }

  /**
   * is fired if the capture call is unsuccessful
   */
  @Cordova({
    eventObservable: true,
    event: 'pendingcaptureerror'
  })
  static onPendingCaptureError(): Observable<CaptureError> { return; }

}
/**
 * Encapsulates properties of a media capture file.
 */
export interface MediaFile {
  /**
   * The name of the file, without path information.
   */
  name: string;
  /**
   * The full path of the file, including the name.
   */
  fullPath: string;
  /**
   * The file's mime type
   */
  type: string;
  /**
   * The date and time when the file was last modified.
   */
  lastModifiedDate: Date;
  /**
   * The size of the file, in bytes.
   */
  size: number;
  /**
   * Retrieves the format information of the media file.
   * @param {Function} successCallback
   * @param {Function} errorCallback
   */
  getFormatData(successCallback: (data: MediaFileData) => any, errorCallback?: (err: any) => any);
}
/**
 * Encapsulates format information about a media file.
 */
export interface MediaFileData {
  /**
   * The actual format of the audio and video content.
   */
  codecs: string;
  /**
   * The average bitrate of the content. The value is zero for images.
   */
  bitrate: number;
  /**
   * The height of the image or video in pixels. The value is zero for audio clips.
   */
  height: number;
  /**
   * The width of the image or video in pixels. The value is zero for audio clips.
   */
  width: number;
  /**
   * The length of the video or sound clip in seconds. The value is zero for images.
   */
  duration: number;
}
/**
 * Encapsulates the error code resulting from a failed media capture operation.
 */
export interface CaptureError {
  code: string;
}
/**
 * Encapsulates audio capture configuration options.
 */
export interface CaptureAudioOptions {
  /**
   * Maximum number of audio clips. Defaults to 1.
   * On iOS you can only record one file.
   */
  limit?: number;
  /**
   * Maximum duration of an audio sound clip, in seconds. This does not work on Android devices.
   */
  duration?: number;
}
/**
 * Encapsulates image capture configuration options.
 */
export interface CaptureImageOptions {
  /**
   * Maximum number of images to capture. This limit is not supported on iOS, only one image will be taken per invocation.
   */
  limit?: number;
}
/**
 * Encapsulates video capture configuration options.
 */
export interface CaptureVideoOptions {
  /**
   * Maximum number of video clips to record. This value is ignored on iOS, only one video clip can be taken per invocation.
   */
  limit?: number;
  /**
   * Maximum duration per video clip. This will be ignored on BlackBerry.
   */
  duration?: number;
  /**
   * Quality of the video. This parameter can only be used with Android.
   */
  quality?: number;
}
/**
 * Encapsulates a set of media capture parameters that a device supports.
 */
export interface ConfigurationData {
  /**
   * The ASCII-encoded lowercase string representing the media type.
   */
  type: string;
  /**
   * The height of the image or video in pixels. The value is zero for sound clips.
   */
  height: number;
  /**
   * The width of the image or video in pixels. The value is zero for sound clips.
   */
  width: number;
}

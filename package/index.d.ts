import { AudioInputDevice } from '../../../calls-sdk-core';
import { AudioOutputDevice } from '../../../calls-sdk-core';
import * as v from 'valibot';
import { VideoInputDevice } from '../../../calls-sdk-core';

declare interface AnyProperties {
    [prop: string]: any;
}

declare type AudioInputDevice_2 = MediaDeviceInfo & {
    kind: Extract<MediaDeviceKind, 'audioinput'>;
};

declare type AudioMode = {
    type: AudioModeType;
    selected: boolean;
    uid?: string;
};

declare type AudioModeType = 'BLUETOOTH' | 'EARPIECE' | 'HEADPHONES' | 'SPEAKER';

declare type AudioOutputDevice_2 = MediaDeviceInfo & {
    kind: Extract<MediaDeviceKind, 'audiooutput'>;
};

declare class CallAppSettings {
    private appId;
    private region;
    private host?;
    constructor(builder?: CallAppSettingsBuilder);
    setAppId(appId: string): this;
    setRegion(region: Region): this;
    setHost(host: Host): this;
    getAppId(): string;
    getRegion(): Region;
    getHost(): Host | undefined;
}

declare type CallAppSettings_2 = v.InferOutput<typeof CallAppSettingsSchema>;

declare class CallAppSettingsBuilder {
    appId: string;
    region: Region;
    host?: Host;
    /**
     * Method to set appId of the app.
     * @param {string} appId appId of the app
     * @returns
     */
    setAppId(appId: string): this;
    /**
     * Method to set region of the app.
     * @param {Region} region region of the app.
     * @returns {void}
     */
    setRegion(region: Region): this;
    /**
     * Method to set host/domain of the app.
     * @param {string} host host/domain of the app.
     * @returns {void}
     */
    setHost(host: Host): this;
    /**
     * This method will return an object of the CallsAppSettings class.
     * @returns {CallAppSettings} Returns the CallsAppSettings instance
     */
    build(): CallAppSettings;
}

declare const CallAppSettingsSchema: v.ObjectSchema<{
    readonly appId: v.StringSchema<undefined>;
    readonly region: v.SchemaWithPipe<readonly [v.StringSchema<undefined>, v.TransformAction<string, string>, v.UnionSchema<[v.LiteralSchema<"eu", undefined>, v.LiteralSchema<"us", undefined>, v.LiteralSchema<"in", undefined>, v.LiteralSchema<"EU", undefined>, v.LiteralSchema<"US", undefined>, v.LiteralSchema<"IN", undefined>], undefined>]>;
    readonly authKey: v.OptionalSchema<v.StringSchema<undefined>, undefined>;
    readonly adminHost: v.OptionalSchema<v.StringSchema<undefined>, undefined>;
    readonly clientHost: v.OptionalSchema<v.StringSchema<undefined>, undefined>;
    readonly host: v.OptionalSchema<v.StringSchema<undefined>, undefined>;
}, undefined>;

declare const CallConstants: {
    readonly MODE: {
        readonly DEFAULT: "DEFAULT";
        readonly SPOTLIGHT: "SPOTLIGHT";
        readonly GRID: "TILE";
    };
    readonly CALL_TYPE: {
        readonly AUDIO: "audio";
        readonly VIDEO: "video";
    };
    readonly RECEIVER_TYPE_GROUP: "group";
    readonly RECEIVER_TYPE_USER: "user";
    readonly CALL_KEYS: {
        readonly CALL_DATA: "data";
        readonly CALL_ID: "id";
        readonly CALL_SESSION_ID: "sessionid";
        readonly CALL_RECEIVER: "receiver";
        readonly CALL_INITIATOR: "initiator";
        readonly CALL_SENDER: "sender";
        readonly CALL_RECEIVER_TYPE: "receiverType";
        readonly CALL_STATUS: "status";
        readonly CALL_TYPE: "type";
        readonly CALL_INITIATED_AT: "initiatedAt";
        readonly CALL_JOINED_AT: "joinedAt";
        readonly CALL_LEFT_AT: "leftAt";
        readonly CALL_METADATA: "metadata";
        readonly CALL_ENTITIES: "entities";
        readonly CALL_ENTITY_TYPE: "entityType";
        readonly CALL_ENTITY: "entity";
        readonly CALL_ENTITY_USER: "user";
        readonly CALL_ENTITY_GROUP: "group";
    };
    readonly CALL_STATUS: {
        readonly INITIATED: "initiated";
        readonly ONGOING: "ongoing";
        readonly UNANSWERED: "unanswered";
        readonly REJECTED: "rejected";
        readonly BUSY: "busy";
        readonly CANCELLED: "cancelled";
        readonly ENDED: "ended";
    };
    readonly AUDIO_INPUT_DEVICES: "audioInputDevices";
    readonly AUDIO_OUTPUT_DEVICES: "audioOutputDevices";
    readonly VIDEO_INPUT_DEVICES: "videoInputDevices";
    readonly POST_MESSAGES: {
        readonly TYPES: {
            readonly ACTION_MESSAGE: "cometchat_action_message";
            readonly HANGUP: "hangup";
            readonly COMETCHAT_RTC_SETTINGS: "cometchat_rtc_settings";
        };
        readonly ACTIONS: {
            readonly USER_JOINED: "onUserJoined";
            readonly USER_LEFT: "onUserLeft";
            readonly USER_LIST_CHANGED: "onUserListChanged";
            readonly INITIAL_DEVICE_LIST: "initialDeviceList";
            readonly DEVICE_CHANGE: "onDeviceChange";
            readonly LOAD: "LOAD";
            readonly CHANGE_AUDIO_INPUT: "changeAudioInput";
            readonly CHANGE_AUDIO_OUTPUT: "changeAudioOutput";
            readonly CHANGE_VIDEO_INPUT: "changeVideoInput";
            readonly MUTE_AUDIO: "muteAudio";
            readonly UNMUTE_AUDIO: "unmuteAudio";
            readonly PAUSE_VIDEO: "pauseVideo";
            readonly UNPAUSE_VIDEO: "unPauseVideo";
            readonly SWITCH_MODE: "switchMode";
            readonly START_SCREENSHARE: "startScreenShare";
            readonly STOP_SCREENSHARE: "stopScreenShare";
            readonly END_CALL: "endCall";
            readonly START_RECORDING: "startRecording";
            readonly STOP_RECORDING: "stopRecording";
            readonly RECORDING_TOGGLED: "onRecordingToggled";
            readonly USER_MUTED: "onUserMuted";
            readonly ON_USER_UNMUTED: "onUserUnMuted";
            readonly SCREEN_SHARE_STARTED: "SCREEN_SHARE_STARTED";
            readonly SCREEN_SHARE_STOPPED: "SCREEN_SHARE_ENDED";
            readonly SWITCH_TO_VIDEO_CALL: "switchedToVideo";
            readonly SWITCHED_TO_VIDEO_CALL: "onCallSwitchedToVideo";
            readonly OPEN_VIRTUAL_BACKGROUND: "openVirtualBackgroundMenu";
            readonly SET_BACKGROUND_BLUR: "setBackgroundBlur";
            readonly SET_BACKGROUND_IMAGE: "setBackgroundImage";
        };
    };
    readonly MEDIA_DEVICE: {
        readonly ID: "id";
        readonly NAME: "name";
        readonly ACTIVE: "active";
    };
    readonly ZOOM_BUTTON_DEFAULT_PARAMS: {
        readonly position: "bottom-right";
        readonly visible: true;
    };
    readonly NAME_LABEL_DEFAULT_PARAMS: {
        readonly position: "bottom-left";
        readonly visible: true;
        readonly color: "rgba(27, 27, 27, 0.4)";
    };
    readonly NETWORK_LABEL_DEFAULT_PARAMS: {
        readonly position: "bottom-right";
        readonly visible: true;
    };
    readonly MAIN_VIDEO_CONTAINER_SETTINGS: {
        readonly KEYS: {
            readonly POSITION: "position";
            readonly VISIBILITY: "visible";
            readonly LEGACY_VISIBILITY: "visibility";
            readonly COLOR: "color";
        };
    };
};

declare class CallGroup {
    protected guid: string;
    protected name: string;
    protected icon: string;
    constructor(object: any);
    getGuid(): string;
    setGuid(guid: string): void;
    getName(): string;
    setName(name: string): void;
    getIcon(): string;
    setIcon(icon: string): void;
    toString(): string;
    static getGroupFromJson(object: any): CallGroup;
}

/**
 * Represents a call log.
 */
export declare class CallLog {
    /**
     * The session ID of the call log.
     */
    private sessionId;
    /**
     * The total audio minutes of the call log.
     */
    private totalAudioMinutes;
    /**
     * The total video minutes of the call log.
     */
    private totalVideoMinutes;
    /**
     * The total duration of the call log.
     */
    private totalDuration;
    /**
     * Whether the call log has a recording.
     */
    private hasRecording;
    /**
     * The time the call was initiated at.
     */
    private initiatedAt;
    /**
     * The call category of the call log.
     */
    private callCategory;
    /**
     * @type {CallUser}
     * The initiator of the call log.
     */
    private initiator;
    /**
     * @type {CallUser | CallGroup}
     * The receiver of the call log.
     */
    private receiver;
    /**
     * The receiver type of the call log.
     */
    private receiverType;
    /**
     * The status of the call log.
     */
    private status;
    /**
     * The total duration in minutes of the call log.
     */
    private totalDurationInMinutes;
    /**
     * The total number of participants in the call log.
     */
    private totalParticipants;
    /**
     * The type of the call log.
     */
    private type;
    /**
     * The message ID of the call log.
     */
    private mid;
    /**
     * The time the call ended at.
     */
    private endedAt;
    /**
     * @type {Participant[]}
     * The participants of the call log.
     */
    private participants;
    /**
     * @type {Recording[]}
     * The recordings of the call log.
     */
    private recordings;
    /**
     * Creates a new instance of CallLog.
     * @param data - The data to initialize the call log with.
     */
    constructor(data: any);
    /**
     * Gets the session ID of the call log.
     * @returns The session ID of the call log.
     */
    getSessionID(): string;
    /**
     * Sets the session ID of the call log.
     * @param value - The session ID to set.
     */
    setSessionID(value: string): void;
    /**
     * Gets the total audio minutes of the call log.
     * @returns The total audio minutes of the call log.
     */
    getTotalAudioMinutes(): number;
    /**
     * Sets the total audio minutes of the call log.
     * @param value - The total audio minutes to set.
     */
    setTotalAudioMinutes(value: number): void;
    /**
     * Gets the total video minutes of the call log.
     * @returns The total video minutes of the call log.
     */
    getTotalVideoMinutes(): number;
    /**
     * Sets the total video minutes of the call log.
     * @param value - The total video minutes to set.
     */
    setTotalVideoMinutes(value: number): void;
    /**
     * Gets the total duration of the call log.
     * @returns The total duration of the call log.
     */
    getTotalDuration(): string;
    /**
     * Sets the total duration of the call log.
     * @param value - The total duration to set.
     */
    setTotalDuration(value: string): void;
    /**
     * Gets whether the call log has a recording.
     * @returns Whether the call log has a recording.
     */
    getHasRecording(): boolean;
    /**
     * Sets whether the call log has a recording.
     * @param value - Whether the call log has a recording.
     */
    setHasRecording(value: boolean): void;
    /**
     * Gets the time the call was initiated at.
     * @returns The time the call was initiated at.
     */
    getInitiatedAt(): number;
    /**
     * Sets the time the call was initiated at.
     * @param value - The time the call was initiated at.
     */
    setInitiatedAt(value: number): void;
    /**
     * Gets the call category of the call log.
     * @returns The call category of the call log.
     */
    getCallCategory(): string;
    /**
     * Sets the call category of the call log.
     * @param value - The call category to set.
     */
    setCallCategory(value: string): void;
    /**
     * Gets the initiator of the call log.
     * @returns The initiator of the call log.
     */
    getInitiator(): CallUser;
    /**
     * Sets the initiator of the call log.
     * @param value - The initiator to set.
     */
    setInitiator(value: CallUser): void;
    /**
     * Gets the receiver of the call log.
     * @returns The receiver of the call log.
     */
    getReceiver(): CallUser | CallGroup;
    /**
     * Sets the receiver of the call log.
     * @param value - The receiver to set.
     */
    setReceiver(value: CallUser | CallGroup): void;
    /**
     * Gets the receiver type of the call log.
     * @returns The receiver type of the call log.
     */
    getReceiverType(): string;
    /**
     * Sets the receiver type of the call log.
     * @param value - The receiver type to set.
     */
    setReceiverType(value: string): void;
    /**
     * Gets the status of the call log.
     * @returns The status of the call log.
     */
    getStatus(): string;
    /**
     * Sets the status of the call log.
     * @param value - The status to set.
     */
    setStatus(value: string): void;
    /**
     * Gets the total duration in minutes of the call log.
     * @returns The total duration in minutes of the call log.
     */
    getTotalDurationInMinutes(): number;
    /**
     * Sets the total duration in minutes of the call log.
     * @param value - The total duration in minutes to set.
     */
    setTotalDurationInMinutes(value: number): void;
    /**
     * Gets the total number of participants in the call log.
     * @returns The total number of participants in the call log.
     */
    getTotalParticipants(): number;
    /**
     * Sets the total number of participants in the call log.
     * @param value - The total number of participants to set.
     */
    setTotalParticipants(value: number): void;
    /**
     * Gets the type of the call log.
     * @returns The type of the call log.
     */
    getType(): string;
    /**
     * Sets the type of the call log.
     * @param value - The type to set.
     */
    setType(value: string): void;
    /**
     * Gets the message ID of the call log.
     * @returns The message ID of the call log.
     */
    getMid(): string;
    /**
     * Sets the message ID of the call log.
     * @param value - The message ID to set.
     */
    setMid(value: string): void;
    /**
     * Gets the time the call ended at.
     * @returns The time the call ended at.
     */
    getEndedAt(): number;
    /**
     * Sets the time the call ended at.
     * @param value - The time the call ended at.
     */
    setEndedAt(value: number): void;
    /**
     * Gets the participants of the call log.
     * @returns The participants of the call log.
     */
    getParticipants(): Participant_2[];
    /**
     * Sets the participants of the call log.
     * @param value - The participants to set.
     */
    setParticipants(value: Participant_2[]): void;
    /**
     * Gets the recordings of the call log.
     * @returns The recordings of the call log.
     */
    getRecordings(): Recording[];
    /**
     * Sets the recordings of the call log.
     * @param value - The recordings to set.
     */
    setRecordings(value: Recording[]): void;
    /**
     * Creates a new instance of CallLog from JSON data.
     * @param data - The JSON data to create the call log from.
     * @returns A new instance of CallLog created from the JSON data.
     */
    static callLogFromJson(data: any): CallLog;
}

/**
 * Represents a request to fetch call logs.
 */
declare class CallLogRequest {
    /**
     * The maximum number of call logs to fetch.
     */
    private limit;
    /**
     * The total number of pages of call logs.
     */
    private totalPages;
    /**
     * The current page of call logs.
     */
    private currentPage;
    /**
     * The type of call to filter by.
     */
    private callType;
    /**
     * The status of call to filter by.
     */
    private callStatus;
    /**
     * Whether the call has a recording or not.
     */
    private hasRecording;
    /**
     * The category of call to filter by.
     */
    private callCategory;
    /**
     * The direction of call to filter by.
     */
    private callDirection;
    /**
     * The user ID to filter by.
     */
    private uid;
    /**
     * The group ID to filter by.
     */
    private guid;
    /**
     * The authentication token to use for the API call.
     */
    private authToken;
    /**
     * Whether an API call is currently in progress.
     */
    private inProgress;
    /**
     * Creates a new CallLogRequest instance.
     * @param builder The builder object to use for constructing the request.
     */
    constructor(builder: CallLogRequestBuilder);
    /**
     * Fetches the next page of call logs.
     * @returns A promise that resolves to an array of CallLog objects, or rejects with a CometChatCallsException if there was an error.
     */
    fetchNext(): Promise<CallLog[]>;
    /**
     * Fetches the previous page of call logs.
     * @returns A promise that resolves to an array of CallLog objects, or an empty array if there are no previous pages, or rejects with a CometChatCallsException if there was an error..
     */
    fetchPrevious(): Promise<CallLog[] | []>;
    /**
     * Makes an API call to fetch call logs.
     * @param isFetchNext Whether to fetch the next page of call logs.
     * @returns A promise that resolves to an array of CallLog objects, or rejects with a CometChatCallsException if there was an error.
     */
    private makeAPICall;
    /**
     * Gets the filter parameters for the API call.
     * @param isNext Whether to fetch the next page of call logs.
     * @returns The filter parameters object.
     */
    private getParams;
    /**
     * Parses the API response and returns an array of CallLog objects.
     * @param response The API response string.
     * @returns An array of CallLog objects.
     */
    private getCallLogList;
}

/**
 * A builder class for creating a request to fetch call logs.
 */
declare class CallLogRequestBuilder {
    /** @private */ limit: number;
    /** @private */ callType: string;
    /** @private */ callStatus: string;
    /** @private */ hasRecording: boolean;
    /** @private */ callCategory: string;
    /** @private */ callDirection: string;
    /** @private */ uid: string;
    /** @private */ guid: string;
    /** @private */ authToken: string;
    /**
     * Sets the limit of call logs to be fetched.
     * @param limit - The number of call logs to be fetched.
     * @returns The CallLogRequestBuilder object.
     */
    setLimit(limit: number): this;
    /**
     * Sets the type of call to be fetched.
     * @param callType - The type of call to be fetched. Can be either 'video' or 'audio'.
     * @returns The CallLogRequestBuilder object.
     */
    setCallType(callType: 'video' | 'audio'): this;
    /**
     * Sets the status of call to be fetched.
     * @param callStatus - The status of call to be fetched. Can be either 'ongoing', 'busy', 'rejected', 'cancelled', 'ended' or 'missed'.
     * @returns The CallLogRequestBuilder object.
     */
    setCallStatus(callStatus: 'ongoing' | 'busy' | 'rejected' | 'cancelled' | 'ended' | 'missed'): this;
    /**
     * Sets whether the call has recording or not.
     * @param hasRecording - Whether the call has recording or not.
     * @returns The CallLogRequestBuilder object.
     */
    setHasRecording(hasRecording: boolean): this;
    /**
     * Sets the category of call to be fetched.
     * @param callCategory - The category of call to be fetched. Can be either 'call' or 'meet'.
     * @returns The CallLogRequestBuilder object.
     */
    setCallCategory(callCategory: 'call' | 'meet'): this;
    /**
     * Sets the direction of call to be fetched.
     * @param callDirection - The direction of call to be fetched. Can be either 'incoming' or 'outgoing'.
     * @returns The CallLogRequestBuilder object.
     */
    setCallDirection(callDirection: 'incoming' | 'outgoing'): this;
    /**
     * Sets the user ID of the call logs to be fetched.
     * @param uid - The user ID of the call logs to be fetched.
     * @returns The CallLogRequestBuilder object.
     */
    setUid(uid: string): this;
    /**
     * Sets the group ID of the call logs to be fetched.
     * @param guid - The group ID of the call logs to be fetched.
     * @returns The CallLogRequestBuilder object.
     */
    setGuid(guid: string): this;
    /**
     * Sets the authorization token for the request.
     * @param authToken - The authorization token for the request.
     * @returns The CallLogRequestBuilder object.
     */
    setAuthToken(authToken: string): this;
    /**
     * Builds and returns the CallLogRequest object.
     * @returns The CallLogRequest object.
     */
    build(): CallLogRequest;
}

export declare class CallSession {
    addEventListener<T extends keyof MobileSDKEvents>(event: T, callback: MobileSDKEvents[T]): {
        remove: () => void;
    };
    getInstance(): CallSession;
}

declare class CallSettings {
    static POSITION_TOP_LEFT: string;
    static POSITION_TOP_RIGHT: string;
    static POSITION_BOTTOM_LEFT: string;
    static POSITION_BOTTOM_RIGHT: string;
    static POSITION: {
        readonly TOP_LEFT: "top-left";
        readonly TOP_RIGHT: "top-right";
        readonly BOTTOM_LEFT: "bottom-left";
        readonly BOTTOM_RIGHT: "bottom-right";
    };
    static ASPECT_RATIO_DEFAULT: string;
    static ASPECT_RATIO_CONTAIN: string;
    static ASPECT_RATIO_COVER: string;
    static ASPECT_RATIO: {
        readonly DEFAULT: "default";
        readonly CONTAIN: "contain";
        readonly COVER: "cover";
    };
    private defaultLayout;
    private isAudioOnly;
    private mode;
    private ShowEndCallButton;
    private ShowMuteAudioButton;
    private ShowPauseVideoButton;
    private ShowScreenShareButton;
    private ShowSwitchModeButton;
    private StartAudioMuted;
    private StartVideoMuted;
    private localizedObject;
    private ShowRecordingButton;
    private idleTimeoutPeriod;
    private StartRecordingOnCallStart;
    private callListener;
    private ShowSwitchToVideoCallButton;
    private VirtualBackground;
    private ShowVirtualBackgroundSetting;
    constructor(builder?: CallSettingsBuilder);
    getCallListener(): OngoingCallListener;
    isRecordingButtonEnabled(): boolean;
    getIdleTimeoutPeriod(): number;
    shouldStartRecordingOnCallStart(): boolean;
    isAudioOnlyCall(): boolean;
    isDefaultLayoutEnabled(): boolean;
    getMode(): "TILE" | "SPOTLIGHT" | "DEFAULT" | undefined;
    getStartWithAudioMuted(): boolean;
    getStartWithVideoMuted(): boolean;
    isEndCallButtonEnabled(): boolean;
    isMuteAudioButtonEnabled(): boolean;
    isPauseVideoButtonEnabled(): boolean;
    isScreenShareButtonEnabled(): boolean;
    isModeButtonEnabled(): boolean;
    getLocalizedStringObject(): Object;
    isAudioToVideoButtonEnabled(): boolean;
    getVirtualBackground(): VirtualBackground;
    isVirtualBackgroundSettingEnabled(): boolean;
}

declare class CallSettingsBuilder {
    /** @private */ defaultLayout: boolean;
    /** @private */ isAudioOnly: boolean;
    /** @private */ mode: ICallsettings['mode'];
    /** @private */ ShowEndCallButton: boolean;
    /** @private */ ShowMuteAudioButton: boolean;
    /** @private */ ShowPauseVideoButton: boolean;
    /** @private */ ShowScreenShareButton: boolean;
    /** @private */ ShowSwitchModeButton: boolean;
    /** @private */ StartAudioMuted: boolean;
    /** @private */ StartVideoMuted: boolean;
    /** @private */ localizedObject: Object;
    /** @private */ ShowRecordingButton: boolean;
    /** @private */ idleTimeoutPeriod: number;
    /** @private */ StartRecordingOnCallStart: boolean;
    /** @private */ ShowSwitchToVideoCallButton: boolean;
    /** @private */ virtualBackground: VirtualBackground;
    /** @private */ ShowVirtualBackgroundSetting: boolean;
    /** @private */ callListener: OngoingCallListener;
    /**
     *
     * @param {boolean} defaultLayout
     * This methods shows/hides the default button layout.
     * If set to true the default button layout will be shown.
     * If set to false the default button layout will be hidden.
     * Default value is true
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    enableDefaultLayout(defaultLayout: boolean): this;
    /**
     *
     * @param {boolean} isAudioOnly
     * This methods sets the type(audio/video) of the call.
     * If set to true, the call will be strictly an audio call.
     * If set to false, the call will be an audio-video call.
     * Default value is false
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    setIsAudioOnlyCall(isAudioOnly: boolean): this;
    /**
     *
     * @param {string} mode
     * This method sets the mode of the call.
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    setMode(mode: ICallsettings['mode']): this;
    /**
     *
     * @param {boolean} showEndCallButton
     * This method shows/hides the end call button.
     * If set to true it will display the end call button.
     * If set to false it will hide the end call button.
     * Default value is true.
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    showEndCallButton(showEndCallButton: boolean): this;
    /**
     *
     * @param {boolean} showMuteAudioButton
     * This method shows/hides the mute audio button.
     * If set to true it will display the mute audio button.
     * If set to false it will hide the mute audio button.
     * Default value is true.
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    showMuteAudioButton(showMuteAudioButton: boolean): this;
    /**
     *
     * @param {boolean} showPauseVideoButton
     * This method shows/hides the pause video button.
     * If set to true it will display the pause video button.
     * If set to false it will hide the pause video button.
     * Default value is true.
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    showPauseVideoButton(showPauseVideoButton: boolean): this;
    /**
     *
     * @param {boolean} showScreenShareButton
     * This method shows/hides the screen share button.
     * If set to true it will display the screen share button.
     * If set to false it will hide the screen share button.
     * Default value is true.
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    showScreenShareButton(showScreenShareButton: boolean): this;
    /**
     *
     * @param {boolean} showModeButton
     * This method shows/hides the switch mode button.
     * If set to true it will display the switch mode button.
     * If set to false it will hide the switch mode button.
     * Default value is true.
     * @returns
     */
    showModeButton(showModeButton: boolean): this;
    /**
     *
     * @param {Object} localizedStringObject
     * This method will set the localized text in the call screen.
     * @returns
     */
    setLocalizedStringObject(localizedStringObject: Object): this;
    /**
     *
     * @param {boolean} audioMuted
     * This method allows the call to be started with audio muted.
     * If set to true, the call will start with audio muted.
     * Default value is false.
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    startWithAudioMuted(audioMuted: boolean): this;
    /**
     *
     * @param {boolean} videoMuted
     * This method allows the call to be started with video muted.
     * If set to true, the call will start with video muted.
     * Default value is false.
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    startWithVideoMuted(videoMuted: boolean): this;
    /**
     *
     * @param {boolean} customCSS
     * This method will set the custom CSS of the call screen.
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    setCustomCSS(_: string): this;
    /**
     *
     * @param {boolean} showRecordingButton
     * This method shows/hides the recording button.
     * If set to true it will display the recording button.
     * If set to false it will hide the recording button.
     * Default value is false.
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    showRecordingButton(showRecordingButton: boolean): this;
    /**
     *
     * @param {number} idleTimeoutPeriod
     * This method sets the idle timeout period for the call.
     * If set and you are the only one in call, the call will end
     * after the idle timeout period, giving you the option to
     * extend the call 60 seconds before the call ends.
     * Default value is 180 seconds.
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    setIdleTimeoutPeriod(idleTimeoutPeriod: number): this;
    /**
     *
     * @param {boolean} startRecordingOnCallStart
     * This method starts the recording as soon as the call start.
     * If set to true it will start the recording as soon as the call start.
     * Default value is false.
     * @returns {CallSettingsBuilder} Returns the CallSettingsBuilder instance
     */
    startRecordingOnCallStart(startRecordingOnCallStart: boolean): this;
    /**
     *
     * @param {boolean} _showAudioToVideoSwitchButton
     * This method shows/hides the switch to video call button.
     * If set to true it will display the switch to video call button.
     * If set to false it will hide the switch to video call button.
     * Default value is true.
     * @returns
     */
    showSwitchToVideoCallButton(_showAudioToVideoSwitchButton: boolean): this;
    /**
     *
     * @param {VirtualBackground} virtualBackground
     * This method will set the virtual background setting.
     * This methods takes an Object of VirtualBackground Class.
     * @deprecated Virtual background feature is deprecated and it has no effect.
     * @returns
     */
    setVirtualBackground(virtualBackground: VirtualBackground): this;
    /**
     *
     * @param {boolean} showVirtualBackgroundSetting
     * This method shows/hides the virtual background setting button.
     * If set to true it will display the virtual background setting button.
     * If set to false it will hide the virtual background setting button.
     * Default value is true.
     * @returns
     */
    showVirtualBackgroundSetting(showVirtualBackgroundSetting: boolean): this;
    /**
     *
     * @param {OngoingCallListener} callListener
     * This method can be used to subscribe to available callings events
     * @returns
     */
    setCallListener(callListener: OngoingCallListener): this;
    /**
     * This method will return an object of the CallSettings class.
     * @returns {CallSettings} Returns the CallSettings instance
     */
    build(): CallSettings;
}

declare class CallUser {
    protected uid: string;
    protected name: string;
    protected avatar: string;
    constructor(object: any);
    getUid(): string;
    setUid(uid: string): void;
    getName(): string;
    setName(name: string): void;
    getAvatar(): string;
    setAvatar(avatar: string): void;
    toString(): string;
    static getUserFromJson(object: any): CallUser;
}

declare const CAMERA_FACING: {
    readonly FRONT: "FRONT";
    readonly REAR: "REAR";
};

declare type CameraFacing = ValueOf<typeof CAMERA_FACING>;

declare interface CometChatAPIException extends Error {
    readonly name: 'COMET_CHAT_API_ERROR' | 'NETWORK_ERROR' | 'VALIDATION_ERROR' | 'BAD_RESPONSE' | 'UNKNOWN_ERROR';
    readonly details?: unknown;
    readonly timestamp: number;
}

export declare class CometChatCalls extends SessionMethods {
    private static loggedInUser;
    private static isInitialized;
    private static loginInProgress;
    private static appSettings;
    private static loginListeners;
    static constants: {
        LAYOUT: {
            readonly TILE: "TILE";
            readonly SIDEBAR: "SIDEBAR";
            readonly SPOTLIGHT: "SPOTLIGHT";
        };
        TYPE: {
            readonly VOICE: "VOICE";
            readonly VIDEO: "VIDEO";
        };
        CAMERA_FACING: {
            readonly FRONT: "FRONT";
            readonly REAR: "REAR";
        };
    };
    static CallLogRequestBuilder: typeof CallLogRequestBuilder;
    static CallLog: typeof CallLog;
    /**
     * @deprecated Use CometChatCalls.init passing object directly.
     */
    static CallAppSettingsBuilder: typeof CallAppSettingsBuilder;
    /**
     * @deprecated Use CometChatCalls.joinSession passing object directly.
     */
    static CallSettingsBuilder: typeof CallSettingsBuilder;
    /**
     * @deprecated Use CometChatCalls.addEventListener
     */
    static OngoingCallListener: typeof OngoingCallListener;
    static init(appSettings: CallAppSettings_2 | CallAppSettings): Promise<{
        readonly success: false;
        readonly error: {
            readonly name: "VALIDATION_ERROR";
            readonly message: `Invalid app settings: ${string}`;
            readonly timestamp: number;
        };
    } | {
        readonly success: true;
        readonly error: null;
    }>;
    static login(uid: string, authKey?: string): Promise<User_2>;
    static loginWithAuthToken(authToken: string): Promise<User_2>;
    static logout(): Promise<string>;
    static getLoggedInUser(): User_2 | null;
    static getUserAuthToken(): string | null;
    static isUserLoggedIn(): boolean;
    static addLoginListener(listenerId: string, listener: LoginListener): void;
    static removeLoginListener(listenerId: string): void;
    static generateToken(sessionId: string, authToken?: string): Promise<{
        token: string;
    }>;
    private static getBaseURL;
    private static loginWithUID;
    private static authenticateWithToken;
    private static logoutInternal;
    private static callGenerateTokenAPI;
    private static callVerifyTokenAPI;
    private static saveUser;
    private static getSavedUser;
    private static clearSavedUser;
    private static generateDeviceId;
    private static createError;
    private static notifyLoginSuccess;
    private static notifyLoginFailure;
    private static notifyLogoutSuccess;
    private static notifyLogoutFailure;
    static addEventListener<K extends keyof WebSDKEvents>(eventType: K, listener: WebSDKEvents[K], options?: {
        signal?: AbortSignal;
    }): () => void;
    /**
     * @deprecated Use CometChatCalls.joinSession instead.
     */
    static startSession(callToken: string, callSettings: CallSettings, container: HTMLElement): Promise<Result<void, VerifyTokenException>>;
    private static _connectToRoom;
    private static connectToRoom;
    static joinSession(callToken: string, callSettings: SessionSettings, container: HTMLElement): Promise<Result<void, VerifyTokenException>>;
    static getAudioInputDevices(): AudioInputDevice_2[];
    static getVideoInputDevices(): VideoInputDevice_2[];
    static getAudioOutputDevices(): AudioOutputDevice_2[];
    static getCurrentAudioInputDevice(): AudioInputDevice_2 | undefined;
    static getCurrentVideoInputDevice(): VideoInputDevice_2 | undefined;
    static getCurrentAudioOutputDevice(): AudioOutputDevice_2 | undefined;
}

declare namespace CometChatCallsDefault {
    export {
        SessionSettings,
        CometChatCalls
    }
}
export default CometChatCallsDefault;

declare class CometChatCallsException {
    code?: ErrorModel['code'];
    name?: ErrorModel['name'];
    message?: ErrorModel['message'];
    details?: ErrorModel['details'];
    constructor(errorModel: ErrorModel);
}

declare interface CometChatException {
    errorCode: string;
    errorDescription: string;
    message?: string;
}

declare type ConfigStateBoth = {
    sessionType: SessionType;
    layout: Layout;
    initialCameraFacing?: CameraFacing;
    autoStartRecording: boolean;
    hideRecordingButton: boolean;
    hideControlPanel: boolean;
    hideLeaveSessionButton: boolean;
    hideHeaderPanel: boolean;
    hideRaiseHandButton: boolean;
    hideShareInviteButton: boolean;
    hideChangeLayoutButton: boolean;
    hideToggleAudioButton: boolean;
    hideToggleVideoButton: boolean;
    hideParticipantListButton: boolean;
    hideChatButton: boolean;
    hideScreenSharingButton: boolean;
    hideSessionTimer: boolean;
    hideNetworkIndicator: boolean;
    hideRecordingStatusIndicator: boolean;
    hideSwitchCameraButton: boolean;
    enableParticipantContextMenu: boolean;
    displayName: string;
    startAudioMuted: boolean;
    startVideoPaused: boolean;
    title: string;
    idleTimeoutPeriodBeforePrompt: number;
    idleTimeoutPeriodAfterPrompt: number;
    enableSpotlightDrag: boolean;
    enableSpotlightSwap: boolean;
    isPeerCall: boolean;
};

declare type ConfigStateWeb = {
    enableNoiseReduction: boolean;
    audioInputDeviceId?: string;
    audioOutputDeviceId?: string;
    videoInputDeviceId?: string;
    hideVirtualBackgroundButton: boolean;
};

/**
 *
 *
 * @export
 * @interface ErrorModel
 */
declare interface ErrorModel {
    code?: string | number;
    name?: string;
    message?: string;
    details?: string;
}

declare const EVENT_LISTENER_METHODS: {
    readonly SessionStatusListener: {
        readonly onSessionJoined: "onSessionJoined";
        readonly onSessionLeft: "onSessionLeft";
        readonly onConnectionLost: "onConnectionLost";
        readonly onConnectionRestored: "onConnectionRestored";
        readonly onConnectionClosed: "onConnectionClosed";
        readonly onSessionTimedOut: "onSessionTimedOut";
    };
    readonly MediaEventsListener: {
        readonly onAudioMuted: "onAudioMuted";
        readonly onAudioUnMuted: "onAudioUnMuted";
        readonly onVideoPaused: "onVideoPaused";
        readonly onVideoResumed: "onVideoResumed";
        readonly onRecordingStarted: "onRecordingStarted";
        readonly onRecordingStopped: "onRecordingStopped";
        readonly onScreenShareStarted: "onScreenShareStarted";
        readonly onScreenShareStopped: "onScreenShareStopped";
    };
    readonly ParticipantEventsListner: {
        readonly onParticipantJoined: "onParticipantJoined";
        readonly onParticipantLeft: "onParticipantLeft";
        readonly onParticipantAudioMuted: "onParticipantAudioMuted";
        readonly onParticipantAudioUnmuted: "onParticipantAudioUnmuted";
        readonly onParticipantVideoPaused: "onParticipantVideoPaused";
        readonly onParticipantVideoResumed: "onParticipantVideoResumed";
        readonly onParticipantHandRaised: "onParticipantHandRaised";
        readonly onParticipantHandLowered: "onParticipantHandLowered";
        readonly onParticipantStartedScreenShare: "onParticipantStartedScreenShare";
        readonly onParticipantStoppedScreenShare: "onParticipantStoppedScreenShare";
        readonly onParticipantStartedRecording: "onParticipantStartedRecording";
        readonly onParticipantStoppedRecording: "onParticipantStoppedRecording";
        readonly onDominantSpeakerChanged: "onDominantSpeakerChanged";
        readonly onParticipantListChanged: "onParticipantListChanged";
    };
    readonly ButtonClickListener: {
        readonly onLeaveSessionButtonClicked: "onLeaveSessionButtonClicked";
        readonly onRaiseHandButtonClicked: "onRaiseHandButtonClicked";
        readonly onShareInviteButtonClicked: "onShareInviteButtonClicked";
        readonly onChangeLayoutButtonClicked: "onChangeLayoutButtonClicked";
        readonly onParticipantListButtonClicked: "onParticipantListButtonClicked";
        readonly onToggleAudioButtonClicked: "onToggleAudioButtonClicked";
        readonly onToggleVideoButtonClicked: "onToggleVideoButtonClicked";
        readonly onRecordingToggleButtonClicked: "onRecordingToggleButtonClicked";
        readonly onScreenShareButtonClicked: "onScreenShareButtonClicked";
        readonly onChatButtonClicked: "onChatButtonClicked";
    };
    readonly CallLayoutListener: {
        readonly onCallLayoutChanged: "onCallLayoutChanged";
        readonly onParticipantListVisible: "onParticipantListVisible";
        readonly onParticipantListHidden: "onParticipantListHidden";
    };
};

declare type Host = _TDomain | Omit<string, _TDomain>;

declare type HumanParticipant = v.InferInput<typeof HumanParticipantSchema>;

declare const HumanParticipantSchema: v.ObjectSchema<{
    readonly name: v.StringSchema<undefined>;
    readonly pid: v.StringSchema<undefined>;
    readonly ruid: v.StringSchema<undefined>;
    readonly role: v.PicklistSchema<("moderator" | "none")[], undefined>;
    readonly uid: v.OptionalSchema<v.StringSchema<undefined>, undefined>;
    readonly avatar: v.OptionalSchema<v.StringSchema<undefined>, undefined>;
    readonly isLocal: v.BooleanSchema<undefined>;
    readonly sources: v.OptionalSchema<v.MapSchema<v.UnionSchema<[v.LiteralSchema<"video", undefined>, v.LiteralSchema<"audio", undefined>], undefined>, v.MapSchema<v.StringSchema<undefined>, v.AnySchema, undefined>, undefined>, undefined>;
    readonly type: v.LiteralSchema<"human", undefined>;
}, undefined>;

declare interface IAVDevice {
    deviceId: string;
    kind: string;
    label: string;
    groupId: string;
}

declare interface ICallEventsData {
    onUserJoined: User;
    onUserLeft: User;
    onUserUnMuted: User;
    onUserMuted: {
        muted: {
            name: string;
            avatar?: string;
            isVideoMuted: boolean;
            isAudioMuted: boolean;
            uid: string;
            joinedAt: string;
        };
        mutedBy: {
            name: string;
            avatar?: string;
            isAudioMuted: boolean;
            isVideoMuted: boolean;
            uid: string;
            joinedAt: string;
        };
    };
    onUserListUpdated: Array<User>;
    onScreenShareStarted: {};
    onScreenShareStopped: {};
    onRecordingStarted: {
        user: Pick<IUserWithExtraData, 'name' | 'uid'>;
    };
    onMediaDeviceListUpdated: {
        videoInputDevices: IAVDevice[];
        audioInputDevices: IAVDevice[];
        audioOutputDevices: IAVDevice[];
    };
    onCallEnded: {};
    onSessionTimeout: {};
    onCallSwitchedToVideo: {
        sessionId: string;
        initiator: {
            name: string;
            avatar?: string;
            isVideoMuted: boolean;
            isAudioMuted: boolean;
            uid: string;
            joinedAt: string;
        };
        responder: {
            name: string;
            avatar?: string;
            isVideoMuted: boolean;
            isAudioMuted: boolean;
            uid: string;
            joinedAt: string;
        };
    };
}

declare interface ICallsettings {
    screenShareMode?: 'default' | 'presenter';
    ShowEndCallButton?: boolean;
    ShowRecordingButton?: boolean;
    idleTimeoutPeriod?: number;
    StartRecordingOnCallStart?: boolean;
    ShowMuteAudioButton?: boolean;
    ShowPauseVideoButton?: boolean;
    ShowScreenShareButton?: boolean;
    ShowSwitchToVideoCallButton?: boolean;
    defaultLayout?: boolean;
    isAudioCall?: boolean;
    isAudioOnly?: boolean;
    user?: {
        name: string;
        avatar?: string;
        uid: string;
        jwt?: string;
    };
    mode?: (typeof CallConstants.MODE)[keyof typeof CallConstants.MODE];
    StartAudioMuted?: boolean;
    StartVideoMuted?: boolean;
    ShowSwitchModeButton?: boolean;
    ShowVirtualBackgroundSetting?: boolean;
    VirtualBackground?: {
        AllowBackgroundBlur?: boolean;
        AllowUserImages?: boolean;
        ShowDefaultImages?: boolean;
        SetImages?: string[];
        EnforceBackgroundBlur?: 0 | 1 | 2;
        EnforceBackgroundImage?: string;
    };
    AvatarMode?: 'circle';
    MainVideoContainerSetting?: {
        videoFit?: 'contain' | 'cover';
        zoomButton?: {
            visible?: boolean;
            visibility?: boolean;
            position?: TPosition;
        };
        nameLabel?: {
            visible?: boolean;
            visibility?: boolean;
            position?: TPosition;
            color?: TColor;
        };
        network?: {
            visible?: boolean;
            visibility?: boolean;
            position?: TPosition;
        };
    };
    customCSS?: string;
    analyticsSettings?: {
        ANALYTICS_HOST?: string;
        ANALYTICS_VERSION?: string;
        ANALYTICS_PING_DISABLED?: boolean;
        ANALYTICS_USE_SSL?: boolean;
    };
}

declare interface IOngoingCallListener {
    onUserJoined: (user: Partial<ICallEventsData['onUserJoined']>) => void;
    onUserLeft: (user: Partial<ICallEventsData['onUserJoined']>) => void;
    onUserListUpdated: (userList: Partial<ICallEventsData['onUserListUpdated']>) => void;
    onMediaDeviceListUpdated: (devices: Partial<ICallEventsData['onMediaDeviceListUpdated']>) => void;
    onRecordingStarted: (event: Partial<ICallEventsData['onRecordingStarted']>) => void;
    onRecordingStopped: () => void;
    onScreenShareStarted: () => void;
    onScreenShareStopped: () => void;
    onUserMuted: (event: Partial<ICallEventsData['onUserMuted']>) => void;
    onUserUnMuted: (event: Partial<ICallEventsData['onUserUnMuted']>) => void;
    onCallSwitchedToVideo: (event: Partial<ICallEventsData['onCallSwitchedToVideo']>) => void;
    onCallEnded: () => void;
    onSessionTimeout: () => void;
    onCallEndButtonPressed: () => void;
    onError: (error: CometChatCallsException) => void;
}

declare interface IUserWithExtraData {
    name: string;
    avatar: string;
    status: string;
    isVideoMuted: string;
    isAudioMuted: string;
    showVideo: string;
    isLocalUser: string;
    audioTrack: string;
    id: string;
    uid: string;
    joinedAt: string;
    videoTrack: string;
    stats: string;
}

declare const LAYOUT: {
    readonly TILE: "TILE";
    readonly SIDEBAR: "SIDEBAR";
    readonly SPOTLIGHT: "SPOTLIGHT";
};

declare type Layout = ValueOf<typeof LAYOUT>;

declare interface LoginListener {
    onLoginSuccess?: (user: User_2) => void;
    onLoginFailure?: (error: CometChatException) => void;
    onLogoutSuccess?: () => void;
    onLogoutFailure?: (error: CometChatException) => void;
}

declare type MobileSDKEvents = SDKEvents & {
    onAudioModeChanged: (payload: AudioMode['type']) => void;
    onCameraFacingChanged: (payload: CameraFacing) => void;
    onSwitchCameraButtonClicked: () => void;
    onPictureInPictureLayoutEnabled: () => void;
    onPictureInPictureLayoutDisabled: () => void;
};

declare class OngoingCallListener {
    /* Excluded from this release type: onYouLeft */
    /* Excluded from this release type: onYouJoined */
    /**
     * This event is triggered when a user joins the call.
     */
    onUserJoined?: IOngoingCallListener['onUserJoined'];
    /**
     * This event is triggered when a user leaves the call.
     */
    onUserLeft?: IOngoingCallListener['onUserLeft'];
    /**
     * This event is triggered when the participant list of the call changes.
     */
    onUserListUpdated?: IOngoingCallListener['onUserListUpdated'];
    /**
     * This event is triggered when the media device list changes.
     */
    onMediaDeviceListUpdated?: IOngoingCallListener['onMediaDeviceListUpdated'];
    /**
     * This event is triggered when someone starts recording the call.
     */
    onRecordingStarted?: IOngoingCallListener['onRecordingStarted'];
    /**
     * This event is triggered when someone stops recording the call.
     */
    onRecordingStopped?: IOngoingCallListener['onRecordingStopped'];
    /**
     * This event is triggered when someone starts sharing their screen in the call.
     */
    onScreenShareStarted?: IOngoingCallListener['onScreenShareStarted'];
    /**
     * This event is triggered when someone stops sharing their screen in the call.
     */
    onScreenShareStopped?: IOngoingCallListener['onScreenShareStopped'];
    /**
     * This event is triggered when a user is muted.
     */
    onUserMuted?: IOngoingCallListener['onUserMuted'];
    /**
     * This event is triggered when a user is unmuted.
     */
    onUserUnMuted?: IOngoingCallListener['onUserUnMuted'];
    /**
     * This event is triggered when an audio call is switched to a video call.
     */
    onCallSwitchedToVideo?: IOngoingCallListener['onCallSwitchedToVideo'];
    /**
     * This event is triggered when the call is ended.
     */
    onCallEnded?: IOngoingCallListener['onCallEnded'];
    /**
     * This event is triggered when the call is ended due to session timeout.
     */
    onSessionTimeout?: IOngoingCallListener['onSessionTimeout'];
    /**
     * This event is triggered when an error occurs.
     */
    onError?: IOngoingCallListener['onError'];
    /**
     * This event is triggered when user presses end call button.
     */
    onCallEndButtonPressed?: IOngoingCallListener['onCallEndButtonPressed'];
    constructor(eventObj: Partial<IOngoingCallListener>);
}

declare type Participant = HumanParticipant | VirtualParticipant;

/**
 * Represents a participant in a call.
 */
declare class Participant_2 {
    /**
     * The unique identifier of the participant.
     */
    private uid;
    /**
     * The name of the participant.
     */
    private name;
    /**
     * The avatar of the participant.
     */
    private avatar;
    /**
     * The total audio minutes of the participant.
     */
    private totalAudioMinutes;
    /**
     * The total video minutes of the participant.
     */
    private totalVideoMinutes;
    /**
     * The total duration in minutes of the participant.
     */
    private totalDurationInMinutes;
    /**
     * The device ID of the participant.
     */
    private deviceID;
    /**
     * Whether the participant has joined the call or not.
     */
    private hasJoined;
    /**
     * The timestamp when the participant joined the call.
     */
    private joinedAt;
    /**
     * The timestamp when the participant left the call.
     */
    private leftAt;
    /**
     * The media ID of the participant.
     */
    private mid;
    /**
     * The state of the participant.
     */
    private state;
    /**
     * Creates a new instance of Participant.
     * @param object - The object containing the participant data.
     */
    constructor(object: any);
    /**
     * Gets the unique identifier of the participant.
     * @returns The unique identifier of the participant.
     */
    getUid(): string;
    /**
     * Sets the unique identifier of the participant.
     * @param value - The unique identifier of the participant.
     */
    setUid(value: string): void;
    /**
     * Gets the name of the participant.
     * @returns The name of the participant.
     */
    getName(): string;
    /**
     * Sets the name of the participant.
     * @param value - The name of the participant.
     */
    setName(value: string): void;
    /**
     * Gets the avatar of the participant.
     * @returns The avatar of the participant.
     */
    getAvatar(): string;
    /**
     * Sets the avatar of the participant.
     * @param value - The avatar of the participant.
     */
    setAvatar(value: string): void;
    /**
     * Gets the total audio minutes of the participant.
     * @returns The total audio minutes of the participant.
     */
    getTotalAudioMinutes(): number;
    /**
     * Sets the total audio minutes of the participant.
     * @param value - The total audio minutes of the participant.
     */
    setTotalAudioMinutes(value: number): void;
    /**
     * Gets the total video minutes of the participant.
     * @returns The total video minutes of the participant.
     */
    getTotalVideoMinutes(): number;
    /**
     * Sets the total video minutes of the participant.
     * @param value - The total video minutes of the participant.
     */
    setTotalVideoMinutes(value: number): void;
    /**
     * Gets the total duration in minutes of the participant.
     * @returns The total duration in minutes of the participant.
     */
    getTotalDurationInMinutes(): number;
    /**
     * Sets the total duration in minutes of the participant.
     * @param value - The total duration in minutes of the participant.
     */
    setTotalDurationInMinutes(value: number): void;
    /**
     * Gets the device ID of the participant.
     * @returns The device ID of the participant.
     */
    getDeviceID(): string;
    /**
     * Sets the device ID of the participant.
     * @param value - The device ID of the participant.
     */
    setDeviceID(value: string): void;
    /**
     * Gets whether the participant has joined the call or not.
     * @returns Whether the participant has joined the call or not.
     */
    getHasJoined(): boolean;
    /**
     * Sets whether the participant has joined the call or not.
     * @param value - Whether the participant has joined the call or not.
     */
    setHasJoined(value: boolean): void;
    /**
     * Gets the timestamp when the participant joined the call.
     * @returns The timestamp when the participant joined the call.
     */
    getJoinedAt(): number;
    /**
     * Sets the timestamp when the participant joined the call.
     * @param value - The timestamp when the participant joined the call.
     */
    setJoinedAt(value: number): void;
    /**
     * Gets the timestamp when the participant left the call.
     * @returns The timestamp when the participant left the call.
     */
    getLeftAt(): number;
    /**
     * Sets the timestamp when the participant left the call.
     * @param value - The timestamp when the participant left the call.
     */
    setLeftAt(value: number): void;
    /**
     * Gets the media ID of the participant.
     * @returns The media ID of the participant.
     */
    getMid(): string;
    /**
     * Sets the media ID of the participant.
     * @param value - The media ID of the participant.
     */
    setMid(value: string): void;
    /**
     * Gets the state of the participant.
     * @returns The state of the participant.
     */
    getState(): string;
    /**
     * Sets the state of the participant.
     * @param value - The state of the participant.
     */
    setState(value: string): void;
    /**
     * Creates a new instance of Participant from a JSON object.
     * @param object - The JSON object containing the participant data.
     * @returns A new instance of Participant.
     */
    static getParticipantFromJson(object: any): Participant_2;
}

declare type Participant_3 = v.InferOutput<typeof ParticipantSchema>;

declare const ParticipantSchema: v.ObjectSchema<{
    readonly pid: v.StringSchema<undefined>;
    readonly name: v.StringSchema<undefined>;
    readonly uid: v.StringSchema<undefined>;
    readonly avatar: v.OptionalSchema<v.StringSchema<undefined>, undefined>;
}, undefined>;

/**
 * Represents a recording object.
 */
declare class Recording {
    /**
     * The recording ID.
     */
    private rid;
    /**
     * The URL of the recording.
     */
    private recording_url;
    /**
     * The start time of the recording.
     */
    private startTime;
    /**
     * The end time of the recording.
     */
    private endTime;
    /**
     * The duration of the recording.
     */
    private duration;
    /**
     * Creates a new instance of the Recording class.
     * @param data - The data to initialize the recording object.
     */
    constructor(data: any);
    /**
     * Gets the recording ID.
     * @returns The recording ID.
     */
    getRid(): string;
    /**
     * Sets the recording ID.
     * @param value - The recording ID to set.
     */
    setRid(value: string): void;
    /**
     * Gets the recording URL.
     * @returns The recording URL.
     */
    getRecordingURL(): string;
    /**
     * Sets the recording URL.
     * @param value - The recording URL to set.
     */
    setRecordingURL(value: string): void;
    /**
     * Gets the start time of the recording.
     * @returns The start time of the recording.
     */
    getStartTime(): number;
    /**
     * Sets the start time of the recording.
     * @param value - The start time of the recording to set.
     */
    setStartTime(value: number): void;
    /**
     * Gets the end time of the recording.
     * @returns The end time of the recording.
     */
    getEndTime(): number;
    /**
     * Sets the end time of the recording.
     * @param value - The end time of the recording to set.
     */
    setEndTime(value: number): void;
    /**
     * Gets the duration of the recording.
     * @returns The duration of the recording.
     */
    getDuration(): number;
    /**
     * Sets the duration of the recording.
     * @param value - The duration of the recording to set.
     */
    setDuration(value: number): void;
    /**
     * Creates a new Recording object from the given JSON data.
     * @param data - The JSON data to create the Recording object from.
     * @returns A new Recording object.
     */
    static getRecordingFromJson(data: any): Recording;
}

declare type Region = _TRegion | Omit<string, _TRegion>;

declare type Result<T, E = Error> = {
    data: T;
    error: null;
} | {
    data: null;
    error: E;
};

declare type SDKEvents = Omit<_SDKEvents, 'onParticipantListChanged'> & {
    onCallLayoutChanged: (payload: Layout) => void;
    onParticipantListVisible: () => void;
    onParticipantListHidden: () => void;
    onParticipantListChanged: (payload: Participant_3[]) => void;
};

declare type _SDKEvents = {
    [k in ValueOf<typeof EVENT_LISTENER_METHODS.SessionStatusListener>]: () => void;
} & {
    [k in ValueOf<typeof EVENT_LISTENER_METHODS.MediaEventsListener>]: () => void;
} & {
    [k in ValueOf<typeof EVENT_LISTENER_METHODS.ParticipantEventsListner>]: (payload: Participant_3) => void;
} & {
    [k in ValueOf<typeof EVENT_LISTENER_METHODS.ButtonClickListener>]: () => void;
};

declare const SESSION_TYPE: {
    readonly VOICE: "VOICE";
    readonly VIDEO: "VIDEO";
};

declare class SessionMethods extends SessionMethodsCore {
    static startScreenSharing(): void;
    static stopScreenSharing(): void;
    static showSettingsDialog(): void;
    static hideSettingsDialog(): void;
    static showVirtualBackgroundDialog(): void;
    static hideVirtualBackgroundDialog(): void;
    static enablePictureInPictureLayout(): void;
    static disablePictureInPictureLayout(): void;
    static getAudioInputDevices(): AudioInputDevice[];
    static getAudioOutputDevices(): AudioOutputDevice[];
    static getVideoInputDevices(): VideoInputDevice[];
    static setAudioInputDevice(deviceId: string): void;
    static setAudioOutputDevice(deviceId: string): void;
    static setVideoInputDevice(deviceId: string): void;
    static clearVirtualBackground(): void;
    static setVirtualBackgroundBlurLevel(blurLevel: number): void;
    static setVirtualBackgroundImage(imageUrl: string): void;
    /**
     * @deprecated use startScreenSharing() instead
     */
    static startScreenShare(): void;
    /**
     * @deprecated use stopScreenSharing() instead
     */
    static stopScreenShare(): void;
    /**
     * @deprecated use setLayout() instead
     */
    static setMode(mode: (typeof CallConstants.MODE)[keyof typeof CallConstants.MODE]): void;
    /**
     * @deprecated use showVirtualBackgroundDialog() instead
     */
    static openVirtualBackground(): void;
    /**
     * @deprecated use hideVirtualBackgroundDialog() instead
     */
    static closeVirtualBackground(): void;
    /**
     * @deprecated use setVirtualBackgroundBlurLevel() instead
     */
    static setBackgroundBlur(blurLevel: number): void;
    /**
     * @deprecated use setVirtualBackgroundImage() instead
     */
    static setBackgroundImage(imageUrl: string): void;
}

declare class SessionMethodsCore {
    /**
     * Mutes the local user's audio during the call.
     */
    static muteAudio(): void;
    /**
     * Unmutes the local user's audio during the call.
     */
    static unmuteAudio(): void;
    /**
     * Pauses the local user's video stream.
     */
    static pauseVideo(): void;
    /**
     * Resumes the local user's video stream.
     */
    static resumeVideo(): void;
    /**
     * Local user leaves the current session.
     */
    static leaveSession(): void;
    /**
     * Raises the user's virtual hand in the call.
     */
    static raiseHand(): void;
    /**
     * Lowers the user's virtual hand in the call.
     */
    static lowerHand(): void;
    /**
     * Switches between the front and rear camera.
     */
    static switchCamera(): void;
    /**
     * Sets the layout type for the call.
     * @param layout - The type of layout to set (tile, sidebar or spotlight).
     */
    static setLayout(layout: Layout): void;
    /**
     * Starts recording the call.
     */
    static startRecording(): void;
    /**
     * Stops the ongoing call recording.
     */
    static stopRecording(): void;
    /**
     * Pins a participant's video to focus on them.
     * @param participantId - The ID of the participant to pin.
     * @param type - The type of the participant.
     */
    static pinParticipant(participantId: string, type: Participant['type']): void;
    /**
     * Unpins a participant's video.
     */
    static unpinParticipant(): void;
    /**
     * Mutes the audio of a specific participant.
     * @param participantId - The ID of the participant to mute.
     */
    static muteParticipant(participantId: string): void;
    /**
     * Pauses the video stream of a specific participant.
     * @param participantId - The ID of the participant whose video to pause.
     */
    static pauseParticipantVideo(participantId: string): void;
    /**
     * Sets the unread message count displayed on the chat button.
     * @param count - The number of unread messages.
     */
    static setChatButtonUnreadCount(count: number): void;
    /**
     * @deprecated switchToVideoCall is deprecated and not supported.
     */
    static switchToVideoCall(): void;
    /**
     * @deprecated use leaveSession() instead
     */
    static endSession(): void;
    /**
     * Retrieves call details for a given session ID and auth token.
     * @param sessionID - The session ID of the call.
     * @param authToken - The authentication token required to make the API call.
     * @returns A Promise that resolves to a CallLog object containing the call details.
     * @throws {CometChatCallsException} If there is an error retrieving the call details.
     * @deprecated This method is deprecated and not supported.
     */
    static getCallDetails(_sessionID: string, _authToken: string): void;
}

export declare type SessionSettings = Partial<ConfigStateWeb & ConfigStateBoth>;

declare type SessionType = ValueOf<typeof SESSION_TYPE>;

declare type TColor = _TColor | Omit<string, _TColor>;

declare type _TColor = TRGB | TRGBA | THEX;

declare type _TDomain = `${string}.call-${_TRegion}.cometchat.io/v3.0/`;

declare type THEX = `#${string}`;

declare type TPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

declare type _TRegion = 'eu' | 'us' | 'in';

declare type TRGB = `rgb(${number}, ${number}, ${number})`;

declare type TRGBA = `rgba(${number}, ${number}, ${number}, ${number})`;

declare interface User extends AnyProperties {
    name: string;
    avatar?: string;
    uid: string;
}

declare interface User_2 {
    uid: string;
    name: string;
    status?: string;
    authToken?: string;
    lastActiveAt?: number;
    avatar?: string;
    role?: string;
    hasBlockedMe?: boolean;
    blockedByMe?: boolean;
    deactivatedAt?: number;
    wsChannel?: {
        identity: string;
    };
    jwt?: string;
}

declare type ValueOf<T> = T[keyof T];

declare interface VerifyTokenException extends Error {
    name: CometChatAPIException['name'];
    details?: unknown;
}

declare type VideoInputDevice_2 = MediaDeviceInfo & {
    kind: Extract<MediaDeviceKind, 'videoinput'>;
};

declare class VirtualBackground {
    private AllowBackgroundBlur;
    private AllowUserImages;
    private ShowDefaultImages;
    private SetImages;
    private EnforceBackgroundBlur;
    private EnforceBackgroundImage;
    constructor(builder?: VirtualBackgroundBuilder);
    shouldAllowBackgroundBlur(): boolean;
    shouldAllowUserImages(): boolean;
    shouldShowDefaultImages(): boolean;
    getImages(): Array<String>;
    isBackgroundBlurEnforced(): number;
    getEnforcedBackgroundImage(): string;
}

declare class VirtualBackgroundBuilder {
    /** @private */ AllowBackgroundBlur: boolean;
    /** @private */ AllowUserImages: boolean;
    /** @private */ ShowDefaultImages: boolean;
    /** @private */ SetImages: string[];
    /** @private */ EnforceBackgroundBlur: number;
    /** @private */ EnforceBackgroundImage: string;
    /**
     *
     * @param {boolean} AllowBackgroundBlur
     * This method will show the background blur option in Virtual Background.
     * If set to true it will show the background blur option.
     * Default value is true.
     * @returns
     */
    allowBackgroundBlur(AllowBackgroundBlur: boolean): this;
    /**
     *
     * @param {boolean} AllowUserImage
     * This method will allow the user to add custom images as background.
     * If set to true it will allow the user to add custom images as background.
     * Default value is true.
     * @returns
     */
    allowUserImages(AllowUserImages: boolean): this;
    /**
     *
     * @param {boolean} ShowDefaultImages
     * This method will show the default images to be used as background.
     * If set to true it will show the default images to be used as background.
     * Default value is true.
     * @returns
     */
    showDefaultImages(ShowDefaultImages: boolean): this;
    /**
     *
     * @param {boolean} SetImages
     * This method will allow user to add custom Images to be used as background. It takes in an array of URLs.
     * @returns
     */
    setImages(SetImages: string[]): this;
    /**
     *
     * @param {number} EnforceBackgroundBlur
     * This method will enforce background blur.
     * This method takes number as input which decides the blur level of the background.
     * Default value is 0.
     * @returns
     */
    enforceBackgroundBlur(EnforceBackgroundBlur: number): this;
    /**
     *
     * @param {string} EnforceBackgroundImage
     * This method will enforce background image.
     * If an URL of the image is sent then that image will be set as background.
     * By default no image is set.
     * @returns
     */
    enforceBackgroundImage(EnforceBackgroundImage: string): this;
    /**
     * This method will return an object of the VirtualBackground class.
     * @returns {VirtualBackground}
     */
    build(): VirtualBackground;
}

declare interface VirtualParticipant extends Omit<HumanParticipant, 'role' | 'type'> {
    type: 'screen-share';
}

declare type WebSDKEvents = SDKEvents & {
    onAudioInputDeviceChanged: (device: MediaDeviceInfo) => void;
    onVideoInputDeviceChanged: (device: MediaDeviceInfo) => void;
    onAudioOutputDeviceChanged: (device: MediaDeviceInfo) => void;
    onAudioInputDevicesChanged: (device: MediaDeviceInfo[]) => void;
    onVideoInputDevicesChanged: (device: MediaDeviceInfo[]) => void;
    onAudioOutputDevicesChanged: (device: MediaDeviceInfo[]) => void;
};

export { }

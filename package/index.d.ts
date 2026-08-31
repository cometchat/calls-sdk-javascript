import * as v from 'valibot';

declare interface AnyProperties {
    [prop: string]: any;
}

export declare type APIErrorResponse = {
    message: string;
    devMessage: string;
    source: string;
    code: string;
};

export declare type AudioInputDevice = MediaDeviceInfo & {
    kind: Extract<MediaDeviceKind, 'audioinput'>;
};

declare type AudioMode = {
    type: AudioModeType;
    selected: boolean;
    uid?: string;
    name?: string;
};

declare type AudioModeType = 'BLUETOOTH' | 'EARPIECE' | 'HEADPHONES' | 'SPEAKER';

export declare type AudioOutputDevice = MediaDeviceInfo & {
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
     * The time the call started at. Sent by the calls host in place of
     * `initiatedAt`; read {@link getStartedAt} and fall back to
     * {@link getInitiatedAt} when only one of the two is present.
     */
    private startedAt;
    /**
     * The call category of the call log.
     */
    private callCategory;
    /**
     * The mode of the call log. Sent by the calls host in place of
     * `callCategory`; read {@link getMode} and fall back to
     * {@link getCallCategory} when only one of the two is present.
     */
    private mode;
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
     * @type {Transcription[]}
     * The transcripts of the call log. Only populated when the request opted in
     * via `CallLogRequestBuilder.setHasTranscriptions(true)`.
     */
    private transcriptions;
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
     * Gets the time the call started at.
     * @returns The time the call started at.
     */
    getStartedAt(): number;
    /**
     * Sets the time the call started at.
     * @param value - The time the call started at.
     */
    setStartedAt(value: number): void;
    /**
     * Gets the mode of the call log.
     * @returns The mode of the call log.
     */
    getMode(): string;
    /**
     * Sets the mode of the call log.
     * @param value - The mode to set.
     */
    setMode(value: string): void;
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
     * Gets the transcripts of the call log.
     * @returns The transcripts of the call log, or an empty array when the server
     * omitted them — never `undefined`. The array is absent unless the request
     * opted in via `CallLogRequestBuilder.setHasTranscriptions(true)`, and the
     * server currently omits it even then, so callers must not have to null-check.
     */
    getTranscriptions(): Transcription[];
    /**
     * Sets the transcripts of the call log.
     * @param value - The transcripts to set.
     */
    setTranscriptions(value: Transcription[]): void;
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
     * Whether to restrict the list to calls that have transcripts (and have the
     * server attach each call's `transcriptions` array).
     */
    private hasTranscriptions;
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
     * Gets the page the cursor currently sits on.
     * @returns The current page, or `0` before the first successful fetch.
     */
    getCurrentPage(): number;
    /**
     * Gets the number of pages the server reported.
     * @returns The total page count, or `0` before the first successful fetch.
     */
    getTotalPages(): number;
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
    /** @private */ hasTranscriptions: boolean;
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
     * Sets whether only calls that have transcripts should be fetched. Opting in
     * also makes the server attach each call's `transcriptions` array, readable
     * via `CallLog.getTranscriptions()`.
     * @param hasTranscriptions - Whether to restrict the list to transcribed calls.
     * @returns The CallLogRequestBuilder object.
     */
    setHasTranscriptions(hasTranscriptions: boolean): this;
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
     * @param {MainVideoContainerSetting} mainVideoContainerSetting
     * This method can be used to customize the main video container.
     * @deprecated This method is deprecated and not supported.
     * @returns
     */
    setMainVideoContainerSetting(_mainVideoContainerSetting: MainVideoContainerSetting): this;
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

declare const CAPTION_LANGUAGES: readonly [{
    readonly code: "en-US";
    readonly label: "English (United States)";
}, {
    readonly code: "de-DE";
    readonly label: "German (Germany)";
}, {
    readonly code: "en-GB";
    readonly label: "English (United Kingdom)";
}, {
    readonly code: "es-ES";
    readonly label: "Spanish (Spain)";
}, {
    readonly code: "fr-FR";
    readonly label: "French (France)";
}, {
    readonly code: "hi-IN";
    readonly label: "Hindi (India)";
}, {
    readonly code: "hu-HU";
    readonly label: "Hungarian (Hungary)";
}, {
    readonly code: "it-IT";
    readonly label: "Italian (Italy)";
}, {
    readonly code: "ja-JP";
    readonly label: "Japanese (Japan)";
}, {
    readonly code: "ko-KR";
    readonly label: "Korean (South Korea)";
}, {
    readonly code: "lt-LT";
    readonly label: "Lithuanian (Lithuania)";
}, {
    readonly code: "ms-MY";
    readonly label: "Malay (Malaysia)";
}, {
    readonly code: "nl-NL";
    readonly label: "Dutch (Netherlands)";
}, {
    readonly code: "pt-PT";
    readonly label: "Portuguese (Portugal)";
}, {
    readonly code: "ru-RU";
    readonly label: "Russian (Russia)";
}, {
    readonly code: "sv-SE";
    readonly label: "Swedish (Sweden)";
}, {
    readonly code: "tr-TR";
    readonly label: "Turkish (Turkey)";
}, {
    readonly code: "zh";
    readonly label: "Chinese Mandarin (Simplified, China)";
}, {
    readonly code: "zh-TW";
    readonly label: "Chinese Mandarin (Traditional, Taiwan)";
}];

declare type CaptionLanguageCode = (typeof CAPTION_LANGUAGES)[number]['code'] | (string & {});

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
    static TranscriptRequestBuilder: typeof TranscriptRequestBuilder;
    static CallLog: typeof CallLog;
    /** @deprecated */
    static MainVideoContainerSetting: typeof MainVideoContainerSetting;
    /** @deprecated */
    static CallSettings: typeof CallSettings;
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
    /**
     * Shared tail of {@link init} / {@link initFromSettings}. Both entry points validate
     */
    private static finalizeInit;
    /**
     * Initializes the CometChat Calls SDK from a `cometchat-settings.json` object.
     * Parallels the Chat SDK's `initFromSettings` (file-based init for skills-driven
     * integrations): it maps the shared settings shape onto the Calls SDK's own
     * `CallAppSettings` and then performs exactly the same work as {@link init}.
     * @param settings - Parsed `cometchat-settings.json` object.
     * @returns An object indicating success or failure with error details.
     */
    static initFromSettings(settings: CometChatSettings): Promise<{
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
    /**
     * SDK-identification telemetry chokepoint. Fire-and-forget, deduped, non-fatal.
     * Called from login success AND init()-session-restore. Sends `/user_sessions`
     * ONLY when the Chat SDK is absent (it otherwise handles this telemetry itself).
     * Never awaited on the happy path; never throws.
     */
    private static reportSdkIdentification;
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
    static joinSession(callToken: string, sessionSettings: SessionSettings, container: HTMLElement): Promise<Result<void, VerifyTokenException>>;
    static getAudioInputDevices(): AudioInputDevice[];
    static getVideoInputDevices(): VideoInputDevice[];
    static getAudioOutputDevices(): AudioOutputDevice[];
    static getCurrentAudioInputDevice(): AudioInputDevice | undefined;
    static getCurrentVideoInputDevice(): VideoInputDevice | undefined;
    static getCurrentAudioOutputDevice(): AudioOutputDevice | undefined;
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

declare interface CometChatSettings {
    appId: string;
    region: string;
    credentials?: {
        authKey?: string;
    };
    callsSDK?: {
        adminHost?: string | null;
        clientHost?: string | null;
        host?: string | null;
    };
    chatSDK?: Record<string, unknown>;
    uiKit?: Record<string, unknown>;
}

/**
 * Configuration that applies on both web and mobile platforms.
 */
declare type ConfigStateBoth = {
    /**
     * Whether the call starts as an audio-only (`'VOICE'`) call or a video
     * (`'VIDEO'`) call. In a voice call no camera is acquired and no video
     * tiles are shown.
     *
     * @default 'VIDEO'
     */
    sessionType: SessionType;
    /**
     * The arrangement used to display participant video tiles:
     * - `'TILE'` — an equal grid of all participants.
     * - `'SIDEBAR'` — one main participant with the rest in a side strip.
     * - `'SPOTLIGHT'` — a single full-screen participant with the local user
     *   shown in a small picture-in-picture tile.
     *
     * @default 'TILE'
     */
    layout: Layout;
    /**
     * Which camera to use when the call starts: `'FRONT'` (selfie) or `'REAR'`
     * (back). Primarily relevant on mobile devices with multiple cameras; the
     * user can still switch afterwards.
     *
     * @default undefined — uses the SDK's current camera (front by default)
     */
    initialCameraFacing?: CameraFacing;
    /**
     * Automatically starts recording the session as soon as the call begins,
     * without the user pressing the record button. Recording must be enabled
     * for your app for this to take effect.
     *
     * @default false
     */
    autoStartRecording: boolean;
    /**
     * Automatically starts live transcription as soon as the call begins,
     * without the user pressing the transcription button. Transcription must
     * be enabled for your app for this to take effect.
     *
     * @default false
     */
    autoStartTranscription: boolean;
    /**
     * Hides the recording button from the call controls, preventing the user
     * from manually starting or stopping recording from within the SDK UI.
     *
     * @default true
     */
    hideRecordingButton: boolean;
    /**
     * Hides the streaming button from the call controls, preventing the user
     * from manually starting or stopping a live stream from within the SDK UI.
     *
     * @default true
     */
    hideStreamingButton: boolean;
    /**
     * The RTMP URL to stream to when the user starts a live stream from the
     * call controls. When set, pressing the start-streaming button skips the
     * confirmation dialog (which normally asks for a URL and key) and starts
     * streaming to this URL immediately.
     *
     * @default undefined — the user is asked for a URL when starting a stream
     */
    streamUrl?: string;
    /**
     * The stream key sent along with `streamUrl` when a live stream is
     * started. Ignored when `streamUrl` is not set.
     *
     * @default undefined
     */
    streamKey?: string;
    /**
     * Hides the entire bottom control bar (mic, camera, leave, and every other
     * call control). Useful when the host app provides its own controls.
     *
     * @default false
     */
    hideControlPanel: boolean;
    /**
     * Hides the "leave call" button from the call controls. The host app is
     * then responsible for providing its own way to leave the session.
     *
     * @default false
     */
    hideLeaveSessionButton: boolean;
    /**
     * Hides the top header bar of the call UI (which shows the call title,
     * session timer, and similar information).
     *
     * @default false
     */
    hideHeaderPanel: boolean;
    /**
     * Hides the "raise hand" button from the call controls.
     *
     * @default false
     */
    hideRaiseHandButton: boolean;
    /**
     * Hides the "share / invite" button that lets the user invite others to
     * join the call.
     *
     * @default true
     */
    hideShareInviteButton: boolean;
    /**
     * Hides the layout-switcher button, preventing the user from changing
     * between the tile, sidebar, and spotlight layouts at runtime.
     *
     * @default false
     */
    hideChangeLayoutButton: boolean;
    /**
     * Hides the microphone mute/unmute button from the call controls.
     *
     * @default false
     */
    hideToggleAudioButton: boolean;
    /**
     * Hides the camera on/off button from the call controls.
     *
     * @default false
     */
    hideToggleVideoButton: boolean;
    /**
     * Hides the button that opens the participant list panel.
     *
     * @default false
     */
    hideParticipantListButton: boolean;
    /**
     * Hides the in-call chat button.
     *
     * @default true
     */
    hideChatButton: boolean;
    /**
     * Hides the elapsed-time timer that shows how long the call has been
     * running.
     *
     * @default false
     */
    hideSessionTimer: boolean;
    /**
     * Hides the network-quality indicator that reflects each participant's
     * connection strength.
     *
     * @default true
     */
    hideNetworkIndicator: boolean;
    /**
     * Hides the "recording in progress" badge shown while the session is being
     * recorded. The recording itself is unaffected.
     *
     * @default false
     */
    hideRecordingStatusIndicator: boolean;
    /**
     * Hides the "streaming live" badge shown while the session is being
     * streamed. The stream itself is unaffected.
     *
     * @default false
     */
    hideStreamingStatusIndicator: boolean;
    /**
     * Hides the button that switches between the front and rear cameras.
     * Mainly relevant on mobile devices with more than one camera.
     *
     * @default false
     */
    hideSwitchCameraButton: boolean;
    /**
     * Hides the closed-caption button that lets the user show or hide live
     * captions on screen. Even when set to `false`, the button only appears
     * while transcription is running, since captions are produced from the
     * live transcript.
     *
     * @default true
     */
    hideClosedCaptionButton: boolean;
    /**
     * Hides the transcription button from the call controls, preventing the
     * user from manually starting or stopping live transcription from within
     * the SDK UI.
     *
     * @default true
     */
    hideTranscriptionButton: boolean;
    /**
     * The currently selected caption/transcription language code (e.g.
     * `en-US`). Selected from the closed-caption settings dropdown.
     */
    captionLanguage: CaptionLanguageCode;
    /**
     * Enables the per-participant context menu — opened by right-clicking (web)
     * or long-pressing (mobile) a participant's tile — that exposes actions such
     * as pinning a participant.
     *
     * Note: this menu is automatically unavailable in the `'SPOTLIGHT'` and
     * picture-in-picture layouts regardless of this setting.
     *
     * @default true
     */
    enableParticipantContextMenu: boolean;
    /**
     * The display name to show for the local user in the call (participant
     * tiles, participant list, etc.). When left empty, the name associated with
     * the logged-in user is used.
     *
     * @default '' — falls back to the logged-in user's name
     */
    displayName: string;
    /**
     * Joins the call with the microphone muted. The user can unmute manually
     * afterwards (unless the toggle-audio button is hidden).
     *
     * @default false
     */
    startAudioMuted: boolean;
    /**
     * Joins the call with the camera off. The user can turn the camera on
     * manually afterwards (unless the toggle-video button is hidden).
     *
     * @default false
     */
    startVideoPaused: boolean;
    /**
     * Title text shown in the call's header panel (for example, the meeting or
     * room name).
     *
     * @default '' — no title shown
     */
    title: string;
    /**
     * How long, in milliseconds, the local user may remain alone in the call
     * (no other participants) before an "are you still there?" idle prompt is
     * shown. The countdown only runs while you are the only participant.
     *
     * @default 60000 — 60 seconds
     */
    idleTimeoutPeriodBeforePrompt: number;
    /**
     * How long, in milliseconds, the idle prompt stays on screen waiting for a
     * response before the SDK automatically leaves the call on the user's behalf.
     *
     * @default 180000 — 3 minutes
     */
    idleTimeoutPeriodAfterPrompt: number;
    /**
     * Allows the user to drag the local picture-in-picture tile to reposition
     * it. Only applies when `layout` is `'SPOTLIGHT'`.
     *
     * @default true
     */
    enableSpotlightDrag: boolean;
    /**
     * Marks this as a one-to-one (peer) call. In a peer call, when one
     * participant leaves the session ends for everyone rather than continuing
     * without them (unless `forceLeave` is passed when leaving). The remote
     * peer's connectivity is also watched: if no remote stats arrive for 10
     * seconds onRemoteConnectionLost is published, and
     * onRemoteConnectionRestored once they resume.
     *
     * @default false
     */
    isPeerCall: boolean;
    /**
     * Enables the in-call toast notifications surfaced by the SDK (for example
     * "X joined the call" or error messages). Set to `false` to suppress all
     * SDK toasts.
     *
     * @default true
     */
    enableNotifications: boolean;
    /**
     * @unstable This API may change or be removed in a future release.
     * When enabled in a voice call (`sessionType: 'VOICE'`), the SDK renders
     * no visible UI at all — no controls, header, modals, or toast
     * notifications — while the call connection, media, and events continue
     * to work normally. Remote participants' audio keeps playing. The host
     * app is responsible for providing its own UI, including reacting to
     * session end (the SDK's "session has ended" view and the idle-timeout
     * prompt/auto-leave are not shown in this mode).
     *
     * Only supported in voice calls: for video calls (`sessionType:
     * 'VIDEO'`) the flag is ignored with a console warning and the default
     * UI is rendered.
     *
     * @default false
     */
    unstable_headlessMode: boolean;
};

/**
 * Configuration that only applies on the web platform.
 * These options are ignored on mobile.
 */
declare type ConfigStateWeb = {
    /**
     * Applies background-noise suppression to the local microphone so that
     * keyboard clicks, fans, and other ambient sounds are filtered out before
     * your audio is sent to other participants.
     *
     * @default false
     */
    enableNoiseReduction: boolean;
    /**
     * The `deviceId` of the microphone to capture audio from when the call
     * starts. Use this to pre-select a specific input device instead of the
     * system default. Device IDs come from the browser's
     * `navigator.mediaDevices.enumerateDevices()`.
     *
     * @default undefined — uses the system default microphone
     */
    audioInputDeviceId?: string;
    /**
     * The `deviceId` of the speaker / output device used to play remote
     * participants' audio. Use this to pre-select a specific output device
     * instead of the system default.
     *
     * @default undefined — uses the system default speaker
     */
    audioOutputDeviceId?: string;
    /**
     * The `deviceId` of the camera to capture video from when the call starts.
     * Use this to pre-select a specific camera instead of the system default.
     *
     * @default undefined — uses the system default camera
     */
    videoInputDeviceId?: string;
    /**
     * Hides the screen-sharing button from the call controls, preventing the
     * user from starting a screen share from within the SDK UI.
     *
     * @default false
     */
    hideScreenSharingButton: boolean;
    /**
     * Hides the virtual-background button from the call controls, preventing the
     * user from blurring or replacing their camera background from within the
     * SDK UI.
     *
     * @default false
     */
    hideVirtualBackgroundButton: boolean;
};

declare type ConnectionError = {
    name: string;
    message?: string;
    details?: Record<string, unknown>;
    recoverable?: boolean;
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
        readonly onRemoteConnectionLost: "onRemoteConnectionLost";
        readonly onRemoteConnectionRestored: "onRemoteConnectionRestored";
        readonly onConnectionClosed: "onConnectionClosed";
        readonly onConnectionFailed: "onConnectionFailed";
        readonly onSessionTimedOut: "onSessionTimedOut";
    };
    readonly MediaEventsListener: {
        readonly onAudioMuted: "onAudioMuted";
        readonly onAudioUnMuted: "onAudioUnMuted";
        readonly onVideoPaused: "onVideoPaused";
        readonly onVideoResumed: "onVideoResumed";
        readonly onRecordingStarted: "onRecordingStarted";
        readonly onRecordingStopped: "onRecordingStopped";
        readonly onStreamingStarted: "onStreamingStarted";
        readonly onStreamingStopped: "onStreamingStopped";
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
        readonly onParticipantStartedStreaming: "onParticipantStartedStreaming";
        readonly onParticipantStoppedStreaming: "onParticipantStoppedStreaming";
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

declare class MainVideoContainerSetting {
    /**
     *
     * @param {string} mainVideoAspectRatio
     * This method is used to set the aspect ratio of main video.
     * The default value is `contain`
     * @returns
     */
    setMainVideoAspectRatio(_mainVideoAspectRatio: (typeof CallSettings.ASPECT_RATIO)[keyof typeof CallSettings.ASPECT_RATIO]): void;
    /**
     *
     * @param {string} position
     * @param {boolean} visibility
     * This method is used to set the position & visibility parameter of the full screen button.
     * By default the full screen button is visible in the `bottom-right` position.
     * @returns
     */
    setFullScreenButtonParams(_position: (typeof CallSettings.POSITION)[keyof typeof CallSettings.POSITION], _visibility: boolean): void;
    /**
     *
     * @param {string} position
     * @param {boolean} visibility
     * @param {string} backgroundColor
     * This method is used to set the position, visibility & background color of the name label.
     * By default the name label is visible in the `bottom-left` position with a background-color `rgba(27, 27, 27, 0.4)`
     * @returns
     */
    setNameLabelParams(_position: (typeof CallSettings.POSITION)[keyof typeof CallSettings.POSITION], _visibility: boolean, _backgroundColor: string): void;
    /**
     *
     * @param {string} position
     * @param {boolean} visibility
     * This method is used to set the position, visibility of the network label.
     * By default the network label is visible in the `bottom-right` position.
     * @returns
     */
    setNetworkLabelParams(_position: (typeof CallSettings.POSITION)[keyof typeof CallSettings.POSITION], _visibility: boolean): void;
}

declare type MobileSDKEvents = SDKEvents & {
    onAudioModeChanged: (payload: AudioMode['type']) => void;
    /**
     * Fired when the list of available audio modes changes,
     * e.g. a Bluetooth device or headphones are connected/disconnected.
     *
     * @param payload - The updated list of available audio modes.
     */
    onAudioModesChanged: (payload: AudioMode[]) => void;
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

export declare type Result<T, E = Error> = {
    data: T;
    error: null;
} | {
    data: null;
    error: E;
};

declare type SDKEvents = Omit<_SDKEvents, 'onParticipantListChanged' | 'onConnectionFailed'> & {
    onCallLayoutChanged: (payload: Layout) => void;
    onConnectionFailed: (payload: ConnectionError) => void;
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
     * Mutes or unmutes the local user's audio during the call.
     *
     * The boolean parameter exists for backward compatibility with the v4 SDK,
     * where `muteAudio(false)` was the way to unmute. New code should prefer
     * {@link SessionMethodsCore.unmuteAudio} for clarity.
     *
     * @param muteAudio - `true` (default) mutes the local audio track, `false` unmutes it.
     */
    static muteAudio(muteAudio?: boolean): void;
    /**
     * Unmutes the local user's audio during the call.
     */
    static unmuteAudio(): void;
    /**
     * Toggles the local user's audio mute state.
     * If audio is muted, it will be unmuted, and vice versa.
     */
    static toggleAudio(): void;
    /**
     * Pauses or resumes the local user's video stream.
     *
     * The boolean parameter exists for backward compatibility with the v4 SDK,
     * where `pauseVideo(false)` was the way to resume. New code should prefer
     * {@link SessionMethodsCore.resumeVideo} for clarity.
     *
     * @param pauseVideo - `true` (default) pauses the local video track, `false` resumes it.
     */
    static pauseVideo(pauseVideo?: boolean): void;
    /**
     * Resumes the local user's video stream.
     */
    static resumeVideo(): void;
    /**
     * Toggles the local user's video stream.
     * If video is paused, it will be resumed, and vice versa.
     */
    static toggleVideo(): void;
    /**
     * Local user leaves the current session.
     */
    static leaveSession(): void;
    /**
     * Ends the current session for all participants.
     * This will terminate the conference and disconnect everyone.
     */
    static endSessionForAll(): void;
    /**
     * Raises the user's virtual hand in the call.
     */
    static raiseHand(): void;
    /**
     * Lowers the user's virtual hand in the call.
     */
    static lowerHand(): void;
    /**
     * Toggles the user's virtual hand state.
     * If the hand is raised, it will be lowered, and vice versa.
     */
    static toggleHand(): void;
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
     * Starts streaming the call to the given RTMP destination.
     * @param streamUrl - The RTMP ingest URL (e.g., "rtmp://a.rtmp.youtube.com/live2").
     * @param streamKey - The stream key for the destination (e.g., "xxxx-xxxx-xxxx-xxxx-xxxx").
     */
    static startStreaming(streamUrl: string, streamKey: string): void;
    /**
     * Stops the ongoing call streaming.
     */
    static stopStreaming(): void;
    /**
     * Starts recording the call.
     */
    static startRecording(): void;
    /**
     * Stops the ongoing call recording.
     */
    static stopRecording(): void;
    /**
     * Toggles the call recording state.
     * If recording is active, it will be stopped, and vice versa.
     */
    static toggleRecording(): void;
    /**
     * Starts transcription of the call.
     */
    static startTranscription(): void;
    /**
     * Stops the ongoing call transcription.
     */
    static stopTranscription(): void;
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
     * Toggles the visibility of the participant list panel.
     */
    static toggleParticipantList(): void;
    /**
     * Shows the participant list panel.
     */
    static showParticipantList(): void;
    /**
     * Hides the participant list panel.
     */
    static hideParticipantList(): void;
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

/**
 * A single meeting-transcript artifact returned by the paginated
 * `GET /calls/:sessionId/transcriptions` endpoint.
 *
 * A record is a *pointer* to a downloadable transcript file, not the transcript
 * text/utterances themselves — fetch {@link Transcript.transcriptUrl} separately
 * to retrieve the content.
 *
 * Every field is optional: the server strips keys whose value is empty, so a
 * sparse record (e.g. `mid` absent until the pipeline sends `uniqueMeetingId`)
 * is normal and must parse without error.
 */
export declare interface Transcript {
    /** Transcript id. */
    tid?: string;
    /** Meeting id; absent until the pipeline sends `uniqueMeetingId`. */
    mid?: string;
    /** Room name. */
    roomName?: string;
    /** Meeting start time, epoch SECONDS. */
    startTime?: number;
    /** Meeting end time, epoch SECONDS. */
    endTime?: number;
    /** Meeting url. */
    url?: string;
    /** Transcript date. */
    transcriptDate?: string;
    /** Downloadable transcript JSON url. */
    transcriptUrl?: string;
    /** Arbitrary metadata bag. */
    metaData?: Record<string, unknown>;
}

/**
 * Represents a transcript artifact attached to a call log.
 *
 * Only present when the list request opted in via
 * `CallLogRequestBuilder.setHasTranscriptions(true)` — the server omits the
 * `transcriptions` array otherwise.
 *
 * A record is a *pointer* to a downloadable transcript file, not the transcript
 * text itself: fetch {@link Transcription.getTranscriptURL} separately to
 * retrieve the content.
 */
export declare class Transcription {
    /**
     * The transcript ID.
     */
    private tid;
    /**
     * The meeting ID; absent until the pipeline sends `uniqueMeetingId`.
     */
    private mid;
    /**
     * The room name of the meeting the transcript belongs to.
     */
    private roomName;
    /**
     * The start time of the transcribed meeting, in epoch seconds.
     */
    private startTime;
    /**
     * The end time of the transcribed meeting, in epoch seconds.
     */
    private endTime;
    /**
     * The transcript date.
     */
    private transcriptDate;
    /**
     * The URL of the downloadable transcript JSON.
     */
    private transcriptUrl;
    /**
     * Creates a new instance of the Transcription class.
     * @param data - The data to initialize the transcription object.
     */
    constructor(data: any);
    /**
     * Gets the transcript ID.
     * @returns The transcript ID.
     */
    getTid(): string;
    /**
     * Sets the transcript ID.
     * @param value - The transcript ID to set.
     */
    setTid(value: string): void;
    /**
     * Gets the meeting ID.
     * @returns The meeting ID.
     */
    getMid(): string;
    /**
     * Sets the meeting ID.
     * @param value - The meeting ID to set.
     */
    setMid(value: string): void;
    /**
     * Gets the room name.
     * @returns The room name.
     */
    getRoomName(): string;
    /**
     * Sets the room name.
     * @param value - The room name to set.
     */
    setRoomName(value: string): void;
    /**
     * Gets the start time of the transcribed meeting.
     * @returns The start time, in epoch seconds.
     */
    getStartTime(): number;
    /**
     * Sets the start time of the transcribed meeting.
     * @param value - The start time, in epoch seconds.
     */
    setStartTime(value: number): void;
    /**
     * Gets the end time of the transcribed meeting.
     * @returns The end time, in epoch seconds.
     */
    getEndTime(): number;
    /**
     * Sets the end time of the transcribed meeting.
     * @param value - The end time, in epoch seconds.
     */
    setEndTime(value: number): void;
    /**
     * Gets the transcript date.
     * @returns The transcript date.
     */
    getTranscriptDate(): string;
    /**
     * Sets the transcript date.
     * @param value - The transcript date to set.
     */
    setTranscriptDate(value: string): void;
    /**
     * Gets the URL of the downloadable transcript JSON.
     * @returns The transcript URL.
     */
    getTranscriptURL(): string;
    /**
     * Sets the URL of the downloadable transcript JSON.
     * @param value - The transcript URL to set.
     */
    setTranscriptURL(value: string): void;
    /**
     * Creates a new Transcription object from the given JSON data.
     *
     * Every key is passed through untouched, so newly-added server fields survive
     * without an SDK release.
     * @param data - The JSON data to create the Transcription object from.
     * @returns A new Transcription object.
     */
    static getTranscriptionFromJson(data: any): Transcription;
}

/**
 * A single, stateful request for one meeting's transcript artifacts. Holds the
 * pagination cursor and drives the paginated endpoint via `fetchNext()` /
 * `fetchPrevious()`. Create one with {@link TranscriptRequestBuilder}.
 */
declare class TranscriptRequest {
    private readonly limit;
    private readonly sessionId;
    private readonly config;
    /** Total pages reported by the server; `null` until a response reports one. */
    private totalPages;
    /** Page cursor; `0` before the first fetch. */
    private currentPage;
    /** Guards against overlapping in-flight fetches. */
    private inProgress;
    constructor(builder: TranscriptRequestBuilder, config: TranscriptRuntimeConfig);
    /**
     * Fetches the next page of transcripts.
     * @returns The page's transcripts, or `[]` when there are no more pages.
     * @throws {CometChatCallsException} on auth, concurrency, network or response errors.
     */
    fetchNext(): Promise<Transcript[]>;
    /**
     * Fetches the previous page of transcripts.
     * @returns The page's transcripts, or `[]` when already at the first page.
     * @throws {CometChatCallsException} on auth, concurrency, network or response errors.
     */
    fetchPrevious(): Promise<Transcript[] | []>;
    private makeAPICall;
}

/**
 * Builder for a {@link TranscriptRequest}.
 *
 * @example
 * const request = new CometChatCalls.TranscriptRequestBuilder()
 *   .setSessionId('v1.us.2547167fe69871fd.pranav')
 *   .setLimit(10)
 *   .build();
 * const page = await request.fetchNext();
 */
declare class TranscriptRequestBuilder {
    /* Excluded from this release type: limit */
    /* Excluded from this release type: sessionId */
    /**
     * Sets the meeting/session id whose transcripts to fetch. Required.
     * @param sessionId - The session id (e.g. `v1.us.<appId>.<user>`).
     */
    setSessionId(sessionId: string): this;
    /**
     * Sets the page size. Optional; defaults to 30 and is clamped to `[1, 1000]`.
     * @param limit - Transcripts to fetch per page.
     */
    setLimit(limit: number): this;
    /**
     * Validates pre-flight state and builds the request.
     * @throws {CometChatCallsException} `NOT_INITIALIZED` if `init()` was not called,
     *   or `SESSION_ID_REQUIRED` if no session id was set.
     */
    build(): TranscriptRequest;
}

/**
 * Runtime context the transcript request needs but cannot reach on its own:
 * `getBaseURL('call')`, `appSettings` and `appId` are all private static on
 * `CometChatCalls`. The facade stashes this config at `finalizeInit()` (mirroring
 * how `APIHandler.setAppSettings({ host })` is already wired), and the request
 * reads it back here.
 *
 * The auth token is intentionally a live getter, not a captured value: the token
 * can change across a re-login, so it is read at fetch time from the public
 * `CometChatCalls.getUserAuthToken()`.
 */
declare interface TranscriptRuntimeConfig {
    /**
     * Calls base URL — `getBaseURL('call')`, honours the `appSettings.host`
     * override. `/calls/:sessionId/transcriptions` is a sub-route of the same
     * `/calls` resource the call-log list uses, so it lives on the calls host
     * (`<appId>.call-<region>.cometchat.io`), NOT the chat admin api host.
     */
    callsBaseURL: string;
    /** App id from the init'd settings. */
    appId: string;
    /** Live auth-token accessor (from the logged-in user); `null` when logged out. */
    getAuthToken: () => string | null;
}

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

export declare type VideoInputDevice = MediaDeviceInfo & {
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


const targetBiteAppKey = document.currentScript.getAttribute('appKey');
const targetBiteOptInCallback = document.currentScript.getAttribute('onOptIn');
let targetbiteClient = null;
const baseUrl = 'https://us-central1-targetbite.cloudfunctions.net';

class TargetBiteClient {
    constructor() {
        this.email = null;
        this.data = null;
        targetbiteClient = this;
    }

    get(field) {
        return this.data[field];
    }

    getConfig(field) {
        return this.config[field];
    }

    async userData(data) {
        if (data.email) {
            this.email = data.email;
            delete data.email;
            this.data = data;

            this.config = await (await fetch(`${baseUrl}/application?app_key=${targetBiteAppKey}&email=${this.email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json();

            if (!this.config.opted_in) {
                loadTargetBiteWidget();
            }
        } else {
            throw new Error("TargetBite setData: email is required");
        }
        return this;
    }

    async optIn() {
        await (await fetch(`${baseUrl}/optIn?app_key=${targetBiteAppKey}&email=${this.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                active: true,
                userData: this.data
            })
        })).json();
    }
}

function loadTargetBiteWidget() {
    let optedIn = false;

    function appendTargetBiteWidget() {
        const widgetDiv = document.createElement("div");
        widgetDiv.innerHTML = `
            <div class="targetbite-widget-container">
                <div class="cta" id="targetbite-widget-container-cta">
                    <div class="left" onclick="targetbite_openModal()">
                        <span class="card">
                            <?xml version="1.0" encoding="iso-8859-1"?>
                            <svg height="40px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                viewBox="0 0 512 512" xml:space="preserve">
                            <path style="fill:#34495E;" d="M512,402.282c0,16.716-13.55,30.267-30.265,30.267H30.265C13.55,432.549,0,418.997,0,402.282V109.717
                                c0-16.715,13.55-30.266,30.265-30.266h451.469c16.716,0,30.266,13.551,30.266,30.266V402.282z"/>
                            <path style="opacity:0.15;fill:#202121;enable-background:new    ;" d="M21.517,402.282V109.717
                                c0-16.715,13.552-30.266,30.267-30.266h-21.52C13.55,79.451,0,93.003,0,109.717v292.565c0,16.716,13.55,30.267,30.265,30.267h21.52
                                C35.07,432.549,21.517,418.997,21.517,402.282z"/>
                            <g>
                                <path style="fill:#E7E8E3;" d="M207.372,178.276H55.437c-4.611,0-8.348-3.736-8.348-8.348c0-4.611,3.736-8.348,8.348-8.348h151.935
                                    c4.611,0,8.348,3.736,8.348,8.348C215.72,174.54,211.982,178.276,207.372,178.276z"/>
                                <path style="fill:#E7E8E3;" d="M207.372,213.089H55.437c-4.611,0-8.348-3.736-8.348-8.348c0-4.611,3.736-8.348,8.348-8.348h151.935
                                    c4.611,0,8.348,3.736,8.348,8.348C215.72,209.352,211.982,213.089,207.372,213.089z"/>
                            </g>
                            <path style="fill:#FFFFFF;" d="M361.124,215.587c-5.759-0.453-18.281-0.61-37.572,3.396c-27.491,5.708-40.181,31.09-40.181,50.972
                                c0,19.876,19.029,42.928,47.58,42.928c21.846,0,34.167-13.135,38.737-19.304c1.022-1.365,3.089-1.302,4.019,0.142
                                c1.129,1.766,2.741,4.105,4.826,6.682c2.228,2.766,5.207,5.526,7.622,7.592c2.333,2.001,5.805,1.885,8.037-0.225l18.926-18.03
                                c2.192-2.09,2.493-5.476,0.698-7.91c-1.044-1.411-2.361-3.236-3.989-5.532c-5.079-7.193-4.863-12.9-4.863-12.9v-66.832
                                c0-8.034-4.865-41.023-56.042-41.023c-41.796,0-54.537,29.761-57.803,40.673c-0.627,2.09,0.735,4.237,2.885,4.598l25.954,4.385
                                c1.574,0.265,3.141-0.524,3.846-1.958c2.851-5.761,11.122-19.787,24.056-19.787c16.292,0.007,16.924,13.328,16.924,13.328v15.4
                                C364.787,214.168,363.11,215.741,361.124,215.587z M365.215,240.305v19.486c0,10.177-7.007,19.096-16.939,21.304
                                c-2.57,0.573-5.504,0.914-8.87,0.914c-21.565,0-17.548-27.707-7.609-35.956c7.535-6.254,22.84-8.373,29.813-9.03
                                C363.546,236.84,365.215,238.364,365.215,240.305z"/>
                            <path style="fill:#EB7C0A;" d="M243,319.699c0,0-2.426,4.647,4.976,13.744c7.394,9.097,44.983,39.01,91.995,39.01
                                c38.692,0,54.977-8.03,71.684-17.331c16.707-9.308,29.752-22.776,27.429-27.143c-2.329-4.363-15.722,6.711-29.557,11.719
                                c-8.646,3.131-35.089,12.04-72.521,12.04s-75.08-26.441-83.113-32.039C245.857,314.091,243,319.699,243,319.699z"/>
                            <path style="fill:#E7E8E3;" d="M361.124,215.587c-5.759-0.453-18.281-0.61-37.572,3.396c-27.491,5.708-40.181,31.09-40.181,50.972
                                c0,19.876,19.029,42.928,47.58,42.928c21.846,0,34.167-13.135,38.737-19.304c1.022-1.365,3.089-1.302,4.019,0.142
                                c1.129,1.766,2.741,4.105,4.826,6.682c2.228,2.766,5.207,5.526,7.622,7.592c2.333,2.001,5.805,1.885,8.037-0.225l18.926-18.03
                                c2.192-2.09,2.493-5.476,0.698-7.91c-1.044-1.411-2.361-3.236-3.989-5.532c-5.079-7.193-4.863-12.9-4.863-12.9v-66.832
                                c0-8.034-4.865-41.023-56.042-41.023c-41.796,0-54.537,29.761-57.803,40.673c-0.627,2.09,0.735,4.237,2.885,4.598l25.954,4.385
                                c1.574,0.265,3.141-0.524,3.846-1.958c2.851-5.761,11.122-19.787,24.056-19.787c16.292,0.007,16.924,13.328,16.924,13.328v15.4
                                C364.787,214.168,363.11,215.741,361.124,215.587z M365.215,240.305v19.486c0,10.177-7.007,19.096-16.939,21.304
                                c-2.57,0.573-5.504,0.914-8.87,0.914c-21.565,0-17.548-27.707-7.609-35.956c7.535-6.254,22.84-8.373,29.813-9.03
                                C363.546,236.84,365.215,238.364,365.215,240.305z"/>
                            <path style="fill:#EB7C0A;" d="M436.806,357.565c5.761,3.121,27.943-25.564,18.719-39.809c-7.668-11.848-39.814,1.425-42.191,3.009
                                c-2.381,1.591-2.381,3.488-2.381,3.488s-0.628,4.763,9.833,3.488c10.472-1.266,15.072-2.58,18.244,0.221
                                c3.17,2.796,2.061,8.506,0,15.009C436.97,349.472,431.879,354.895,436.806,357.565z"/>
                            </svg>
                        </span>
                    </div>
                    <div class="middle" onclick="targetbite_openModal()">
                        <div class="title">
                            $100 Amazon Gift Card on us!
                        </div>
                        <div class="sub-title">
                            Help us make ${targetbiteClient.getConfig('client_name')} better
                        </div>
                    </div>
                    <div class="right">
                        <span class="cross" onclick="hideTargetBiteWidget()">
                            <?xml version="1.0" encoding="iso-8859-1"?>
                            <svg fill="gray" height="10px" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                viewBox="0 0 490 490" xml:space="preserve">
                            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
                                489.292,457.678 277.331,245.004 489.292,32.337 "/>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="modal-container" id="targetbite-widget-container-modal-container" onclick="targetbite_onClickModalContainer(event)">
                    <div class="modal" id="targetbite-widget-container-modal">
                        <div class="title">
                            Help us make ${targetbiteClient.getConfig('client_name')} better
                        </div>
                        <div class="sub-title">
                            Opt-in for Customer Interviews
                        </div>
                        <div class="description">
                            You can opt-in to recieve email invites for customer interviews at <u><b>${targetbiteClient.get('email')}</b></u>.
                            <br/><br/>
                            <span class="card">
                                <?xml version="1.0" encoding="iso-8859-1"?>
                                <svg height="100px" width="100px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                    viewBox="0 0 512 512" xml:space="preserve">
                                <path style="fill:#34495E;" d="M512,402.282c0,16.716-13.55,30.267-30.265,30.267H30.265C13.55,432.549,0,418.997,0,402.282V109.717
                                    c0-16.715,13.55-30.266,30.265-30.266h451.469c16.716,0,30.266,13.551,30.266,30.266V402.282z"/>
                                <path style="opacity:0.15;fill:#202121;enable-background:new    ;" d="M21.517,402.282V109.717
                                    c0-16.715,13.552-30.266,30.267-30.266h-21.52C13.55,79.451,0,93.003,0,109.717v292.565c0,16.716,13.55,30.267,30.265,30.267h21.52
                                    C35.07,432.549,21.517,418.997,21.517,402.282z"/>
                                <g>
                                    <path style="fill:#E7E8E3;" d="M207.372,178.276H55.437c-4.611,0-8.348-3.736-8.348-8.348c0-4.611,3.736-8.348,8.348-8.348h151.935
                                        c4.611,0,8.348,3.736,8.348,8.348C215.72,174.54,211.982,178.276,207.372,178.276z"/>
                                    <path style="fill:#E7E8E3;" d="M207.372,213.089H55.437c-4.611,0-8.348-3.736-8.348-8.348c0-4.611,3.736-8.348,8.348-8.348h151.935
                                        c4.611,0,8.348,3.736,8.348,8.348C215.72,209.352,211.982,213.089,207.372,213.089z"/>
                                </g>
                                <path style="fill:#FFFFFF;" d="M361.124,215.587c-5.759-0.453-18.281-0.61-37.572,3.396c-27.491,5.708-40.181,31.09-40.181,50.972
                                    c0,19.876,19.029,42.928,47.58,42.928c21.846,0,34.167-13.135,38.737-19.304c1.022-1.365,3.089-1.302,4.019,0.142
                                    c1.129,1.766,2.741,4.105,4.826,6.682c2.228,2.766,5.207,5.526,7.622,7.592c2.333,2.001,5.805,1.885,8.037-0.225l18.926-18.03
                                    c2.192-2.09,2.493-5.476,0.698-7.91c-1.044-1.411-2.361-3.236-3.989-5.532c-5.079-7.193-4.863-12.9-4.863-12.9v-66.832
                                    c0-8.034-4.865-41.023-56.042-41.023c-41.796,0-54.537,29.761-57.803,40.673c-0.627,2.09,0.735,4.237,2.885,4.598l25.954,4.385
                                    c1.574,0.265,3.141-0.524,3.846-1.958c2.851-5.761,11.122-19.787,24.056-19.787c16.292,0.007,16.924,13.328,16.924,13.328v15.4
                                    C364.787,214.168,363.11,215.741,361.124,215.587z M365.215,240.305v19.486c0,10.177-7.007,19.096-16.939,21.304
                                    c-2.57,0.573-5.504,0.914-8.87,0.914c-21.565,0-17.548-27.707-7.609-35.956c7.535-6.254,22.84-8.373,29.813-9.03
                                    C363.546,236.84,365.215,238.364,365.215,240.305z"/>
                                <path style="fill:#EB7C0A;" d="M243,319.699c0,0-2.426,4.647,4.976,13.744c7.394,9.097,44.983,39.01,91.995,39.01
                                    c38.692,0,54.977-8.03,71.684-17.331c16.707-9.308,29.752-22.776,27.429-27.143c-2.329-4.363-15.722,6.711-29.557,11.719
                                    c-8.646,3.131-35.089,12.04-72.521,12.04s-75.08-26.441-83.113-32.039C245.857,314.091,243,319.699,243,319.699z"/>
                                <path style="fill:#E7E8E3;" d="M361.124,215.587c-5.759-0.453-18.281-0.61-37.572,3.396c-27.491,5.708-40.181,31.09-40.181,50.972
                                    c0,19.876,19.029,42.928,47.58,42.928c21.846,0,34.167-13.135,38.737-19.304c1.022-1.365,3.089-1.302,4.019,0.142
                                    c1.129,1.766,2.741,4.105,4.826,6.682c2.228,2.766,5.207,5.526,7.622,7.592c2.333,2.001,5.805,1.885,8.037-0.225l18.926-18.03
                                    c2.192-2.09,2.493-5.476,0.698-7.91c-1.044-1.411-2.361-3.236-3.989-5.532c-5.079-7.193-4.863-12.9-4.863-12.9v-66.832
                                    c0-8.034-4.865-41.023-56.042-41.023c-41.796,0-54.537,29.761-57.803,40.673c-0.627,2.09,0.735,4.237,2.885,4.598l25.954,4.385
                                    c1.574,0.265,3.141-0.524,3.846-1.958c2.851-5.761,11.122-19.787,24.056-19.787c16.292,0.007,16.924,13.328,16.924,13.328v15.4
                                    C364.787,214.168,363.11,215.741,361.124,215.587z M365.215,240.305v19.486c0,10.177-7.007,19.096-16.939,21.304
                                    c-2.57,0.573-5.504,0.914-8.87,0.914c-21.565,0-17.548-27.707-7.609-35.956c7.535-6.254,22.84-8.373,29.813-9.03
                                    C363.546,236.84,365.215,238.364,365.215,240.305z"/>
                                <path style="fill:#EB7C0A;" d="M436.806,357.565c5.761,3.121,27.943-25.564,18.719-39.809c-7.668-11.848-39.814,1.425-42.191,3.009
                                    c-2.381,1.591-2.381,3.488-2.381,3.488s-0.628,4.763,9.833,3.488c10.472-1.266,15.072-2.58,18.244,0.221
                                    c3.17,2.796,2.061,8.506,0,15.009C436.97,349.472,431.879,354.895,436.806,357.565z"/>
                                </svg>
                            </span>
                            <br/><br/>
                            You will recieve a <b>$100 Amazon Gift Card</b> for every customer interview.
                        </div>
                        <svg id="targetbite-checkmark" class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
                        <div class="opt-in-btn" id="opt-in-btn" onclick="targetbite_optInClicked()">
                            Sounds good, count me in!
                        </div>
                        <div class="dont-show-btn" id="dont-show-btn" onclick="targetbite_dontShowMeClicked()">
                            <u>Don't show me this for a while</u>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .targetbite-widget-container .cta {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    border: 1px solid #ccc;
                    margin-bottom: 10px;
                    margin-left: 10px;
                    border-radius: 8px;
                    padding: 8px;
                    background: white;
                    font-family: helvetica, sans-serif;
                    display: flex;
                    flex-direction: row;
                    cursor: pointer;
                    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
                    z-index: 99999;
                }
                .targetbite-widget-container .middle .title {
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    padding-bottom: 2px;
                }
                .targetbite-widget-container .left .card {
                    margin-right: 10px;
                }
                .targetbite-widget-container .middle .sub-title {
                    font-size: 17px;
                }
                .targetbite-widget-container .right {
                    padding-left: 10px;
                }
                .targetbite-widget-container .modal-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.8);
                    align-items: center;
                    justify-content: center;
                    z-index: 99999;
                    display: none;
                    cursor: pointer;
                }
                .targetbite-widget-container .modal-container .modal {
                    position: fixed;
                    border: 1px solid #ccc;
                    margin-bottom: 10px;
                    margin-left: 10px;
                    border-radius: 8px;
                    padding: 12px;
                    background: white;
                    font-family: helvetica, sans-serif;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
                    z-index: 99999;
                    width: 500px;
                    justify-content: flex-start;
                    align-items: center;
                    padding-top: 80px;
                    padding-bottom: 80px;
                    cursor: default;
                }
                .targetbite-widget-container .modal-container .modal .title {
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    padding-bottom: 2px;
                    font-size: 24px;
                    font-weight: bold;
                }
                .targetbite-widget-container .modal-container .modal .sub-title {
                    padding-top: 20px;
                    text-align: center;
                    font-size: 22px;
                }
                .targetbite-widget-container .modal-container .modal .description {
                    padding-top: 20px;
                    text-align: center;
                    width: 400px;
                    font-size: 18px;
                }
                .targetbite-widget-container .modal-container .modal .opt-in-btn {
                    border: 1px solid #ccc;
                    padding: 10px;
                    border-radius: 8px;
                    font-size: 18px;
                    cursor: pointer;
                    margin-top: 20px;
                    color: #34495E;
                }
                .targetbite-widget-container .modal-container .modal .opt-in-btn:hover {
                    color: #202d3a;
                    border-color: #202d3a;
                }
                .targetbite-widget-container .modal-container .modal .dont-show-btn {
                    padding: 6px;
                    border-radius: 8px;
                    font-size: 14px;
                    cursor: pointer;
                    margin-top: 10px;
                } 
                .targetbite-widget-container .modal-container .modal .dont-show-btn:hover {
                    color: #34495E;
                }
                .targetbite-widget-container .checkmark__circle {
                    stroke-dasharray: 166;
                    stroke-dashoffset: 166;
                    stroke-width: 2;
                    stroke-miterlimit: 10;
                    stroke: green;
                    fill: none;
                    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
                }

                .targetbite-widget-container .checkmark {
                    display: none;
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    stroke-width: 2;
                    stroke: green;
                    margin-top: 44px;
                    stroke-miterlimit: 10;
                    box-shadow: inset 0px 0px 0px #7ac142;
                    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
                }

                .targetbite-widget-container .checkmark__check {
                    transform-origin: 50% 50%;
                    stroke-dasharray: 48;
                    stroke-dashoffset: 48;
                    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
                }

                @keyframes stroke {
                    100% {
                        stroke-dashoffset: 0;
                    }
                    }
                    @keyframes scale {
                    0%, 100% {
                        transform: none;
                    }
                    50% {
                        transform: scale3d(1.1, 1.1, 1);
                    }
                    }
                    @keyframes fill {
                    100% {
                        box-shadow: inset 0px 0px 0px 30px #fff;
                    }
                }
            </style>
        `
        document.body.appendChild(widgetDiv);

        const script = document.createElement('script');
        script.innerHTML = `
            const modal = document.getElementById('targetbite-widget-container-modal');
            function hideTargetBiteWidget() {
                document.getElementById('targetbite-widget-container-cta').style.display = 'none';
            }
            function targetbite_openModal() {
                document.getElementById('targetbite-widget-container-cta').style.display = 'none';
                document.getElementById('targetbite-widget-container-modal-container').style.display = 'flex';
            }
            function targetbite_onClickModalContainer(event) {
                if (event.target.id == 'targetbite-widget-container-modal-container') {
                    if (optedIn) {
                        document.getElementById('targetbite-widget-container-cta').style.display = 'none';
                        document.getElementById('targetbite-widget-container-modal-container').style.display = 'none';
                    } else {
                        document.getElementById('targetbite-widget-container-cta').style.display = 'flex';
                        document.getElementById('targetbite-widget-container-modal-container').style.display = 'none';
                    }
                }
            }
            function targetbite_optInClicked() {
                optedIn = true;
                document.getElementById('targetbite-checkmark').style.display = 'block';
                document.getElementById('opt-in-btn').style.display = 'none';
                document.getElementById('dont-show-btn').style.display = 'none';
                targetbiteClient.optIn();

                setTimeout(() => {
                    document.getElementById('targetbite-widget-container-cta').style.display = 'none';
                    document.getElementById('targetbite-widget-container-modal-container').style.display = 'none';
                }, 2000);
            }
            function targetbite_dontShowMeClicked() {
                document.getElementById('targetbite-widget-container-cta').style.display = 'none';
                document.getElementById('targetbite-widget-container-modal-container').style.display = 'none';
            }
        `
        document.body.appendChild(script);
    }

    appendTargetBiteWidget();
};

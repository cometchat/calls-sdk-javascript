<script lang="ts">
  import { push } from 'svelte-spa-router';
  import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
  import { appStore } from '../../store/appStore.svelte';
  import cometchatLogo from '../../assets/cometchat-logo.svg';
  import checkIcon from '../../assets/check-icon.svg';

  interface SampleUser {
    name: string;
    uid: string;
    avatar: string;
  }

  const sampleUsers: SampleUser[] = [
    {
      name: 'Andrew Joseph',
      uid: 'cometchat-uid-1',
      avatar: 'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-1.webp',
    },
    {
      name: 'George Alan',
      uid: 'cometchat-uid-2',
      avatar: 'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-2.webp',
    },
    {
      name: 'Nancy Grace',
      uid: 'cometchat-uid-3',
      avatar: 'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-3.webp',
    },
    {
      name: 'Susan Marie',
      uid: 'cometchat-uid-4',
      avatar: 'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-4.webp',
    },
    {
      name: 'John Paul',
      uid: 'cometchat-uid-5',
      avatar: 'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-5.webp',
    },
  ];

  let uidInput = $state('cometchat-uid-1');

  const rows = [sampleUsers.slice(0, 3), sampleUsers.slice(3, 5)];

  $effect(() => {
    if (appStore.user) {
      push('/join-session');
    }
  });

  function handleLogin() {
    if (!uidInput.trim()) return;
    CometChatCalls.login(uidInput).then((user: any) => {
      appStore.setUser({
        uid: user.uid,
        name: user.name,
        avatar: user.avatar,
      });
    });
  }
</script>

<div class="container">
  <div class="logo">
    <img src={cometchatLogo} alt="CometChat" />
  </div>

  <div class="form">
    <div class="users-section">
      <div class="users-section-inner">
        <p class="title">Sign in to CometChat</p>
      </div>

      <div class="users-grid">
        <p class="label">Choose a Sample User</p>
        {#each rows as row, rowIndex}
          <div class="profile-row">
            {#each row as user}
              {@const isSelected = uidInput === user.uid}
              <div
                class="profile-card {isSelected ? 'profile-card-selected' : ''}"
                onclick={() => { uidInput = user.uid; }}
                role="button"
                tabindex="0"
                aria-pressed={isSelected}
                onkeydown={(e: KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    uidInput = user.uid;
                  }
                }}
              >
                {#if isSelected}
                  <div class="check-badge" aria-hidden="true">
                    <img src={checkIcon} alt="" width="10" height="10" />
                  </div>
                {/if}
                <div class="avatar">
                  <img src={user.avatar} alt={user.name} />
                </div>
                <div class="profile-info">
                  <p class="profile-name">{user.name}</p>
                  <p class="profile-uid">{user.uid}</p>
                </div>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>

    <div class="separator">
      <div class="separator-line"></div>
      <p class="separator-text">Or</p>
      <div class="separator-line"></div>
    </div>

    <div class="bottom-section">
      <div class="fields">
        <div class="field-group">
          <label class="field-label" for="uid-input">Enter UID</label>
          <div class="field-input-wrapper">
            <input
              id="uid-input"
              class="field-input"
              type="text"
              placeholder="Enter UID here"
              bind:value={uidInput}
            />
          </div>
        </div>
      </div>

      <div class="button-section">
        <button class="login-button" type="button" onclick={handleLogin}>
          <span class="login-button-text">Login</span>
        </button>
        <button
          class="credentials-link"
          type="button"
          onclick={() => push('/credentials')}
        >
          Change <span>App Credentials</span>
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: relative;
    background: #141414 url('../../assets/dot-grid.png') repeat;
    padding: 10px;
    box-sizing: border-box;
  }

  .logo {
    width: 154px;
    height: 30px;
    flex-shrink: 0;
  }

  .logo img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
    padding: 28px 40px;
    background: #1a1a1a;
    border: 1px solid #2d2d2d;
    border-radius: 20px;
    box-shadow:
      0px 12px 16px -4px rgba(0, 0, 0, 0.25),
      0px 4px 6px -2px rgba(0, 0, 0, 0.15);
    overflow: clip;
  }

  .users-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .users-section-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .title {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.2;
    color: #f5f5f5;
    text-align: center;
    width: 100%;
    margin: 0;
  }

  .users-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .label {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.2;
    color: #e0e0e0;
    margin: 0;
  }

  .profile-row {
    display: flex;
    gap: 8px;
    align-items: stretch;
    width: 100%;
  }

  .profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #232323;
    border: 1px solid #2d2d2d;
    border-radius: 8px;
    width: 100px;
    position: relative;
    cursor: pointer;
    transition: border-color 0.15s ease;
    box-sizing: border-box;
  }

  .profile-card:hover {
    border-color: #404040;
  }

  .profile-card-selected {
    border-color: #6852d6;
  }

  .profile-card-selected:hover {
    border-color: #6852d6;
  }

  .check-badge {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 20px;
    height: 20px;
    background: #6852d6;
    border-radius: 0% 25% 0% 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    text-align: center;
    line-height: 1.2;
  }

  .profile-name {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #f5f5f5;
    margin: 0;
    word-wrap: break-word;
  }

  .profile-uid {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    color: #a1a1a1;
    margin: 0;
    word-wrap: break-word;
  }

  .separator {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    flex-shrink: 0;
  }

  .separator-line {
    flex: 1 0 0;
    height: 1px;
    background: #2d2d2d;
  }

  .separator-text {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.2;
    color: #727272;
    margin: 0;
    flex-shrink: 0;
  }

  .bottom-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 320px;
  }

  .fields {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
  }

  .field-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.2;
    color: #e0e0e0;
    margin: 0;
  }

  .field-input-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 36px;
    padding: 8px;
    background: #232323;
    border: 1px solid #2d2d2d;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 4px;
    box-sizing: border-box;
  }

  .field-input {
    flex: 1 0 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.2;
    color: #f5f5f5;
    border: none;
    outline: none;
    background: transparent;
    min-width: 90px;
    padding: 0;
  }

  .field-input::placeholder {
    color: #727272;
  }

  .button-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
  }

  .login-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 40px;
    padding: 8px 20px;
    background: #6852d6;
    border: none;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .login-button:hover {
    background: #5a46c4;
  }

  .login-button-text {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    color: #f9f8fd;
    white-space: nowrap;
  }

  .credentials-link {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.2;
    color: #727272;
    text-align: center;
    margin: 0;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .credentials-link span {
    color: #6852d6;
    cursor: pointer;
  }

  .credentials-link span:hover {
    text-decoration: underline;
  }
</style>

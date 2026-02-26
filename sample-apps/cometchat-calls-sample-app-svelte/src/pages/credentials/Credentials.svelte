<script lang="ts">
  import { push } from 'svelte-spa-router';
  import { appStore, type Region } from '../../store/appStore.svelte';
  import cometchatLogo from '../../assets/cometchat-logo.svg';
  import flagUs from '../../assets/flag-us.svg';
  import flagEu from '../../assets/flag-eu.svg';
  import flagIn from '../../assets/flag-in.svg';

  const regions: { key: Region; label: string; flag: string }[] = [
    { key: 'US', label: 'US', flag: flagUs },
    { key: 'EU', label: 'EU', flag: flagEu },
    { key: 'IN', label: 'IN', flag: flagIn },
  ];

  let selectedRegion: Region = $state('US');
  let appId = $state('');
  let authKey = $state('');
</script>

<div class="container">
  <div class="logo">
    <img src={cometchatLogo} alt="CometChat" />
  </div>

  <div class="form">
    <div class="title-wrapper">
      <h2 class="title">App Credentials</h2>
    </div>

    <div class="form-content">
      <div class="field-group">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="field-label">Region</label>
        <div class="region-row">
          {#each regions as region}
            {@const isSelected = selectedRegion === region.key}
            <button
              type="button"
              class="region-button {isSelected ? 'region-button-selected' : ''}"
              onclick={() => { selectedRegion = region.key; }}
              aria-pressed={isSelected}
            >
              <img src={region.flag} alt="{region.label} flag" class="flag-icon" />
              <span class="region-label">{region.label}</span>
            </button>
          {/each}
        </div>
      </div>

      <div class="field-group">
        <label class="field-label" for="app-id-input">App ID</label>
        <div class="input-wrapper">
          <input
            id="app-id-input"
            class="input"
            type="text"
            placeholder="Enter the app ID"
            bind:value={appId}
          />
        </div>
      </div>

      <div class="field-group">
        <label class="field-label" for="auth-key-input">Auth Key</label>
        <div class="input-wrapper">
          <input
            id="auth-key-input"
            class="input"
            type="text"
            placeholder="Enter the Auth Key"
            bind:value={authKey}
          />
        </div>
      </div>

      <button
        class="continue-button"
        type="button"
        onclick={() => {
          appStore.setCredentials({
            region: selectedRegion,
            appId,
            authKey,
          });
          push('/');
        }}
      >
        <span class="continue-button-text">Continue</span>
      </button>
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
    padding: 28px 40px;
    gap: 20px;
    width: 100%;
    max-width: 400px;
    background: #1a1a1a;
    border: 1px solid #4c4c4c;
    border-radius: 20px;
    box-shadow:
      0px 12px 16px -4px rgba(16, 24, 40, 0.08),
      0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    box-sizing: border-box;
  }

  .title-wrapper {
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
    text-align: center;
    color: #ffffff;
    margin: 0;
    width: 100%;
  }

  .form-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
  }

  .field-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.2;
    color: #ffffff;
  }

  .region-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }

  .region-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    gap: 4px;
    flex: 1;
    height: 40px;
    background: #1a1a1a;
    border: 1px solid #383838;
    border-radius: 8px;
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 0.15s ease;
  }

  .region-button:hover {
    border-color: #505050;
  }

  .region-button-selected {
    background: #15102b;
    border-color: #6852d6;
  }

  .region-button-selected:hover {
    border-color: #6852d6;
  }

  .flag-icon {
    width: 20px;
    height: 15px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .region-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    text-align: center;
    color: #989898;
  }

  .input-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    gap: 4px;
    width: 100%;
    height: 36px;
    background: #1a1a1a;
    border: 1px solid #272727;
    border-radius: 8px;
    box-sizing: border-box;
  }

  .input {
    flex: 1;
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

  .input::placeholder {
    color: #858585;
  }

  .continue-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 20px;
    gap: 8px;
    width: 100%;
    height: 40px;
    background: #6852d6;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .continue-button:hover {
    background: #5a46c4;
  }

  .continue-button-text {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    color: #ffffff;
  }
</style>

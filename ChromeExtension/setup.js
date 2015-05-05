/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 * Mini Mobile Device Lab (Chrome Extension)
 * https://github.com/GoogleChrome/MiniMobileDeviceLab
 * setup.js
 *
 **/

'use strict';

var inputAppID = document.querySelector('#appID');
var inputKey = document.querySelector('#key');
var inputOnByDefault = document.querySelector('#onByDefault');
var inputTestForSW = document.querySelector('#testForServiceWorker');
var inputGrabFocus = document.querySelector('#grabFocus');
var divFBKey = document.querySelector('#divFBKey');

inputTestForSW.addEventListener('change', function(e) {
  if (inputTestForSW.checked) {
    divFBKey.classList.remove('hidden');
  } else {
    divFBKey.classList.add('hidden');
  }
});

document.querySelector('#butSave').addEventListener('click', function() {
  var settings = {
    'appID': inputAppID.value,
    'key': inputKey.value,
    'testForServiceWorker': inputTestForSW.checked,
    'onByDefault': inputOnByDefault.checked,
    'grabFocus': inputGrabFocus.checked
  };
  chrome.storage.sync.set({'settings': settings}, function() {
    chrome.runtime.sendMessage({'settings': settings});
  });
});

document.querySelector('#butClear').addEventListener('click', function() {
  inputKey.value = '';
  inputAppID.value = '';
  inputOnByDefault.checked = true;
  inputTestForSW.checked = false;
  inputGrabFocus.checked = true;
  divFBKey.classList.add('hidden');
  chrome.storage.sync.clear();
});

chrome.storage.sync.get('settings', function(settings) {
  settings = settings.settings;
  if (settings !== undefined) {
    inputAppID.value = settings.appID;
    inputKey.value = settings.key;
    inputOnByDefault.checked = settings.onByDefault;
    inputGrabFocus.checked = settings.grabFocus;
    if (settings.testForServiceWorker) {
      inputTestForSW.checked = true;
      divFBKey.classList.remove('hidden');
    } else {
      inputTestForSW.checked = false;
      divFBKey.classList.add('hidden');
    }
  }
});

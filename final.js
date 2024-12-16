let currentState = "intro";

//공통 변수!!!
let font;
let violinImg, hornImg, timpaniImg;
let oneImg, twoImg, threeImg;
let gaugeBg;
let finaleImg;

//intro변수!!!

let introOfficial;
let introOfficial2;
let introBg;
let clickCount = 0; // 클릭 횟수를 추적하는 변수
let videoCall;
let carnegie;
let carnegieInside;
let showFinale = true; // 표지를 보여줄지 여부

let countdown = 2; // 카운트다운 초기값
let countdownStartTime; // 카운트다운 시작 시간
let isCountingDown = false; // 카운트다운 진행 여부

let hourglassActive = true; // hourglass 표시 여부
let iconY; // 아이콘의 초기 y좌표
let movingUp = true; // 아이콘이 위로 움직이는지 여부
let stringsSound, windSound, drumSound;

let stopImg;
let loudSpeakerImg;
let conductorImg;
let texts = [
  "공연이 시작되면\n카메라에 <한 손>만 보이도록,\n손바닥이 카메라를 똑바로\n향하도록 해주세요!\n두 손은 안 돼요!",
  "손가락을 한 개 펼치면\n현악기입니다.",
  "손가락을 두 개 펼치면\n관악기입니다.",
  "손가락을 세 개 펼치면\n타악기입니다.",
  "공연이 시작되면\n모든 악기가 연주됩니다.",
  "손가락 모양을\n2초간 유지하면\n해당 악기가 선택됩니다!",
  "손을 위아래로 움직이면\n선택한 악기의\n볼륨이 변화합니다.",
  "정답은 없습니다.\n손모양과 손의 높낮이로\n나만의 음악과 그림을 지휘하세요!",
  "준비되셨나요?\n엔터키를 누르면\n공연이 시작됩니다.",
];
let currentTextIndex = 0;

//conducting 변수 !!!
let handPose;
let video2;
let hands = [];
let handCenters = [];
let bars = [0, 0, 0];
let trailColor = [];
let strings, wind, drum;
let targetStringVolume = 0;
let targetWindVolume = 0;
let targetDrumVolume = 0;
let currentStringVolume = 0;
let currentWindVolume = 0;
let currentDrumVolume = 0;
let lastFingerCount = -1; // 마지막 손가락 개수
let lastFingerCountTime = 0; // 마지막 손가락 개수 변경 시간
let fingerChangeDelay = 1000; // 손가락 개수 변경 후 대기 시간 (2초)
let selectedInstrument = null; // 선택된 악기 변수 추가
let loadingAngle = 0; // 원의 그려지는 각도 (0에서 시작해서 끝까지 증가)
let isLoading = false; // 로딩 상태
let loadingStartTime = 0; // 로딩 시작 시간
let currentPlayTime = 0; // 음악의 재생 시간을 저장할 변수 추가
let totalDuration = 176; // 총 음악 재생 시간 (초 단위, 1분 6초)

//outro 변수 !!!
let applause;
let button;
let photozone;
let currentIndex = 0;
let interval = 5000;

//공통 프리로드 !!!

function preload() {
  handPose = ml5.handPose();
  // 공통 리소스
  font = loadFont("assets/DungGeunMo.otf");
  finaleImg = loadImage("assets/finale.jpg");

  // 이미지 리소스
  introOfficial = loadImage("assets/intro_official.png");
  introBg = loadImage("assets/intro_background.jpg");
  videoCall = loadImage("assets/videoCall.png");
  carnegie = loadImage("assets/carnegie.jpg");
  carnegieInside = loadImage("assets/carnegie_inside.jpg");
  introOfficial2 = loadImage("assets/introOfficial2.png");
  stopImg = loadImage("assets/stop.png");
  oneImg = loadImage("assets/one.png");
  twoImg = loadImage("assets/two.png");
  threeImg = loadImage("assets/three.png");
  violinImg = loadImage("assets/violin.png");
  hornImg = loadImage("assets/horn.png");
  timpaniImg = loadImage("assets/timpani.png");
  loudSpeakerImg = loadImage("assets/loud-speaker.png");
  conductorImg = loadImage("assets/conductor.png");
  hourglassImg = loadImage("assets/hourglass.png");
  upDownImg = loadImage("assets/up-and-down.png");
  instImg = loadImage("assets/instruments.png");
  gaugeBg = loadImage("assets/gaugebackground.jpg");

  // 음원 리소스
  stringsSound = loadSound("assets/T2_strings.mp3");
  windSound = loadSound("assets/T2_wind.mp3");
  drumSound = loadSound("assets/T2_drum.mp3");

  applause = loadSound("assets/applause.mp3");

  strings = loadSound("assets/R_strings.mp3");
  wind = loadSound("assets/R_wind.mp3");
  drum = loadSound("assets/R_drum.mp3");

  article = loadImage("assets/article.jpg");
  photozone = loadImage("assets/photozone.png");
  end = loadImage("assets/end.jpg");
}

//intro 함수들!!!
function drawFinale() {
  background(0);
  image(finaleImg, 0, 0, width, height);

  // "MODERN MAESTRO" 텍스트 표시
  fill(255);
  textFont(font);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("MODERN MAESTRO", width / 2, height / 2 - 100);

  // START 버튼 그리기
  stroke(255);
  strokeWeight(3);
  fill(0);
  rect(width / 2 - 100, height / 2, 200, 60, 10);

  // START 버튼 텍스트
  noStroke();
  fill(255);
  textSize(30);
  text("START", width / 2, height / 2 + 30);
}

// 첫 번째 코드의 장면 처리
function drawIntroScenes() {
  if (clickCount === 0) {
    image(introBg, 0, 0);
    image(introOfficial, 100, 100, 800, 450);
    textAlign(LEFT, BASELINE);
    drawIntroText("안녕하신가? 여기 뉴욕 필하모닉일세.");
  } else if (clickCount === 1) {
    drawIntroText(
      "지금 수석지휘자 야닉이 심한 독감에 걸려서 오늘 공연에\n못 나오게 생겼네.\n혹시 오늘만 자네가 임시지휘자를 맡아줄 수 있는가?"
    );
  } else if (clickCount === 2) {
    drawIntroText(
      "부탁일세… 안타깝게도 리허설을 위한 시간은 없다네.\n자네의 즉흥적인 재능을 기대하지!"
    );
  } else if (clickCount === 3) {
    // 타이머 초기화
    if (!isCountingDown) {
      startTime = millis();
      isCountingDown = true;
    }

    image(carnegie, 0, 0, 1000, 750);
    drawIntroText("To Carnegie Hall...");
    //console.log("textcheck");

    // 2초 후 자동으로 넘어가기
    if (millis() - startTime > 2000) {
      clickCount++;
      isCountingDown = false;
    }
  } else if (clickCount === 4) {
    image(carnegieInside, 0, 0, 1000, 750);
    image(introOfficial2, 100, 100, 800, 450);
    textAlign(LEFT, BASELINE);
    drawIntroText("오, 도착했군! 준비됐나?\n이제 관객들을 입장시키지!");
  } else if (clickCount === 5) {
    image(carnegieInside, 0, 0, 1000, 750);
    image(introOfficial2, 100, 100, 800, 450);
    textAlign(LEFT, BASELINE);
    drawIntroText(
      "자네가 오늘 연주할 곡은 요한 슈트라우스의 라데츠키 행진곡일세."
    );
  } else if (clickCount === 6) {
    // 타이머 초기화
    if (!isCountingDown) {
      startTime = millis();
      isCountingDown = true;
    }

    background(0);
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("튜토리얼", width / 2, height / 2);

    // 2초 후 자동으로 넘어가기
    if (millis() - startTime > 2000) {
      clickCount++;
      isCountingDown = false;
    }
  }
}

function drawIntroText(textContent) {
  noStroke();

  if (textContent === "To Carnegie Hall...") {
    // 특별한 스타일과 위치 적용
    fill(255, 255, 255, 150);
    //console.log("fillcheck");
    rect(250, 700, 500, 50);
    fill(0);
    textSize(40);
    textAlign(CENTER, CENTER);
    text(textContent, width / 2, 720);
  } else {
    // 일반 텍스트 스타일과 위치 적용
    fill(0);
    rect(100, 550, 800, 200);

    // 삼각형 색상을 흰색으로 설정
    fill(255);
    triangle(860, 675, 890, 675, 875, 690);

    // 글꼴 설정
    textFont(font);

    // "Click" 텍스트 색상을 흰색으로 설정
    fill(255);
    textSize(28);
    text("Click", 780, 690);

    // 상단과 하단의 검은색 바 설정
    fill(0);
    rect(0, 700, 1000, 50);
    rect(0, 0, 1000, 50);

    // Video Call 이미지
    image(videoCall, 375, 700, 250, 50);

    // Video Call 텍스트 색상을 흰색으로 설정
    fill(255);
    textSize(25);
    text("Video Call from New York Philharmonic Official", 20, 30);

    // 대사 텍스트 색상을 흰색으로 설정
    fill(255);
    textSize(24);
    textLeading(32); // 줄 간격 설정
    text(textContent, 120, 580);
  }
}

function drawGestureScenes() {
  image(gaugeBg, 0, 0, width / 3, height);
  fill(0);
  rect(width / 3, 0, (2 * width) / 3, height);

  fill(255);
  textFont(font);
  textSize(20);
  if (currentTextIndex >= 9) {
    textSize(100);
  } else {
    textSize(20);
  }
  textAlign(CENTER, CENTER);
  text(texts[currentTextIndex], width / 6, height / 2);

  if (currentTextIndex === 1) {
    stringsSound.setVolume(1.0); // 현악기 볼륨 최대
    windSound.setVolume(0.0);
    drumSound.setVolume(0.0);
  } else if (currentTextIndex === 2) {
    stringsSound.setVolume(0.0);
    windSound.setVolume(1.0); // 관악기 볼륨 최대
    drumSound.setVolume(0.0);
  } else if (currentTextIndex === 3) {
    stringsSound.setVolume(0.0);
    windSound.setVolume(0.0);
    drumSound.setVolume(1.0); // 타악기 볼륨 최대
  } else {
    // 기본 볼륨 (모든 음원을 중간 볼륨으로 설정)
    stringsSound.setVolume(0.2);
    windSound.setVolume(0.2);
    drumSound.setVolume(0.2);
  }

  // 이모지 표시 및 동작
  if (currentTextIndex === 5) {
    // "2초 유지" 문구에서 one.png와 hourglass.png 표시
    image(oneImg, width / 3 + (2 * width) / 6 - 60, height / 2 - 50, 100, 100);
    if (hourglassActive) {
      image(
        hourglassImg,
        width / 3 + (2 * width) / 6 + 60,
        height / 2 - 50,
        100,
        100
      );
    } else {
      image(
        violinImg,
        width / 3 + (2 * width) / 6 + 60,
        height / 2 - 50,
        100,
        100
      );
    }

    // 카운트다운 표시
    if (!isCountingDown) {
      countdown = 2;
      countdownStartTime = millis();
      isCountingDown = true;
    }

    let elapsed = millis() - countdownStartTime;
    if (elapsed > 1000 && countdown > 0) {
      countdown--;
      countdownStartTime = millis();
    }

    if (countdown > 0) {
      fill(255);
      textSize(50);
      text(countdown, width / 3 + (2 * width) / 6 + 60, height / 2 - 100);
    } else {
      hourglassActive = false; // 2초 후 hourglass.png를 violin.png로 변경
    }
  } else if (currentTextIndex === 6) {
    // "손을 위아래로 움직이면 볼륨 변화" 문구에서 아이콘이 위아래로 움직임
    if (movingUp) {
      iconY -= 2;
      if (iconY <= 100) {
        movingUp = false;
      }
    } else {
      iconY += 2;
      if (iconY >= height - 100) {
        movingUp = true;
      }
    }

    image(oneImg, width / 3 + (2 * width) / 6 - 60, iconY, 100, 100);
    image(violinImg, width / 3 + (2 * width) / 6 + 60, iconY, 100, 100);

    // 아이콘의 높이에 따라 stringsSound 볼륨 조절
    drumSound.setVolume(0.5);
    let volume = map(iconY, height - 100, 100, 0, 1);
    stringsSound.setVolume(volume);
  } else {
    displayImage(currentTextIndex, width / 3 + (2 * width) / 6, height / 2);
    isCountingDown = false;
    hourglassActive = true;
  }
  // 버튼 텍스트 변경
  if (currentTextIndex >= 8) {
    fill(255);
    textSize(50);
    text("ENTER!", 850, 700);
  } else {
    fill(255);
    triangle(920, 695, 950, 695, 935, 720);
    textSize(50);
    text("Click", 850, 700);
  }
}

function displayImage(index, x, y) {
  let img1 = null;
  let img2 = null;

  switch (index) {
    case 0:
      img1 = stopImg;
      break;
    case 1:
      img1 = oneImg;
      img2 = violinImg;
      break;
    case 2:
      img1 = twoImg;
      img2 = hornImg;
      break;
    case 3:
      img1 = threeImg;
      img2 = timpaniImg;
      break;
    case 4:
      img1 = violinImg;
      img2 = instImg;
      break;
    case 7:
      img1 = threeImg;
      img2 = upDownImg;
      break;
    case 8:
      img1 = conductorImg;
      break;
    case 9:
    case 10:
    case 11:
    case 12:
      img1 = null;
      break;
  }

  if (img1) {
    image(img1, x - 120, y - 50, 100, 100);
  }

  if (img2) {
    image(img2, x + 20, y - 50, 100, 100);
  }
}

//conducting 함수들!!!

function detectHands() {
  handPose.detect(video2, gotHands);
  requestAnimationFrame(detectHands);
}

function gotHands(results) {
  hands = results;
}

function drawLoadingCircle(x, y, radius, angle) {
  stroke(255);
  noFill();
  strokeWeight(4);

  // arc()를 사용해서 원의 일부를 그리기
  arc(x, y, radius * 2, radius * 2, -HALF_PI, -HALF_PI + angle); // 각도를 변경하면서 원을 그립니다.

  // 손가락 개수에 맞는 악기 이미지를 그리기
  if (isLoading) {
    let instrumentImage;

    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = color(0, 0, 0, 0);
    // fingerCount가 2, 3, 4일 때에만 악기 이미지 표시
    if (lastFingerCount === 2) {
      instrumentImage = violinImg;
    } else if (lastFingerCount === 3) {
      instrumentImage = hornImg;
    } else if (lastFingerCount === 4) {
      instrumentImage = timpaniImg;
    }

    // 악기 이미지가 있을 때만 그리기
    if (instrumentImage) {
      image(instrumentImage, 140, 200, 60, 60);
    }
  }
}

function drawRightSection() {
  push();
  translate(width, 0); // 캔버스를 오른쪽 끝으로 이동
  scale(-1, 1); // X축 반전

  push();
  image(video2, 0, 0, width, height);
  filter(GRAY);
  pop();

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let handCenter = calculateHandCenter(hand);
    let fingerCount = countFingers(hand);
    let handHeight = handCenter.y;

    let newColor;
    // 손가락 개수가 바뀌었을 때, 일정 시간이 지나면 색상과 세션을 변경
    if (fingerCount !== lastFingerCount) {
      lastFingerCount = fingerCount;
      lastFingerCountTime = millis(); // 현재 시간을 기록
    }

    // 2초 동안 손가락 개수가 변화하지 않았으면 세션과 색상 변경
    if (millis() - lastFingerCountTime > fingerChangeDelay) {
      if (fingerCount === 2) {
        bars[0] = map(handHeight, 0, height, 100, 0);
        newColor = color(0, 80, 90); // 빨강 (현악기)
        setTargetVolumes("strings", handHeight); // 현악기 볼륨 0.7, 나머지 0.2
      } else if (fingerCount === 3) {
        bars[1] = map(handHeight, 0, height, 100, 0);
        newColor = color(120, 80, 90); // 초록 (관악기)
        setTargetVolumes("wind", handHeight); // 관악기 볼륨 0.7, 나머지 0.2
      } else if (fingerCount === 4) {
        bars[2] = map(handHeight, 0, height, 100, 0);
        newColor = color(240, 80, 90); // 파랑 (타악기)
        setTargetVolumes("drum", handHeight); // 타악기 볼륨 0.7, 나머지 0.2
      } else {
        newColor =
          trailColor.length > 0
            ? trailColor[trailColor.length - 1]
            : color(0, 80, 90);
        if (fingerCount === 0) {
          setTargetVolumes("none", handHeight); // 모든 악기 볼륨 0
        }
      }
    } else {
      // 손가락 개수가 바뀐 지 2초가 지나지 않았다면, 이전 색상 유지
      newColor =
        trailColor.length > 0
          ? trailColor[trailColor.length - 1]
          : color(0, 80, 90);
    }

    if (trailColor.length > 0) {
      newColor = lerpColor(trailColor[trailColor.length - 1], newColor, 0.1);
    }
    trailColor.push(newColor);
    handCenters.push(handCenter);

    // 트레일 그리기
    for (let j = 0; j < handCenters.length; j++) {
      let pos1 = handCenters[j];
      let pos2 = j + 1 < handCenters.length ? handCenters[j + 1] : pos1;
      let alpha = map(j, 0, handCenters.length - 1, 100, 150);

      // strokeThickness 계산에서 NaN을 방지하도록 처리
      let strokeThickness = map(j, 0, handCenters.length - 1, 5, 20);
      strokeThickness = isNaN(strokeThickness) ? 10 : strokeThickness; // NaN 방지

      stroke(trailColor[j], alpha);
      strokeWeight(strokeThickness);
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = trailColor[j];
      line(pos1.x, pos1.y, pos2.x, pos2.y);
    }

    if (handCenters.length > 50) {
      handCenters.shift();
      trailColor.shift();
    }
  }
  pop();
}

function setTargetVolumes(activeInstrument, handHeight) {
  // 타겟 볼륨 설정
  if (activeInstrument === "strings") {
    targetStringVolume = map(handHeight, height, 0, 0, 1); // 화면 아래쪽일 때 볼륨이 0에 가까워지도록 설정
    selectedInstrument = "strings"; // 현악기 선택
  } else if (activeInstrument === "wind") {
    targetWindVolume = map(handHeight, height, 0, 0, 1); // 관악기
    selectedInstrument = "wind"; // 관악기 선택
  } else if (activeInstrument === "drum") {
    targetDrumVolume = map(handHeight, height, 0, 0, 1); // 타악기
    selectedInstrument = "drum"; // 타악기 선택
  } else {
    targetStringVolume = 0;
    targetWindVolume = 0;
    targetDrumVolume = 0;
  }
}

function updateVolumes() {
  // 각 악기 볼륨을 독립적으로 업데이트
  currentStringVolume = lerp(currentStringVolume, targetStringVolume, 0.1);
  currentWindVolume = lerp(currentWindVolume, targetWindVolume, 0.1);
  currentDrumVolume = lerp(currentDrumVolume, targetDrumVolume, 0.1);

  if (millis() - lastFingerCountTime > fingerChangeDelay) {
    // 손가락 개수가 변경된 후 2초 동안 소리를 재생
    strings.setVolume(currentStringVolume);
    wind.setVolume(currentWindVolume);
    drum.setVolume(currentDrumVolume);
  }
  if (strings.isLoaded() && wind.isLoaded() && drum.isLoaded()) {
    if (!strings.isPlaying() && selectedInstrument === "strings") {
      strings.play();
      wind.play();
      drum.play();
    }
    if (!wind.isPlaying() && selectedInstrument === "wind") {
      strings.play();
      wind.play();
      drum.play();
    }
    if (!drum.isPlaying() && selectedInstrument === "drum") {
      strings.play();
      wind.play();
      drum.play();
    }
  }
}

function drawBars() {
  noFill();
  stroke(0);
  strokeWeight(6);
  for (let i = 0; i < 5; i++) {
    // 네온 레이어를 여러 번 겹침
    drawingContext.shadowBlur = 20 + i * 10; // 퍼짐 정도 증가
    drawingContext.shadowColor = color(255);
    rect(333, 3, 665, height - 6);
  } //화면 테두리

  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = color(0, 0, 0, 0);

  noStroke();
  fill(255);

  image(gaugeBg, 0, 0, width * 0.33, height);

  textSize(20);
  let maxVolume = Math.max(
    currentWindVolume,
    currentStringVolume,
    currentDrumVolume
  );
  // 손이 인식되지 않았을 때 문구 표시
  if (hands.length === 0) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("카메라에 손을 인식시키고\n움직여 주세요!", width * 0.165, 90);
  } else {
    if (maxVolume === currentStringVolume) {
      textSize(25);
      text("현악기 소리가\n가장 크게 들리고 있어요!", width * 0.165, 90);
    } else if (maxVolume === currentWindVolume) {
      textSize(25);
      text("관악기 소리가\n가장 크게 들리고 있어요!", width * 0.165, 90);
    } else {
      textSize(25);
      text("타악기 소리가\n가장 크게 들리고 있어요!", width * 0.165, 90);
    }
  }

  let barWidth = 50;
  let barSpacing = 60;
  let startX = 34;

  image(violinImg, startX - 20, height * 0.85 - 10, 60, 60);
  image(
    hornImg,
    startX - 20 + barWidth + barSpacing,
    height * 0.85 - 10,
    60,
    60
  );
  image(
    timpaniImg,
    startX + 2 * (barWidth + barSpacing) - 20,
    height * 0.85 - 10,
    60,
    60
  );
  image(oneImg, startX + 25, height * 0.9 - 10, 50, 50);
  image(twoImg, startX + 20 + barWidth + barSpacing, height * 0.9 - 10, 50, 50);
  image(
    threeImg,
    startX + 2 * (barWidth + barSpacing) + 20,
    height * 0.9 - 10,
    50,
    50
  ); //게이지바 밑

  fill(200, 30);
  rect(startX, height / 2 - 40, barWidth, 278);
  fill(200, 30);
  rect(startX + barWidth + barSpacing, height / 2 - 40, barWidth, 278);
  fill(200, 30);
  rect(startX + 2 * (barWidth + barSpacing), height / 2 - 40, barWidth, 278); //바 배경

  fill(255, 90);
  text("MAX", startX + 25, height / 2 - 25);
  fill(255, 90);
  text("MAX", startX + barWidth + barSpacing + 25, height / 2 - 25);
  fill(255, 90);
  text("MAX", startX + 2 * (barWidth + barSpacing) + 25, height / 2 - 25);

  let barHeights = [
    map(currentStringVolume, 0, 1, 0, height * 0.5),
    map(currentWindVolume, 0, 1, 0, height * 0.5),
    map(currentDrumVolume, 0, 1, 0, height * 0.5),
  ];

  // 게이지 바 그리기
  if (barHeights[0] > 0) {
    drawBar(
      startX,
      height * 0.85 - 20,
      barHeights[0],
      color(0, 80, 90),
      barWidth
    );
    if (selectedInstrument === "strings") {
      drawNeonBorder(startX, height * 0.85 - 20, barHeights[0], barWidth); // 네온 테두리 추가
    }
  }
  if (barHeights[1] > 0) {
    drawBar(
      startX + barWidth + barSpacing,
      height * 0.85 - 20,
      barHeights[1],
      color(120, 80, 90),
      barWidth
    );
    if (selectedInstrument === "wind") {
      drawNeonBorder(
        startX + barWidth + barSpacing,
        height * 0.85 - 20,
        barHeights[1],
        barWidth
      ); // 네온 테두리 추가
    }
  }
  if (barHeights[2] > 0) {
    drawBar(
      startX + 2 * (barWidth + barSpacing),
      height * 0.85 - 20,
      barHeights[2],
      color(240, 80, 90),
      barWidth
    );
    if (selectedInstrument === "drum") {
      drawNeonBorder(
        startX + 2 * (barWidth + barSpacing),
        height * 0.85 - 20,
        barHeights[2],
        barWidth
      ); // 네온 테두리 추가
    }
  }
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = color(0, 0, 0, 0);
  let currentPlayTime = 0;
  let totalDuration = 0;

  if (selectedInstrument === "strings") {
    currentPlayTime = strings.currentTime() * 1000; // ms로 변환
    totalDuration = strings.duration() * 1000;
  } else if (selectedInstrument === "wind") {
    currentPlayTime = wind.currentTime() * 1000; // ms로 변환
    totalDuration = wind.duration() * 1000;
  } else if (selectedInstrument === "drum") {
    currentPlayTime = drum.currentTime() * 1000; // ms로 변환
    totalDuration = drum.duration() * 1000;
  }

  let progressBar = map(currentPlayTime, 0, totalDuration, 0, 300);

  noStroke();
  fill(200, 30);
  rect(670, 695, 300, 10);

  fill(255);
  textSize(20);
  rect(670, 695, progressBar, 10); //재생바

  let minutes = floor(currentPlayTime / 60000);
  let seconds = floor((currentPlayTime % 60000) / 1000);
  let timeText = nf(minutes, 2) + ":" + nf(seconds, 2);

  textSize(20);
  text(timeText, 670, 715);
  text("02:56", 965, 715); //
  textSize(15);
  textAlign(CENTER, CENTER);
  text("지휘를 종료하려면 엔터키를 누르세요", 820, 680);
}

function drawNeonBorder(x, y, height, barWidth) {
  // 네온 테두리 그리기 (하얀색, 부드러운 네온 효과)
  noFill();
  stroke(255, 70); // 하얀색
  strokeWeight(5); // 테두리 두께를 얇게
  drawingContext.shadowBlur = 30; // 네온 효과의 흐림 정도
  drawingContext.shadowColor = color(255, 255, 255, 10);
  rect(x, y - height, barWidth, height);
}

function drawBar(x, y, height, col, barWidth) {
  push(); // 현재 스타일 상태 저장
  fill(col);
  noStroke();
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = col;
  rect(x, y - height, barWidth, height);
  pop(); // 이전 스타일 상태로 복원
}

function calculateHandCenter(hand) {
  let wrist = hand.keypoints[0];
  let palmCenter = hand.keypoints[9];
  return createVector(
    (wrist.x + palmCenter.x) / 2,
    (wrist.y + palmCenter.y) / 2
  );
}

function countFingers(hand) {
  let count = 0;
  let fingerTips = [4, 8, 12, 16, 20];
  let fingerBases = [3, 7, 11, 15, 19];

  for (let i = 0; i < fingerTips.length; i++) {
    if (hand.keypoints[fingerTips[i]].y < hand.keypoints[fingerBases[i]].y) {
      count++;
    }
  }
  return count;
}

// setup 함수들 순서대로 !!!

function introSetup() {
  console.log("Intro setup running");
  createCanvas(1000, 750);
  stringsSound.setVolume(0.2);
  windSound.setVolume(0.2);
  drumSound.setVolume(0.2);
  iconY = height / 2;

  // 타이머 초기화
  startTime = millis();
}

function conductingSetup() {
  console.log("Conducting setup running");
  createCanvas(1000, 750);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CORNER);
  textFont(font);

  stringsSound.stop();
  windSound.stop();
  drumSound.stop();

  video2 = createCapture(VIDEO);
  video2.size(width, height);
  video2.hide();

  strings.setVolume(0);
  wind.setVolume(0);
  drum.setVolume(0);

  detectHands();
}

function outroSetup() {
  console.log("Outro setup running");
  createCanvas(1000, 750);
  textFont(font);

  strings.stop();
  wind.stop();
  drum.stop();

  // 비디오 설정
  video = createCapture(VIDEO);
  video.size(1000, 750);
  video.hide();

  // 사운드 재생
  applause.setVolume(0.5);
  applause.loop(); // 사운드를 루프 재생

  // 초기 시간 할당
  startTime = millis();
}

// draw 함수들 순서대로 !!!

function introDraw() {
  if (showFinale) {
    drawFinale(); // 표지를 그리는 함수 호출
  } else {
    if (clickCount < 6) {
      drawIntroScenes(); // 첫 번째 코드의 내용
    } else {
      drawGestureScenes(); // 두 번째 코드의 내용
    }
  }
}

function conductingDraw() {
  background(0);
  drawRightSection();
  drawBars();
  updateVolumes(); // 볼륨 업데이트

  // 손가락 개수 변경 후 2초 대기 상태이면 로딩 원 그리기
  if (millis() - lastFingerCountTime <= fingerChangeDelay && !isLoading) {
    isLoading = true; // 로딩 상태로 설정
    loadingStartTime = millis(); // 로딩 시작 시간 기록
    loadingAngle = 0; // 원의 각도 초기화
  }

  // 로딩 원이 그려지는 애니메이션
  if (isLoading) {
    let progress = (millis() - loadingStartTime) / fingerChangeDelay; // 진행 상태 (0에서 1까지)
    loadingAngle = map(progress, 0, 1, 0, TWO_PI); // 0에서 두 배의 원주 각도까지 변화

    drawLoadingCircle(165, 230, 60, loadingAngle); // 원의 그려지는 애니메이션

    // 대기 시간이 지나면 로딩을 종료하고 원을 더 이상 그리지 않음
    if (millis() - loadingStartTime > fingerChangeDelay) {
      isLoading = false;
    }
  }
}

function outroDraw() {
  if (currentIndex === 0) {
    image(finaleImg, 0, 0, 1000, 750);
    textAlign(CENTER, CENTER);
    textSize(70);
    fill(255);
    text("YOU are the maestro!", 500, 400);
  } else if (currentIndex === 1) {
    image(article, 0, 0, 1000, 750);
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(255);
    text("기사 사진을 위해 포즈를 취해주세요!", 500, 700);
  } else if (currentIndex === 2) {
    background(0);
    // webcam 출력코드
    translate(width, 0);
    scale(-1, 1);
    image(video, width / 4 + 80, height / 4, width / 2, height / 2);
    translate(width, 0);
    scale(-1, 1);
    image(photozone, 0, 0, 1000, 750); // image 겹쳐지게
    textAlign(CENTER, CENTER);
    textSize(70);
    fill(255);
    text("You're the best maestro!", 500, 100);
    textSize(30);
    fill(255);
    text("Please take a photo with your phone", 500, 50);
  } else if (currentIndex === 3) {
    image(end, 0, 0, 1000, 750);
    textAlign(CENTER, CENTER);
    textSize(70);
    fill(255);
    text("The End", 500, 400);

    // 엔터키 안내 텍스트 추가
    textSize(30);
    fill(255);
    text("엔터를 눌러 처음으로 돌아가세요", 500, 700);
  }

  // 공통으로 "Click"과 아래 삼각형 표시 (마지막 화면 제외)
  if (currentIndex < 3) {
    fill(255);
    textSize(30);
    textAlign(RIGHT, BOTTOM);
    text("Click", width - 50, height - 80);
    triangle(
      width - 100,
      height - 70,
      width - 70,
      height - 70,
      width - 85,
      height - 50
    );
  }
}

// p5.js 메인 함수들 !!!

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  // 초기 상태의 setup만 실행
  introSetup();
}

function draw() {
  // 현재 상태의 draw 함수만 실행
  if (currentState === "intro") {
    introDraw();
  } else if (currentState === "conducting") {
    conductingDraw();
  } else if (currentState === "outro") {
    outroDraw();
  }
}

function mousePressed() {
  if (showFinale) {
    // START 버튼 클릭 판정
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > height / 2 &&
      mouseY < height / 2 + 60
    ) {
      showFinale = false;
      stringsSound.loop();
      windSound.loop();
      drumSound.loop(); // 표지를 닫고 인트로 시작
    }
  } else {
    if (currentState === "intro") {
      if (clickCount < 6) {
        clickCount++;
      } else if (currentTextIndex < 9) {
        currentTextIndex++;
      }
    } else if (currentState === "outro" && currentIndex < 3) {
      currentIndex++;
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (currentState === "intro") {
      currentState = "conducting";
      clear();
      conductingSetup();
    } else if (currentState === "conducting") {
      currentState = "outro";
      clear();
      outroSetup();
    } else if (currentState === "outro" && currentIndex === 3) {
      resetState(); // 모든 상태 초기화
      currentState = "intro";
      currentIndex = 0;
      clickCount = 0;
      clear();
      introSetup();
    }
  }
}

function resetState() {
  // 공통 변수 초기화
  clickCount = 0;
  currentTextIndex = 0;
  showFinale = true;

  // conducting 관련 변수 초기화
  hands = [];
  handCenters = [];
  bars = [0, 0, 0];
  trailColor = [];
  newColor = color(0, 0, 0);
  targetStringVolume = 0;
  targetWindVolume = 0;
  targetDrumVolume = 0;
  currentStringVolume = 0;
  currentWindVolume = 0;
  currentDrumVolume = 0;
  lastFingerCount = -1;
  lastFingerCountTime = 0;
  selectedInstrument = null;
  isLoading = false;
  loadingAngle = 0;
  loadingStartTime = 0;
  currentPlayTime = 0;

  // outro 관련 변수 초기화
  currentIndex = 0;
  interval = 5000;

  // 모든 소리 중지
  stringsSound.stop();
  windSound.stop();
  drumSound.stop();
  strings.stop();
  wind.stop();
  drum.stop();
  applause.stop();

  fill(255); // 기본 색상: 흰색
  stroke(0); // 테두리 색상: 검정색
  strokeWeight(1); // 기본 테두리 두께: 1

  colorMode(RGB);

  textSize(12); // 기본 텍스트 크기: 12
  textAlign(CENTER, CENTER); // 기본 텍스트 정렬: 가운데
  background(255); // 배경을 흰색으로 설정
}

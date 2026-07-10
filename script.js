const STORAGE_KEY = 'hangulQuestVer11';

const stages = [
  {
    id: 'vowel',
    icon: '💧',
    title: '母音の泉',
    description: '基本母音の音に慣れよう',
    target: 5,
    items: [
      ['아','ア','ㅇ','ㅏ'],['어','オ','ㅇ','ㅓ'],['오','オ','ㅇ','ㅗ'],['우','ウ','ㅇ','ㅜ'],
      ['으','ウ','ㅇ','ㅡ'],['이','イ','ㅇ','ㅣ'],['야','ヤ','ㅇ','ㅑ'],['여','ヨ','ㅇ','ㅕ'],
      ['요','ヨ','ㅇ','ㅛ'],['유','ユ','ㅇ','ㅠ']
    ]
  },
  {
    id: 'consonant',
    icon: '🌲',
    title: '子音の森',
    description: 'よく使う子音を読もう',
    target: 8,
    items: [
      ['가','カ/ガ','ㄱ','ㅏ'],['나','ナ','ㄴ','ㅏ'],['다','タ/ダ','ㄷ','ㅏ'],['라','ラ','ㄹ','ㅏ'],
      ['마','マ','ㅁ','ㅏ'],['바','パ/バ','ㅂ','ㅏ'],['사','サ','ㅅ','ㅏ'],['자','チャ/ジャ','ㅈ','ㅏ'],
      ['차','チャ','ㅊ','ㅏ'],['카','カ','ㅋ','ㅏ'],['타','タ','ㅌ','ㅏ'],['파','パ','ㅍ','ㅏ'],['하','ハ','ㅎ','ㅏ']
    ]
  },
  {
    id: 'square',
    icon: '🏘️',
    title: '文字の広場',
    description: '母音が変わると音も変わる',
    target: 10,
    items: [
      ['거','コ/ゴ','ㄱ','ㅓ'],['너','ノ','ㄴ','ㅓ'],['더','ト/ド','ㄷ','ㅓ'],['러','ロ','ㄹ','ㅓ'],
      ['머','モ','ㅁ','ㅓ'],['서','ソ','ㅅ','ㅓ'],['고','コ/ゴ','ㄱ','ㅗ'],['노','ノ','ㄴ','ㅗ'],
      ['도','ト/ド','ㄷ','ㅗ'],['모','モ','ㅁ','ㅗ'],['소','ソ','ㅅ','ㅗ'],['구','ク/グ','ㄱ','ㅜ'],
      ['누','ヌ','ㄴ','ㅜ'],['두','トゥ/ドゥ','ㄷ','ㅜ'],['무','ム','ㅁ','ㅜ'],['수','ス','ㅅ','ㅜ'],
      ['기','キ/ギ','ㄱ','ㅣ'],['니','ニ','ㄴ','ㅣ'],['미','ミ','ㅁ','ㅣ'],['시','シ','ㅅ','ㅣ'],['지','チ/ジ','ㅈ','ㅣ']
    ]
  },
  {
    id: 'cave',
    icon: '🪨',
    title: 'まぎらわしい洞窟',
    description: '似た音と文字を見分けよう',
    target: 10,
    items: [
      ['개','ケ/ゲ','ㄱ','ㅐ'],['게','ケ/ゲ','ㄱ','ㅔ'],['내','ネ','ㄴ','ㅐ'],['네','ネ','ㄴ','ㅔ'],
      ['대','テ/デ','ㄷ','ㅐ'],['데','テ/デ','ㄷ','ㅔ'],['매','メ','ㅁ','ㅐ'],['메','メ','ㅁ','ㅔ'],
      ['배','ペ/ベ','ㅂ','ㅐ'],['베','ペ/ベ','ㅂ','ㅔ'],['새','セ','ㅅ','ㅐ'],['세','セ','ㅅ','ㅔ'],
      ['애','エ','ㅇ','ㅐ'],['에','エ','ㅇ','ㅔ'],['재','チェ/ジェ','ㅈ','ㅐ'],['제','チェ/ジェ','ㅈ','ㅔ']
    ]
  },
  {
    id: 'boss',
    icon: '🏰',
    title: '村長の試練',
    description: '村で覚えた文字を総復習',
    target: 12,
    boss: true,
    items: []
  }
];

const allBaseItems = stages.flatMap(stage => stage.items);
stages[4].items = allBaseItems;

const defaultState = {
  score: 0,
  total: 0,
  streak: 0,
  exp: 0,
  level: 1,
  learned: [],
  wrongs: [],
  stageClears: {},
  unlockedStage: 0,
  currentStage: 0,
  lastStudyDate: '',
  todayLearned: []
};

let state = loadState();
let currentStageIndex = Math.min(state.currentStage || 0, stages.length - 1);
let current = null;
let currentQuestionType = 'reading';
let deck = [];
let answered = false;
let reviewMode = false;

const $ = id => document.getElementById(id);
const choices = $('choices');

function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {...defaultState, ...saved};
  }catch{
    return {...defaultState};
  }
}

function saveState(){
  state.currentStage = currentStageIndex;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function shuffle(arr){
  const copy = [...arr];
  for(let i = copy.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function uniqueItems(items){
  return [...new Map(items.map(item => [item[0], item])).values()];
}

function todayKey(){
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function syncToday(){
  const today = todayKey();
  if(state.lastStudyDate !== today){
    state.lastStudyDate = today;
    state.todayLearned = [];
    saveState();
  }
}

function expNeeded(level){
  return level * 50;
}

function addExp(amount){
  state.exp += amount;
  const need = expNeeded(state.level);
  if(state.exp >= need){
    state.exp -= need;
    state.level += 1;
    $('modalLevel').textContent = state.level;
    $('levelUpModal').hidden = false;
    celebrate(30);
  }
}

function renderStats(){
  $('score').textContent = state.score;
  $('total').textContent = state.total;
  $('streak').textContent = state.streak;
  $('learnedCount').textContent = state.learned.length;
  $('level').textContent = state.level;
  $('exp').textContent = state.exp;
  $('nextExp').textContent = expNeeded(state.level);
  $('expFill').style.width = `${Math.min(100,(state.exp / expNeeded(state.level))*100)}%`;
  const remaining = Math.max(1, Math.ceil((expNeeded(state.level)-state.exp)/10));
  $('levelMessage').textContent = `あと${remaining}問くらいでレベルアップ！`;
}

function renderMap(){
  $('stageMap').innerHTML = '';
  stages.forEach((stage,index) => {
    const unlocked = index <= state.unlockedStage;
    const clears = state.stageClears[stage.id] || 0;
    const completed = clears >= stage.target;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `stage-button${index === currentStageIndex && !reviewMode ? ' active' : ''}${!unlocked ? ' locked' : ''}`;
    button.disabled = !unlocked;
    button.innerHTML = `
      <span class="stage-icon">${unlocked ? stage.icon : '🔒'}</span>
      <span>
        <span class="stage-name">${stage.title}</span>
        <span class="stage-description">${stage.description}</span>
      </span>
      <span class="stage-status">${completed ? 'クリア✨' : unlocked ? `${Math.min(clears,stage.target)}/${stage.target}` : '未解放'}</span>
    `;
    button.addEventListener('click',() => {
      if(!unlocked) return;
      reviewMode = false;
      currentStageIndex = index;
      deck = [];
      renderAll();
      nextQuestion();
      $('quizCard').scrollIntoView({behavior:'smooth',block:'start'});
    });
    $('stageMap').appendChild(button);
  });
}

function getCurrentPool(){
  if(reviewMode){
    return uniqueItems(state.wrongs);
  }
  return stages[currentStageIndex].items;
}

function chooseQuestionType(item){
  const possible = ['reading','findLetter'];
  if(item[2] && item[3]) possible.push('combine');
  return pick(possible);
}

function makeReadingChoices(answer){
  const allAnswers = uniqueItems(allBaseItems).map(i => i[1]);
  const options = new Set([answer]);
  while(options.size < Math.min(4,allAnswers.length)) options.add(pick(allAnswers));
  return shuffle([...options]);
}

function makeLetterChoices(answer){
  const allLetters = uniqueItems(allBaseItems).map(i => i[0]);
  const options = new Set([answer]);
  while(options.size < Math.min(4,allLetters.length)) options.add(pick(allLetters));
  return shuffle([...options]);
}

function makeCombineChoices(answer){
  const allLetters = uniqueItems(allBaseItems).map(i => i[0]);
  const options = new Set([answer]);
  while(options.size < Math.min(4,allLetters.length)) options.add(pick(allLetters));
  return shuffle([...options]);
}

function nextQuestion(){
  const pool = getCurrentPool();
  if(!pool.length){
    reviewMode = false;
    setGuide('復習する問題がなくなったよ！文字の村へ戻ろう。','🎉');
    renderAll();
    return;
  }

  answered = false;
  $('nextBtn').disabled = true;
  $('result').textContent = '';
  $('result').className = 'result';

  if(!deck.length) deck = shuffle(pool);
  current = deck.pop();
  currentQuestionType = chooseQuestionType(current);

  const stage = reviewMode ? {title:'復習の小屋'} : stages[currentStageIndex];
  $('stageTitle').textContent = reviewMode ? '🔥 復習の小屋' : `${stage.icon} ${stage.title}`;
  $('stageProgress').textContent = reviewMode
    ? `${uniqueItems(state.wrongs).length}文字を復習中`
    : `${Math.min(state.stageClears[stage.id] || 0,stage.target)} / ${stage.target} クリア`;

  $('combineParts').hidden = true;
  $('question').hidden = false;
  choices.innerHTML = '';

  let options = [];
  let correctAnswer = '';

  if(currentQuestionType === 'reading'){
    $('questType').textContent = '読み方クイズ';
    $('questionLabel').textContent = 'この文字はどう読む？';
    $('question').textContent = current[0];
    $('hint').textContent = '正しい読み方を選んでね';
    correctAnswer = current[1];
    options = makeReadingChoices(correctAnswer);
  }else if(currentQuestionType === 'findLetter'){
    $('questType').textContent = '文字さがし';
    $('questionLabel').textContent = `「${current[1]}」はどれ？`;
    $('question').textContent = '？';
    $('hint').textContent = '読み方に合う文字を選んでね';
    correctAnswer = current[0];
    options = makeLetterChoices(correctAnswer);
  }else{
    $('questType').textContent = '組み立てクイズ';
    $('questionLabel').textContent = 'この子音と母音を組み立てると？';
    $('question').hidden = true;
    $('combineParts').hidden = false;
    $('combineParts').innerHTML = `<span>${current[2]}</span><span>＋</span><span>${current[3]}</span>`;
    $('hint').textContent = '完成する文字を選んでね';
    correctAnswer = current[0];
    options = makeCombineChoices(correctAnswer);
  }

  options.forEach(option => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option;
    button.addEventListener('click',() => answer(button,option,correctAnswer));
    choices.appendChild(button);
  });
}

function answer(button,selected,correctAnswer){
  if(answered) return;
  answered = true;
  state.total += 1;

  [...choices.children].forEach(b => b.disabled = true);

  if(selected === correctAnswer){
    state.score += 1;
    state.streak += 1;
    button.classList.add('correct');
    $('result').textContent = state.streak >= 5 ? `正解！${state.streak}問連続、すごい！` : '正解！いい感じ！';
    $('result').className = 'result ok';
    $('quizCard').classList.remove('flash');
    void $('quizCard').offsetWidth;
    $('quizCard').classList.add('flash');

    addExp(10);
    registerLearned(current);

    if(reviewMode){
      state.wrongs = state.wrongs.filter(item => item[0] !== current[0]);
    }else{
      const stage = stages[currentStageIndex];
      state.stageClears[stage.id] = (state.stageClears[stage.id] || 0) + 1;
      checkStageClear(stage);
    }

    setGuide(pick([
      'その調子！文字の形と音がつながってきたね。',
      'いいね！一文字ずつ、ちゃんと読めるようになってる。',
      '今日も화이팅！次の文字もいってみよう。',
      '正解！村の景色が少しずつ見えてきたね。'
    ]),'🐥');

    if(state.streak % 5 === 0) celebrate(18);
  }else{
    state.streak = 0;
    button.classList.add('wrong');
    const correctButton = [...choices.children].find(b => b.textContent === correctAnswer);
    if(correctButton) correctButton.classList.add('correct');
    state.wrongs.push(current);
    state.wrongs = uniqueItems(state.wrongs);
    $('result').textContent = `おしい！正解は「${correctAnswer}」`;
    $('result').className = 'result bad';

    $('quizCard').classList.remove('shake');
    void $('quizCard').offsetWidth;
    $('quizCard').classList.add('shake');
    setGuide('大丈夫。間違えた文字は復習の小屋に入れておいたよ。','🌱');
  }

  saveState();
  renderAll();
  $('nextBtn').disabled = false;
}

function registerLearned(item){
  if(!state.learned.includes(item[0])) state.learned.push(item[0]);
  if(!state.todayLearned.includes(item[0])) state.todayLearned.push(item[0]);
}

function checkStageClear(stage){
  const clears = state.stageClears[stage.id] || 0;
  if(clears === stage.target){
    const nextIndex = currentStageIndex + 1;
    if(nextIndex < stages.length && state.unlockedStage < nextIndex){
      state.unlockedStage = nextIndex;
      setGuide(`${stage.title}クリア！次の「${stages[nextIndex].title}」が解放されたよ！`,'🎉');
      celebrate(34);
    }else{
      setGuide(`${stage.title}クリア！何度でも遊んで文字を定着させよう。`,'🏆');
      celebrate(34);
    }
  }
}

function renderToday(){
  const container = $('todayLetters');
  $('todayCount').textContent = `${state.todayLearned.length}文字`;
  if(!state.todayLearned.length){
    container.className = 'letter-chips empty';
    container.textContent = 'まだないよ。1問正解すると増える！';
    return;
  }
  container.className = 'letter-chips';
  container.innerHTML = state.todayLearned.map(char => `<span class="letter-chip">${char}</span>`).join('');
}

function renderReview(){
  const wrongs = uniqueItems(state.wrongs);
  $('wrongCount').textContent = `${wrongs.length}問`;
  $('wrongList').textContent = wrongs.length
    ? wrongs.slice(0,8).map(item => `${item[0]} → ${item[1]}`).join(' / ') + (wrongs.length > 8 ? ' …' : '')
    : 'まだ間違いはないよ。天才か。';
  $('reviewBtn').disabled = !wrongs.length;
}

function renderDictionary(){
  const all = uniqueItems(allBaseItems);
  $('dictionaryCount').textContent = `${state.learned.length} / ${all.length}`;
  $('dictionary').innerHTML = all.map(item => {
    const learned = state.learned.includes(item[0]);
    return learned
      ? `<div class="dictionary-item"><span class="char">${item[0]}</span><span class="reading">${item[1]}</span></div>`
      : `<div class="dictionary-item locked"><span class="char">？</span><span class="reading">未発見</span></div>`;
  }).join('');
}

function setGuide(message,icon='🐥'){
  $('guideMessage').textContent = message;
  $('guideIcon').textContent = icon;
}

function renderAll(){
  renderStats();
  renderMap();
  renderToday();
  renderReview();
  renderDictionary();
}

function celebrate(count=24){
  const root = $('celebration');
  const colors = ['#7c3aed','#f97316','#16a34a','#facc15','#ec4899'];
  for(let i=0;i<count;i++){
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random()*100}%`;
    piece.style.background = pick(colors);
    piece.style.animationDelay = `${Math.random()*.35}s`;
    piece.style.transform = `rotate(${Math.random()*180}deg)`;
    root.appendChild(piece);
    setTimeout(() => piece.remove(),1700);
  }
}

$('nextBtn').addEventListener('click',nextQuestion);

$('reviewBtn').addEventListener('click',() => {
  if(!state.wrongs.length) return;
  reviewMode = true;
  deck = [];
  renderAll();
  nextQuestion();
  $('quizCard').scrollIntoView({behavior:'smooth',block:'start'});
});

$('resetBtn').addEventListener('click',() => {
  const ok = confirm('Hangul Questの記録をすべてリセットしますか？');
  if(!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  state = {...defaultState};
  currentStageIndex = 0;
  deck = [];
  reviewMode = false;
  syncToday();
  setGuide('記録をリセットしたよ。母音の泉から、もう一度冒険スタート！','🌱');
  renderAll();
  nextQuestion();
});

$('closeModalBtn').addEventListener('click',() => {
  $('levelUpModal').hidden = true;
});

syncToday();
renderAll();
nextQuestion();

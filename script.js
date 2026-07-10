const STORAGE_KEY = 'hangulQuestVer12'; // Ver1.2の進捗をそのまま引き継ぐ

const vowelSets = [
  {id:'a',icon:'🌲',title:'アの森',desc:'ㅏの文字を読もう',vowel:'ㅏ',target:14},
  {id:'eo',icon:'🛤️',title:'オの小道',desc:'ㅓの文字を読もう',vowel:'ㅓ',target:14},
  {id:'o',icon:'⛰️',title:'オの丘',desc:'ㅗの文字を読もう',vowel:'ㅗ',target:14},
  {id:'u',icon:'🏞️',title:'ウの川',desc:'ㅜの文字を読もう',vowel:'ㅜ',target:14},
  {id:'eu',icon:'🌾',title:'ウの草原',desc:'ㅡの文字を読もう',vowel:'ㅡ',target:14},
  {id:'i',icon:'🌸',title:'イの庭',desc:'ㅣの文字を読もう',vowel:'ㅣ',target:14}
];

const itemMap = {
  'ㅏ':[['가','カ/ガ'],['나','ナ'],['다','タ/ダ'],['라','ラ'],['마','マ'],['바','パ/バ'],['사','サ'],['아','ア'],['자','チャ/ジャ'],['차','チャ'],['카','カ'],['타','タ'],['파','パ'],['하','ハ']],
  'ㅓ':[['거','コ/ゴ'],['너','ノ'],['더','ト/ド'],['러','ロ'],['머','モ'],['버','ポ/ボ'],['서','ソ'],['어','オ'],['저','チョ/ジョ'],['처','チョ'],['커','コ'],['터','ト'],['퍼','ポ'],['허','ホ']],
  'ㅗ':[['고','コ/ゴ'],['노','ノ'],['도','ト/ド'],['로','ロ'],['모','モ'],['보','ポ/ボ'],['소','ソ'],['오','オ'],['조','チョ/ジョ'],['초','チョ'],['코','コ'],['토','ト'],['포','ポ'],['호','ホ']],
  'ㅜ':[['구','ク/グ'],['누','ヌ'],['두','トゥ/ドゥ'],['루','ル'],['무','ム'],['부','プ/ブ'],['수','ス'],['우','ウ'],['주','チュ/ジュ'],['추','チュ'],['쿠','ク'],['투','トゥ'],['푸','プ'],['후','フ']],
  'ㅡ':[['그','ク/グ'],['느','ヌ'],['드','トゥ/ドゥ'],['르','ル'],['므','ム'],['브','プ/ブ'],['스','ス'],['으','ウ'],['즈','チュ/ジュ'],['츠','チュ'],['크','ク'],['트','トゥ'],['프','プ'],['흐','フ']],
  'ㅣ':[['기','キ/ギ'],['니','ニ'],['디','ティ/ディ'],['리','リ'],['미','ミ'],['비','ピ/ビ'],['시','シ'],['이','イ'],['지','チ/ジ'],['치','チ'],['키','キ'],['티','ティ'],['피','ピ'],['히','ヒ']],
  'ㅑ':[['갸','キャ/ギャ'],['냐','ニャ'],['댜','テャ/デャ'],['랴','リャ'],['먀','ミャ'],['뱌','ピャ/ビャ'],['샤','シャ'],['야','ヤ'],['쟈','チャ/ジャ'],['챠','チャ'],['캬','キャ'],['탸','テャ'],['퍄','ピャ'],['햐','ヒャ']],
  'ㅕ':[['겨','キョ/ギョ'],['녀','ニョ'],['뎌','ティョ/ディョ'],['려','リョ'],['며','ミョ'],['벼','ピョ/ビョ'],['셔','ショ'],['여','ヨ'],['져','チョ/ジョ'],['쳐','チョ'],['켜','キョ'],['텨','ティョ'],['펴','ピョ'],['혀','ヒョ']],
  'ㅛ':[['교','キョ/ギョ'],['뇨','ニョ'],['됴','ティョ/ディョ'],['료','リョ'],['묘','ミョ'],['뵤','ピョ/ビョ'],['쇼','ショ'],['요','ヨ'],['죠','チョ/ジョ'],['쵸','チョ'],['쿄','キョ'],['툐','ティョ'],['표','ピョ'],['효','ヒョ']],
  'ㅠ':[['규','キュ/ギュ'],['뉴','ニュ'],['듀','テュ/デュ'],['류','リュ'],['뮤','ミュ'],['뷰','ピュ/ビュ'],['슈','シュ'],['유','ユ'],['쥬','チュ/ジュ'],['츄','チュ'],['큐','キュ'],['튜','テュ'],['퓨','ピュ'],['휴','ヒュ']]
};

function makeItems(vowel){ return itemMap[vowel]; }

const basicVowels = [['아','ア'],['어','オ'],['오','オ'],['우','ウ'],['으','ウ'],['이','イ'],['야','ヤ'],['여','ヨ'],['요','ヨ'],['유','ユ']];
const yItems = [...makeItems('ㅑ'),...makeItems('ㅕ'),...makeItems('ㅛ'),...makeItems('ㅠ')];

const villageStages = [
  {id:'vowels',icon:'💧',title:'母音の泉',desc:'基本母音10個',target:10,items:basicVowels},
  ...vowelSets.map(v=>({...v,items:makeItems(v.vowel)})),
  {id:'y',icon:'🌙',title:'ヤ・ヨ・ユの夜道',desc:'ㅑ ㅕ ㅛ ㅠ を攻略',target:20,items:yItems},
  {id:'mix',icon:'🪨',title:'まぎらわしい洞窟',desc:'全エリアからランダム出題',target:30,items:[]},
  {id:'boss',icon:'🏰',title:'村長の試練',desc:'40問クリアで文字の村制覇',target:40,items:[]}
];

const allVillageItems = [...basicVowels,...vowelSets.flatMap(v=>makeItems(v.vowel)),...yItems];
villageStages[8].items = allVillageItems;
villageStages[9].items = allVillageItems;

// Ver1.3では「パッチムの山」の入口を実装。次のVer2.0で本格拡張する。
const patchimSoundLabels = {
  'ㅇ':'ン（喉の奥で響く）',
  'ㄱ':'ク（息を出さず止める）',
  'ㄴ':'ン（舌先で止める）',
  'ㅁ':'ム（唇を閉じる）',
  'ㄹ':'ル（舌先をつける）'
};

// [韓国語, 読み, パッチム, コース]
const patchimStages = [
  {
    id:'patchim_ng', icon:'🔔', title:'ㅇパッチムの岩場', desc:'旅行・料理・BTSなど4コース', target:20,
    items:[
      ['강','カン','ㅇ','自然'],['공','コン','ㅇ','街'],['방','パン/バン','ㅇ','日常'],['봉','ポン/ボン','ㅇ','日常'],
      ['상','サン','ㅇ','日常'],['성','ソン','ㅇ','街'],['송','ソン','ㅇ','BTS'],['영','ヨン','ㅇ','日常'],
      ['왕','ワン','ㅇ','日常'],['중','チュン/ジュン','ㅇ','街'],['동','トン/ドン','ㅇ','街'],['명','ミョン','ㅇ','旅行'],
      ['용','ヨン','ㅇ','日常'],['홍','ホン','ㅇ','旅行'],['한강','ハンガン','ㅇ','旅行'],['공항','コンハン','ㅇ','旅行'],
      ['명동','ミョンドン','ㅇ','旅行'],['광장','クァンジャン','ㅇ','旅行'],['시장','シジャン','ㅇ','料理'],
      ['냉면','ネンミョン','ㅇ','料理'],['된장','テンジャン','ㅇ','料理'],['사랑','サラン','ㅇ','BTS'],
      ['영상','ヨンサン','ㅇ','BTS'],['공연','コンヨン','ㅇ','BTS'],['방탄','パンタン','ㅇ','BTS'],
      ['정국','チョングク','ㅇ','BTS'],['성수','ソンス','ㅇ','旅行'],['동대문','トンデムン','ㅇ','旅行']
    ]
  },
  {
    id:'patchim_k', icon:'🧗', title:'ㄱパッチムの崖', desc:'国名・食事・日常の4コース', target:20,
    items:[
      ['각','カク','ㄱ','基本'],['국','クク/グク','ㄱ','基本'],['목','モク','ㄱ','身体'],['책','チェク','ㄱ','日常'],
      ['약','ヤク','ㄱ','日常'],['역','ヨク','ㄱ','旅行'],['식','シク','ㄱ','料理'],['백','ペク/ベク','ㄱ','数字'],
      ['박','パク/バク','ㄱ','名前'],['밖','パク','ㄱ','日常'],['부엌','プオク','ㄱ','料理'],['한국','ハングク','ㄱ','旅行'],
      ['태국','テグク','ㄱ','旅行'],['미국','ミグク','ㄱ','旅行'],['중국','チュングク','ㄱ','旅行'],
      ['외국','ウェグク','ㄱ','旅行'],['음식','ウムシク','ㄱ','料理'],['아침식사','アチムシクサ','ㄱ','料理'],
      ['저녁','チョニョク','ㄱ','料理'],['떡','トク','ㄱ','料理'],['떡국','トックク','ㄱ','料理'],
      ['학교','ハッキョ','ㄱ','日常'],['입국','イプクク','ㄱ','旅行'],['출국','チュルグク','ㄱ','旅行'],
      ['한국어','ハングゴ','ㄱ','学習'],['정국','チョングク','ㄱ','BTS'],['음악','ウマク','ㄱ','BTS'],
      ['노래곡','ノレゴク','ㄱ','BTS']
    ]
  },
  {
    id:'patchim_n', icon:'🌲', title:'ㄴパッチムの尾根', desc:'人・街・時間・旅行の4コース', target:20,
    items:[
      ['산','サン','ㄴ','自然'],['문','ムン','ㄴ','日常'],['눈','ヌン','ㄴ','身体'],['손','ソン','ㄴ','身体'],
      ['돈','トン/ドン','ㄴ','旅行'],['선','ソン','ㄴ','街'],['안','アン','ㄴ','基本'],['인','イン','ㄴ','人'],
      ['전','チョン/ジョン','ㄴ','時間'],['친','チン','ㄴ','人'],['한국인','ハングギン','ㄴ','人'],
      ['사진','サジン','ㄴ','日常'],['시간','シガン','ㄴ','時間'],['부산','プサン','ㄴ','旅行'],
      ['일본','イルボン','ㄴ','旅行'],['서울역','ソウルリョク','ㄴ','旅行'],['편의점','ピョニジョム','ㄴ','旅行'],
      ['친구','チング','ㄴ','人'],['언니','オンニ','ㄴ','人'],['누나','ヌナ','ㄴ','人'],
      ['선물','ソンムル','ㄴ','日常'],['전화','チョヌァ','ㄴ','日常'],['오늘','オヌル','ㄴ','時間'],
      ['내일','ネイル','ㄴ','時間'],['공연','コンヨン','ㄴ','BTS'],['지민','ジミン','ㄴ','BTS'],
      ['인천','インチョン','ㄴ','旅行'],['한식','ハンシク','ㄴ','料理']
    ]
  },
  {
    id:'patchim_m', icon:'🌳', title:'ㅁパッチムの森', desc:'料理・人・気持ち・BTSの4コース', target:20,
    items:[
      ['김','キム','ㅁ','料理'],['밤','パム/バム','ㅁ','日常'],['봄','ポム/ボム','ㅁ','季節'],
      ['잠','チャム','ㅁ','日常'],['몸','モム','ㅁ','身体'],['마음','マウム','ㅁ','気持ち'],
      ['사람','サラム','ㅁ','人'],['이름','イルム','ㅁ','人'],['처음','チョウム','ㅁ','基本'],
      ['지금','チグム','ㅁ','時間'],['다음','タウム','ㅁ','時間'],['구름','クルム','ㅁ','自然'],
      ['김치','キムチ','ㅁ','料理'],['김밥','キムパプ','ㅁ','料理'],['참기름','チャムギルム','ㅁ','料理'],
      ['소금','ソグム','ㅁ','料理'],['아침','アチム','ㅁ','料理'],['점심','チョムシム','ㅁ','料理'],
      ['음식','ウムシク','ㅁ','料理'],['감사','カムサ','ㅁ','旅行'],['감사합니다','カムサハムニダ','ㅁ','旅行'],
      ['춤','チュム','ㅁ','BTS'],['앨범','エルボム','ㅁ','BTS'],['팬덤','ペンドム','ㅁ','BTS'],
      ['꿈','クム','ㅁ','BTS'],['지민','ジミン','ㅁ','BTS'],['남준','ナムジュン','ㅁ','BTS'],
      ['아미','アミ','ㅁ','BTS']
    ]
  },
  {
    id:'patchim_r', icon:'🏕️', title:'ㄹパッチムの谷', desc:'ソウル・道・水・日常の4コース', target:20,
    items:[
      ['물','ムル','ㄹ','料理'],['달','タル','ㄹ','自然'],['길','キル','ㄹ','旅行'],['말','マル','ㄹ','学習'],
      ['발','パル/バル','ㄹ','身体'],['별','ピョル','ㄹ','自然'],['술','スル','ㄹ','料理'],['일','イル','ㄹ','時間'],
      ['월','ウォル','ㄹ','時間'],['오늘','オヌル','ㄹ','時間'],['내일','ネイル','ㄹ','時間'],
      ['서울','ソウル','ㄹ','旅行'],['한글','ハングル','ㄹ','学習'],['지하철','チハチョル','ㄹ','旅行'],
      ['출구','チュルグ','ㄹ','旅行'],['입구길','イプクキル','ㄹ','旅行'],['마을','マウル','ㄹ','街'],
      ['호텔','ホテル','ㄹ','旅行'],['겨울','キョウル','ㄹ','季節'],['가을','カウル','ㄹ','季節'],
      ['과일','クァイル','ㄹ','料理'],['불','プル/ブル','ㄹ','料理'],['불고기','プルゴギ','ㄹ','料理'],
      ['설탕','ソルタン','ㄹ','料理'],['얼굴','オルグル','ㄹ','身体'],['노래를','ノレルル','ㄹ','BTS'],
      ['보컬','ボコル','ㄹ','BTS'],['서울콘','ソウルコン','ㄹ','BTS']
    ]
  },
  {id:'patchim_next', icon:'🥾', title:'さらに上の登山道', desc:'次回はㅂパッチムとその他のパッチム', target:0, items:[], comingSoon:true}
];

const allItems = [...allVillageItems,...patchimStages.flatMap(stage=>stage.items || [])];

const defaults = {
  score:0,total:0,streak:0,exp:0,level:1,
  learned:[],wrongs:[],todayLearned:[],lastDate:'',
  clears:{},unlocked:0,currentStage:0,
  worldUnlocked:{village:true,patchim:false},currentArea:'village',
  chapterClearShown:false,patchimClears:{},patchimUnlocked:0
};

let state = load();
let currentArea = state.currentArea || 'village';
let currentStage = currentArea === 'patchim' ? (state.patchimCurrentStage || 0) : Math.min(state.currentStage || 0, villageStages.length-1);
let current = null;
let deck = [];
let answered = false;
let reviewMode = false;

const $ = id => document.getElementById(id);

function load(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const merged = {...defaults,...saved};
    merged.worldUnlocked = {...defaults.worldUnlocked,...(saved.worldUnlocked||{})};
    merged.patchimClears = {...defaults.patchimClears,...(saved.patchimClears||{})};
    return merged;
  }catch{return structuredClone(defaults)}
}

function migrateProgress(){
  const bossDone = (state.clears.boss || 0) >= villageStages[9].target;
  if(bossDone) state.worldUnlocked.patchim = true;
  if(!state.worldUnlocked.village) state.worldUnlocked.village = true;

  // クリア済みの登山道に応じて、更新後も次のステージを自動解放する。
  const ngDone = (state.patchimClears.patchim_ng || 0) >= patchimStages[0].target;
  if(ngDone) state.patchimUnlocked = Math.max(state.patchimUnlocked || 0, 1);

  const kDone = (state.patchimClears.patchim_k || 0) >= patchimStages[1].target;
  if(kDone) state.patchimUnlocked = Math.max(state.patchimUnlocked || 0, 2);

  const nDone = (state.patchimClears.patchim_n || 0) >= 12;
  if(nDone) state.patchimUnlocked = Math.max(state.patchimUnlocked || 0, 3);

  const mDone = (state.patchimClears.patchim_m || 0) >= patchimStages[3].target;
  if(mDone) state.patchimUnlocked = Math.max(state.patchimUnlocked || 0, 4);

  save();
}

function save(){
  if(currentArea==='village') state.currentStage=currentStage;
  else state.patchimCurrentStage=currentStage;
  state.currentArea=currentArea;
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
}
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function unique(a){return [...new Map(a.map(x=>[x[0],x])).values()]}
function today(){const d=new Date();return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`}
function syncDay(){if(state.lastDate!==today()){state.lastDate=today();state.todayLearned=[];save()}}
function needExp(){return state.level*50}
function addExp(n){state.exp+=n;if(state.exp>=needExp()){state.exp-=needExp();state.level++;$('modalLevel').textContent=state.level;$('modal').hidden=false;celebrate(34)}}
function title(){if((state.patchimClears.patchim_r||0)>=20)return 'パッチム登山家';if((state.clears.boss||0)>=40)return '文字の村マスター';if(state.learned.length>=80)return '文字の探検家';return 'ハングル見習い'}

function renderStats(){
  $('score').textContent=state.score;$('total').textContent=state.total;$('streak').textContent=state.streak;
  $('learnedCount').textContent=state.learned.length;$('level').textContent=state.level;
  $('exp').textContent=state.exp;$('nextExp').textContent=needExp();
  $('expFill').style.width=`${Math.min(100,state.exp/needExp()*100)}%`;
  $('levelHint').textContent=`あと${Math.max(1,Math.ceil((needExp()-state.exp)/10))}問くらいでレベルアップ！`;
  $('titleBadge').textContent=title();
}

function renderWorld(){
  const btn=$('patchimWorldButton');
  const status=$('patchimWorldStatus');
  const unlocked=state.worldUnlocked.patchim;
  btn.disabled=!unlocked;
  btn.classList.toggle('locked',!unlocked);
  btn.classList.toggle('current',unlocked && currentArea==='patchim');
  status.textContent=unlocked?(currentArea==='patchim'?'冒険中':'解放済み'):'未解放';
}

function renderVillageStages(){
  const root=$('stageMap');root.innerHTML='';
  villageStages.forEach((s,i)=>{
    const unlocked=i<=state.unlocked;
    const c=state.clears[s.id]||0;
    const done=c>=s.target;
    const b=document.createElement('button');
    b.type='button';b.disabled=!unlocked;
    b.className=`stage${currentArea==='village'&&i===currentStage&&!reviewMode?' active':''}${!unlocked?' locked':''}`;
    b.innerHTML=`<span class="stage-icon">${unlocked?s.icon:'🔒'}</span><span><span class="stage-name">${s.title}</span><span class="stage-desc">${s.desc}</span></span><span class="stage-status">${done?'クリア✨':unlocked?`${Math.min(c,s.target)}/${s.target}`:'未解放'}</span>`;
    b.onclick=()=>selectStage('village',i);
    root.appendChild(b);
  });
}

function renderPatchimStages(){
  const root=$('patchimStageMap');root.innerHTML='';
  patchimStages.forEach((s,i)=>{
    const unlocked=state.worldUnlocked.patchim && i<=state.patchimUnlocked;
    const c=state.patchimClears[s.id]||0;
    const b=document.createElement('button');
    b.type='button';b.disabled=!unlocked||s.comingSoon;
    b.className=`stage${currentArea==='patchim'&&i===currentStage&&!reviewMode?' active':''}${(!unlocked||s.comingSoon)?' locked':''}`;
    const status=s.comingSoon?'準備中':c>=s.target?'クリア✨':`${Math.min(c,s.target)}/${s.target}`;
    b.innerHTML=`<span class="stage-icon">${unlocked?s.icon:'🔒'}</span><span><span class="stage-name">${s.title}</span><span class="stage-desc">${s.desc}</span></span><span class="stage-status">${status}</span>`;
    if(!s.comingSoon) b.onclick=()=>selectStage('patchim',i);
    root.appendChild(b);
  });
}

function selectStage(area,index){
  currentArea=area;currentStage=index;reviewMode=false;deck=[];save();renderAll();nextQuestion();$('quizCard').scrollIntoView({behavior:'smooth',block:'start'});
}

function currentStages(){return currentArea==='patchim'?patchimStages:villageStages}
function currentClears(){return currentArea==='patchim'?state.patchimClears:state.clears}
function currentPool(){return reviewMode?unique(state.wrongs):currentStages()[currentStage].items}

function makeChoices(answer,type){
  const source=unique(allItems);
  let candidates;
  if(type==='reading') candidates=source.map(x=>x[1]);
  else if(type==='letter') candidates=source.map(x=>x[0]);
  else if(type==='patchim') candidates=['ㅇ','ㄱ','ㄴ','ㅁ','ㄹ','ㅂ','ㄷ'];
  else if(type==='sound') candidates=Object.values(patchimSoundLabels);
  else candidates=source.map(x=>x[1]);

  const set=new Set([answer]);
  while(set.size<4)set.add(pick(candidates));
  return shuffle([...set]);
}

function nextQuestion(){
  const pool=currentPool();
  if(!pool.length){reviewMode=false;message('ここはまだ準備中だよ。別のステージへ行こう！','🧚');renderAll();return}
  answered=false;$('nextBtn').disabled=true;$('result').textContent='';$('result').className='result';
  if(!deck.length)deck=shuffle(pool);
  current=deck.pop();

  const s=reviewMode?{title:'復習の小屋',icon:'🔥'}:currentStages()[currentStage];
  const clearMap=currentClears();
  $('stageTitle').textContent=`${s.icon} ${s.title}`;
  $('stageProgress').textContent=reviewMode?`${unique(state.wrongs).length}文字を復習中`:`${Math.min(clearMap[s.id]||0,s.target)} / ${s.target}`;

  let type='reading';
  if(currentArea==='patchim' && !reviewMode){
    type=pick(['reading','letter','patchim','sound']);
  }else{
    type=Math.random()<.62?'reading':'letter';
  }

  const course=current[3] ? `${current[3]}コース・` : '';
  let correct;

  if(type==='reading'){
    $('questionType').textContent=`${course}読み方`;
    $('questionLabel').textContent='この文字・単語はどう読む？';
    $('question').textContent=current[0];
    correct=current[1];
  }else if(type==='letter'){
    $('questionType').textContent=`${course}文字さがし`;
    $('questionLabel').textContent=`「${current[1]}」はどれ？`;
    $('question').textContent='？';
    correct=current[0];
  }else if(type==='patchim'){
    $('questionType').textContent=`${course}パッチム判定`;
    $('questionLabel').textContent='最後のパッチムはどれ？';
    $('question').textContent=current[0];
    correct=current[2];
  }else{
    $('questionType').textContent=`${course}音の種類`;
    $('questionLabel').textContent='最後はどんな音で止める？';
    $('question').textContent=current[0];
    correct=patchimSoundLabels[current[2]];
  }

  const root=$('choices');root.innerHTML='';
  makeChoices(correct,type).forEach(opt=>{
    const b=document.createElement('button');
    b.type='button';b.textContent=opt;
    b.onclick=()=>answer(b,opt,correct);
    root.appendChild(b);
  });
}

function answer(btn,opt,correct){
  if(answered)return;answered=true;state.total++;
  [...$('choices').children].forEach(b=>b.disabled=true);
  if(opt===correct){
    state.score++;state.streak++;btn.classList.add('correct');addExp(10);
    if(!state.learned.includes(current[0]))state.learned.push(current[0]);
    if(!state.todayLearned.includes(current[0]))state.todayLearned.push(current[0]);
    if(reviewMode)state.wrongs=state.wrongs.filter(x=>x[0]!==current[0]);
    else{
      const s=currentStages()[currentStage];
      const clears=currentClears();
      clears[s.id]=(clears[s.id]||0)+1;
      checkStageClear(s,clears[s.id]);
    }
    $('result').textContent=state.streak>=5?`正解！${state.streak}問連続✨`:'正解！ +10 EXP';
    $('result').className='result ok';animate('flash');if(state.streak%5===0)celebrate(16);
  }else{
    state.streak=0;btn.classList.add('wrong');
    const right=[...$('choices').children].find(b=>b.textContent===correct);if(right)right.classList.add('correct');
    state.wrongs=unique([...state.wrongs,current]);
    $('result').textContent=`おしい！正解は「${correct}」`;$('result').className='result bad';animate('shake');
    message('大丈夫。復習の小屋に入れておいたよ。一緒に覚えよう！','🌱');
  }
  save();renderAll();$('nextBtn').disabled=false;
}

function checkStageClear(stage,count){
  if(count!==stage.target){
    message(pick(['やった！読めたね！','いい感じ！文字と音がつながってきたよ。','잘했어요！ よくできました！','その調子！次もいってみよう。']),'🧚');
    return;
  }
  if(currentArea==='village'){
    if(stage.id==='boss'){
      state.worldUnlocked.patchim=true;
      celebrate(45);
      message('文字の村を制覇したよ！パッチムの山が開いた！','🎉');
      if(!state.chapterClearShown){state.chapterClearShown=true;$('chapterClearModal').hidden=false}
    }else if(currentStage<villageStages.length-1){
      state.unlocked=Math.max(state.unlocked,currentStage+1);
      message(`${stage.title}クリア！「${villageStages[currentStage+1].title}」が開いたよ！`,'🎉');celebrate(30);
    }
  }else{
    if(currentStage < patchimStages.length - 1 && !patchimStages[currentStage + 1].comingSoon){
      state.patchimUnlocked = Math.max(state.patchimUnlocked || 0, currentStage + 1);
      message(`${stage.title}クリア！「${patchimStages[currentStage + 1].title}」が開いたよ！`,'🏔️');
      celebrate(32);
    }else{
      message(`${stage.title}クリア！さらに上の登山道は次のアップデートで開くよ。`,'🏔️');
      celebrate(30);
    }
  }
}

function showArea(area){
  if(area==='patchim'&&!state.worldUnlocked.patchim)return;
  currentArea=area;currentStage=area==='patchim'?(state.patchimCurrentStage||0):(state.currentStage||0);reviewMode=false;deck=[];save();renderAll();nextQuestion();
  document.getElementById(area==='patchim'?'patchimArea':'village').scrollIntoView({behavior:'smooth',block:'start'});
}

function animate(cls){const q=$('quizCard');q.classList.remove(cls);void q.offsetWidth;q.classList.add(cls)}
function message(text,icon){$('hanguriMessage').textContent=text;document.querySelector('.companion-name').textContent=`${icon} ハングリ`}
function renderToday(){
  $('todayCount').textContent=`${state.todayLearned.length}文字`;const root=$('todayLetters');
  if(!state.todayLearned.length){root.className='chips empty';root.textContent='正解するとここに増えるよ。'}
  else{root.className='chips';root.innerHTML=state.todayLearned.map(x=>`<span class="chip">${x}</span>`).join('')}
}
function renderReview(){const w=unique(state.wrongs);$('wrongCount').textContent=`${w.length}問`;$('wrongList').textContent=w.length?w.slice(0,10).map(x=>`${x[0]} → ${x[1]}`).join(' / ')+(w.length>10?' …':''):'まだ間違いはないよ。天才か。';$('reviewBtn').disabled=!w.length}
function renderDictionary(){const all=unique(allItems);$('dictionaryCount').textContent=`${state.learned.length} / ${all.length}`;$('dictionary').innerHTML=all.map(x=>state.learned.includes(x[0])?`<div class="dictionary-item"><span class="char">${x[0]}</span><span class="read">${x[1]}</span></div>`:`<div class="dictionary-item locked"><span class="char">？</span><span class="read">未発見</span></div>`).join('')}
function renderAreas(){
  $('village').hidden=currentArea!=='village';
  $('patchimArea').hidden=currentArea!=='patchim';
}
function renderAll(){renderStats();renderWorld();renderVillageStages();renderPatchimStages();renderAreas();renderToday();renderReview();renderDictionary()}
function celebrate(n=24){const root=$('confetti'),colors=['#7656d6','#f58a45','#22a06b','#f5c84b','#e05b9f'];for(let i=0;i<n;i++){const p=document.createElement('span');p.className='confetti';p.style.left=`${Math.random()*100}%`;p.style.background=pick(colors);p.style.animationDelay=`${Math.random()*.3}s`;root.appendChild(p);setTimeout(()=>p.remove(),1600)}}

$('nextBtn').onclick=nextQuestion;
$('reviewBtn').onclick=()=>{if(!state.wrongs.length)return;reviewMode=true;deck=[];renderAll();nextQuestion();$('quizCard').scrollIntoView({behavior:'smooth'})};
$('resetBtn').onclick=()=>{if(!confirm('すべての冒険記録をリセットしますか？'))return;localStorage.removeItem(STORAGE_KEY);state=structuredClone(defaults);currentArea='village';currentStage=0;deck=[];reviewMode=false;syncDay();renderAll();nextQuestion();message('母音の泉から、もう一度冒険スタート！','🌱')};
$('closeModal').onclick=()=>{$('modal').hidden=true};
$('patchimWorldButton').onclick=()=>showArea('patchim');
document.querySelector('[data-scroll="village"]').onclick=()=>showArea('village');
$('goPatchimBtn').onclick=()=>{$('chapterClearModal').hidden=true;showArea('patchim')};
$('stayVillageBtn').onclick=()=>{$('chapterClearModal').hidden=true;showArea('village')};

syncDay();migrateProgress();
if(currentArea==='patchim'&&!state.worldUnlocked.patchim)currentArea='village';
renderAll();nextQuestion();

// すでにVer1.2で村長の試練をクリア済みなら、更新直後に解放を知らせる。
if(state.worldUnlocked.patchim && !state.chapterClearShown){
  state.chapterClearShown=true;save();$('chapterClearModal').hidden=false;celebrate(40);
}

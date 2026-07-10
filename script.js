const modes = {
  letters: { title: '🌱 Chapter1 文字の村', items: [
    ['가','か'],['나','な'],['다','だ'],['라','ら'],['마','ま'],
    ['거','こ'],['너','の'],['더','ど'],['러','ろ'],['머','も'],
    ['고','こ'],['노','の'],['도','ど'],['로','ろ'],['모','も'],
    ['지민','じみん'],['사랑','さらん']
  ]},
  food: { title: '🍚 Chapter2 韓国料理の町', items: [
    ['김치','キムチ'],['비빔밥','ビビンバ'],['불고기','プルコギ'],['삼겹살','サムギョプサル'],
    ['떡볶이','トッポッキ'],['김밥','キンパ'],['된장찌개','テンジャンチゲ'],['냉면','ネンミョン'],
    ['고추장','コチュジャン'],['참기름','ごま油'],['간장','醤油'],['마늘','にんにく']
  ]},
  travel: { title: '🗺️ Chapter3 ソウル旅行クエスト', items: [
    ['서울','ソウル'],['인천공항','仁川空港'],['김포공항','金浦空港'],['명동','明洞'],
    ['홍대','弘大'],['성수','聖水'],['강남','江南'],['광장시장','広蔵市場'],
    ['동대문','東大門'],['한강','漢江'],['지하철','地下鉄'],['버스','バス'],
    ['택시','タクシー'],['출구','出口'],['입구','入口'],['환승','乗り換え'],
    ['화장실','トイレ'],['편의점','コンビニ'],['호텔','ホテル'],['계산','お会計'],
    ['이거 주세요','これください'],['얼마예요','いくらですか'],['물 주세요','水ください'],['감사합니다','ありがとうございます']
  ]},
  bts: { title: '💜 Chapter4 BTSの森', items: [
    ['지민','ジミン'],['정국','ジョングク'],['뷔','V / テテ'],['방탄소년단','BTS'],
    ['아미','ARMY'],['사랑해요','愛してます'],['보고 싶어요','会いたいです'],['괜찮아요','大丈夫です']
  ]},
  recipe: { title: '👩‍🍳 Chapter5 レシピの塔', items: [
    ['양파','玉ねぎ'],['대파','長ねぎ'],['계란','卵'],['두부','豆腐'],
    ['돼지고기','豚肉'],['소고기','牛肉'],['닭고기','鶏肉'],['물','水'],
    ['넣다','入れる'],['볶다','炒める'],['끓이다','煮る/沸かす'],['썰다','切る'],
    ['한 큰술','大さじ1'],['반 컵','半カップ'],['약불','弱火'],['중불','中火']
  ]}
};

let currentMode = 'letters';
let pool = [...modes[currentMode].items];
let current = null;
let score = 0, total = 0, streak = 0;
let wrongs = [];
let answered = false;

const $ = id => document.getElementById(id);
const modeButtons = $('modeButtons'), choices = $('choices');

function shuffle(arr){ return [...arr].sort(() => Math.random() - 0.5); }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function renderModes(){
  modeButtons.innerHTML = '';
  Object.entries(modes).forEach(([key, mode]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = mode.title.replace(/^.+? /,'');
    btn.className = key === currentMode ? 'active' : '';
    btn.addEventListener('click', () => setMode(key));
    modeButtons.appendChild(btn);
  });
}

function setMode(key){
  currentMode = key;
  pool = [...modes[key].items];
  renderModes();
  nextQuestion();
}

function makeChoices(answer){
  const allAnswers = Object.values(modes).flatMap(m => m.items.map(i => i[1]));
  const options = new Set([answer]);
  while(options.size < 4) options.add(pick(allAnswers));
  return shuffle([...options]);
}

function nextQuestion(){
  answered = false;
  $('result').textContent = '';
  $('result').className = 'result';
  $('modeTitle').textContent = modes[currentMode].title;
  current = pick(pool);
  $('question').textContent = current[0];
  $('hint').textContent = '読み・意味を選んでね';
  choices.innerHTML = '';
  makeChoices(current[1]).forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = opt;
    btn.addEventListener('click', () => answer(btn, opt));
    choices.appendChild(btn);
  });
}

function answer(btn, opt){
  if(answered) return;
  answered = true;
  total++;
  if(opt === current[1]){
    score++; streak++;
    btn.classList.add('correct');
    $('result').textContent = '正解！いい感じ！';
    $('result').className = 'result ok';
  } else {
    streak = 0;
    btn.classList.add('wrong');
    wrongs.push(current);
    $('result').textContent = `おしい！正解は「${current[1]}」`;
    $('result').className = 'result bad';
    [...choices.children].forEach(b => { if(b.textContent === current[1]) b.classList.add('correct'); });
  }
  updateStats();
}

function updateStats(){
  $('score').textContent = score;
  $('total').textContent = total;
  $('streak').textContent = streak;
  const unique = [...new Map(wrongs.map(w => [w[0], w])).values()];
  $('wrongList').textContent = unique.length ? unique.map(w => `${w[0]} → ${w[1]}`).join(' / ') : 'まだ間違いはないよ。天才か。';
}

$('nextBtn').addEventListener('click', nextQuestion);
$('reviewBtn').addEventListener('click', () => {
  const unique = [...new Map(wrongs.map(w => [w[0], w])).values()];
  if(!unique.length){ $('wrongList').textContent = '復習する問題がない！すばらしい。'; return; }
  modes.review = { title: '🔥 復習の洞窟', items: unique };
  setMode('review');
});

renderModes();
nextQuestion();

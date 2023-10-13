const ATTACK_VALUE = 10; //звичайна аттака
const STRONG_ATTACK_VALUE = 17;// сильна аттака гравця
const MONSTER_ATTACK_VALUE = 14; //атака монстра
const HEAL_VALUE = 20; //ліки

const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK глобальна константа для аттаки
const MODE_STRONG_ATTACK = 'STRONG_ATTACK' // MODE_STRONG_ATTACK глобальна константа для сильної аттаки

const entredValue = prompt('Maximum life for Monster', '100'); // значення хп вказане користувачем(дефолт 100)

let chosenMaxLife = parseInt(entredValue); // xp яке вказав користувач конвертуэться в намбер

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) { // перевырка на значення NAN та на те щоб значення не дорівнювало або не було меньше 0
  chosenMaxLife = 100; //дефолтне значення
}

let currentMonsterHealth = chosenMaxLife; //присвоєне хp монстру
let currentPlayerHealth = chosenMaxLife; //присвоєне xp гравцю
let hasBonusLife = true; //бонусне життя

adjustHealthBars(chosenMaxLife); // занесене значення xp


function reset() { // функція перезагрузки гри 
  currentMonsterHealth = chosenMaxLife; 
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife); // до якого значення йде перезагрузка
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth; // присвоюэмо до нової змінної хп гравця(робимо копію)
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE); //логіка сильної аттаки
  currentPlayerHealth -= playerDamage; //віднімання хп користувачу у відповідь на аттаку монстра

  if(currentPlayerHealth <= 0 && hasBonusLife) { //перевірка на те що гравець фактично помер,та на бонусне життя
    hasBonusLife = false; //видаляємо бонусне життя із інвентарю
    removeBonusLife(); //видаляємо бонусне життя
    currentPlayerHealth = initialPlayerHealth; //присвоюємо хп гравцю після використання бонусу
    alert('You would be dead but bonus life saved you!!!'); 
    setPlayerHealth(initialPlayerHealth);// перезавантажуємо значення життя(повертаємо трохи життя гравцю)
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {  //логіка перемоги над монстром
    alert('you won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) { //логіка перемоги монстра
    alert('Monsters win!!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) { //логіка нічиї
    alert('You have a draw');
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) { // перевірка на те хто програє тоді йде перезагрузка
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === MODE_ATTACK) { // логіка атаки
    maxDamage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK) { //логіка сильної аттаки
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage); // присвоюэмо атаку яка буде знімати певне число хп
  currentMonsterHealth -= damage; //логіка віднімання хп від функції монстра
  endRound();
}

function attackHandler() { //функція виклику дії для аттаки
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK); //функція виклику дії сильної аттаки
}

function healPlayerHandler() {
  let healValue;
  if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert('You can\'t more healing');
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
    alert('add 20% xp')
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
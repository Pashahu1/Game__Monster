const ATTACK_VALUE = 10; //звичайна аттака
const STRONG_ATTACK_VALUE = 17;// сильна аттака гравця
const MONSTER_ATTACK_VALUE = 14; //атака монстра
const HEAL_VALUE = 20; //ліки

let chosenMaxLife = 100; // xp
let currentMonsterHealth = chosenMaxLife; //присвоєне хp монстру
let currentPlayerHealth = chosenMaxLife; //присвоєне xp гравцю

adjustHealthBars(chosenMaxLife); // занесене значення xp

function endRound() {
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE); //логіка сильної аттаки
  currentPlayerHealth -= playerDamage; //віднімання хп користувачу у відповідь на аттаку монстра
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    //логіка перемоги над монстром
    alert('you won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    //логіка перемоги монстра
    alert('Monsters win!!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    //логіка нічиї
    alert('You have a draw');
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === 'ATTACK') {
    // логіка атаки
    maxDamage = ATTACK_VALUE;
  } else if (mode === 'STRONG_ATTACK') {
    //логіка сильної аттаки
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage); // присвоюэмо атаку яка буде знімати певне число хп
  currentMonsterHealth -= damage; //логіка віднімання хп від функції монстра
  endRound();
}

function attackHandler() {
  //функція виклику дії для аттаки
  attackMonster('ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK'); //функція виклику дії сильної аттаки
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